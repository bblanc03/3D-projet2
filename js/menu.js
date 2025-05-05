let isGameStarted = false;

function initializeMenu() {
    // Get menu elements
    const mainMenu = document.getElementById('mainMenu');
    
    // Initialize and play menu music
    initMenuMusic();
    playMenuMusic();

    // Get buttons
    const startGameBtn = document.getElementById('startGame');

    // Add event listeners
    startGameBtn.addEventListener('click', async () => {
        stopMenuMusic(); // Stop menu music when game starts
        startGame();
        isGameStarted = true;
        resetOrNextLevel(false); 
    });
}

function startGame() {
    // Hide menu
    document.getElementById('mainMenu').style.display = 'none';
    // Show canvas
    document.getElementById('monCanvas').classList.add('active');
    // Show game UI
    document.getElementById('canvasContainer').classList.remove('hidden');
    // Start the game
    demarrer();
}

// Call this when the page loads
window.addEventListener('load', initializeMenu);