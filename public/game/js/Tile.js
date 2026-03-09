const ICONS = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍋', '🍍'];
const TILE_SIZE = 60;
const TILE_OFFSET_STEP = 10; // For small offsets to show layering
const SELECTION_MAX = 7;

export class Tile {
    constructor(id, type, x, y, z) {
        this.id = id;
        this.type = type;
        this.x = x;
        this.y = y;
        this.z = z;
        this.element = null;
        this.blockedBy = []; // Array of Tile objects taking up space above this one
        this.state = 'board'; // 'board', 'moving', 'selected', 'matched'
    }

    createDOM(boardArea, onClickCallback) {
        this.element = document.createElement('div');
        this.element.className = 'tile';
        this.element.dataset.id = this.id;
        this.element.textContent = this.type;
        
        // Calculate screen positions
        // Base coordinate grid (e.g., 0-100 logic, but mapped to px)
        const leftPos = this.x * TILE_SIZE;
        const topPos = this.y * TILE_SIZE;
        
        // Add a slight perspective shift based on z-index so stacking is obvious
        this.element.style.left = `${leftPos - (this.z * TILE_OFFSET_STEP)}px`;
        this.element.style.top = `${topPos - (this.z * TILE_OFFSET_STEP)}px`;
        this.element.style.zIndex = this.z;

        this.element.addEventListener('click', () => {
            if (this.state === 'board' && this.blockedBy.length === 0) {
                onClickCallback(this);
            }
        });

        boardArea.appendChild(this.element);
        this.updateAppearance();
    }

    updateAppearance() {
        if (!this.element) return;
        
        if (this.blockedBy.length > 0) {
            this.element.classList.add('blocked');
        } else {
            this.element.classList.remove('blocked');
        }
    }
}
