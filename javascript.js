var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

document.getElementById("startreset").onclick = function() {
  // click on the start/reset button

  if (playing) {
    // if we are playing

    location.reload(); //reloads page
  } else {
    //if we are not playing

    playing = true; // change mode to playing
    score = 0; //set score to 0
    document.getElementById("scorevalue").innerHTML = score;
    show("timeremaining"); //show countdown box
    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    hide("gameover");
    document.getElementById("startreset").innerHTML = "Reset Game"; //change button to reset

    //start countdown
    startCountdown();

    //generate a new Q&A
    generateQA();
  }
};

//When you click an answer box
for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function() {
    // Are we currently playing?
    if (playing == true) {
      if (this.innerHTML == correctAnswer) {
        //answer is correct
        score++;
        document.getElementById("scorevalue").innerHTML = score;

        //hide wrong box
        hide("wrong");
        show("correct");
        setTimeout(() => {
          hide("correct");
        }, 1000);
        //generate new question
        generateQA();
      } else {
        //wrong answer
        hide("correct");
        show("wrong");
        setTimeout(() => {
          hide("wrong");
        }, 1000);
      }
    }
  };
}
//FUNCTIONS

//start counter
function startCountdown() {
  action = setInterval(function() {
    timeremaining--;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if (timeremaining == 0) {
      //gameover
      stopCountdown();
      show("gameover");

      document.getElementById("gameover").innerHTML =
        "<p>Game Over!</p><p>Your score is " + score + ".</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}
//stop counter
function stopCountdown() {
  clearInterval(action);
}

//hides element
function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

//show element
function show(Id) {
  document.getElementById(Id).style.display = "block";
}

//generate Q&A
function generateQA() {
  var x = 1 + Math.round(9 * Math.random()); //random number between 1 and 10
  var y = 1 + Math.round(9 * Math.random());
  correctAnswer = x * y;
  document.getElementById("question").innerHTML = x + "*" + y;
  var correctPosition = 1 + Math.round(3 * Math.random()); //random number between 1 and 4
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with correct answer

  //fill other boxes with wrong answers

  var answers = [correctAnswer];
  for (i = 1; i < 5; i++) {
    if (i !== correctPosition) {
      var wrongAnswer; // wrong answer
      do {
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random()));
      } while (answers.indexOf(wrongAnswer) > -1);

      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
