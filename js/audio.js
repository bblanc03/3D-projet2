let mysteryBoxMusic;
let newRoundMusic;

function initAudio() {
    mysteryBoxMusic = new Audio('./audios/mysterybox.mp3');
    mysteryBoxMusic.loop = false;
    mysteryBoxMusic.volume = 0.3;

    newRoundMusic = new Audio('./audios/newround.mp3');
    newRoundMusic.loop = false;
    newRoundMusic.volume = 0.4;
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
        newRoundMusic.currentTime = 0;
        newRoundMusic.play()
            .catch(e => console.log("New round audio playback failed:", e));
    }
}

function pauseMysteryBoxMusic() {
    if (mysteryBoxMusic) {
        mysteryBoxMusic.pause();
    }
}

function handleChestInteraction(camera) {
    if (isNearTresor(camera)) {
        playMysteryBoxMusic();
        // Wait for mystery box sound to finish
        mysteryBoxMusic.onended = () => {
            playNewRoundMusic(); // Play new round music
            prochainNiveau(); // Start next level
        };
    }
}