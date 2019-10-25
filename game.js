
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var highScore = 0;
var currentScore = 0;

$("body").ready(function(){
      setTimeout(function(){
          playSound("menu");
      }, 500);
})

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence(){

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        currentScore++;
        if(currentScore > highScore){
        $(".p-highscore").text("Your highscore: " + currentScore);
      }
        $(".p-currentscore").text("Your current score: " + currentScore);
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    if(started === true){
    $("body").addClass("game-over");

    playSound("wrong");
    if(currentScore > highScore){
      highScore = currentScore;
      $(".p-highscore").text("Your highscore: " + highScore);
    }

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over!");

    setTimeout(function () {
      startOver();
    }, 2000);
  }
  }
}

function startOver(){
  $("#level-title").text("Press A Key to Start Again");
  level = 0;
  started = false;
  gamePattern = [];
  currentScore = 0;
  $(".p-currentscore").text("Your current score: " + currentScore);
}
