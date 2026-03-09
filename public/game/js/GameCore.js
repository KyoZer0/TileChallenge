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
        
        // Parallax references
        this.bgLayerBase = document.querySelector('.parallax-layer-base');
        
        this.startScreen = document.getElementById('start-screen');
        this.btnPlay = document.getElementById('btn-play');
        
        this.tiles = [];        
        this.selectedTiles = [];
        
        this.level = 1;
        this.score = 0;
        
        // Expanded Icon Pool for massive variety and rarity
        this.masterIconPool = [
            '🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍋', '🍍', '🥥', '🥝',
            '🍔', '🍟', '🍕', '🌭', '🍩', '🍪', '🍫', '🍬', '🍭', '🧁',
            '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
            '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸',
            '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐',
            '⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🔋', '🕹️', '💡'
        ];
        
        this.modalBtn.addEventListener('click', () => this.handleModalAction());
        this.btnPlay.addEventListener('click', () => this.startGame());
        
        window.addEventListener('resize', () => this.centerBoard());
        window.addEventListener('mousemove', (e) => this.handleParallax(e));
        
        this.backgrounds = ['assets/Backgrounds/BG1.jpg', 'assets/Backgrounds/BG2.jpg', 'assets/Backgrounds/BG3.jpg'];
    }

    init() {
        // Show start screen initially
        this.boardArea.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
    }

    startGame() {
        this.startScreen.classList.add('hidden');
        this.boardArea.classList.remove('hidden');
        this.score = 0;
        this.level = 1;
        this.updateScore(0);
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
        this.hideModal();
        this.levelDisplay.textContent = this.level;
        
        this.updateBackground();
        
        const slots = this.selectionBar.querySelectorAll('.tile');
        slots.forEach(t => t.remove());

        this.generateLevelData();
        this.calculateBlockages();
        
        this.tiles.forEach(tile => tile.createDOM(this.boardInner, (t) => this.handleTileClick(t)));
        this.centerBoard();
    }

    updateScore(points) {
        this.score += points;
        this.scoreDisplay.textContent = this.score;
    }

    generateProceduralLayout(totalTiles) {
        let slots = [];
        let tilesPlaced = 0;
        
        const shapes = [
            // Center lock (5 tiles)
            [
                {dx: -0.5, dy: -0.5, dz: 0}, {dx: 0.5, dy: -0.5, dz: 0}, 
                {dx: -0.5, dy: 0.5, dz: 0}, {dx: 0.5, dy: 0.5, dz: 0}, 
                {dx: 0, dy: 0, dz: 1}
            ],
            // Staircase (6 tiles)
            [
                {dx: -1, dy: -0.5, dz: 0}, {dx: 0, dy: -0.5, dz: 0}, {dx: 1, dy: -0.5, dz: 0},
                {dx: -0.5, dy: 0, dz: 1}, {dx: 0.5, dy: 0, dz: 1},
                {dx: 0, dy: 0.5, dz: 2}
            ],
            // Pyramid (14 tiles)
            [
                {dx: -1, dy: -1, dz: 0}, {dx: 0, dy: -1, dz: 0}, {dx: 1, dy: -1, dz: 0},
                {dx: -1, dy: 0, dz: 0}, {dx: 0, dy: 0, dz: 0}, {dx: 1, dy: 0, dz: 0},
                {dx: -1, dy: 1, dz: 0}, {dx: 0, dy: 1, dz: 0}, {dx: 1, dy: 1, dz: 0},
                {dx: -0.5, dy: -0.5, dz: 1}, {dx: 0.5, dy: -0.5, dz: 1},
                {dx: -0.5, dy: 0.5, dz: 1}, {dx: 0.5, dy: 0.5, dz: 1},
                {dx: 0, dy: 0, dz: 2}
            ],
            // Twin Peak (10 tiles)
            [
                {dx: -2, dy: -0.5, dz: 0}, {dx: -1, dy: -0.5, dz: 0}, {dx: 1, dy: -0.5, dz: 0}, {dx: 2, dy: -0.5, dz: 0},
                {dx: -2, dy: 0.5, dz: 0}, {dx: -1, dy: 0.5, dz: 0}, {dx: 1, dy: 0.5, dz: 0}, {dx: 2, dy: 0.5, dz: 0},
                {dx: -1.5, dy: 0, dz: 1}, {dx: 1.5, dy: 0, dz: 1}
            ],
            // Flat block (4 tiles)
            [
                {dx: -0.5, dy: -0.5, dz: 0}, {dx: 0.5, dy: -0.5, dz: 0},
                {dx: -0.5, dy: 0.5, dz: 0}, {dx: 0.5, dy: 0.5, dz: 0}
            ],
            // Rectangle (6 tiles)
            [
                {dx: -1, dy: -0.5, dz: 0}, {dx: 0, dy: -0.5, dz: 0}, {dx: 1, dy: -0.5, dz: 0},
                {dx: -1, dy: 0.5, dz: 0}, {dx: 0, dy: 0.5, dz: 0}, {dx: 1, dy: 0.5, dz: 0}
            ],
            // Cross (5 tiles)
            [
                              {dx: 0, dy: -1, dz: 0},
                {dx: -1, dy: 0, dz: 0}, {dx: 0, dy: 0, dz: 0}, {dx: 1, dy: 0, dz: 0},
                              {dx: 0, dy: 1, dz: 0}
            ]
        ];
        
        while (tilesPlaced < totalTiles) {
            let remaining = totalTiles - tilesPlaced;
            let validShapes = shapes.filter(s => s.length <= remaining);
            let shape;
            if (validShapes.length > 0) {
                shape = validShapes[Math.floor(Math.random() * validShapes.length)];
            } else {
                shape = [{dx: 0, dy: 0, dz: 0}];
            }
            
            // Introduce slight offsets to stack into a tall central tower organically
            let ox = (Math.random() < 0.5 ? 0 : 0.5) * (Math.random() < 0.5 ? 1 : -1);
            let oy = (Math.random() < 0.5 ? 0 : 0.5) * (Math.random() < 0.5 ? 1 : -1);
            
            let maxZ = -1;
            let overlaps = false;
            
            for (let part of shape) {
                let px = ox + part.dx;
                let py = oy + part.dy;
                slots.forEach(s => {
                    // Check bounding overlap slightly smaller than 1x1 to allow adjacent
                    if (px < s.x + 0.9 && px + 0.9 > s.x && py < s.y + 0.9 && py + 0.9 > s.y) {
                        overlaps = true;
                        maxZ = Math.max(maxZ, s.z);
                    }
                });
            }
            
            let baseZ = overlaps ? maxZ + 1 : 0;
            
            shape.forEach(part => {
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
        
        // Scaling difficulty
        // Let's use 3 base types and grow
        const typesCount = Math.min(this.masterIconPool.length, 3 + Math.floor(this.level / 2));
        const numTriplets = 4 + Math.floor(this.level * 1.5); 
        const totalTiles = numTriplets * 3;
        
        // Pick exactly `typesCount` unique icons for this level
        const currentIcons = [...this.masterIconPool].sort(() => 0.5 - Math.random()).slice(0, typesCount);

        let pool = [];
        for (let i = 0; i < numTriplets; i++) {
            // Keep distributing triplets among available types evenly-ish
            const icon = currentIcons[i % currentIcons.length];
            pool.push(icon, icon, icon);
        }
        
        pool.sort(() => Math.random() - 0.5);

        let layout = this.generateProceduralLayout(totalTiles);

        this.tiles = layout.map((slot, i) => {
            return new Tile(idCounter++, pool[i], slot.x, slot.y, slot.z);
        });
    }

    // ... (keep the rest of the file exactly the same from calculateBlockages onwards, except win/loss updates)

    isBlocking(lower, upper) {
        if (upper.z <= lower.z) return false;

        const lowerCenterX = lower.x + 0.5;
        const lowerCenterY = lower.y + 0.5;

        // The upper tile blocks the lower tile if the lower tile's center 
        // is covered by the upper tile's footprint.
        return (
            lowerCenterX >= upper.x &&
            lowerCenterX <= upper.x + 1 &&
            lowerCenterY >= upper.y &&
            lowerCenterY <= upper.y + 1
        );
    }

    calculateBlockages() {
        this.tiles.forEach(t => t.blockedBy = []);

        for (let i = 0; i < this.tiles.length; i++) {
            const lower = this.tiles[i];
            for (let j = 0; j < this.tiles.length; j++) {
                const upper = this.tiles[j];
                if (this.isBlocking(lower, upper)) {
                    lower.blockedBy.push(upper);
                }
            }
        }
        
        this.tiles.forEach(t => t.updateAppearance());
    }

    updateMetrics() {
        const testSlot = document.querySelector('.slot');
        if (testSlot && testSlot.offsetWidth > 0) {
            this.tileSize = testSlot.offsetWidth;
            this.tileZOffset = this.tileSize / 6; // Proportional Z-shift (e.g. 10px for 60px tile)
        } else {
            this.tileSize = 60;
            this.tileZOffset = 10;
        }
    }

    centerBoard() {
        if (this.tiles.length === 0) return;
        
        this.updateMetrics();
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;

        this.tiles.forEach(t => {
            if (t.state === 'board') {
                minX = Math.min(minX, t.x);
                maxX = Math.max(maxX, t.x);
                minY = Math.min(minY, t.y);
                maxY = Math.max(maxY, t.y);
            }
        });

        if (minX === Infinity) return;

        const logicalWidth = ((maxX - minX) + 1) * this.tileSize;
        const logicalHeight = ((maxY - minY) + 1) * this.tileSize;
        
        const boardWidth = this.boardArea.offsetWidth;
        const boardHeight = this.boardArea.offsetHeight;
        
        // Calculate max scale based on how deep the layers go to keep them from clipping out.
        const maxZ = this.tiles.reduce((max, t) => t.state === 'board' ? Math.max(max, t.z) : max, 0);
        const extraVerticalSpace = maxZ * this.tileZOffset;
        
        const totalHeightNeeded = logicalHeight + extraVerticalSpace;
        
        const scaleX = (boardWidth - 20) / logicalWidth; // 20px padding minimum
        const scaleY = (boardHeight - 20) / totalHeightNeeded;
        
        // Default scale is 1, but we zoom out if bounds exceed the container area
        let targetScale = Math.min(1, scaleX, scaleY);
        
        if (this.boardInner) {
            this.boardInner.style.transform = `scale(${targetScale})`;
        }
        
        // Since we scale the container, offsets need not to be scaled manually.
        const offsetX = (boardWidth / targetScale - logicalWidth) / 2 - (minX * this.tileSize);
        const offsetY = ((boardHeight / targetScale - totalHeightNeeded) / 2) + extraVerticalSpace - (minY * this.tileSize);

        this.tiles.forEach(t => {
            if (t.state === 'board') {
                const leftPos = (t.x * this.tileSize) + offsetX;
                const topPos = (t.y * this.tileSize) + offsetY;
                
                // Stack offset to account for the physical bottom edge in our CSS
                t.element.style.left = `${leftPos}px`;
                t.element.style.top = `${topPos - (t.z * this.tileZOffset)}px`;
            }
        });
    }

    handleTileClick(tile) {
        if (this.selectedTiles.length >= 7 || tile.state !== 'board') return;

        tile.state = 'moving';
        this.selectedTiles.push(tile);
        this.playSelectSfx();
        
        const rect = tile.element.getBoundingClientRect();
        const boardRect = this.boardArea.getBoundingClientRect();

        this.boardArea.appendChild(tile.element);
        
        tile.element.style.transition = 'none';
        tile.element.style.left = `${rect.left - boardRect.left}px`;
        tile.element.style.top = `${rect.top - boardRect.top}px`;
        tile.element.offsetHeight; // force reflow
        tile.element.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease, filter 0.2s ease, top 0.3s ease, left 0.3s ease';

        this.tiles.forEach(t => {
            const index = t.blockedBy.indexOf(tile);
            if (index > -1) {
                t.blockedBy.splice(index, 1);
                t.updateAppearance();
            }
        });

        this.sortSelectionBar();
        this.renderSelectionBar();
        this.centerBoard(); // Recalculate zoom bounding box
        
        setTimeout(() => this.checkForMatch(), 300);
    }

    sortSelectionBar() {
        this.selectedTiles.sort((a, b) => a.type.localeCompare(b.type));
    }

    renderSelectionBar() {
        const slots = this.selectionBar.querySelectorAll('.slot');
        const boardRect = this.boardArea.getBoundingClientRect();
        
        this.selectedTiles.forEach((t, i) => {
            if (i < 7) {
                const targetSlotRect = slots[i].getBoundingClientRect();
                const finalLeft = targetSlotRect.left - boardRect.left;
                const finalTop = targetSlotRect.top - boardRect.top;

                t.element.style.zIndex = 100 + i;
                t.element.style.left = `${finalLeft}px`;
                t.element.style.top = `${finalTop}px`;
            }
        });
    }

    checkForMatch() {
        let matchIndex = -1;
        
        for (let i = 0; i <= this.selectedTiles.length - 3; i++) {
            if (this.selectedTiles[i].type === this.selectedTiles[i+1].type && 
                this.selectedTiles[i].type === this.selectedTiles[i+2].type) {
                matchIndex = i;
                break;
            }
        }

        if (matchIndex !== -1) {
            const matchedTiles = this.selectedTiles.splice(matchIndex, 3);
            this.updateScore(30); // 30 points per match
            
            this.playMatchSfx();
            
            matchedTiles.forEach(t => {
                t.state = 'matched';
                t.element.classList.add('removing');
                // Create particles
                this.createParticles(t.element);
                setTimeout(() => t.element.remove(), 300);
            });

            setTimeout(() => {
                this.renderSelectionBar();
            }, 150);
        }

        setTimeout(() => this.checkGameState(), 400);
    }

    checkGameState() {
        const tilesOnBoard = this.tiles.filter(t => t.state === 'board').length;
        
        if (tilesOnBoard === 0 && this.selectedTiles.length === 0) {
            this.showWinModal();
        } else if (this.selectedTiles.length === 7) {
            this.showLoseModal();
        }
    }

    showWinModal() {
        this.playWinSfx();
        this.modalTitle.textContent = "Level Clear!";
        this.modalTitle.style.color = "#4CAF50";
        this.modalMessage.textContent = `You scored ${this.score} points! Ready for the next challenge?`;
        this.modalBtn.textContent = "Next Level";
        this.modalBtn.dataset.action = "next";
        this.modalOverlay.classList.remove('hidden');
    }

    showLoseModal() {
        this.playLoseSfx();
        this.modalTitle.textContent = "Game Over";
        this.modalTitle.style.color = "#F44336";
        this.modalMessage.textContent = `Your board filled up! Final Score: ${this.score}`;
        this.modalBtn.textContent = "Try Again";
        this.modalBtn.dataset.action = "restart";
        this.modalOverlay.classList.remove('hidden');
    }

    hideModal() {
        this.modalOverlay.classList.add('hidden');
    }

    handleModalAction() {
        if (this.modalBtn.dataset.action === "next") {
            this.level++;
            this.startLevel();
        } else {
            // Restart game entirely
            this.startGame();
        }
    }
    
    updateBackground() {
        // Every 5 levels, the background updates (1-5 = index 0, 6-10 = index 1 ...)
        if (!this.bgLayerBase) return;
        
        let bgIndex = Math.floor((this.level - 1) / 5) % this.backgrounds.length;
        const targetBg = this.backgrounds[bgIndex];
        
        // Only set if different to avoid triggering CSS flicker
        if (this.bgLayerBase.style.backgroundImage !== `url("${targetBg}")`) {
            this.bgLayerBase.style.backgroundImage = `url("${targetBg}")`;
        }
    }
    
    handleParallax(e) {
        if (!this.bgLayerBase) return;
        
        // Increased the parallax movement to 40px for a more pronounced effect
        const xPos = (e.clientX / window.innerWidth - 0.5) * 40; 
        const yPos = (e.clientY / window.innerHeight - 0.5) * 40;
        
        // Include scale(1.05) to preserve edge overlap
        this.bgLayerBase.style.transform = `translate(${xPos}px, ${yPos}px) scale(1.05)`;
    }
    
    // VFX & SFX Support Methods
    createParticles(targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };

        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            // Random properties for explosion direction
            const angle = Math.random() * Math.PI * 2;
            const velocity = 20 + Math.random() * 30; // 20 to 50px speed 
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.left = `${center.x}px`;
            particle.style.top = `${center.y}px`;
            
            // Random colors based on main tile color palette
            const colors = ['#FF7A59', '#FFFFFF', '#D3AD81', '#A8704A'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 600);
        }
    }
    
    playMatchSfx() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if(!AudioContext) return;
            const ctx = new AudioContext();
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
        } catch (e) {
            console.log('Audio disabled or unsupported.', e);
        }
    }

    playSelectSfx() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if(!AudioContext) return;
            const ctx = new AudioContext();
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
        } catch (e) { }
    }

    playWinSfx() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if(!AudioContext) return;
            const ctx = new AudioContext();
            
            const freqs = [523.25, 659.25, 783.99, 1046.50]; // C E G C
            let startTime = ctx.currentTime;
            
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
        } catch (e) { }
    }

    playLoseSfx() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if(!AudioContext) return;
            const ctx = new AudioContext();
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
        } catch (e) { }
    }
}
