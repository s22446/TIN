const game = {
    hasStarted: false,
    currentSign: undefined,
    results: { x: 0, circle: 0 },
};

const settings = {
    startingSign: 'x',
    opponent: 'human',
    computerSign: undefined,
};

const board = {
    'row-1': { 0: undefined, 1: undefined, 2: undefined },
    'row-2': { 0: undefined, 1: undefined, 2: undefined },
    'row-3': { 0: undefined, 1: undefined, 2: undefined },
};

const signLetter = { x: 'X', circle: 'O' };

const gameStatusText = {
    started: 'The game has started.',
    notStarted: 'The game has not started yet.',
};

const nextMoveText = {
    player: 'Next move: player',
    computer: 'Next move: computer',
};

function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
}

function clearBoardObject() {
    for (const row in board) {
        for (const square in board[row]) {
            board[row][square] = undefined;
        }
    }
}

function changeSign(sign) {
    if (sign === 'x') {
        return 'circle';
    } else {
        return 'x';
    }
}

function changeStartingSign() {
    var signToChange = changeSign(settings.startingSign);
    settings.startingSign = signToChange;

    $('#current-starting-sign span').text(signLetter[signToChange]);
}

function changeOpponentInfo() {
    $('#current-opponent span').text(settings.opponent);
}

function updateResults() {
    $('#results-values').text(
        'X: ' + game.results.x + ' | O: ' + game.results.circle
    );
}

function clearResults() {
    game.results.x = 0;
    game.results.circle = 0;
    updateResults();
}

function switchOpponent() {
    if (settings.opponent === 'human') {
        settings.opponent = 'computer';
        settings.computerSign = changeSign(settings.startingSign);

        $('#computer-sign').click(changeComputerSign);
        $('#computer-sign-info span').text(signLetter[settings.computerSign]);
        $('#computer-sign, #computer-sign-info').removeClass('hidden');
    } else {
        settings.opponent = 'human';
        $('#computer-sign').off('click');
        $('#computer-sign-info span').empty();
        $('#computer-sign, #computer-sign-info').addClass('hidden');
    }

    changeOpponentInfo();
}

function changeComputerSign() {
    settings.computerSign = changeSign(settings.computerSign);
    $('#computer-sign-info span').text(signLetter[settings.computerSign]);
}

async function showWinOrDrawNotification(mode) {
    var timeLeft = 2;
    var winningSign = signLetter[game.currentSign];

    if (mode === 'win') {
        if (settings.opponent === 'computer') {
            if (game.currentSign === settings.computerSign) {
                var text = 'Computer has won!';
            } else {
                var text = 'Player has won!';
            }
        } else {
            var text = winningSign + ' has won!';
        }
    } else if (mode === 'draw') {
        var text = 'Draw!';
    } else {
        return;
    }

    $('.page-shadow, .page-shadow-text').addClass('show');
    $('.page-shadow-text')
        .empty()
        .append(text + '<p>Resuming in ' + (timeLeft + 1) + ' seconds...</p>');
    var notificationTimer = setInterval(function () {
        if (timeLeft <= 0) {
            $('.page-shadow, .page-shadow-text').removeClass('show');
            clearInterval(notificationTimer);
            stopTheGame();
        }
        $('.page-shadow-text')
            .empty()
            .append(text + '<p>Resuming in ' + timeLeft + ' seconds...</p>');

        timeLeft--;
    }, 1000);
}

function checkIfBoardIsFull() {
    for (const row in board) {
        if (Object.values(board[row]).includes(undefined)) {
            return false;
        }
    }

    return true;
}

function compareSquares(squares) {
    var firstSign = squares[0];

    if (firstSign === undefined) {
        return false;
    }

    for (var i = 1; i < 3; i++) {
        if (squares[i] !== firstSign) {
            return false;
        }
    }

    return true;
}

async function computerMove() {
    $('.game-squares, .game-square').addClass('computer-move');
    $('#status-whose-move').text(nextMoveText.computer);

    await sleep(1);
    var freeSquares = $('.game-square').not('.sign-x, .sign-circle');
    $(freeSquares[randomNumber(0, freeSquares.length - 1)]).click();

    $('.game-squares, .game-square').removeClass('computer-move');
    $('#status-whose-move').text(nextMoveText.player);
}

function startTheGame() {
    if (!game.hasStarted) {
        game.hasStarted = true;
        game.currentSign = settings.startingSign;

        $('#status-game-started').text(gameStatusText.started);
        $('#status-opponent')
            .addClass('filled')
            .text('Opponent: ' + settings.opponent);
        $('#status-current-sign')
            .addClass('filled')
            .text('Current sign: ' + signLetter[game.currentSign]);
        $(
            '#starting-sign-menubutton, #start-game-menubutton, #current-starting-sign, #clear-results-menubutton, #switch-opponent, #current-opponent, #computer-sign'
        )
            .addClass('hidden')
            .off('click');
        $('#stop-game-menubutton').show().click(stopTheGame);
        $('.game-square').removeClass('inactive');

        if (
            settings.opponent === 'computer' &&
            settings.computerSign === game.currentSign
        ) {
            $('#status-whose-move')
                .addClass('filled')
                .text(nextMoveText.computer);
            computerMove();
        } else if (settings.opponent === 'computer') {
            $('#status-whose-move')
                .addClass('filled')
                .text(nextMoveText.player);
        }
    }
}

function stopTheGame() {
    if (game.hasStarted) {
        game.hasStarted = false;
        game.currentSign = undefined;

        $('#status-game-started').text(gameStatusText.notStarted);
        $('#status-current-sign').removeClass('filled').empty();
        $(
            '#starting-sign-menubutton, #start-game-menubutton, #current-starting-sign, #clear-results-menubutton, #switch-opponent, #current-opponent'
        ).removeClass('hidden');
        $('#start-game-menubutton').click(startTheGame);
        $('#starting-sign-menubutton').click(changeStartingSign);
        $('#clear-results-menubutton').click(clearResults);
        if (settings.opponent === 'computer') {
            $('#computer-sign').removeClass('hidden');
            $('#computer-sign').click(changeComputerSign);
            $('#status-whose-move').removeClass('filled').empty();
        }
        $('#switch-opponent').click(switchOpponent);
        $('#stop-game-menubutton').hide().off('click');
        $('.game-square')
            .addClass('inactive')
            .removeClass(function (_, className) {
                return (className.match(/(^|\s)sign-\S+/g) || []).join(' ');
            });

        clearBoardObject();
    }
}

function searchForWin() {
    for (const row in board) {
        if (compareSquares(Object.values(board[row]))) {
            return true;
        }

        if (row === Object.keys(board)[0]) {
            if (
                compareSquares([
                    board['row-1'][0],
                    board['row-2'][0],
                    board['row-3'][0],
                ]) ||
                compareSquares([
                    board['row-1'][1],
                    board['row-2'][1],
                    board['row-3'][1],
                ]) ||
                compareSquares([
                    board['row-1'][2],
                    board['row-2'][2],
                    board['row-3'][2],
                ])
            ) {
                return true;
            }
        }
    }

    if (
        compareSquares([
            board['row-1'][0],
            board['row-2'][1],
            board['row-3'][2],
        ]) ||
        compareSquares([
            board['row-1'][2],
            board['row-2'][1],
            board['row-3'][0],
        ])
    ) {
        return true;
    } else {
        return false;
    }
}

function gameWon() {
    game.results[game.currentSign]++;
    updateResults();
    showWinOrDrawNotification('win');
}

function squareClick() {
    var parentId = $(this).parent().attr('id');
    var index = $(this).index();

    if (
        game.hasStarted &&
        board[parentId][index] === undefined &&
        !$(this).hasClass('[class^="sign-"]')
    ) {
        board[parentId][index] = game.currentSign;
        $(this).addClass('sign-' + game.currentSign);

        if (searchForWin()) {
            gameWon();
        } else {
            if (checkIfBoardIsFull()) {
                showWinOrDrawNotification('draw');
            } else {
                game.currentSign = changeSign(game.currentSign);

                $('#status-current-sign').text(
                    'Current sign: ' + signLetter[game.currentSign]
                );

                if (
                    settings.opponent === 'computer' &&
                    game.currentSign === settings.computerSign
                ) {
                    computerMove();
                }
            }
        }
    }
}

function prepareForStart() {
    $('.game-square').click(squareClick);
    $('.game-square').addClass('inactive');
    $('#start-game-menubutton').click(startTheGame);
    $('#starting-sign-menubutton').click(changeStartingSign);
    $('#clear-results-menubutton').click(clearResults);
    $('#switch-opponent').click(switchOpponent);
}

$(document).ready(function () {
    prepareForStart();
});
