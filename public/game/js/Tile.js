const TILE_SIZE = 60;
const TILE_OFFSET_STEP = 10;

export class Tile {
    constructor(id, type, x, y, z) {
        this.id = id;
        this.type = type;
        this.x = x;
        this.y = y;
        this.z = z;
        this.element = null;
        this.blockedBy = [];
        this.state = 'board';
    }

    createDOM(boardArea, onClickCallback) {
        this.element = document.createElement('div');
        this.element.className = 'tile';
        this.element.dataset.id = this.id;
        this.element.textContent = this.type;

        const leftPos = this.x * TILE_SIZE;
        const topPos = this.y * TILE_SIZE;

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
