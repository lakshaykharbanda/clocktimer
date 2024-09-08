// script.js

// Elements from the DOM
const startBtn = document.getElementById('start-btn');
const datetimePicker = document.getElementById('datetime-picker');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const messageEl = document.getElementById('message');

let countdownInterval;

// Function to calculate and display the remaining time
function updateCountdown(targetDate) {
    const currentTime = new Date();
    const timeRemaining = targetDate - currentTime;

    if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        displayMessage("Time's up!");
        resetCountdownDisplay();
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Update the countdown display
    daysEl.textContent = formatTimeUnit(days);
    hoursEl.textContent = formatTimeUnit(hours);
    minutesEl.textContent = formatTimeUnit(minutes);
    secondsEl.textContent = formatTimeUnit(seconds);
}

// Helper function to add leading zero if needed
function formatTimeUnit(unit) {
    return unit < 10 ? '0' + unit : unit;
}

// Function to reset the countdown display
function resetCountdownDisplay() {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
}

// Function to display a message when the countdown ends
function displayMessage(msg) {
    messageEl.textContent = msg;
}

// Event listener for the start button
startBtn.addEventListener('click', () => {
    const targetDate = new Date(datetimePicker.value);

    // Validation: Check if a date has been selected
    if (!datetimePicker.value) {
        alert("Please select a valid date and time.");
        return;
    }

    // Validation: Check if the selected date is in the future
    if (targetDate <= new Date()) {
        alert("Please select a date in the future.");
        return;
    }

    // Clear any previous countdown
    clearInterval(countdownInterval);
    messageEl.textContent = ''; // Clear any existing message

    // Start the countdown and update every second
    countdownInterval = setInterval(() => {
        updateCountdown(targetDate);
    }, 1000);
});
