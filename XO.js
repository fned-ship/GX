
var  windowWidth=window.screen.width ;//* window.devicePixelRatio ;
var  windowHeight=window.screen.height ;//* window.devicePixelRatio ;
var  orientLL=false;
var  user="computer" 
const whiteBoard=document.getElementById("white_board");
const rotate=document.getElementById("rotate");
const GX=document.getElementById("GX");
const bar=document.getElementById("bar");
// all the phones , ipads and computers
if ( /android|webOS|iPhone|iPad|iPod|blackberry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent) ){//phone and ipad
    user="phone";
    if( window.screen.width<600 ){
        GX.style.width="80%"
        bar.style.width="80%"
    }else{
        GX.style.width="350px"
        bar.style.width="350px"
    } 

    if(window.screen.width<=300){
        document.documentElement.style.setProperty('--gx-height', '30px');
        document.documentElement.style.setProperty('--gx-pdg', '40px');
        document.documentElement.style.setProperty('--gx-font', '18px');
    }

    class Orientation{
        constructor(){
            addEventListener("load",()=>{
                this.orientation();
            });
            addEventListener("orientationchange",()=>{
                this.orientation();
            });
        }

        orientation(){
            if(screen.orientation.type =="portrait-primary" || screen.orientation.type =="portrait-secondary"  ){
                orientLL=false;
                if( window.screen.width>window.screen.height ){
                    document.documentElement.style.setProperty('--cell-size', `${window.screen.height/3-50}px`);
                }else{
                    document.documentElement.style.setProperty('--cell-size', `${window.screen.width/3-10}px`);
                    GX.style.display="flex"
                    bar.style.display="flex"
                }
                whiteBoard.style.display="none"
                rotate.style.display="none"
            }else if(screen.orientation.type =="landscape-primary" ||  screen.orientation.type =="landscape-landscape-secondary" ){
                orientLL=true;
                if(window.screen.height>=800){
                    document.documentElement.style.setProperty('--cell-size', `${window.screen.height/3-100}px`);
                    GX.style.display="flex"
                    bar.style.display="flex"
                }else{
                    whiteBoard.style.display="block"
                    GX.style.display="none"
                    bar.style.display="none"
                    rotate.style.display="block"
                    rotate.style.width="100px"
                    rotate.style.position="absolute"
                    rotate.style.top= "50%"
                    rotate.style.left = "50%"
                    rotate.style.transform="translate(-50%,-50%)"
                }
            };
        }
    }
    onload = new Orientation();
}else{ //computer
    document.documentElement.style.setProperty('--cell-size', '110px');

    document.documentElement.style.setProperty('--gx-height', '45px');
    document.documentElement.style.setProperty('--gx-pdg', '50px');
    document.documentElement.style.setProperty('--gx-font', '30px');

    GX.style.display="flex"
    GX.style.width="350px"
    bar.style.display="flex"
    bar.style.width="350px"
}

//full screen

function Fscreen(){
  if(user=="phone"){
    document.documentElement.requestFullscreen();
  }
}

//galaxy fold

function check(){
    if( windowWidth < window.screen.width && orientLL==false && windowWidth != window.screen.height && user=="phone"  ){
        document.documentElement.style.setProperty('--cell-size', `${window.screen.height/3-50}px`);
        GX.style.display="none"
        bar.style.display="none"
        //console.log('unfolded')
    }else if( windowWidth > window.screen.width && orientLL==false && windowWidth != window.screen.height && user=="phone"  ){
        //console.log('folded')
        document.documentElement.style.setProperty('--cell-size', `${window.screen.width/3-10}px`);
        GX.style.display="flex"
        bar.style.display="flex"
        if(window.screen.width<=300){
            GX.style.width="80%"
            bar.style.width="80%"
            document.documentElement.style.setProperty('--gx-height', '30px');
            document.documentElement.style.setProperty('--gx-pdg', '40px');
            document.documentElement.style.setProperty('--gx-font', '18px');
        }

    }else if( windowWidth == window.screen.width && orientLL==false && windowWidth != window.screen.height && user=="phone" ){
        if( window.screen.width>window.screen.height ){
            document.documentElement.style.setProperty('--cell-size', `${window.screen.height/3-50}px`);
        }else{
            document.documentElement.style.setProperty('--cell-size', `${window.screen.width/3-10}px`);
            GX.style.display="flex"
            bar.style.display="flex"
            if(window.screen.width<=300){
                GX.style.width="80%"
                bar.style.width="80%"
                document.documentElement.style.setProperty('--gx-height', '30px');
                document.documentElement.style.setProperty('--gx-pdg', '40px');
                document.documentElement.style.setProperty('--gx-font', '18px');
            }
        }
        whiteBoard.style.display="none"
        rotate.style.display="none"
        
    }
}

function loop(){
    
    check();

    requestAnimationFrame(loop);
}

loop();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const WIN = new Audio();
WIN.src = "win.mp3";
var X_CLASS = 'x'
var CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const restartButton1 = document.getElementById('restartButton1');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const OscoreText = document.querySelector('[Oscore]');
const XscoreText = document.querySelector('[Xscore]');
const barWin=document.querySelectorAll('[data-cell-w]');
const boardWin=document.getElementById("boardWin");
let circleTurn=true;
var Xscore=0;
var Oscore=0;

startGame()

restartButton.addEventListener('click', startGame)
restartButton1.addEventListener('click', startGame1)

function startGame1() {
  //X_CLASS = X_CLASS=='x' ? 'circle' : 'x' ; 
  //CIRCLE_CLASS = CIRCLE_CLASS=='circle' ? 'x' : 'circle' ;
  Xscore=0;
  Oscore=0;
  XscoreText.innerText = `X : ${Xscore}`
  OscoreText.innerText = `O : ${Xscore}`
  circleTurn = false ;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
  boardWin.style.zIndex="5"
  for(var i=0;i<barWin.length;i++){
    if(i<6 &&  i>2){
      barWin[i].style.width="0"
    }else{
      barWin[i].style.height="0"
    }
  }
}

function startGame() {
  circleTurn = circleTurn ? false : true ;
  //circleTurn=false;
  console.log("circleturn : " + circleTurn )
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })

  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
  boardWin.style.zIndex="5"
  for(var i=0;i<barWin.length;i++){
    if(i<6 &&  i>2){
      barWin[i].style.width="0"
    }else{
      barWin[i].style.height="0"
    }
  }

}


function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell,currentClass)
    if (checkWin(currentClass)) {
        WIN.play();
        endGame(false,currentClass)
        //console.log(currentClass)
        var BP=checkWinPosition(currentClass);
        if(BP!=-1){
            console.log(WINNING_COMBINATIONS[BP]);
            if(BP<6 && BP>2 ){
                boardWin.style.zIndex="20"
                barWin[BP].style.width="calc(var(--cell-size) * 3)"
            }else{
                boardWin.style.zIndex="20"
                barWin[BP].style.height="calc(var(--cell-size) * 3)"
            }
        }
    }else if (isDraw()) {
        endGame(true,currentClass)
    }else {
        swapTurns()
        setBoardHoverClass()
    }
}

//function
function endGame(draw,Class) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
      if( Class=='circle' ){
        winningMessageTextElement.innerText = `O's Wins!`
      }else{
        winningMessageTextElement.innerText = `X's Wins!`
      }

      if( Class=='circle' ){
        Oscore+=1;
        OscoreText.innerText = `O : ${Oscore}`
      }else{
        Xscore+=1;
        XscoreText.innerText = `X : ${Xscore}`
      }
    }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function checkWinPosition(currentClass) {
    var barCmb=-1;
    for(var i=0;i<WINNING_COMBINATIONS.length;i++){
        var uncomplete=true;
        for(var j=0;j<WINNING_COMBINATIONS[i].length;j++){
            uncomplete=cellElements[WINNING_COMBINATIONS[i][j]].classList.contains(currentClass) && uncomplete
        }
        if(uncomplete){
            barCmb=i;
        }
    }
    return barCmb ;
}
