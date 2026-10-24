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
    stopPartyMusic();
    yesAudio.currentTime = 0;
    yesAudio.play().catch(error => console.log("Audio play blocked or file missing:", error));

    document.body.classList.add('show-party-btn');
    document.body.classList.remove('dance-party', 'angry-background');
    document.getElementById('screen-1').classList.add('hidden');
    document.getElementById('screen-3').classList.remove('hidden');
}

function rejectGift() {
    stopPartyMusic();
    noAudio.currentTime = 0;
    noAudio.play().catch(error => console.log("Audio play blocked or file missing:", error));

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
    document.body.classList.remove('angry-background', 'dance-party');
    
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
    document.getElementById('screen-3').classList.add('hidden');
    document.getElementById(letterId).classList.remove('hidden');
}

function backToLetters() {
    document.getElementById('letter-hb').classList.add('hidden');
    document.getElementById('letter-1').classList.add('hidden');
    document.getElementById('letter-2').classList.add('hidden');
    document.getElementById('screen-3').classList.remove('hidden');
}

function goBack() {
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