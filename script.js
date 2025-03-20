function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteLast() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    let display = document.getElementById("display");
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = "Error";
    }
}

function calculateSquareRoot() {
    let display = document.getElementById("display");
    display.value = Math.sqrt(eval(display.value));
}

function calculateSquare() {
    let display = document.getElementById("display");
    display.value = Math.pow(eval(display.value), 2);
}

function calculatePercentage() {
    let display = document.getElementById("display");
    display.value = eval(display.value) / 100;
}

function calculateReciprocal() {
    let display = document.getElementById("display");
    display.value = 1 / eval(display.value);
}



