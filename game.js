var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;

$(document).on("keydown touchstart", function() {
    if(level == 0) {
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}

$(".btn").on("click touchstart", function() {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        playSound(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio(name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else {
        var audio = new Audio("wrong.mp3");
        audio.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
}
