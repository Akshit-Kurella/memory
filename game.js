var gamePattern = [];
var buttonColors =["red","blue","green","yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)
}


// for flashing the button
// for playing audio

function playAudio(url) {
  new Audio(url).play();
}


$("#red").click(function(){
  var userChosenColour = "red";
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);

});
$("#blue").click(function(){
  var userChosenColour = "blue";
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
});
$("#green").click(function(){
  var userChosenColour = "green";
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
});
$("#yellow").click(function(){
  var userChosenColour = "yellow";
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
});

function playSound(name) {
  playAudio("sounds/"+ name + ".mp3");
}
 function animatePress(currentColour) {
   $('#' + currentColour).addClass('pressed');
   setTimeout(function(){
     $('#' + currentColour).removeClass('pressed'),100
   });
 }

 function checkAnswer(currentLevel1){
   if (gamePattern[currentLevel1] === userClickedPattern[currentLevel1]) {

     console.log("success");
     if (userClickedPattern.length === gamePattern.length){
       setTimeout(function () {
         nextSequence();
       }, 1000);

     }

   } else {

     console.log("wrong");
     $("body").addClass('game-over');
     setTimeout(function(){
       $('body').removeClass('game-over'),500
     });
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startover()
   }
 }
$(".btn").click(function() {
  checkAnswer(userClickedPattern.length-1);
});

function startover(){
  level = 0;
  gamePattern = [];
  started = false;
}
