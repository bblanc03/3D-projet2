let mysteryBoxMusic;
let newRoundMusic;
let backgroundMusic;
let footstepSound;
let isWalking = false;
let footstepTimeout;
let footstepPlaying = false;

function initAudio() {
    mysteryBoxMusic = new Audio('./audios/mysterybox.mp3');
    mysteryBoxMusic.loop = false;
    mysteryBoxMusic.volume = 0.8;

    newRoundMusic = new Audio('./audios/newround.mp3');
    newRoundMusic.loop = false;
    newRoundMusic.volume = 0.8;

    backgroundMusic = new Audio('./audios/background.mp3');
    backgroundMusic.loop = true;  
    backgroundMusic.volume = 0.3; 

    footstepSound = new Audio('./audios/footsteps.mp3');
    footstepSound.loop = false;
    footstepSound.volume = 0.7;
}

function playMysteryBoxMusic() {
    if (mysteryBoxMusic) {
        mysteryBoxMusic.currentTime = 0;
        mysteryBoxMusic.play()
            .catch(e => console.log("Mystery box audio playback failed:", e));
    }
}

function playNewRoundMusic() {
    if (newRoundMusic) {
        // Lower background music volume during new round music
        setBackgroundVolume(0.1);
        newRoundMusic.currentTime = 0;
        newRoundMusic.play()
            .catch(e => console.log("New round audio playback failed:", e));

        newRoundMusic.onended = () => {
            // Restore background volume after new round music
            setBackgroundVolume(0.3);
        };
    }
}

function pauseMysteryBoxMusic() {
    if (mysteryBoxMusic) {
        mysteryBoxMusic.pause();
    }
}

function playBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.play()
            .catch(e => console.log("Background music playback failed:", e));
    }
}

function pauseBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
    }
}

function setBackgroundVolume(volume) {
    if (backgroundMusic) {
        backgroundMusic.volume = Math.max(0, Math.min(1, volume));
    }
}

function playFootstep() {
    if (footstepSound && !footstepPlaying) {
        footstepPlaying = true;
        footstepSound.play()
            .catch(e => console.log("Footstep audio playback failed:", e));
        
        footstepSound.onended = () => {
            footstepPlaying = false;
            if (isWalking) {
                playFootsteps();
            }
        };
    }
}

function startWalking() {
    if (!isWalking) {
        isWalking = true;
        playFootsteps();
    }
}

function stopWalking() {
    isWalking = false;
    footstepPlaying = false;
    if (footstepTimeout) {
        clearTimeout(footstepTimeout);
        footstepTimeout = null;
    }
    if (footstepSound) {
        footstepSound.pause();
        footstepSound.currentTime = 0;
    }
}

function playFootsteps() {
    if (isWalking && !footstepPlaying) {
        playFootstep();
    }
}

function handleChestInteraction(camera) {
    if (isNearTresor(camera)) {
        // Lower background music volume during chest interaction
        setBackgroundVolume(0.1);
        playMysteryBoxMusic();

        mysteryBoxMusic.onended = () => {
            // Restore background volume after chest interaction
            setBackgroundVolume(0.3);
            playNewRoundMusic();
            prochainNiveau();
        };
    }
}