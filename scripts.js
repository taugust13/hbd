// Audio setup (just drop your .wav files in the folder and match the names)
const yesAudio = new Audio('yes-sound.wav');
const noAudio = new Audio('no-sound.wav');

function acceptGift() {
    yesAudio.currentTime = 0;
    yesAudio.play().catch(error => console.log("Audio play blocked or file missing:", error));

    document.body.classList.remove('angry-background');
    document.getElementById('screen-1').classList.add('hidden');
    document.getElementById('screen-3').classList.remove('hidden');
}

function rejectGift() {
    noAudio.currentTime = 0;
    noAudio.play().catch(error => console.log("Audio play blocked or file missing:", error));

    document.body.classList.add('angry-background');
    document.getElementById('screen-1').classList.add('hidden');
    document.getElementById('screen-2').classList.remove('hidden');
}

function resetPage() {
    document.body.classList.remove('angry-background');
    document.getElementById('screen-2').classList.add('hidden');
    document.getElementById('screen-1').classList.remove('hidden');
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
    document.body.classList.remove('angry-background');
    document.getElementById('screen-2').classList.add('hidden');
    document.getElementById('screen-3').classList.add('hidden');
    document.getElementById('screen-1').classList.remove('hidden');
}