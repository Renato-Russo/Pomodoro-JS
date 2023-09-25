const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const activityTimeInput = document.getElementById('activity-time');
const breakTimeInput = document.getElementById('break-time');
const repeatCountInput = document.getElementById('repeat-count');
const noteText = document.getElementById('note-text');

let countdown;
let isActivityPhase = true;
let remainingTime;
let repetitions;

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    timerElement.textContent = display;
}

function startTimer() {
    if (!countdown) {
        if (isActivityPhase) {
            remainingTime = parseInt(activityTimeInput.value, 10) * 60;
        } else {
            remainingTime = parseInt(breakTimeInput.value, 10) * 60;
        }

        countdown = setInterval(() => {
            remainingTime--;
            displayTime(remainingTime);

            if (remainingTime === 0) {
                clearInterval(countdown);
                countdown = null;
                repetitions--;

                if (repetitions > 0) {
                    isActivityPhase = !isActivityPhase;
                    startTimer();
                } else {
                    alert("Pomodoro Concluído!");
                }

                // Altera as cores com base na fase
                if (isActivityPhase) {
                    timerElement.style.color = '#6495ED'; // Cor da atividade
                    timerElement.style.backgroundColor = 'transparent';
                } else {
                    timerElement.style.color = '#FF7F50'; // Cor do descanso
                    timerElement.style.backgroundColor = 'transparent';
                }
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (countdown) {
        clearInterval(countdown);
        countdown = null;
    }
}

function resetTimer() {
    clearInterval(countdown);
    countdown = null;
    isActivityPhase = true;
    repetitions = parseInt(repeatCountInput.value, 10);
    displayTime(parseInt(activityTimeInput.value, 10) * 60);
    noteText.value = ''; // Limpa o campo de anotações ao reiniciar o temporizador
    timerElement.style.color = ''; // Reverte a cor do temporizador
    timerElement.style.backgroundColor = ''; // Reverte o fundo do temporizador
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

resetTimer();
