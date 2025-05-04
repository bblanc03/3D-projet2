let isGameOver = false;
let gameOverMusic;

function showGameOver() {
    isGameOver = true;
    
    // Stop all other audio
    pauseBackgroundMusic();  // Stop background music
    pauseNewRoundMusic(); 
    stopWalking();          // Stop footsteps
    if (mysteryBoxMusic) {  // Stop mystery box music
        mysteryBoxMusic.pause();
        mysteryBoxMusic.currentTime = 0;
    }
    if (portalSound) {      // Stop portal sound
        portalSound.pause();
        portalSound.currentTime = 0;
    }
    
    // Initialize and play game over music
    gameOverMusic = new Audio('./audios/gameover.mp3');
    gameOverMusic.volume = 0.8;
    gameOverMusic.play()
        .catch(e => console.log("Game over audio playback failed:", e));
    
    // Create game over container
    const gameOverScreen = document.createElement('div');
    gameOverScreen.id = 'gameOverScreen';
    gameOverScreen.innerHTML = `
        <div class="game-over-content">
            <h1>GAME OVER</h1>
            <p>Score Final: ${getPoints()}</p>
            <p class="blink">Appuyez sur ESPACE pour recommencer</p>
        </div>
    `;
    document.body.appendChild(gameOverScreen);

    // Add event listener for space key
    document.addEventListener('keydown', handleGameOverKeypress);
}

function handleGameOverKeypress(event) {
    if (isGameOver && event.code === 'Space') {
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