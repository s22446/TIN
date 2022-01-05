// Adjuvant functions
function getInputValue(inputId) {
    return +document.getElementById('exercise-input-' + inputId).value || 0;
}

function square(number) {
    return Math.pow(number, 2);
}

// Exercise 1
function checkIfPythagoreanTriple() {
    var isPythagoreanTriple;
    var numberArray = [];
    numberArray.push(
        getInputValue('1A'),
        getInputValue('1B'),
        getInputValue('1C')
    );
    numberArray.sort((a, b) => {
        return a - b;
    });

    isPythagoreanTriple =
        !numberArray.some((value) => value <= 0) &&
        square(numberArray[0]) + square(numberArray[1]) ===
            square(numberArray[2]);

    console.log(
        'a = ' +
            getInputValue('1A') +
            ', b = ' +
            getInputValue('1B') +
            ', c = ' +
            getInputValue('1C') +
            ' => ' +
            isPythagoreanTriple
    );
}

// Exercise 2
function printDivisibleFromRange() {
    var a = getInputValue('2A');
    var b = getInputValue('2B');
    var c = getInputValue('2C');

    console.log(
        'a = ' +
            a +
            ', b = ' +
            b +
            ', c = ' +
            c +
            ' => ' +
            Array.from(
                { length: Math.abs(a - b) + 1 },
                (_, k) => (a > b ? k : -k) + b
            ).filter((value) => !(value % c))
    );
}
