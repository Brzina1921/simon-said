
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var highScore = 0;
var currentScore = 0;
var menu = true;

if(menu = true){
  $("#level-title").text("SIMON SAID");
  $("#returnToMenu").hide();
}

$(".btn").hide();

$("body").ready(function(){
      setTimeout(function(){
          playBackgroundMusic("menu");
      }, 100);
});

$(document).keypress(function(){
  if(!menu){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("#returnToMenu").hide();
  }
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

  playSound(randomChosenColour + ".mp3");
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour + ".mp3");
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio("sounds/" + name);
  audio.play();
}

function playBackgroundMusic(name){
  var audio2 = new Audio("sounds/" + name + ".wav");
  audio2.loop = true;
  audio2.play();
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

    playSound("wrong.mp3");
    if(currentScore > highScore){
      highScore = currentScore;
      $(".p-highscore").text("Your highscore: " + highScore);
    }

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over!");

    setTimeout(function () {
       $("#returnToMenu").fadeIn(500);
    }, 2000);

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

$(".menuBtn").mouseenter(function(){
  var userHoverOption = $(this).attr("id");
  $("#" + userHoverOption).css("color", "white");
  $("#" + userHoverOption).addClass("textBorder");
});
$(".menuBtn").mouseleave(function(){
  var userHoverOption = $(this).attr("id");
  $("#" + userHoverOption).css("color", "black");
});

$(".menuBtn").click(function(){
  var userChosenOption = $(this).attr("id");
  animatePress(userChosenOption);
  playSound("click.wav")
  if(userChosenOption === "startGame"){
    $(".btn").fadeIn(500);
    menu = false;

    $(".menuBtn").fadeOut(300);

    setTimeout(function () {
      if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
    }, 800);
      }
});

$(".returnToMenu").click(function(){

  playSound("click.wav")
  $(".btn").hide();
  $(".menuBtn").fadeIn(700);
  $(".returnToMenu").hide();
  menu = true;
  $("#level-title").text("SIMON SAID");
});

$(".returnToMenu").mouseenter(function(){
  $(this).css("background-color", "black")
  $(this).css("color", "#FEF2BF")
});

$(".returnToMenu").mouseleave(function(){
  $(this).css("background-color", "#FEF2BF")
  $(this).css("color", "black")
});
