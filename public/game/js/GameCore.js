import { Tile } from './Tile.js';

export class GameCore {
    constructor() {
        this.boardArea = document.getElementById('board-area');
        this.selectionBar = document.getElementById('selection-bar');
        this.modalOverlay = document.getElementById('modal-overlay');
        this.modalTitle = document.getElementById('modal-title');
        this.modalMessage = document.getElementById('modal-message');
        this.modalBtn = document.getElementById('modal-action-btn');
        this.levelDisplay = document.getElementById('level-display');
        this.scoreDisplay = document.getElementById('score-display');
        this.coinDisplay = document.getElementById('coin-display');
        this.shopBtn = document.getElementById('shop-btn');
        this.startScreen = document.getElementById('start-screen');
        this.btnPlay = document.getElementById('btn-play');
        this.startBestScore = document.getElementById('start-best-score');
        this.startBestLevel = document.getElementById('start-best-level');
        this.startCoins = document.getElementById('start-coins');
        this.bgLayerBase = document.querySelector('.parallax-layer-base');
        this.shopOverlay = document.getElementById('shop-overlay');
        this.shopList = document.getElementById('shop-list');
        this.shopCloseBtn = document.getElementById('shop-close-btn');
        this.shopCoins = document.getElementById('shop-coins');
        this.shopMessage = document.getElementById('shop-message');
        this.toolButtons = Array.from(document.querySelectorAll('.tool-btn'));

        this.selectionMax = 7;
        this.matchSize = 3;
        this.pointsPerMatch = 30;
        this.progressionKey = 'tilechallenge-progression-v1';

        this.shopItems = [
            {
                id: 'undo',
                type: 'utility',
                name: 'Undo Token',
                cost: 25,
                description: 'Rewind your latest unmatched tray move and put the tile back on the board.'
            },
            {
                id: 'shuffle',
                type: 'utility',
                name: 'Shuffle Spark',
                cost: 35,
                description: 'Remix the symbols on all remaining board tiles for a fresh puzzle state.'
            },
            {
                id: 'hint',
                type: 'utility',
                name: 'Hint Lantern',
                cost: 20,
                description: 'Highlight a promising pair of open matching tiles when the board gets messy.'
            }
        ];

        this.cosmeticItems = [
            {
                id: 'tray-royal',
                type: 'cosmetic',
                slot: 'trayTheme',
                value: 'royal',
                name: 'Royal Tray',
                cost: 70,
                description: 'Turns the tray into a deep burgundy cabinet with golden trim.'
            },
            {
                id: 'tray-mint',
                type: 'cosmetic',
                slot: 'trayTheme',
                value: 'mint',
                name: 'Mint Tray',
                cost: 70,
                description: 'A fresh jade tray that makes the board feel lighter and cleaner.'
            },
            {
                id: 'tile-neon',
                type: 'cosmetic',
                slot: 'tileTheme',
                value: 'neon',
                name: 'Neon Tile Frame',
                cost: 85,
                description: 'Bright arcade edges and punchy highlights for every tile.'
            },
            {
                id: 'tile-night',
                type: 'cosmetic',
                slot: 'tileTheme',
                value: 'night',
                name: 'Night Tile Frame',
                cost: 85,
                description: 'A cool midnight frame with calmer contrast and icy trim.'
            },
            {
                id: 'bg-sunset',
                type: 'cosmetic',
                slot: 'bgTheme',
                value: 'sunset',
                name: 'Sunset Glow',
                cost: 95,
                description: 'Warms the whole scene with amber light and a softer parallax mood.'
            },
            {
                id: 'bg-aurora',
                type: 'cosmetic',
                slot: 'bgTheme',
                value: 'aurora',
                name: 'Aurora Mood',
                cost: 95,
                description: 'Adds a cooler fantasy tint to the background layers and HUD glow.'
            }
        ];

        this.masterIconPool = [
            '🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍋', '🍍', '🥥', '🥝',
            '🍔', '🍟', '🍕', '🌭', '🍩', '🍪', '🍫', '🍬', '🍭', '🧁',
            '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
            '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸',
            '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐',
            '⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🔋', '🕹️', '💡'
        ];

        this.backgrounds = ['assets/Backgrounds/BG1.jpg', 'assets/Backgrounds/BG2.jpg', 'assets/Backgrounds/BG3.jpg'];

        this.audioContext = null;
        this.tiles = [];
        this.selectedTiles = [];
        this.moveHistory = [];
        this.level = 1;
        this.score = 0;
        this.runCoins = 0;
        this.outcomeResolved = false;
        this.boardInner = null;

        this.progression = this.loadProgression();

        this.modalBtn.addEventListener('click', () => this.handleModalAction());
        this.btnPlay.addEventListener('click', () => this.startGame());
        this.shopBtn.addEventListener('click', () => this.openShop());
        this.shopCloseBtn.addEventListener('click', () => this.closeShop());
        this.shopOverlay.addEventListener('click', (event) => {
            if (event.target === this.shopOverlay) {
                this.closeShop();
            }
        });

        this.toolButtons.forEach((button) => {
            button.addEventListener('click', () => this.useTool(button.dataset.tool));
        });

        window.addEventListener('resize', () => this.centerBoard());
        window.addEventListener('mousemove', (event) => this.handleParallax(event));
    }

    init() {
        this.boardArea.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
        this.renderProgression();
        this.applyCosmetics();
        this.renderShop();
        this.updateToolButtons();
        this.updateHud();
    }

    loadProgression() {
        try {
            const raw = window.localStorage.getItem(this.progressionKey);
            if (!raw) {
                return {
                    coins: 0,
                    bestScore: 0,
                    bestLevel: 1,
                    inventory: {
                        undo: 1,
                        shuffle: 0,
                        hint: 1
                    },
                    cosmetics: {
                        owned: [],
                        equipped: {
                            trayTheme: 'classic',
                            tileTheme: 'classic',
                            bgTheme: 'classic'
                        }
                    }
                };
            }

            const parsed = JSON.parse(raw);
            return {
                coins: parsed.coins || 0,
                bestScore: parsed.bestScore || 0,
                bestLevel: parsed.bestLevel || 1,
                inventory: {
                    undo: parsed.inventory?.undo || 0,
                    shuffle: parsed.inventory?.shuffle || 0,
                    hint: parsed.inventory?.hint || 0
                },
                cosmetics: {
                    owned: parsed.cosmetics?.owned || [],
                    equipped: {
                        trayTheme: parsed.cosmetics?.equipped?.trayTheme || 'classic',
                        tileTheme: parsed.cosmetics?.equipped?.tileTheme || 'classic',
                        bgTheme: parsed.cosmetics?.equipped?.bgTheme || 'classic'
                    }
                }
            };
        } catch {
            return {
                coins: 0,
                bestScore: 0,
                bestLevel: 1,
                inventory: {
                    undo: 1,
                    shuffle: 0,
                    hint: 1
                },
                cosmetics: {
                    owned: [],
                    equipped: {
                        trayTheme: 'classic',
                        tileTheme: 'classic',
                        bgTheme: 'classic'
                    }
                }
            };
        }
    }

    saveProgression() {
        window.localStorage.setItem(this.progressionKey, JSON.stringify(this.progression));
    }

    renderProgression() {
        this.startBestScore.textContent = this.progression.bestScore;
        this.startBestLevel.textContent = this.progression.bestLevel;
        this.startCoins.textContent = this.progression.coins;
    }

    updateHud() {
        this.levelDisplay.textContent = this.level;
        this.scoreDisplay.textContent = this.score;
        this.coinDisplay.textContent = this.progression.coins;
        this.shopCoins.textContent = this.progression.coins;
    }

    applyCosmetics() {
        document.body.dataset.trayTheme = this.progression.cosmetics.equipped.trayTheme || 'classic';
        document.body.dataset.tileTheme = this.progression.cosmetics.equipped.tileTheme || 'classic';
        document.body.dataset.bgTheme = this.progression.cosmetics.equipped.bgTheme || 'classic';
    }

    startGame() {
        this.startScreen.classList.add('hidden');
        this.boardArea.classList.remove('hidden');
        this.score = 0;
        this.level = 1;
        this.runCoins = 0;
        this.updateHud();
        this.startLevel();
    }

    startLevel() {
        this.boardArea.innerHTML = '';
        this.boardInner = document.createElement('div');
        this.boardInner.className = 'board-inner';
        this.boardInner.style.position = 'absolute';
        this.boardInner.style.top = '0';
        this.boardInner.style.left = '0';
        this.boardInner.style.width = '100%';
        this.boardInner.style.height = '100%';
        this.boardInner.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        this.boardInner.style.transformOrigin = 'top left';
        this.boardArea.appendChild(this.boardInner);

        this.tiles = [];
        this.selectedTiles = [];
        this.moveHistory = [];
        this.outcomeResolved = false;
        this.hideModal();
        this.closeShop();
        this.applyCosmetics();
        this.updateBackground();
        this.clearSelectionBar();

        this.generateLevelData();
        this.calculateBlockages();
        this.tiles.forEach((tile) => tile.createDOM(this.boardInner, (currentTile) => this.handleTileClick(currentTile)));
        this.centerBoard();
        this.updateHud();
        this.updateToolButtons();
    }

    clearSelectionBar() {
        const tiles = this.selectionBar.querySelectorAll('.tile');
        tiles.forEach((tile) => tile.remove());
    }

    addScore(points) {
        this.score += points;
        if (this.score > this.progression.bestScore) {
            this.progression.bestScore = this.score;
            this.saveProgression();
            this.renderProgression();
        }
        this.updateHud();
    }

    awardCoins(amount, reason) {
        if (amount <= 0) return;
        this.progression.coins += amount;
        this.runCoins += amount;
        this.saveProgression();
        this.updateHud();
        this.renderProgression();
        this.setShopMessage(`+${amount} coins from ${reason}.`);
    }

    setShopMessage(message) {
        this.shopMessage.textContent = message;
    }

    updateProgressMilestones() {
        if (this.level > this.progression.bestLevel) {
            this.progression.bestLevel = this.level;
            this.saveProgression();
            this.renderProgression();
        }
    }

    shuffleArray(items) {
        const copy = [...items];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    generateProceduralLayout(totalTiles) {
        const slots = [];
        let tilesPlaced = 0;

        const shapes = [
            [
                { dx: -0.5, dy: -0.5, dz: 0 }, { dx: 0.5, dy: -0.5, dz: 0 },
                { dx: -0.5, dy: 0.5, dz: 0 }, { dx: 0.5, dy: 0.5, dz: 0 },
                { dx: 0, dy: 0, dz: 1 }
            ],
            [
                { dx: -1, dy: -0.5, dz: 0 }, { dx: 0, dy: -0.5, dz: 0 }, { dx: 1, dy: -0.5, dz: 0 },
                { dx: -0.5, dy: 0, dz: 1 }, { dx: 0.5, dy: 0, dz: 1 },
                { dx: 0, dy: 0.5, dz: 2 }
            ],
            [
                { dx: -1, dy: -1, dz: 0 }, { dx: 0, dy: -1, dz: 0 }, { dx: 1, dy: -1, dz: 0 },
                { dx: -1, dy: 0, dz: 0 }, { dx: 0, dy: 0, dz: 0 }, { dx: 1, dy: 0, dz: 0 },
                { dx: -1, dy: 1, dz: 0 }, { dx: 0, dy: 1, dz: 0 }, { dx: 1, dy: 1, dz: 0 },
                { dx: -0.5, dy: -0.5, dz: 1 }, { dx: 0.5, dy: -0.5, dz: 1 },
                { dx: -0.5, dy: 0.5, dz: 1 }, { dx: 0.5, dy: 0.5, dz: 1 },
                { dx: 0, dy: 0, dz: 2 }
            ],
            [
                { dx: -2, dy: -0.5, dz: 0 }, { dx: -1, dy: -0.5, dz: 0 }, { dx: 1, dy: -0.5, dz: 0 }, { dx: 2, dy: -0.5, dz: 0 },
                { dx: -2, dy: 0.5, dz: 0 }, { dx: -1, dy: 0.5, dz: 0 }, { dx: 1, dy: 0.5, dz: 0 }, { dx: 2, dy: 0.5, dz: 0 },
                { dx: -1.5, dy: 0, dz: 1 }, { dx: 1.5, dy: 0, dz: 1 }
            ],
            [
                { dx: -0.5, dy: -0.5, dz: 0 }, { dx: 0.5, dy: -0.5, dz: 0 },
                { dx: -0.5, dy: 0.5, dz: 0 }, { dx: 0.5, dy: 0.5, dz: 0 }
            ],
            [
                { dx: -1, dy: -0.5, dz: 0 }, { dx: 0, dy: -0.5, dz: 0 }, { dx: 1, dy: -0.5, dz: 0 },
                { dx: -1, dy: 0.5, dz: 0 }, { dx: 0, dy: 0.5, dz: 0 }, { dx: 1, dy: 0.5, dz: 0 }
            ],
            [
                { dx: 0, dy: -1, dz: 0 },
                { dx: -1, dy: 0, dz: 0 }, { dx: 0, dy: 0, dz: 0 }, { dx: 1, dy: 0, dz: 0 },
                { dx: 0, dy: 1, dz: 0 }
            ]
        ];

        while (tilesPlaced < totalTiles) {
            const remaining = totalTiles - tilesPlaced;
            const validShapes = shapes.filter((shape) => shape.length <= remaining);
            const shape = validShapes.length > 0
                ? validShapes[Math.floor(Math.random() * validShapes.length)]
                : [{ dx: 0, dy: 0, dz: 0 }];

            const ox = (Math.random() < 0.5 ? 0 : 0.5) * (Math.random() < 0.5 ? 1 : -1);
            const oy = (Math.random() < 0.5 ? 0 : 0.5) * (Math.random() < 0.5 ? 1 : -1);

            let maxZ = -1;
            let overlaps = false;

            for (const part of shape) {
                const px = ox + part.dx;
                const py = oy + part.dy;
                slots.forEach((slot) => {
                    if (px < slot.x + 0.9 && px + 0.9 > slot.x && py < slot.y + 0.9 && py + 0.9 > slot.y) {
                        overlaps = true;
                        maxZ = Math.max(maxZ, slot.z);
                    }
                });
            }

            const baseZ = overlaps ? maxZ + 1 : 0;

            shape.forEach((part) => {
                slots.push({
                    x: ox + part.dx,
                    y: oy + part.dy,
                    z: baseZ + part.dz
                });
            });

            tilesPlaced += shape.length;
        }

        return slots;
    }

    generateLevelData() {
        let idCounter = 0;
        const typesCount = Math.min(this.masterIconPool.length, 3 + Math.floor(this.level / 2));
        const numTriplets = 4 + Math.floor(this.level * 1.5);
        const totalTiles = numTriplets * this.matchSize;
        const currentIcons = this.shuffleArray(this.masterIconPool).slice(0, typesCount);

        const pool = [];
        for (let i = 0; i < numTriplets; i++) {
            const icon = currentIcons[i % currentIcons.length];
            pool.push(icon, icon, icon);
        }

        const shuffledPool = this.shuffleArray(pool);
        const layout = this.generateProceduralLayout(totalTiles);

        this.tiles = layout.map((slot, index) => new Tile(idCounter++, shuffledPool[index], slot.x, slot.y, slot.z));
    }

    isBlocking(lower, upper) {
        if (upper.state !== 'board' || lower.state !== 'board' || upper.z <= lower.z) return false;

        const lowerCenterX = lower.x + 0.5;
        const lowerCenterY = lower.y + 0.5;

        return (
            lowerCenterX >= upper.x &&
            lowerCenterX <= upper.x + 1 &&
            lowerCenterY >= upper.y &&
            lowerCenterY <= upper.y + 1
        );
    }

    calculateBlockages() {
        this.tiles.forEach((tile) => {
            tile.blockedBy = [];
        });

        for (let i = 0; i < this.tiles.length; i++) {
            const lower = this.tiles[i];
            for (let j = 0; j < this.tiles.length; j++) {
                const upper = this.tiles[j];
                if (this.isBlocking(lower, upper)) {
                    lower.blockedBy.push(upper);
                }
            }
        }

        this.tiles.forEach((tile) => tile.updateAppearance());
    }

    updateMetrics() {
        const testSlot = document.querySelector('.slot');
        if (testSlot && testSlot.offsetWidth > 0) {
            this.tileSize = testSlot.offsetWidth;
            this.tileZOffset = this.tileSize / 6;
        } else {
            this.tileSize = 60;
            this.tileZOffset = 10;
        }
    }

    centerBoard() {
        if (this.tiles.length === 0) return;

        this.updateMetrics();
        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;

        this.tiles.forEach((tile) => {
            if (tile.state === 'board') {
                minX = Math.min(minX, tile.x);
                maxX = Math.max(maxX, tile.x);
                minY = Math.min(minY, tile.y);
                maxY = Math.max(maxY, tile.y);
            }
        });

        if (minX === Infinity) return;

        const logicalWidth = ((maxX - minX) + 1) * this.tileSize;
        const logicalHeight = ((maxY - minY) + 1) * this.tileSize;
        const boardWidth = this.boardArea.offsetWidth;
        const boardHeight = this.boardArea.offsetHeight;
        const maxZ = this.tiles.reduce((max, tile) => tile.state === 'board' ? Math.max(max, tile.z) : max, 0);
        const extraVerticalSpace = maxZ * this.tileZOffset;
        const totalHeightNeeded = logicalHeight + extraVerticalSpace;
        const scaleX = (boardWidth - 20) / logicalWidth;
        const scaleY = (boardHeight - 20) / totalHeightNeeded;
        const targetScale = Math.min(1, scaleX, scaleY);

        if (this.boardInner) {
            this.boardInner.style.transform = `scale(${targetScale})`;
        }

        const offsetX = (boardWidth / targetScale - logicalWidth) / 2 - (minX * this.tileSize);
        const offsetY = ((boardHeight / targetScale - totalHeightNeeded) / 2) + extraVerticalSpace - (minY * this.tileSize);

        this.tiles.forEach((tile) => {
            if (tile.state === 'board') {
                const leftPos = (tile.x * this.tileSize) + offsetX;
                const topPos = (tile.y * this.tileSize) + offsetY;
                tile.element.style.left = `${leftPos}px`;
                tile.element.style.top = `${topPos - (tile.z * this.tileZOffset)}px`;
                tile.element.style.zIndex = tile.z;
            }
        });
    }

    handleTileClick(tile) {
        if (this.selectedTiles.length >= this.selectionMax || tile.state !== 'board' || tile.blockedBy.length > 0) return;

        this.moveHistory.push(tile.id);
        tile.state = 'moving';
        this.selectedTiles.push(tile);
        this.playSelectSfx();

        const rect = tile.element.getBoundingClientRect();
        const boardRect = this.boardArea.getBoundingClientRect();

        this.boardArea.appendChild(tile.element);
        tile.element.style.transition = 'none';
        tile.element.style.left = `${rect.left - boardRect.left}px`;
        tile.element.style.top = `${rect.top - boardRect.top}px`;
        void tile.element.offsetHeight;
        tile.element.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease, filter 0.2s ease, top 0.3s ease, left 0.3s ease';

        this.calculateBlockages();
        this.sortSelectionBar();
        this.renderSelectionBar();
        this.centerBoard();
        this.updateToolButtons();

        window.setTimeout(() => this.resolveMatches(), 300);
    }

    sortSelectionBar() {
        this.selectedTiles.sort((a, b) => a.type.localeCompare(b.type));
    }

    renderSelectionBar() {
        const slots = this.selectionBar.querySelectorAll('.slot');
        const boardRect = this.boardArea.getBoundingClientRect();

        this.selectedTiles.forEach((tile, index) => {
            if (index < this.selectionMax) {
                const targetSlotRect = slots[index].getBoundingClientRect();
                tile.element.style.zIndex = 100 + index;
                tile.element.style.left = `${targetSlotRect.left - boardRect.left}px`;
                tile.element.style.top = `${targetSlotRect.top - boardRect.top}px`;
            }
        });
    }

    findMatchIndex() {
        for (let i = 0; i <= this.selectedTiles.length - this.matchSize; i++) {
            if (
                this.selectedTiles[i].type === this.selectedTiles[i + 1].type &&
                this.selectedTiles[i].type === this.selectedTiles[i + 2].type
            ) {
                return i;
            }
        }

        return -1;
    }

    resolveMatches(chain = 0) {
        const matchIndex = this.findMatchIndex();

        if (matchIndex === -1) {
            window.setTimeout(() => this.checkGameState(), 250);
            return;
        }

        const matchedTiles = this.selectedTiles.splice(matchIndex, this.matchSize);
        const comboBonus = chain * 10;
        this.addScore(this.pointsPerMatch + comboBonus);
        this.awardCoins(4 + chain, 'matching tiles');
        this.playMatchSfx();

        matchedTiles.forEach((tile) => {
            tile.state = 'matched';
            tile.element.classList.add('removing');
            this.createParticles(tile.element);
            window.setTimeout(() => tile.element.remove(), 300);
        });

        window.setTimeout(() => {
            this.renderSelectionBar();
            this.updateToolButtons();
            this.resolveMatches(chain + 1);
        }, 180);
    }

    checkGameState() {
        if (this.outcomeResolved) return;

        const tilesOnBoard = this.tiles.filter((tile) => tile.state === 'board').length;

        if (tilesOnBoard === 0 && this.selectedTiles.length === 0) {
            this.outcomeResolved = true;
            this.showWinModal();
        } else if (this.selectedTiles.length >= this.selectionMax) {
            this.outcomeResolved = true;
            this.showLoseModal();
        }
    }

    showWinModal() {
        this.updateProgressMilestones();
        const bonusCoins = 10 + (this.level * 2);
        this.awardCoins(bonusCoins, `clearing level ${this.level}`);
        this.playWinSfx();
        this.modalTitle.textContent = 'Level Clear!';
        this.modalTitle.style.color = '#4CAF50';
        this.modalMessage.textContent = `Score ${this.score} · +${bonusCoins} level coins · Run coins ${this.runCoins}. Ready for the next tower?`;
        this.modalBtn.textContent = 'Next Level';
        this.modalBtn.dataset.action = 'next';
        this.modalOverlay.classList.remove('hidden');
    }

    showLoseModal() {
        const pityCoins = Math.max(3, Math.floor(this.level / 2) + 2);
        this.awardCoins(pityCoins, 'making a deep run');
        this.playLoseSfx();
        this.modalTitle.textContent = 'Game Over';
        this.modalTitle.style.color = '#F44336';
        this.modalMessage.textContent = `Level ${this.level} · Score ${this.score} · +${pityCoins} retry coins. Visit the shop or jump right back in.`;
        this.modalBtn.textContent = 'Try Again';
        this.modalBtn.dataset.action = 'restart';
        this.modalOverlay.classList.remove('hidden');
    }

    hideModal() {
        this.modalOverlay.classList.add('hidden');
    }

    handleModalAction() {
        if (this.modalBtn.dataset.action === 'next') {
            this.level += 1;
            this.startLevel();
        } else {
            this.startGame();
        }
    }

    openShop() {
        this.renderShop();
        this.shopOverlay.classList.remove('hidden');
    }

    closeShop() {
        this.shopOverlay.classList.add('hidden');
    }

    ownsCosmetic(id) {
        return this.progression.cosmetics.owned.includes(id);
    }

    isEquipped(item) {
        return this.progression.cosmetics.equipped[item.slot] === item.value;
    }

    renderShopSection(title, items) {
        const section = document.createElement('section');
        section.className = 'shop-section';

        const heading = document.createElement('h3');
        heading.className = 'shop-section-title';
        heading.textContent = title;
        section.appendChild(heading);

        const grid = document.createElement('div');
        grid.className = 'shop-section-grid';

        items.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'shop-card';

            const titleNode = document.createElement('h4');
            titleNode.textContent = item.name;

            const desc = document.createElement('p');
            desc.textContent = item.description;

            const meta = document.createElement('div');
            meta.className = 'shop-card-meta';

            const button = document.createElement('button');
            button.className = 'shop-buy-btn';

            if (item.type === 'utility') {
                const count = this.progression.inventory[item.id] || 0;
                meta.innerHTML = `<span>${item.cost} coins</span><span>Owned: ${count}</span>`;
                button.textContent = this.progression.coins >= item.cost ? 'Buy' : 'Need More Coins';
                button.disabled = this.progression.coins < item.cost;
                button.addEventListener('click', () => this.buyShopItem(item.id));
            } else {
                const owned = this.ownsCosmetic(item.id);
                const equipped = this.isEquipped(item);
                meta.innerHTML = `<span>${item.cost} coins</span><span>${equipped ? 'Equipped' : owned ? 'Owned' : 'Locked'}</span>`;

                if (equipped) {
                    button.textContent = 'Equipped';
                    button.disabled = true;
                } else if (owned) {
                    button.textContent = 'Equip';
                    button.disabled = false;
                    button.addEventListener('click', () => this.equipCosmetic(item.id));
                } else {
                    button.textContent = this.progression.coins >= item.cost ? 'Buy & Equip' : 'Need More Coins';
                    button.disabled = this.progression.coins < item.cost;
                    button.addEventListener('click', () => this.buyShopItem(item.id));
                }
            }

            card.appendChild(titleNode);
            card.appendChild(desc);
            card.appendChild(meta);
            card.appendChild(button);
            grid.appendChild(card);
        });

        section.appendChild(grid);
        this.shopList.appendChild(section);
    }

    renderShop() {
        this.shopCoins.textContent = this.progression.coins;
        this.shopList.innerHTML = '';

        this.renderShopSection('Utility Stock', this.shopItems);
        this.renderShopSection('Cosmetic Shelf', this.cosmeticItems);
    }

    buyShopItem(itemId) {
        const item = [...this.shopItems, ...this.cosmeticItems].find((entry) => entry.id === itemId);
        if (!item || this.progression.coins < item.cost) return;

        this.progression.coins -= item.cost;
        if (item.type === 'utility') {
            this.progression.inventory[itemId] += 1;
        } else if (!this.ownsCosmetic(itemId)) {
            this.progression.cosmetics.owned.push(itemId);
            this.progression.cosmetics.equipped[item.slot] = item.value;
            this.applyCosmetics();
        }
        this.saveProgression();
        this.updateHud();
        this.renderProgression();
        this.renderShop();
        this.updateToolButtons();
        this.setShopMessage(`Bought ${item.name}.`);
    }

    equipCosmetic(itemId) {
        const item = this.cosmeticItems.find((entry) => entry.id === itemId);
        if (!item || !this.ownsCosmetic(itemId)) return;

        this.progression.cosmetics.equipped[item.slot] = item.value;
        this.applyCosmetics();
        this.saveProgression();
        this.renderShop();
        this.setShopMessage(`Equipped ${item.name}.`);
    }

    updateToolButtons() {
        this.toolButtons.forEach((button) => {
            const tool = button.dataset.tool;
            const count = this.progression.inventory[tool] || 0;
            const countNode = button.querySelector('.tool-count');
            if (countNode) {
                countNode.textContent = count;
            }

            let disabled = count <= 0;
            if (tool === 'undo') {
                disabled = disabled || !this.selectedTiles.some((tile) => tile.state === 'moving');
            }
            if (tool === 'shuffle') {
                disabled = disabled || this.tiles.filter((tile) => tile.state === 'board').length < 2;
            }
            if (tool === 'hint') {
                disabled = disabled || this.findHintPair().length < 2;
            }

            button.disabled = disabled;
        });
    }

    consumeTool(tool) {
        if ((this.progression.inventory[tool] || 0) <= 0) {
            return false;
        }

        this.progression.inventory[tool] -= 1;
        this.saveProgression();
        this.renderShop();
        this.updateToolButtons();
        return true;
    }

    useTool(tool) {
        if (!tool) return;
        if (tool === 'undo') {
            this.useUndo();
        }
        if (tool === 'shuffle') {
            this.useShuffle();
        }
        if (tool === 'hint') {
            this.useHint();
        }
    }

    useUndo() {
        if (!this.consumeTool('undo')) return;

        while (this.moveHistory.length > 0) {
            const tileId = this.moveHistory.pop();
            const tile = this.tiles.find((entry) => entry.id === tileId);
            if (!tile || tile.state !== 'moving') {
                continue;
            }

            const index = this.selectedTiles.indexOf(tile);
            if (index > -1) {
                this.selectedTiles.splice(index, 1);
            }

            tile.state = 'board';
            tile.element.classList.remove('removing');
            this.boardInner.appendChild(tile.element);
            this.calculateBlockages();
            this.renderSelectionBar();
            this.centerBoard();
            this.updateToolButtons();
            this.setShopMessage('Undo used. One tray move has been rewound.');
            return;
        }

        this.progression.inventory.undo += 1;
        this.saveProgression();
        this.updateToolButtons();
    }

    useShuffle() {
        const boardTiles = this.tiles.filter((tile) => tile.state === 'board');
        if (boardTiles.length < 2 || !this.consumeTool('shuffle')) return;

        const shuffledTypes = this.shuffleArray(boardTiles.map((tile) => tile.type));
        boardTiles.forEach((tile, index) => {
            tile.type = shuffledTypes[index];
            tile.element.textContent = tile.type;
            tile.element.classList.add('tile-shuffle');
            window.setTimeout(() => tile.element.classList.remove('tile-shuffle'), 450);
        });

        this.setShopMessage('Shuffle Spark used. The board has been remixed.');
        this.updateToolButtons();
    }

    findHintPair() {
        const openTiles = this.tiles.filter((tile) => tile.state === 'board' && tile.blockedBy.length === 0);
        const groups = new Map();

        openTiles.forEach((tile) => {
            if (!groups.has(tile.type)) {
                groups.set(tile.type, []);
            }
            groups.get(tile.type).push(tile);
        });

        for (const tiles of groups.values()) {
            if (tiles.length >= 2) {
                return tiles.slice(0, 2);
            }
        }

        return [];
    }

    useHint() {
        const pair = this.findHintPair();
        if (pair.length < 2 || !this.consumeTool('hint')) return;

        pair.forEach((tile) => {
            tile.element.classList.add('hint-glow');
            window.setTimeout(() => tile.element.classList.remove('hint-glow'), 1400);
        });

        this.setShopMessage('Hint Lantern used. A promising open pair is glowing now.');
        this.updateToolButtons();
    }

    updateBackground() {
        if (!this.bgLayerBase) return;
        const bgIndex = Math.floor((this.level - 1) / 5) % this.backgrounds.length;
        const targetBg = this.backgrounds[bgIndex];
        if (this.bgLayerBase.style.backgroundImage !== `url("${targetBg}")`) {
            this.bgLayerBase.style.backgroundImage = `url("${targetBg}")`;
        }
    }

    handleParallax(event) {
        if (!this.bgLayerBase) return;
        const xPos = (event.clientX / window.innerWidth - 0.5) * 40;
        const yPos = (event.clientY / window.innerHeight - 0.5) * 40;
        this.bgLayerBase.style.transform = `translate(${xPos}px, ${yPos}px) scale(1.05)`;
    }

    createParticles(targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };

        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const angle = Math.random() * Math.PI * 2;
            const velocity = 20 + Math.random() * 30;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            const colors = ['#FF7A59', '#FFFFFF', '#D3AD81', '#A8704A'];

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.left = `${center.x}px`;
            particle.style.top = `${center.y}px`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            document.body.appendChild(particle);
            window.setTimeout(() => particle.remove(), 600);
        }
    }

    getAudioContext() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return null;
        if (!this.audioContext) {
            this.audioContext = new AudioContext();
        }
        return this.audioContext;
    }

    playMatchSfx() {
        try {
            const ctx = this.getAudioContext();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch {
        }
    }

    playSelectSfx() {
        try {
            const ctx = this.getAudioContext();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        } catch {
        }
    }

    playWinSfx() {
        try {
            const ctx = this.getAudioContext();
            if (!ctx) return;
            const freqs = [523.25, 659.25, 783.99, 1046.5];
            const startTime = ctx.currentTime;

            freqs.forEach((freq, index) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'square';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.02, startTime + index * 0.1);
                gain.gain.setTargetAtTime(0, startTime + index * 0.1 + 0.05, 0.02);
                osc.start(startTime + index * 0.1);
                osc.stop(startTime + index * 0.1 + 0.2);
            });
        } catch {
        }
    }

    playLoseSfx() {
        try {
            const ctx = this.getAudioContext();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            osc.start();
            osc.stop(ctx.currentTime + 0.5);
        } catch {
        }
    }
}
