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
// Exercise 3
function drawMultiplicationTable() {
    var tableSize = getInputValue('3A');

    var wallSign = ' | ';
    var emptySpace = ' ';
    var maxCellLength = Math.pow(tableSize, 2).toString().length;

    var returnString = '';

    for (var i = 1; i <= tableSize; i++) {
        for (var j = 1; j <= tableSize; j++) {
            var value = j * i;
            var emptySpaceAmount = maxCellLength - value.toString().length;
            returnString += value.toString();
            if (emptySpaceAmount > 0) {
                returnString += emptySpace.repeat(emptySpaceAmount);
            }
            returnString += wallSign;
        }
        returnString += '\n';
    }

    console.log(returnString);
}
// Exercise 4
var fibonacciSequence = { 1: 1, 2: 1 };

function fillFibonacciSequence(index) {
    if (index < 3) {
        return 1;
    }

    var result =
        fillFibonacciSequence(index - 2) + fillFibonacciSequence(index - 1);

    fibonacciSequence[index] = result;

    return result;
}

function printFibonacciSequence() {
    var sequenceLength = getInputValue('4A');

    fillFibonacciSequence(sequenceLength);

    if (sequenceLength < 2) {
        console.log(sequenceLength + ' => ' + 1);
    } else {
        console.log(
            sequenceLength +
                ' => ' +
                Object.keys(fibonacciSequence)
                    .map(function (key) {
                        return fibonacciSequence[key];
                    })
                    .join(', ')
        );
    }
}

// Exercise 5
function printChristmasTree() {
    var size = getInputValue('5A');
    var starSign = '*';
    var christmasTree = '';

    for (i = 1; i <= size; i++) {
        christmasTree += starSign.repeat(i) + '\n';
    }

    console.log(christmasTree);
}

// Exercise 6
function printNightChristmasTree() {
    var size = getInputValue('6A');
    var treeSize = size - 2;
    var treeBottomLength = treeSize * 2 - 1;
    var drawingLength = treeBottomLength + 2;

    var starSign = '*';
    var treeSpace = ' ';
    var christmasTree = '';

    for (i = 1; i <= size; i++) {
        if (i > 1) {
            var backgroundWidth = treeSize - (i - 2);
            var treeWidth = drawingLength - backgroundWidth * 2;
        }

        for (j = 1; j <= drawingLength; j++) {
            if (i == 1 || i == size) {
                christmasTree += starSign;
            } else {
                if (j <= backgroundWidth) {
                    christmasTree += starSign;
                } else if (j <= backgroundWidth + treeWidth) {
                    christmasTree += treeSpace;
                } else {
                    christmasTree += starSign;
                }
            }
        }
        christmasTree += '\n';
    }

    console.log(size + ' => \n' + christmasTree);
}
