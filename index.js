var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var hasBeenPressed = false;
var level = 0;
var isOnTime = false;

function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level " + level);
  $("h2").removeClass("hidden");
  setTimeout(function(){
    if(!isOnTime){
      playSound("wrong");
      $("#title").text("Game Over, Tap Anywhere or Press a Key to Restart");
      $("body").addClass("game-over");
      $("h2").addClass("hidden");
      setTimeout(function(){
        $("body").removeClass("game-over");;
      }, 200);
      startOver();
    }
  }, 1000)
  isOnTime = false;
}

$("body").on("tap", function(event){
  if (!hasBeenPressed && event.target.id != "red" && event.target.id != "blue" && event.target.id != "yellow" && event.target.id != "green"){
    $("h1").text("Level " + level);
    nextSequence();
    hasBeenPressed = true;
  }
})

$(document).keypress(function(){
  if (!hasBeenPressed){
    $("h1").text("Level " + level);
    nextSequence();
    hasBeenPressed = true;
  }
})


$(".btn").on("click", function(event){
  if(hasBeenPressed){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  } else {
    $("h1").text("Level " + level);
    nextSequence();
    hasBeenPressed = true;
  }
})

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(gamePattern.length === userClickedPattern.length){
      isOnTime = true;
      setTimeout(nextSequence,1000);
    }
  } else {
    playSound("wrong");
    $("#title").text("Game Over, Tap Anywhere or Press a Key to Restart");
    $("body").addClass("game-over");
    $("h2").addClass("hidden");
    setTimeout(function(){
      $("body").removeClass("game-over");;
    }, 200);
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  isOnTime = false;
  setTimeout(function(){
    hasBeenPressed = false;
  }, 200);
}

function playSound(input){
  var simonMusic = new Audio("sounds/" + input + ".mp3");
  simonMusic.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}
