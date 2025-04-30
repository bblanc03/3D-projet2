let backgroundMusic;

function initAudio() {
    backgroundMusic = new Audio('../audios/background.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.1; 
}

function playBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.play()
            .catch(e => console.log("Audio playback failed:", e));
    }
}

function pauseBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
    }
}

function setMusicVolume(volume) {
    if (backgroundMusic) {
        backgroundMusic.volume = Math.max(0, Math.min(1, volume));
    }
}