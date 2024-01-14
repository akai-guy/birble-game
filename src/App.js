import './App.css';
import rawVal from './validWords.txt';
import rawGuess from './guessWords.txt';


function App() {
  genWord();
  function letterDisplay(row){
    var input = document.getElementById("row" + row)
    var inputVal = document.getElementById("row" + row).value.toUpperCase();

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
    for (var i = 0; i < inputVal.length; i++){
      document.getElementById("letterCell" + row + i).innerHTML = inputVal[i];
      document.getElementById("letterCell" + row + i).className -= " blank";
    }
    for (var j = inputVal.length; j < 5; j++){
      document.getElementById("letterCell" + row + j).innerHTML = "_";
      document.getElementById("letterCell" + row + j).className += " blank";
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
        text+="\r\n"
        for (var i in text){
          if (text[i] === '\n'){
            words.push(text.slice(i-6,i-1))
          }
        }
        var chosenWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
        document.getElementById("wordToGuess").value = chosenWord;
        resetCells();
        resetFields();
        resetKeyBoard();
        document.getElementById("row0").focus();
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
    document.getElementById("row" + 0).disabled = false;
    document.getElementById("row" + 0).focus();
    document.getElementById("row" + 1).disabled = true;
    document.getElementById("row" + 2).disabled = true;
    document.getElementById("row" + 3).disabled = true;
    document.getElementById("row" + 4).disabled = true;
    document.getElementById("row" + 5).disabled = true;
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
        text+="\r\n"
        for (var word in text){
          if (text[word] === '\n'){
            words.push(text.slice(word-6,word-1))
          }
            }

        if (input.length !== 5){
          document.getElementById("message").innerHTML = "Too short!";
          document.getElementById("message").className = "message messageReveal";
          document.getElementById("row" + rowTarget).focus();
          return "";
        }
        if (!words.includes(input.toLowerCase())){
          document.getElementById("message").innerHTML = "Not a valid guess >:(";
          document.getElementById("message").className = "message messageReveal";
          document.getElementById("row" + rowTarget).focus();
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
            document.getElementById("" + letterOne).className = "keyBoardCell keyRed";
          }
        }

        for(var j=0;j<5;j++){
          var letterTwo = input[j].toLowerCase();
          if(chosenWord.includes(input[j]) && !(targetWord[j] === input[j])){
            document.getElementById("cell" + rowTarget + j).className = "birbCell yellow";
            document.getElementById("" + letterTwo).className = "keyBoardCell keyYellow";

            chosenWord = chosenWord.replace(input[j], ' ');
          }
        }
        
        document.getElementById("row" + rowTarget).disabled = true;
        if (input === targetWord){
          document.getElementById("message").innerHTML = "YOU WIN! :)";
          document.getElementById("message").className = "message messageReveal";
          return"";
        }
        if(rowTarget===5){
          document.getElementById("message").innerHTML = "You lost bro. The word was: " + targetWord;
          document.getElementById("message").className = "message messageReveal";
          return "";
        }
        document.getElementById("row" + (rowTarget + 1)).disabled = false;
        document.getElementById("row" + (rowTarget + 1)).focus();
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
    alert("It's Wordle but you're guessing a Bible-related word. If you don't know how to play Wordle, go on their site and look at their rules.");
    var rowTarget = 0;
    for (var row=0;row<6;row++){
      if(document.getElementById("row" + row).value){
        rowTarget = row;
      }
    }
    document.getElementById("row" + rowTarget).focus();
  }

  return (
    <div className="App">
      <div className="title">
        <span className="titleText">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BIrBLE&nbsp;&nbsp;&nbsp;</span>
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
              <input id="row0" className="birbleRow" type="text" maxLength={5} minLength={5} onChange={() => letterDisplay(0)}
                onBlur={e => {
                if (e.relatedTarget === null) {
                    e.target.focus();
                }
              }}></input>
            </tr>
            <tr className="letterRow1">
              <td className="birbCell" id="cell10"><label className="cellContent blank" id="letterCell10" for="row1">_</label></td>
              <td className="birbCell" id="cell11"><label className="cellContent blank" id="letterCell11" for="row1">_</label></td>
              <td className="birbCell" id="cell12"><label className="cellContent blank" id="letterCell12" for="row1">_</label></td>
              <td className="birbCell" id="cell13"><label className="cellContent blank" id="letterCell13" for="row1">_</label></td>
              <td className="birbCell" id="cell14"><label className="cellContent blank" id="letterCell14" for="row1">_</label></td>
              <input id="row1" className="birbleRow" type="text" disabled maxLength={5} minLength={5} onChange={() => letterDisplay(1)} onBlur={e => {
                if (e.relatedTarget === null) {
                    e.target.focus();
                }
              }}></input>
            </tr>
            <tr className="letterRow2">
              <td className="birbCell" id="cell20"><label className="cellContent blank" id="letterCell20" for="row2">_</label></td>
              <td className="birbCell" id="cell21"><label className="cellContent blank" id="letterCell21" for="row2">_</label></td>
              <td className="birbCell" id="cell22"><label className="cellContent blank" id="letterCell22" for="row2">_</label></td>
              <td className="birbCell" id="cell23"><label className="cellContent blank" id="letterCell23" for="row2">_</label></td>
              <td className="birbCell" id="cell24"><label className="cellContent blank" id="letterCell24" for="row2">_</label></td>
              <input id="row2" className="birbleRow" type="text" disabled maxLength={5} minLength={5} onChange={() => letterDisplay(2)} onBlur={e => {
                if (e.relatedTarget === null) {
                    e.target.focus();
                }
              }}></input>
            </tr>
            <tr className="letterRow3">
              <td className="birbCell" id="cell30"><label className="cellContent blank" id="letterCell30" for="row3">_</label></td>
              <td className="birbCell" id="cell31"><label className="cellContent blank" id="letterCell31" for="row3">_</label></td>
              <td className="birbCell" id="cell32"><label className="cellContent blank" id="letterCell32" for="row3">_</label></td>
              <td className="birbCell" id="cell33"><label className="cellContent blank" id="letterCell33" for="row3">_</label></td>
              <td className="birbCell" id="cell34"><label className="cellContent blank" id="letterCell34" for="row3">_</label></td>
              <input id="row3" className="birbleRow" type="text" disabled maxLength={5} minLength={5} onChange={() => letterDisplay(3)} onBlur={e => {
                if (e.relatedTarget === null) {
                    e.target.focus();
                }
              }}></input>
            </tr>
            <tr className="letterRow4">
              <td className="birbCell" id="cell40"><label className="cellContent blank" id="letterCell40" for="row4">_</label></td>
              <td className="birbCell" id="cell41"><label className="cellContent blank" id="letterCell41" for="row4">_</label></td>
              <td className="birbCell" id="cell42"><label className="cellContent blank" id="letterCell42" for="row4">_</label></td>
              <td className="birbCell" id="cell43"><label className="cellContent blank" id="letterCell43" for="row4">_</label></td>
              <td className="birbCell" id="cell44"><label className="cellContent blank" id="letterCell44" for="row4">_</label></td>
              <input id="row4" className="birbleRow" type="text" disabled maxLength={5} minLength={5} onChange={() => letterDisplay(4)} onBlur={e => {
                if (e.relatedTarget === null) {
                    e.target.focus();
                }
              }}></input>
            </tr>
            <tr className="letterRow5">
              <td className="birbCell" id="cell50"><label className="cellContent blank" id="letterCell50" for="row5">_</label></td>
              <td className="birbCell" id="cell51"><label className="cellContent blank" id="letterCell51" for="row5">_</label></td>
              <td className="birbCell" id="cell52"><label className="cellContent blank" id="letterCell52" for="row5">_</label></td>
              <td className="birbCell" id="cell53"><label className="cellContent blank" id="letterCell53" for="row5">_</label></td>
              <td className="birbCell" id="cell54"><label className="cellContent blank" id="letterCell54" for="row5">_</label></td>
              <input id="row5" className="birbleRow" type="text" disabled maxLength={5} minLength={5} onChange={() => letterDisplay(5)} onBlur={e => {
                if (e.relatedTarget === null) {
                    e.target.focus();
                }
              }}></input>
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
              <td id="q" className="keyBoardCell">Q</td> &nbsp;
              <td id="w" className="keyBoardCell">W</td> &nbsp;
              <td id="e" className="keyBoardCell">E</td> &nbsp;
              <td id="r" className="keyBoardCell">R</td> &nbsp;
              <td id="t" className="keyBoardCell">T</td> &nbsp;
              <td id="y" className="keyBoardCell">Y</td> &nbsp;
              <td id="u" className="keyBoardCell">U</td> &nbsp;
              <td id="i" className="keyBoardCell">I</td> &nbsp;
              <td id="o" className="keyBoardCell">O</td> &nbsp;
              <td id="p" className="keyBoardCell">P</td> &nbsp;
            </tr>
          </table>
          <table className="keyBoardRow">
            <tr>
              <td id="a" className="keyBoardCell">A</td> &nbsp;
              <td id="s" className="keyBoardCell">S</td> &nbsp;
              <td id="d" className="keyBoardCell">D</td> &nbsp;
              <td id="f" className="keyBoardCell">F</td> &nbsp;
              <td id="g" className="keyBoardCell">G</td> &nbsp;
              <td id="h" className="keyBoardCell">H</td> &nbsp;
              <td id="j" className="keyBoardCell">J</td> &nbsp;
              <td id="k" className="keyBoardCell">K</td> &nbsp;
              <td id="l" className="keyBoardCell">L</td> &nbsp;
            </tr>
          </table>
          <table className="keyBoardRow">
            <tr>
              <td id="z" className="keyBoardCell">Z</td> &nbsp;
              <td id="x" className="keyBoardCell">X</td> &nbsp;
              <td id="c" className="keyBoardCell">C</td> &nbsp;
              <td id="v" className="keyBoardCell">V</td> &nbsp;
              <td id="b" className="keyBoardCell">B</td> &nbsp;
              <td id="n" className="keyBoardCell">N</td> &nbsp;
              <td id="m" className="keyBoardCell">M</td> &nbsp;
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
