// Setup audio objects
const yesAudio = new Audio('yes-sound.wav');
const noAudio = new Audio('no-sound.wav');
const partyAudio = new Audio('party-music.wav'); 
partyAudio.loop = true;

function acceptGift() {
    stopPartyMusic();
    yesAudio.currentTime = 0;
    yesAudio.play().catch(error => console.log("Audio play blocked or file missing:", error));

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
}

function resetPage() {
    document.body.classList.remove('angry-background');
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

    // Reset back to screen 1 (Beginning)
    document.getElementById('screen-2').classList.add('hidden');
    document.getElementById('screen-3').classList.add('hidden');
    const letters = document.querySelectorAll('[id^="letter-"]');
    letters.forEach(el => el.classList.add('hidden'));
    
    document.getElementById('screen-1').classList.remove('hidden');
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
    document.getElementById('screen-2').classList.add('hidden');
    document.getElementById('screen-3').classList.add('hidden');
    document.getElementById('screen-1').classList.remove('hidden');
}