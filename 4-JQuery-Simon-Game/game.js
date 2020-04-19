let level = 0;
let gamePattern = [];
let userClickedPattern = [];
const buttonColours = [
    'red',
    'blue',
    'green',
    'yellow',
]



function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];

    userClickedPattern = [];
    gamePattern.push(randomChosenColour);

    // flash
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;

    $('#level-title').text(`Level ${level}`);
}


function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}


function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed');

    setTimeout(() => {
        $(`#${currentColour}`).removeClass('pressed');
    }, 100);
}


function checkAnswer(currentLevel) {
    console.log(`${currentLevel}, ${userClickedPattern[currentLevel]}, ${gamePattern[currentLevel]}`);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000)
        }
    } else {
        let audio = new Audio(`sounds/wrong.mp3`);
        audio.play();

        $('body').addClass('game-over');

        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);

        $('#level-title').text('Game Over, Press Any Key to Restart');

        startOver();
    }
}


function startOver() {
    gamePattern = [];
    level = 0;
}



// event listener
$('.btn').click(function() {
    let colour = $(this).attr('id');
    userClickedPattern.push(colour);

    playSound(colour);
    animatePress(colour);
    checkAnswer(userClickedPattern.length - 1);
});


$(document).keydown(function() {
    $('#level-title').text(`Level ${level}`);
    nextSequence();
});