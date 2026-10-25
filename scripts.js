// Setup audio objects
const yesAudio = new Audio('yes-sound.wav');
const noAudio = new Audio("music/booooooo.mp3");
const partyAudio = new Audio("music/party_music.wav"); 
partyAudio.loop = true;

// Spam pop-up variables and spawner
const popUpMessages = [
    "⚠️ WARNING: YOU'RE GETTING SLAPPED",
    "🎉  U SMELL",
    "🚨 ERROR 404: THIS IS WHAT U GET FOR CHOOSING NO",
    "💥 WRONG ANSWER!!! SHOULD'VE CLICKED YES",
    "🪲 FREE KIYAWARE INSTALLED",
    "🛑 HEHEHEHEHEHE"
];
// Function to trigger a light phone vibration (if the device supports it)
function vibratePhone(duration = 40) {
    if ("vibrate" in navigator) {
        navigator.vibrate(duration);
    }
}

let activePopups = [];

function spawnPopup() {
    if (!document.body.classList.contains('angry-background')) return;

    const popup = document.createElement('div');
    popup.className = 'spawned-popup';

    const randomX = Math.random() * (window.innerWidth - 260);
    const randomY = Math.random() * (window.innerHeight - 150);
    popup.style.left = randomX + 'px';
    popup.style.top = randomY + 'px';

    const randomMsg = popUpMessages[Math.floor(Math.random() * popUpMessages.length)];

    popup.innerHTML = `
        <div class="popup-title">
            <span>ALERT.exe</span>
            <button onclick="handleXClick(this)" style="background:#c0c0c0; border:1px solid; border-color:#fff #808 #808 #fff; cursor:pointer; font-family:'VT323';">X</button>
        </div>
        <div class="popup-content">
            <p>${randomMsg}</p>
            <button onclick="this.parentElement.parentElement.remove()" style="margin-top:5px; padding:2px 10px; font-family:'VT323'; font-size:1rem; background:#00ffff; border:2px solid; border-color:#fff #008 #008 #fff; cursor:pointer;">SORRY BABY</button>
        </div>
    `;

    document.body.appendChild(popup);
    activePopups.push(popup);
}

function acceptGift() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 } // Shoots out from around the middle/bottom where the buttons are
    });

    setInterval(spawnFloatingHeart, 400);
    // Little buzz on accept
    stopPartyMusic();
    yesAudio.currentTime = 0;
    yesAudio.play().catch(error => console.log("Audio play blocked or file missing:", error));

    document.body.classList.add('show-party-btn');
    document.body.classList.remove('dance-party', 'angry-background');
    document.getElementById('screen-1').classList.add('hidden');
    document.getElementById('screen-3').classList.remove('hidden');
}

function rejectGift() {
    vibratePhone(50); 
    stopPartyMusic();
    noAudio.currentTime = 0;
    noAudio.play().catch(error => console.log("Audio play blocked or file missing:", error));

    document.body.classList.add('shake-screen');
    document.body.classList.remove('dance-party');
    document.body.classList.add('angry-background');
    document.getElementById('screen-1').classList.add('hidden');
    document.getElementById('screen-2').classList.remove('hidden');

    // Spawn a limited set amount of pop-ups (e.g., exactly 5 times)
    if (window.popupInterval) clearInterval(window.popupInterval);
    
    let spawnCount = 0;
    const maxSpawns = 27; // Change this number if you want more or fewer pop-ups!
    
    window.popupInterval = setInterval(() => {
        if (spawnCount < maxSpawns && document.body.classList.contains('angry-background')) {
            spawnPopup();
            spawnCount++;
        } else {
            clearInterval(window.popupInterval);
        }
    }, 400); // Spawns one every 0.6 seconds until it hits maxSpawns
}

function resetPage() {
    document.body.classList.remove('angry-background', 'dance-party','shake-screen');
    
    // Stop all sounds
    partyAudio.pause();
    partyAudio.currentTime = 0;
    noAudio.pause();
    noAudio.currentTime = 0;

    // Clear pop-ups
    clearInterval(window.popupInterval);
    activePopups.forEach(p => p.remove());
    activePopups = [];

    document.getElementById('screen-2').classList.add('hidden');
    document.getElementById('screen-1').classList.remove('hidden');
}

// DANCE PARTY JUMPSCARE TRIGGER
function triggerDanceParty() {
    vibratePhone([60, 40, 60]); // A double-buzz pattern for the party button!
    document.body.classList.remove('angry-background');
    document.body.classList.add('dance-party');
    
    partyAudio.currentTime = 0;
    partyAudio.play().catch(error => console.log("Audio play blocked or file missing:", error));
}

// CLOSE PARTY & RETURN TO BEGINNING
function closeParty() { 
    stopPartyMusic();
    document.body.classList.remove('dance-party');

    // hide everything else
    document.getElementById('screen-1').classList.add('hidden');
    document.getElementById('screen-2').classList.add('hidden');
    // hides all individual letters just in case
    const letters = document.querySelectorAll('[id^="letter-"]');
    letters.forEach(el => el.classList.add('hidden'));
    // shows the messages directory screen 3
    document.getElementById('screen-3').classList.remove('hidden');
}

function stopPartyMusic() {
    partyAudio.pause();
    partyAudio.currentTime = 0;
}

function openLetter(letterId) {
    vibratePhone(30);
    document.getElementById('screen-3').classList.add('hidden');
    document.getElementById(letterId).classList.remove('hidden');
}

function backToLetters() {
    vibratePhone(30);
    document.getElementById('letter-hb').classList.add('hidden');
    document.getElementById('letter-1').classList.add('hidden');
    document.getElementById('letter-2').classList.add('hidden');
    document.getElementById('screen-3').classList.remove('hidden');
}

function goBack() {
    vibratePhone(30); 
    stopPartyMusic();
    document.body.classList.remove('dance-party', 'angry-background');
    
    document.body.classList.remove('dance-party', 'angry-background', 'show-party-btn');
    
    // Clear pop-ups
    clearInterval(window.popupInterval);
    activePopups.forEach(p => p.remove());
    activePopups = [];

    document.getElementById('screen-2').classList.add('hidden');
    document.getElementById('screen-3').classList.add('hidden');
    document.getElementById('screen-1').classList.remove('hidden');
}
function handleXClick(buttonElement) {
    const popup = buttonElement.parentElement.parentElement;
    popup.remove();
    
    // Spawns two new ones when X is clicked!
    spawnPopup();
    spawnPopup();
}

// Function to spawn a floating heart
function spawnFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    
    // You can change these emojis to whatever you want! (💖, 💕, ✨, 🫀, etc.)
    const emojis = ['💖', '💕', '✨', '🤍', '💌'];
    heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    // Random horizontal position across the screen
    heart.style.left = Math.random() * window.innerWidth + 'px';
    
    // Random animation speed so they don't all move together
    heart.style.animationDuration = (3 + Math.random() * 3) + 's';

    document.body.appendChild(heart);

    // Remove the element after the animation finishes to keep the page clean
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Make the retro window draggable
const windowContainer = document.querySelector('.container');
const titleBar = document.querySelector('.title-bar');

let isDragging = false;
let startX, startY;
let currentX = 0;
let currentY = 0;

titleBar.addEventListener('mousedown', dragStart);
titleBar.addEventListener('touchstart', dragStart, { passive: true });

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag, { passive: true });

document.addEventListener('mouseup', dragEnd);
document.addEventListener('touchend', dragEnd);

function dragStart(e) {
    isDragging = true;
    
    // Get starting coordinates (handles both mouse and mobile touch)
    if (e.type === 'touchstart') {
        startX = e.touches[0].clientX - currentX;
        startY = e.touches[0].clientY - currentY;
    } else {
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
    }
}

function drag(e) {
    if (!isDragging) return;

    if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX - startX;
        currentY = e.touches[0].clientY - startY;
    } else {
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
    }

    // Move the window smoothly
    windowContainer.style.transform = `translate(${currentX}px, ${currentY}px)`;
}

function dragEnd() {
    isDragging = false;
}
// Function that pops up a cheeky warning before letting him go back
function confirmBack(callback) {
    // Creates a retro Windows-style alert box dynamically
    const modal = document.createElement('div');
    modal.className = 'retro-confirm-modal';
    modal.innerHTML = `
        <div class="retro-confirm-box">
            <div class="title-bar">
                <span>WARNING.exe</span>
            </div>
            <div class="confirm-content">
                <p>⚠️ Are you sure you want to leave? Your boyfriend status will be temporarily downgraded.</p>
                <div class="confirm-buttons">
                    <button id="stay-btn">[ STAY ]</button>
                    <button id="leave-btn">[ I'LL BE GOOD ]</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // If he clicks STAY, close the warning and keep him right where he is
    document.getElementById('stay-btn').addEventListener('click', () => {
        if ("vibrate" in navigator) navigator.vibrate(30);
        modal.remove();
    });

    // If he clicks I'LL BE GOOD, close the warning and actually go back
    document.getElementById('leave-btn').addEventListener('click', () => {
        if ("vibrate" in navigator) navigator.vibrate(30);
        modal.remove();
        callback(); // Executes the actual back function
    });
}