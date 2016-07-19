//Global variables
  var used;               //if canvas has already been used
  var winningCombinations;//all possible combinations
  var turn = 0;           //turns made (X or O)
  var filledSquares = 0;  //if equal to 9, game finishes
  var content;            //used to fill in either X or O
  var currentCanvas;
  var draw;

//Init at loading
  window.onload = function() {
    used = new Array();
    content = new Array();
    winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (var i = 0; i < 9; i++) {
      used[i] = false; //mark as unused
      content[i] = ''; //reset content
    }
  }

//What happens when a canvas is clicked
  function canvasClicked(i) {
    currentCanvas = document.getElementById("canvas" + i); // current canvas
    draw = currentCanvas.getContext("2d");
    if(used[i-1] == false){ //check if not already used
      if(turn % 2 == 0) { //draw X
        draw.beginPath();
        draw.moveTo(0,0);
        draw.lineTo(50,50);
        draw.moveTo(50,0);
        draw.lineTo(0,50);
        draw.stroke();
        draw.closePath();
        content[i-1] = 'X';
      }
      else { //draw O
        draw.beginPath();
        draw.arc(25,25,20,0,Math.PI*2) //arc(x,y,radius,start,end,clockwise)
        draw.stroke();
        draw.closePath();
        content[i-1] = 'O';
      }
      turn++;
      used[i-1] = true;
      filledSquares++;
      checkIfWon(content[i-1])
      if (filledSquares == 9) {
        alert("All fields filled.")
        playAgain();
      }
    }
    else {
      alert("This field is already used.")
    }
  }

//check if someone has won
  function checkIfWon(symbol) {
    for (var i = 0; i < winningCombinations.length; i++) {
      if (content[winningCombinations [i][0]] == symbol &&
          content[winningCombinations [i][1]] == symbol &&
          content[winningCombinations [i][2]] == symbol) {
        alert(symbol + " has won!")
        playAgain();
      }
    }
  }

//start over
  function playAgain() {
    if(confirm("Play again?")){
      location.reload(true);
    }
    else {
      alert("Bye!");
    }
  }
