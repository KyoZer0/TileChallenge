// Inherit version from script source or generate a new one
const version = new URL(import.meta.url).searchParams.get('v') || new Date().getTime();

// Dynamically import GameCore to cascade cache busting
const { GameCore } = await import(`./GameCore.js?v=${version}`);

const initGame = () => {
    const game = new GameCore();
    game.init();
};

// Handle case where we await import and DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
