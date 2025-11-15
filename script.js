let noClickCount = 0;
const messages = [
    "Are you sure? Think again! 😏",
    "Come on, give it a chance! 💕",
    "I promise it'll be fun! 🌟",
    "One more try? You're too awesome to say no! 😉",
    "Okay, last chance... or is it? 😂"
];

// Audio elements
const yesSound = document.getElementById('yesSound');
const noSounds = [
    document.getElementById('noSound1'),
    document.getElementById('noSound2'),
    document.getElementById('noSound3'),
    document.getElementById('noSound4'),
    document.getElementById('noSound5')
];
const surpriseSound = document.getElementById('surpriseSound');
const bgMusic = document.getElementById('bgMusic');

// Volume controls
const musicVolumeSlider = document.getElementById('musicVolume');
const effectsVolumeSlider = document.getElementById('effectsVolume');

musicVolumeSlider.addEventListener('input', () => {
    bgMusic.volume = musicVolumeSlider.value;
});
effectsVolumeSlider.addEventListener('input', () => {
    [yesSound, ...noSounds, surpriseSound].forEach(sound => sound.volume = effectsVolumeSlider.value);
});

// Mute button
document.getElementById('muteBtn').addEventListener('click', () => {
    const allSounds = [bgMusic, yesSound, ...noSounds, surpriseSound];
    const isMuted = bgMusic.muted;
    allSounds.forEach(sound => sound.muted = !isMuted);
    document.getElementById('muteBtn').textContent = isMuted ? 'Mute All' : 'Unmute All';
});

// Background music fade-in on load
window.addEventListener('load', () => {
    bgMusic.volume = 0;
    bgMusic.play().catch(() => {}); // May be blocked; user can adjust
    let fadeIn = setInterval(() => {
        if (bgMusic.volume < musicVolumeSlider.value) {
            bgMusic.volume += 0.01;
        } else {
            clearInterval(fadeIn);
        }
    }, 50);
});

document.getElementById('yesBtn').addEventListener('click', function() {
    yesSound.play();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); // Confetti burst
    bgMusic.pause();
    document.getElementById('response').innerHTML = "Yay! I knew you'd say yes! Let's make some memories! ❤️";
    document.getElementById('response').style.display = 'block';
    document.getElementById('yesBtn').style.display = 'none';
    document.getElementById('noBtn').style.display = 'none';
});

document.getElementById('noBtn').addEventListener('click', function() {
    if (noClickCount < messages.length) {
        noSounds[noClickCount].play();
        alert(messages[noClickCount]);
        noClickCount++;
        const button = document.getElementById('noBtn');
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();

        let newLeft = Math.random() * (containerRect.width - buttonRect.width);
        let newTop = Math.random() * (containerRect.height - buttonRect.height);

        button.style.position = 'absolute';
        button.style.left = newLeft + 'px';
        button.style.top = newTop + 'px';
    } else {
        surpriseSound.play();
        alert("Alright, you win... but deep down, you know it's a yes! 😉");
        document.getElementById('noBtn').style.display = 'none';
    }
});
