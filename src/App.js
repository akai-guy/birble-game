import './App.css';
import rawVal from '../src/validWords.txt';
import rawGuess from '../src/guessWords.txt';
import bsp from '../src/backspace.png'


function App() {
  var media = window.matchMedia("(max-width: 800px)");
  var isMedia = media.matches;

  var rowMobile = 0;
  var wordMobile = "";
  
  genWord();
  if (!isMedia){
    if (document.getElementById("row" + 0)){
      document.getElementById("row" + 0).disabled = false;
    }
  }
  alert("It's Wordle but you have 6 guesses to guess a randomly chosen Bible-related word. With every guess, each letter will turn green if its in the target word and in the right position, it will turn yellow if its in the target word and in the wrong position, and it will turn red if its not in the target word at all. The amount of greens/yellows are limited to the number of occurences a given letter appears in the target word. For example, if the target word is AMONG and you guess MAMMA, only the first M will turn yellow while the rest turn red. If you guess GOING however, the last G will turn green while the first one turns red because there are no more G's in AMONG. \n\nNOTE: On a mobile device, you have to press the back button to exit your keyboard and see the your entry table and the website keyboard at the same time. To be able to enter a word again, tap anywhere on the screen.");
    
  function mobileLetterDisplay(letter){
    var inputLetter = document.getElementById(letter).innerHTML; //caps
    if (letter==="Enter"){
      submitGuess();
    }
    else{
      if (letter==="Backspace"){
        wordMobile = wordMobile.slice(0, wordMobile.length - 1)
        var inputVal = document.getElementById("row" + rowMobile).value.toUpperCase();
        document.getElementById("row" + rowMobile).value = inputVal.slice(0, inputVal.length - 1);
        inputVal = inputVal.slice(0, inputVal.length - 1);
      }
      else{
        wordMobile += inputLetter;
        document.getElementById("row" + rowMobile).value += inputLetter;
        var inputVal = document.getElementById("row" + rowMobile).value.toUpperCase();
      }
      wordMobile = inputVal;

      for (var i = 0; i < wordMobile.length; i++){
      document.getElementById("letterCell" + rowMobile + i).innerHTML = wordMobile[i];
      document.getElementById("letterCell" + rowMobile + i).className -= " blank";
      }
      for (var j = wordMobile.length; j < 5; j++){
        document.getElementById("letterCell" + rowMobile + j).innerHTML = "_";
        document.getElementById("letterCell" + rowMobile + j).className += " blank";
      }
    }
  }

  function letterDisplay(row){
    rowMobile = row;
    var input = document.getElementById("row" + row); 
    var inputVal = document.getElementById("row" + row).value.toUpperCase(); //capital letter input 

    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        submitGuess();
      }
    });
    if(!("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(inputVal.slice(inputVal.length - 1)))){
      document.getElementById("row" + row).value = inputVal.slice(0, inputVal.length - 1);
      return "";
    }
    wordMobile += inputVal.slice(inputVal.length - 1);

    for (var i = 0; i < inputVal.length; i++){
      document.getElementById("letterCell" + rowMobile + i).innerHTML = inputVal[i];
      document.getElementById("letterCell" + rowMobile + i).className -= " blank";
    }
    for (var j = inputVal.length; j < 5; j++){
      document.getElementById("letterCell" + rowMobile + j).innerHTML = "_";
      document.getElementById("letterCell" + rowMobile + j).className += " blank";
    }
    
  }

  function resetKeyBoard(){
    document.getElementById("q").className = "keyBoardCell";
    document.getElementById("w").className = "keyBoardCell";
    document.getElementById("e").className = "keyBoardCell";
    document.getElementById("r").className = "keyBoardCell";
    document.getElementById("t").className = "keyBoardCell";
    document.getElementById("y").className = "keyBoardCell";
    document.getElementById("u").className = "keyBoardCell";
    document.getElementById("i").className = "keyBoardCell";
    document.getElementById("o").className = "keyBoardCell";
    document.getElementById("p").className = "keyBoardCell";
    document.getElementById("a").className = "keyBoardCell";
    document.getElementById("s").className = "keyBoardCell";
    document.getElementById("d").className = "keyBoardCell";
    document.getElementById("f").className = "keyBoardCell";
    document.getElementById("g").className = "keyBoardCell";
    document.getElementById("h").className = "keyBoardCell";
    document.getElementById("j").className = "keyBoardCell";
    document.getElementById("k").className = "keyBoardCell";
    document.getElementById("l").className = "keyBoardCell";
    document.getElementById("z").className = "keyBoardCell";
    document.getElementById("x").className = "keyBoardCell";
    document.getElementById("c").className = "keyBoardCell";
    document.getElementById("v").className = "keyBoardCell";
    document.getElementById("b").className = "keyBoardCell";
    document.getElementById("n").className = "keyBoardCell";
    document.getElementById("m").className = "keyBoardCell";
  }

  function genWord(){
    var words = []
    fetch(rawGuess)
      .then((res) => res.text())
      .then((text) => {
        text+="\n"
        for (var i in text){
          if (text[i] === '\n'){
            words.push(text.slice(i-5,i))
          }
        }
        var chosenWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
        document.getElementById("wordToGuess").value = chosenWord;
        resetCells();
        resetFields();
        resetKeyBoard();
        if(!isMedia){
          document.getElementById("row0").focus();
        }
        document.getElementById("message").className = "message messageHidden";
      })
      .catch((e) => console.error(e));
  }

  function resetFields(){
    document.getElementById("row" + 0).value = "";
    document.getElementById("row" + 1).value = "";
    document.getElementById("row" + 2).value = "";
    document.getElementById("row" + 3).value = "";
    document.getElementById("row" + 4).value = "";
    document.getElementById("row" + 5).value = "";
    if (!isMedia){
      document.getElementById("row" + 0).disabled = false;
    }
    if(!isMedia){
      document.getElementById("row" + 0).focus();
    }
    document.getElementById("row" + 1).disabled = true;
    document.getElementById("row" + 2).disabled = true;
    document.getElementById("row" + 3).disabled = true;
    document.getElementById("row" + 4).disabled = true;
    document.getElementById("row" + 5).disabled = true;
    
    wordMobile = "";
    rowMobile = 0;
  }

  function resetCells(){
    for (var r=0;r<6;r++){
      for (var c=0;c<5;c++){
        document.getElementById("letterCell" + r + c).innerHTML = "_"
        
        document.getElementById("letterCell" + r + c).className = "cellContent blank"
        document.getElementById("cell" + r + c).className = "birbCell"
      }
    }
  }

  function processGuess(input, rowTarget){
    var targetWord = document.getElementById("wordToGuess").value;
    var words = []
    fetch(rawVal)
      .then((res) => res.text())
      .then((text) => {
        text+="\n"
        for (var word in text){
          if (text[word] === '\n'){
            words.push(text.slice(word-5,word))
          }
            }

        if (input.length !== 5){
          document.getElementById("message").innerHTML = "Too short!";
          document.getElementById("message").className = "message messageReveal";
          if(!isMedia){
            document.getElementById("row" + rowTarget).focus();
          }
          return "";
        }
        if (!words.includes(input.toLowerCase())){
          document.getElementById("message").innerHTML = "Not a valid guess >:(";
          document.getElementById("message").className = "message messageReveal";
          if(!isMedia){
            document.getElementById("row" + rowTarget).focus();
          }
          return "";
        }
        var chosenWord = targetWord;
        for (var i=0;i<5;i++){
          var letterOne = input[i].toLowerCase();
          if(chosenWord[i] === input[i]){
            document.getElementById("cell" + rowTarget + i).className = "birbCell green";
            document.getElementById("" + letterOne).className = "keyBoardCell keyGreen";
            chosenWord = chosenWord.replace(chosenWord.charAt(i), ' ');
          }
          else{
            document.getElementById("cell" + rowTarget + i).className = "birbCell red";
            if (!(document.getElementById("" + letterOne).className === "keyBoardCell keyGreen")){
              document.getElementById("" + letterOne).className = "keyBoardCell keyRed";
            }
          }
        }

        for(var j=0;j<5;j++){
          var letterTwo = input[j].toLowerCase();
          if(chosenWord.includes(input[j]) && !(targetWord[j] === input[j])){
            document.getElementById("cell" + rowTarget + j).className = "birbCell yellow";
            if (!(document.getElementById("" + letterOne).className === "keyBoardCell keyGreen")){
              document.getElementById("" + letterTwo).className = "keyBoardCell keyYellow";
            }

            chosenWord = chosenWord.replace(input[j], ' ');
          }
        }
        
        rowMobile += 1;
        wordMobile ="";

        document.getElementById("row" + rowTarget).disabled = true;
        if (input === targetWord){
          document.getElementById("message").innerHTML = "YOU WIN! :)";
          document.getElementById("message").className = "message messageReveal";
          rowMobile = 0;
          return"";
        }
        if(rowTarget===5){
          document.getElementById("message").innerHTML = "You lost bro. The word was: " + targetWord;
          document.getElementById("message").className = "message messageReveal";
          rowMobile = 0;
          return "";
        }
        if (!isMedia){
          document.getElementById("row" + (rowTarget + 1)).disabled = false;
        }
        if(!isMedia){
          document.getElementById("row" + (rowTarget + 1)).focus();
        }
      })
      .catch((e) => console.error(e));
    
  }

  function submitGuess(){
    document.getElementById("message").className = "message messageHidden";
    var rowTarget = 0;
    for (var row=0;row<6;row++){
      if(document.getElementById("row" + row).value){
        rowTarget = row;
      }
    }
    var input = document.getElementById("row" + rowTarget).value.toUpperCase();
    processGuess(input, rowTarget);
  }

  function help(){
    alert("It's Wordle but you have 6 guesses to guess a randomly chosen Bible-related word. With every guess, each letter will turn green if its in the target word and in the right position, it will turn yellow if its in the target word and in the wrong position, and it will turn red if its not in the target word at all. The amount of greens/yellows are limited to the number of occurences a given letter appears in the target word. For example, if the target word is AMONG and you guess MAMMA, only the first M will turn yellow while the rest turn red. If you guess GOING however, the last G will turn green while the first one turns red because there are no more G's in AMONG. \n\nNOTE: On a mobile device, you have to press the back button to exit your keyboard and see the your entry table and the website keyboard at the same time. To be able to enter a word again, tap anywhere on the screen.");
    var rowTarget = 0;
    for (var row=0;row<6;row++){
      if(document.getElementById("row" + row).value){
        rowTarget = row;
      }
    }
    if(!isMedia){
      document.getElementById("row" + rowTarget).focus();
    }
  }

  function focus(e){
    if(!isMedia){
      if (e.relatedTarget === null) {
          e.target.focus();
      }
    }
  }

  return (
    <div className="App">
      <div className="title">
        <span className="titleText">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>BIrBLE</strong>&nbsp;&nbsp;&nbsp;</span>
        <button id="Help" onClick={help}>e</button>
      </div>
      <div className="game">
        <div className="gameTable">
          <table className="birbleTable">
            <tr className="letterRow0">
              <td className="birbCell" id="cell00"><label className="cellContent blank" id="letterCell00" for="row0">_</label></td>
              <td className="birbCell" id="cell01"><label className="cellContent blank" id="letterCell01" for="row0">_</label></td>
              <td className="birbCell" id="cell02"><label className="cellContent blank" id="letterCell02" for="row0">_</label></td>
              <td className="birbCell" id="cell03"><label className="cellContent blank" id="letterCell03" for="row0">_</label></td>
              <td className="birbCell" id="cell04"><label className="cellContent blank" id="letterCell04" for="row0">_</label></td>
              <input id="row0" className="birbleRow" type="text" disabled maxLength={5} onChange={() => letterDisplay(0)} onBlur={e => focus(e)}></input>
            </tr>
            <tr className="letterRow1">
              <td className="birbCell" id="cell10"><label className="cellContent blank" id="letterCell10" for="row1">_</label></td>
              <td className="birbCell" id="cell11"><label className="cellContent blank" id="letterCell11" for="row1">_</label></td>
              <td className="birbCell" id="cell12"><label className="cellContent blank" id="letterCell12" for="row1">_</label></td>
              <td className="birbCell" id="cell13"><label className="cellContent blank" id="letterCell13" for="row1">_</label></td>
              <td className="birbCell" id="cell14"><label className="cellContent blank" id="letterCell14" for="row1">_</label></td>
              <input id="row1" className="birbleRow" type="text" disabled maxLength={5} onChange={() => letterDisplay(1)} onBlur={e => focus(e)}></input>
            </tr>
            <tr className="letterRow2">
              <td className="birbCell" id="cell20"><label className="cellContent blank" id="letterCell20" for="row2">_</label></td>
              <td className="birbCell" id="cell21"><label className="cellContent blank" id="letterCell21" for="row2">_</label></td>
              <td className="birbCell" id="cell22"><label className="cellContent blank" id="letterCell22" for="row2">_</label></td>
              <td className="birbCell" id="cell23"><label className="cellContent blank" id="letterCell23" for="row2">_</label></td>
              <td className="birbCell" id="cell24"><label className="cellContent blank" id="letterCell24" for="row2">_</label></td>
              <input id="row2" className="birbleRow" type="text" disabled maxLength={5} onChange={() => letterDisplay(2)} onBlur={e => focus(e)}></input>
            </tr>
            <tr className="letterRow3">
              <td className="birbCell" id="cell30"><label className="cellContent blank" id="letterCell30" for="row3">_</label></td>
              <td className="birbCell" id="cell31"><label className="cellContent blank" id="letterCell31" for="row3">_</label></td>
              <td className="birbCell" id="cell32"><label className="cellContent blank" id="letterCell32" for="row3">_</label></td>
              <td className="birbCell" id="cell33"><label className="cellContent blank" id="letterCell33" for="row3">_</label></td>
              <td className="birbCell" id="cell34"><label className="cellContent blank" id="letterCell34" for="row3">_</label></td>
              <input id="row3" className="birbleRow" type="text" disabled maxLength={5} onChange={() => letterDisplay(3)} onBlur={e => focus(e)}></input>
            </tr>
            <tr className="letterRow4">
              <td className="birbCell" id="cell40"><label className="cellContent blank" id="letterCell40" for="row4">_</label></td>
              <td className="birbCell" id="cell41"><label className="cellContent blank" id="letterCell41" for="row4">_</label></td>
              <td className="birbCell" id="cell42"><label className="cellContent blank" id="letterCell42" for="row4">_</label></td>
              <td className="birbCell" id="cell43"><label className="cellContent blank" id="letterCell43" for="row4">_</label></td>
              <td className="birbCell" id="cell44"><label className="cellContent blank" id="letterCell44" for="row4">_</label></td>
              <input id="row4" className="birbleRow" type="text" disabled maxLength={5} onChange={() => letterDisplay(4)} onBlur={e => focus(e)}></input>
            </tr>
            <tr className="letterRow5">
              <td className="birbCell" id="cell50"><label className="cellContent blank" id="letterCell50" for="row5">_</label></td>
              <td className="birbCell" id="cell51"><label className="cellContent blank" id="letterCell51" for="row5">_</label></td>
              <td className="birbCell" id="cell52"><label className="cellContent blank" id="letterCell52" for="row5">_</label></td>
              <td className="birbCell" id="cell53"><label className="cellContent blank" id="letterCell53" for="row5">_</label></td>
              <td className="birbCell" id="cell54"><label className="cellContent blank" id="letterCell54" for="row5">_</label></td>
              <input id="row5" className="birbleRow" type="text" disabled maxLength={5} onChange={() => letterDisplay(5)} onBlur={e => focus(e)}></input>
            </tr>
          </table>
        </div>
        <div id="other">
          <button id="newGame" onClick={genWord}>New Game</button>
          <input id="wordToGuess" type="text" maxLength={5} minLength={5}></input>
          <div id="message" className="message messageHidden"></div>
        </div>
        <div className="keyboard">
          <table className="keyBoardRow">
            <tr>
              <td id="q" className="keyBoardCell" onClick={() => mobileLetterDisplay("q")}>Q</td> &nbsp;
              <td id="w" className="keyBoardCell" onClick={() => mobileLetterDisplay("w")}>W</td> &nbsp;
              <td id="e" className="keyBoardCell" onClick={() => mobileLetterDisplay("e")}>E</td> &nbsp;
              <td id="r" className="keyBoardCell" onClick={() => mobileLetterDisplay("r")}>R</td> &nbsp;
              <td id="t" className="keyBoardCell" onClick={() => mobileLetterDisplay("t")}>T</td> &nbsp;
              <td id="y" className="keyBoardCell" onClick={() => mobileLetterDisplay("y")}>Y</td> &nbsp;
              <td id="u" className="keyBoardCell" onClick={() => mobileLetterDisplay("u")}>U</td> &nbsp;
              <td id="i" className="keyBoardCell" onClick={() => mobileLetterDisplay("i")}>I</td> &nbsp;
              <td id="o" className="keyBoardCell" onClick={() => mobileLetterDisplay("o")}>O</td> &nbsp;
              <td id="p" className="keyBoardCell" onClick={() => mobileLetterDisplay("p")}>P</td> &nbsp;
              <td id="Backspace" className="keyBoardCell"><img id="bspImg" src={bsp} alt='br' onClick={() => mobileLetterDisplay("Backspace")}></img></td> &nbsp;
            </tr>
          </table>
          <table className="keyBoardRow">
            <tr>
              <td id="a" className="keyBoardCell" onClick={() => mobileLetterDisplay("a")}>A</td> &nbsp;
              <td id="s" className="keyBoardCell" onClick={() => mobileLetterDisplay("s")}>S</td> &nbsp;
              <td id="d" className="keyBoardCell" onClick={() => mobileLetterDisplay("d")}>D</td> &nbsp;
              <td id="f" className="keyBoardCell" onClick={() => mobileLetterDisplay("f")}>F</td> &nbsp;
              <td id="g" className="keyBoardCell" onClick={() => mobileLetterDisplay("g")}>G</td> &nbsp;
              <td id="h" className="keyBoardCell" onClick={() => mobileLetterDisplay("h")}>H</td> &nbsp;
              <td id="j" className="keyBoardCell" onClick={() => mobileLetterDisplay("j")}>J</td> &nbsp;
              <td id="k" className="keyBoardCell" onClick={() => mobileLetterDisplay("k")}>K</td> &nbsp;
              <td id="l" className="keyBoardCell" onClick={() => mobileLetterDisplay("l")}>L</td> &nbsp;
            </tr>
          </table>
          <table className="keyBoardRow">
            <tr>
              <td id="z" className="keyBoardCell" onClick={() => mobileLetterDisplay("z")}>Z</td> &nbsp;
              <td id="x" className="keyBoardCell" onClick={() => mobileLetterDisplay("x")}>X</td> &nbsp;
              <td id="c" className="keyBoardCell" onClick={() => mobileLetterDisplay("c")}>C</td> &nbsp;
              <td id="v" className="keyBoardCell" onClick={() => mobileLetterDisplay("v")}>V</td> &nbsp;
              <td id="b" className="keyBoardCell" onClick={() => mobileLetterDisplay("b")}>B</td> &nbsp;
              <td id="n" className="keyBoardCell" onClick={() => mobileLetterDisplay("n")}>N</td> &nbsp;
              <td id="m" className="keyBoardCell" onClick={() => mobileLetterDisplay("m")}>M</td> &nbsp;
              <td id="Enter" className="keyBoardCell" onClick={() => mobileLetterDisplay("Enter")}>Enter</td> &nbsp;
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
