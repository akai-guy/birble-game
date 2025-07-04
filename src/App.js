import './App.css';
import rawVal from '../src/validWords.txt';
import rawGuess from '../src/guessWords.txt';
import bsp from '../src/backspace.png'


function App() {
  var media = window.matchMedia("(max-width: 800px)");
  var isMedia = media.matches;

  var rowMobile = 0;
  var wordMobile = "";
  var eListenerAdded = false;
  var inPlay = true;
  genWord();
  if (!isMedia){
    if (document.getElementById("row" + 0)){
      document.getElementById("row" + 0).disabled = false;
    }
  }
  if (document.getElementById('modal')){
    openHelp()
  }


  function mobileLetterDisplay(letter){
    if (!inPlay){
      return"";
    }
    var inputLetter = document.getElementById(letter).innerHTML;
    if (letter==="Enter"){
      submitGuess();
    }
    else{
      var inputVal;
      if (letter==="Backspace"){
        wordMobile = wordMobile.slice(0, wordMobile.length - 1)
        inputVal = document.getElementById("row" + rowMobile).value.toUpperCase();
        document.getElementById("row" + rowMobile).value = inputVal.slice(0, inputVal.length - 1);
        inputVal = inputVal.slice(0, inputVal.length - 1);
      }
      else{
        wordMobile += inputLetter;
        document.getElementById("row" + rowMobile).value += inputLetter;
        inputVal = document.getElementById("row" + rowMobile).value.toUpperCase();
      }
      if (wordMobile.length > 5){
        wordMobile = wordMobile.slice(0, 5);
        document.getElementById("row" + rowMobile).value = document.getElementById("row" + rowMobile).value.slice(0, 5);

        return "";
      }
      wordMobile = inputVal;

      for (var i = 0; i < wordMobile.length; i++){
      document.getElementById("letterCell" + rowMobile + i).innerHTML = wordMobile[i];
      document.getElementById("letterCell" + rowMobile + i).className = "";
      }
      for (var j = wordMobile.length; j < 5; j++){
        document.getElementById("letterCell" + rowMobile + j).innerHTML = "_";
        document.getElementById("letterCell" + rowMobile + j).className = "blank";
      }
    }
  }

  function detectEnterKeypress(event){
    eListenerAdded = true;
    if (event.key === "Enter") {
      event.preventDefault();
      submitGuess();
    }
  }

  function letterDisplay(row){
    rowMobile = row;
    var input = document.getElementById("row" + row); 
    var inputVal = document.getElementById("row" + row).value.toUpperCase();
    
    if (!eListenerAdded){
      input.addEventListener("keypress", event => detectEnterKeypress(event));
    }

    if(!("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(inputVal.slice(inputVal.length - 1)))){
      document.getElementById("row" + row).value = inputVal.slice(0, inputVal.length - 1);
      return "";
    }

    if(wordMobile.length>inputVal.length){
      wordMobile = wordMobile.slice(0,inputVal.length - 1);
    }
    else{
      wordMobile = wordMobile + inputVal.slice(inputVal.length - 1);
    }
    
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
    document.getElementById("Backspace").className = "keyBoardCell";
    document.getElementById("Enter").className = "keyBoardCell";
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
        inPlay = true;
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
        document.getElementById("letterCell" + r + c).className = "blank"
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
            if (!(document.getElementById("" + letterTwo).className === "keyBoardCell keyGreen")){
              document.getElementById("" + letterTwo).className = "keyBoardCell keyYellow";
            }

            chosenWord = chosenWord.replace(input[j], ' ');
          }
        }
        
        rowMobile = rowTarget + 1;
        wordMobile ="";
        eListenerAdded = false;

        document.getElementById("row" + rowTarget).disabled = true;
        if (input === targetWord){

          if(rowMobile - 1 === 0){
            document.getElementById("message").innerHTML = "You have superpowers.";
          }
          if(rowMobile - 1 === 1){
            document.getElementById("message").innerHTML = "GREAT JOB!!! You are amazing :)";
          }
          if(rowMobile - 1 === 2){
            document.getElementById("message").innerHTML = "FANTASTIC! You win! :)";
          }
          if(rowMobile - 1 === 3){
            document.getElementById("message").innerHTML = "AWESOME! You win! :)";
          }
          if(rowMobile - 1 === 4){
            document.getElementById("message").innerHTML = "NICE! You win! :)";
          }
          if(rowMobile - 1 === 5){
            document.getElementById("message").innerHTML = "PHEW! Close one! :)";
          }
          if (targetWord === "SATAN" || targetWord === "DEVIL"){
            document.getElementById("message").innerHTML = "May you win over him today :)";
          }
          if (targetWord === "JESUS"){
            document.getElementById("message").innerHTML = "May he be with you today :)";
          }
          if (targetWord === "CALEB"){
            document.getElementById("message").innerHTML = "Its me I made the game :)";
          }
          document.getElementById("message").className = "message messageReveal";
          rowMobile = 0;
          updateScore();
          document.getElementById("cell" + rowTarget + 0).className = "birbCell green winAnim0";
          document.getElementById("cell" + rowTarget + 1).className = "birbCell green winAnim1";
          document.getElementById("cell" + rowTarget + 2).className = "birbCell green winAnim2";
          document.getElementById("cell" + rowTarget + 3).className = "birbCell green winAnim3";
          document.getElementById("cell" + rowTarget + 4).className = "birbCell green winAnim4";
          document.getElementById("newGame").focus();
          inPlay = false;
          return"";
        }
        if(rowTarget===5){
          document.getElementById("message").innerHTML = "You lost bro. The word was: " + targetWord;
          document.getElementById("message").className = "message messageReveal";

          document.getElementById("cell00").className = "birbCell yellow";
          document.getElementById("cell01").className = "birbCell yellow";
          document.getElementById("cell02").className = "birbCell yellow";
          document.getElementById("cell03").className = "birbCell yellow";
          document.getElementById("cell04").className = "birbCell yellow";
          document.getElementById("cell10").className = "birbCell yellow";
          document.getElementById("cell11").className = "birbCell red";
          document.getElementById("cell12").className = "birbCell yellow";
          document.getElementById("cell13").className = "birbCell red";
          document.getElementById("cell14").className = "birbCell yellow";
          document.getElementById("cell20").className = "birbCell yellow";
          document.getElementById("cell21").className = "birbCell yellow";
          document.getElementById("cell22").className = "birbCell yellow";
          document.getElementById("cell23").className = "birbCell yellow";
          document.getElementById("cell24").className = "birbCell yellow";
          document.getElementById("cell30").className = "birbCell yellow";
          document.getElementById("cell31").className = "birbCell red";
          document.getElementById("cell32").className = "birbCell red";
          document.getElementById("cell33").className = "birbCell red";
          document.getElementById("cell34").className = "birbCell yellow";
          document.getElementById("cell40").className = "birbCell red";
          document.getElementById("cell41").className = "birbCell yellow";
          document.getElementById("cell42").className = "birbCell yellow";
          document.getElementById("cell43").className = "birbCell yellow";
          document.getElementById("cell44").className = "birbCell red";
          document.getElementById("cell50").className = "birbCell yellow";
          document.getElementById("cell51").className = "birbCell yellow";
          document.getElementById("cell52").className = "birbCell yellow";
          document.getElementById("cell53").className = "birbCell yellow";
          document.getElementById("cell54").className = "birbCell yellow";

          rowMobile = 0;
          document.getElementById("newGame").focus();
          inPlay = false;
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
    var input = document.getElementById("row" + rowMobile).value.toUpperCase();
    processGuess(input, rowMobile);
  }

  function focus(e){
    if(!isMedia){
      if (e.relatedTarget === null) {
          e.target.focus();
      }
    }
  }

  function updateScore(){
    localStorage.clickcount = Number(localStorage.clickcount) + 1;
    document.getElementById("score").innerHTML = "Score: " + localStorage.clickcount;
  }

  function Score() {
    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount);
    } else {
      localStorage.clickcount = 0;
    }
    return (<div>Score: {localStorage.clickcount}</div>)
  }

  function openHelp(){
    document.getElementById('modal').className = "modal open";
    document.getElementById('modaldiv').className = "overlay open";
  }
  function closeHelp(){
    document.getElementById('modal').className = "modal close";
    document.getElementById('modaldiv').className = "overlay blurClose";
    if(!isMedia){
      document.getElementById("row" + rowMobile).focus();
    }
  }

  return (
    <div className="App">
      <div className="title">
        <span className="titleText">&nbsp;&nbsp;&nbsp;&nbsp;<strong>BIrBLE</strong>&nbsp;</span>
        <button id="Help" onClick={openHelp}>Hi!</button>
      </div>
      <section id='modal' className="modal">
        <div>
          <p>
            Welcome to BIrBLE!
            {// (It's BIBLE with with an r in it which kinda sounds like [REDACTED WORD GAME], get it do you get it do you get it)
            }
          </p>
          <p>
            {//It's [REDACTED WORD GAME] but you have 6 guesses to guess a randomly chosen Bible-related word (some more related than others).
            }
            You have 6 guesses to guess a randomly chosen Bible-related word (some more related than others).
          </p>
          <table>
            <tr>
              <td className="greenM"><label className="cellContentModal">C</label></td>
              <td className="greenM"><label className="cellContentModal">A</label></td>
              <td className="greenM"><label className="cellContentModal">L</label></td>
              <td className="greenM"><label className="cellContentModal">E</label></td>
              <td className="greenM"><label className="cellContentModal">B</label></td>
            </tr>
          </table>
          <p>
            With every guess, each letter will turn green if its in the target word in the <strong>correct position</strong>, it will turn yellow if its in the target word in the <strong>wrong position</strong>, and it will turn red if its <strong>not in the target word.</strong>
          </p>
          <table>
            <tr>
              <td className="yellowM"><label className="cellContentModal">E</label></td>
              <td className="greenM"><label className="cellContentModal">A</label></td>
              <td className="redM"><label className="cellContentModal">R</label></td>
              <td className="redM"><label className="cellContentModal">T</label></td>
              <td className="redM"><label className="cellContentModal">H</label></td>
            </tr>
          </table>
          <p>
            The amount of greens/yellows are limited to the number of times a letter appears in the target word. For example, if the target word is CALEB and you guess PEACE, only the first E will turn yellow as there is only one E. If you guess PETER, the <strong>last</strong> E will turn green because there is only one E in CALEB.
          </p>
          <table>
            <tr>
              <td className="redM"><label className="cellContentModal">P</label></td>
              <td className="yellowM"><label className="cellContentModal">E</label></td>
              <td className="yellowM"><label className="cellContentModal">A</label></td>
              <td className="yellowM"><label className="cellContentModal">C</label></td>
              <td className="redM"><label className="cellContentModal">E</label></td>
            </tr>
            <tr>
              <td className="redM"><label className="cellContentModal">P</label></td>
              <td className="redM"><label className="cellContentModal">E</label></td>
              <td className="redM"><label className="cellContentModal">T</label></td>
              <td className="greenM"><label className="cellContentModal">E</label></td>
              <td className="redM"><label className="cellContentModal">R</label></td>
            </tr>
          </table>
          <p>Thanks for playing!</p>
        </div>
        <div>
          <button id="exitModal" className="exitMod" onClick={closeHelp}>Close</button>
        </div>
      </section>
      <div id='modaldiv' className="overlay hidden"></div>
      <div className="game">
        <span id="score"><Score/></span>
        <div className="gameTable">
          <table className="birbleTable">
            <tr className="letterRow0">
              <td className="birbCell" id="cell00"><span className="blank" id="letterCell00" for="row0">_</span></td>
              <td className="birbCell" id="cell01"><span className="blank" id="letterCell01" for="row0">_</span></td>
              <td className="birbCell" id="cell02"><span className="blank" id="letterCell02" for="row0">_</span></td>
              <td className="birbCell" id="cell03"><span className="blank" id="letterCell03" for="row0">_</span></td>
              <td className="birbCell" id="cell04"><span className="blank" id="letterCell04" for="row0">_</span></td>
              <input id="row0" autoComplete='false' className="birbleRow" type="text" disabled maxLength="5" onChange={() => letterDisplay(0)} onBlur={e => focus(e)}></input>
            </tr>
            <tr className="letterRow1">
              <td className="birbCell" id="cell10"><span className="blank" id="letterCell10" for="row1">_</span></td>
              <td className="birbCell" id="cell11"><span className="blank" id="letterCell11" for="row1">_</span></td>
              <td className="birbCell" id="cell12"><span className="blank" id="letterCell12" for="row1">_</span></td>
              <td className="birbCell" id="cell13"><span className="blank" id="letterCell13" for="row1">_</span></td>
              <td className="birbCell" id="cell14"><span className="blank" id="letterCell14" for="row1">_</span></td>
              <input id="row1" autoComplete='false' className="birbleRow" type="text" disabled maxLength="5" onChange={() => letterDisplay(1)} onBlur={e => focus(e)}></input>
            </tr>
            <tr className="letterRow2">
              <td className="birbCell" id="cell20"><span className="blank" id="letterCell20" for="row2">_</span></td>
              <td className="birbCell" id="cell21"><span className="blank" id="letterCell21" for="row2">_</span></td>
              <td className="birbCell" id="cell22"><span className="blank" id="letterCell22" for="row2">_</span></td>
              <td className="birbCell" id="cell23"><span className="blank" id="letterCell23" for="row2">_</span></td>
              <td className="birbCell" id="cell24"><span className="blank" id="letterCell24" for="row2">_</span></td>
              <input id="row2" autoComplete='false' className="birbleRow" type="text" disabled maxLength="5" onChange={() => letterDisplay(2)} onBlur={e => focus(e)}></input>
            </tr>
            <tr className="letterRow3">
              <td className="birbCell" id="cell30"><label className="blank" id="letterCell30" for="row3">_</label></td>
              <td className="birbCell" id="cell31"><label className="blank" id="letterCell31" for="row3">_</label></td>
              <td className="birbCell" id="cell32"><label className="blank" id="letterCell32" for="row3">_</label></td>
              <td className="birbCell" id="cell33"><label className="blank" id="letterCell33" for="row3">_</label></td>
              <td className="birbCell" id="cell34"><label className="blank" id="letterCell34" for="row3">_</label></td>
              <input id="row3" autoComplete='false' className="birbleRow" type="text" disabled maxLength="5" onChange={() => letterDisplay(3)} onBlur={e => focus(e)}></input>
            </tr>
            <tr className="letterRow4">
              <td className="birbCell" id="cell40"><label className="blank" id="letterCell40" for="row4">_</label></td>
              <td className="birbCell" id="cell41"><label className="blank" id="letterCell41" for="row4">_</label></td>
              <td className="birbCell" id="cell42"><label className="blank" id="letterCell42" for="row4">_</label></td>
              <td className="birbCell" id="cell43"><label className="blank" id="letterCell43" for="row4">_</label></td>
              <td className="birbCell" id="cell44"><label className="blank" id="letterCell44" for="row4">_</label></td>
              <input id="row4" autoComplete='false' className="birbleRow" type="text" disabled maxLength="5" onChange={() => letterDisplay(4)} onBlur={e => focus(e)}></input>
            </tr>
            <tr className="letterRow5">
              <td className="birbCell" id="cell50"><label className="blank" id="letterCell50" for="row5">_</label></td>
              <td className="birbCell" id="cell51"><label className="blank" id="letterCell51" for="row5">_</label></td>
              <td className="birbCell" id="cell52"><label className="blank" id="letterCell52" for="row5">_</label></td>
              <td className="birbCell" id="cell53"><label className="blank" id="letterCell53" for="row5">_</label></td>
              <td className="birbCell" id="cell54"><label className="blank" id="letterCell54" for="row5">_</label></td>
              <input id="row5" autoComplete='false' className="birbleRow" type="text" disabled maxLength="5" onChange={() => letterDisplay(5)} onBlur={e => focus(e)}></input>
            </tr>
          </table>
        </div>
        <div id="other">
          <button id="newGame" onClick={genWord}>New Game</button>
          <input id="wordToGuess" autoComplete='false' type="text" maxLength={5} minLength={5}></input>
          <div id="message" className="message messageHidden"></div>
        </div>
        <div className="keyboard">
          <table className="keyBoardRow">
            <tr>
              <td id="q" className="keyBoardCell" onClick={() => mobileLetterDisplay("q")}>Q</td> 
              <td id="w" className="keyBoardCell" onClick={() => mobileLetterDisplay("w")}>W</td> 
              <td id="e" className="keyBoardCell" onClick={() => mobileLetterDisplay("e")}>E</td> 
              <td id="r" className="keyBoardCell" onClick={() => mobileLetterDisplay("r")}>R</td> 
              <td id="t" className="keyBoardCell" onClick={() => mobileLetterDisplay("t")}>T</td> 
              <td id="y" className="keyBoardCell" onClick={() => mobileLetterDisplay("y")}>Y</td> 
              <td id="u" className="keyBoardCell" onClick={() => mobileLetterDisplay("u")}>U</td> 
              <td id="i" className="keyBoardCell" onClick={() => mobileLetterDisplay("i")}>I</td> 
              <td id="o" className="keyBoardCell" onClick={() => mobileLetterDisplay("o")}>O</td> 
              <td id="p" className="keyBoardCell" onClick={() => mobileLetterDisplay("p")}>P</td>
              <td id="Backspace" className="keyBoardCell"><img id="bspImg" src={bsp} alt='br' onClick={() => mobileLetterDisplay("Backspace")}></img></td> &nbsp;
            </tr>
          </table>
          <table className="keyBoardRow">
            <tr>
              <td id="a" className="keyBoardCell" onClick={() => mobileLetterDisplay("a")}>A</td>
              <td id="s" className="keyBoardCell" onClick={() => mobileLetterDisplay("s")}>S</td>
              <td id="d" className="keyBoardCell" onClick={() => mobileLetterDisplay("d")}>D</td>
              <td id="f" className="keyBoardCell" onClick={() => mobileLetterDisplay("f")}>F</td>
              <td id="g" className="keyBoardCell" onClick={() => mobileLetterDisplay("g")}>G</td>
              <td id="h" className="keyBoardCell" onClick={() => mobileLetterDisplay("h")}>H</td>
              <td id="j" className="keyBoardCell" onClick={() => mobileLetterDisplay("j")}>J</td>
              <td id="k" className="keyBoardCell" onClick={() => mobileLetterDisplay("k")}>K</td>
              <td id="l" className="keyBoardCell" onClick={() => mobileLetterDisplay("l")}>L</td>
            </tr>
          </table>
          <table className="keyBoardRow">
            <tr>
              <td id="z" className="keyBoardCell" onClick={() => mobileLetterDisplay("z")}>Z</td> 
              <td id="x" className="keyBoardCell" onClick={() => mobileLetterDisplay("x")}>X</td> 
              <td id="c" className="keyBoardCell" onClick={() => mobileLetterDisplay("c")}>C</td> 
              <td id="v" className="keyBoardCell" onClick={() => mobileLetterDisplay("v")}>V</td> 
              <td id="b" className="keyBoardCell" onClick={() => mobileLetterDisplay("b")}>B</td> 
              <td id="n" className="keyBoardCell" onClick={() => mobileLetterDisplay("n")}>N</td> 
              <td id="m" className="keyBoardCell" onClick={() => mobileLetterDisplay("m")}>M</td> 
              <td id="Enter" className="keyBoardCell" onClick={() => mobileLetterDisplay("Enter")}>Enter</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
