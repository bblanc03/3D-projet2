let isGameOver = false;
let gameOverMusic;

function playGameOverMusic() {
    gameOverMusic = new Audio('game-over.mp3');
    gameOverMusic.play();
}

function showGameOver() {
    
    isGameOver = true;
    
    // Play game over music
    playGameOverMusic();
    
    // Create game over container
    const gameOverScreen = document.createElement('div');
    gameOverScreen.id = 'gameOverScreen';
    gameOverScreen.innerHTML = `
        <div class="game-over-content">
            <h1>GAME OVER</h1>
            <p>Score Final: ${getPoints()}</p>
            <p class="blink">Appuyez sur ESPACE pour retourner au menu principal</p>
        </div>
    `;
    document.body.appendChild(gameOverScreen);

    // Add event listener for space key
    document.addEventListener('keydown', handleGameOverKeypress);
}

function handleGameOverKeypress(event) {
    if (isGameOver && event.code === 'Space') {
        // Stop game over music if it's still playing
        if (gameOverMusic) {
            gameOverMusic.pause();
            gameOverMusic.currentTime = 0;
        }
        
        // Remove game over screen
        const gameOverScreen = document.getElementById('gameOverScreen');
        if (gameOverScreen) {
            gameOverScreen.remove();
        }
        
        // Remove event listener
        document.removeEventListener('keydown', handleGameOverKeypress);
        
        // Reset game state
        isGameOver = false;
        location.reload();
    }
}