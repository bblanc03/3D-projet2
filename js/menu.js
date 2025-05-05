let isGameStarted = false;

function initializeMenu() {
    // Get menu elements
    const mainMenu = document.getElementById('mainMenu');
    const canvas = document.querySelector('canvas');

    // Hide canvas initially
    canvas.style.display = 'none';

    // Get buttons
    const startGameBtn = document.getElementById('startGame');

    // Add event listeners
    startGameBtn.addEventListener('click', async () => {
        mainMenu.style.display = 'none'; 
        mainMenu.classList.add('hidden'); 
        canvas.style.display = 'block';
        await demarrer(); 
        isGameStarted = true;
        resetOrNextLevel(false); 
    });
}

// Call this when the page loads
window.addEventListener('load', initializeMenu);