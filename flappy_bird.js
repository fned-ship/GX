/***********************************************  change  */
const  block = document.getElementById("block");
const  block1 = document.getElementById("block1");
const  hole = document.getElementById("hole");
const character = document.getElementById("character");
const game=document.getElementById("game");
const winningMessageElement = document.getElementById('winningMessage');
const winningMessage = document.querySelector('data-winning-message-text');
const restartButton = document.getElementById('restartButton');
const imgBird= document.getElementById("img_bird");
const GX=document.getElementById("GX");
const bar=document.getElementById("bar");
const barr=document.getElementById("barr");
const interstellar = new Audio();
interstellar.src = "https://www.cjoint.com/doc/19_05/IEdtsrkOjUA_interstellar-main-theme-hans-zimmer.mp3";

var  windowWidth=window.screen.width ;//* window.devicePixelRatio ;
var  windowHeight=window.screen.height ;//* window.devicePixelRatio ;
var  user="computer"
var orientLL=false;

var blockW,blockH,gameW,gameH,holeW,holeH,characterW,characterH;

if ( /android|webOS|iPhone|iPad|iPod|blackberry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent) ){//phone and ipad
    user="phone"
    if( window.screen.width<600 ){
        bar.style.width="80%"
    }else{
        bar.style.width="350px"
    }

    if(window.screen.width<=300){
        document.documentElement.style.setProperty('--gx-height', '30px');
        document.documentElement.style.setProperty('--gx-pdg', '40px');
        document.documentElement.style.setProperty('--gx-font', '18px');
    }
    bar.style.backgroundColor="#00000073"

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
                if(window.screen.width>window.screen.height){
                    document.documentElement.style.setProperty('--block-R', `${window.screen.width}px`);
                    document.documentElement.style.setProperty('--block-L', `${-window.screen.width*0.05}px`);
                    game.style.width=`${window.screen.width}px`
                    gameW=window.screen.width
                    game.style.height=`${window.screen.height}px`
                    gameH=window.screen.height
                    //block.style.height=`${window.screen.height}px`
                    //blockH=window.screen.height
                    block1.style.width=`${window.screen.width*0.05}px`
                    block.style.width=`${window.screen.width*0.05}px`
                    blockW=window.screen.width*0.05
                    hole.style.width=`${window.screen.width*0.05}px`
                    holeW=window.screen.width*0.05
                    hole.style.height=`${window.screen.height*0.5}px`//0.4
                    holeH=window.screen.height*0.5//0.25
                    character.style.width=`${window.screen.width*0.1}px`//0.5
                    characterW=window.screen.width*0.1
                    character.style.height=`${window.screen.width*0.1}px`//0.5
                    characterH=window.screen.width*0.1
                    character.style.top=`${window.screen.height/2-characterH/2}px`
                    character.style.left=`${window.screen.width/2-characterW/2}px`
                    block.style.height=`${gameH/2-holeH/2}px`
                    block1.style.height=`${gameH/2-holeH/2}px`
                    block1.style.top=`${gameH/2+holeH/2}px`
                    hole.style.top=`${gameH/2-holeH/2}px`
                    winningMessageElement.style.width=`${gameW}px`
                    winningMessageElement.style.height=`${gameH}px`
                }else{
                game.style.width=`${window.screen.width}px`
                gameW=window.screen.width
                game.style.height=`${window.screen.height}px`
                gameH=window.screen.height
                //block.style.height=`${window.screen.height}px`
                //blockH=window.screen.height
                hole.style.height=`${window.screen.height*0.5}px`//0.4
                holeH=window.screen.height*0.5//0.25
                character.style.width=`${window.screen.width*0.2}px`//0.05
                characterW=window.screen.width*0.2//0.05
                character.style.height=`${window.screen.width*0.2}px`
                characterH=window.screen.width*0.2
                character.style.top=`${window.screen.height/2-characterH/2}px`
                character.style.left=`${window.screen.width/2-characterW/2}px`
                document.documentElement.style.setProperty('--block-R', `${window.screen.width}px`);
                block.style.height=`${gameH/2-holeH/2}px`
                block1.style.height=`${gameH/2-holeH/2}px`
                block1.style.top=`${gameH/2+holeH/2}px`
                hole.style.top=`${gameH/2-holeH/2}px`
                if(window.screen.width>=600){
                    block.style.width=`${window.screen.width*0.08}px`
                    blockW=window.screen.width*0.08
                    block1.style.width=`${window.screen.width*0.08}px`
                    hole.style.width=`${window.screen.width*0.08}px`
                    holeW=window.screen.width*0.08
                    document.documentElement.style.setProperty('--block-L', `${-window.screen.width*0.08}px`);
                }else{
                    block.style.width=`${window.screen.width*0.1}px`
                    blockW=window.screen.width*0.1
                    block1.style.width=`${window.screen.width*0.1}px`
                    hole.style.width=`${window.screen.width*0.1}px`
                    holeW=window.screen.width*0.1
                    document.documentElement.style.setProperty('--block-L', `${-window.screen.width*0.1}px`);
                }
                winningMessageElement.style.width=`${gameW}px`
                winningMessageElement.style.height=`${gameH}px`
                }
            }else if(screen.orientation.type =="landscape-primary" ||  screen.orientation.type =="landscape-landscape-secondary" ){
                orientLL=true;
                //if(window.screen.width>=600){
                    document.documentElement.style.setProperty('--block-R', `${window.screen.width}px`);
                    document.documentElement.style.setProperty('--block-L', `${-window.screen.width*0.05}px`);
                    game.style.width=`${window.screen.width}px`
                    gameW=window.screen.width
                    game.style.height=`${window.screen.height}px`
                    gameH=window.screen.height
                    //block.style.height=`${window.screen.height}px`
                    //blockH=window.screen.height
                    block1.style.width=`${window.screen.width*0.05}px`
                    block.style.width=`${window.screen.width*0.05}px`
                    blockW=window.screen.width*0.05
                    hole.style.width=`${window.screen.width*0.05}px`
                    holeW=window.screen.width*0.05
                    hole.style.height=`${window.screen.height*0.5}px`//0.25
                    holeH=window.screen.height*0.5//0.25//0.4
                    character.style.width=`${window.screen.width*0.1}px`//0.5
                    characterW=window.screen.width*0.1
                    character.style.height=`${window.screen.width*0.1}px`//0.5
                    characterH=window.screen.width*0.1
                    character.style.top=`${window.screen.height/2-characterH/2}px`
                    character.style.left=`${window.screen.width/2-characterW/2}px`
                    block.style.height=`${gameH/2-holeH/2}px`
                    block1.style.height=`${gameH/2-holeH/2}px`
                    block1.style.top=`${gameH/2+holeH/2}px`
                    hole.style.top=`${gameH/2-holeH/2}px`
                    winningMessageElement.style.width=`${gameW}px`
                    winningMessageElement.style.height=`${gameH}px`
            }
                
        }
    }
    onload = new Orientation();
}else{ //computer
    document.documentElement.style.setProperty('--gx-height', '45px');
    document.documentElement.style.setProperty('--gx-pdg', '50px');
    document.documentElement.style.setProperty('--gx-font', '30px');

    document.documentElement.style.setProperty('--block-L', `${-windowWidth*0.35*0.08}px`);
    document.documentElement.style.setProperty('--block-R', `${windowWidth*0.35}px`);
    game.style.width=`${windowWidth*0.35}px`
    gameW=windowWidth*0.35
    game.style.height=`${windowHeight*0.75}px`
    gameH=windowHeight*0.75
    //block.style.height=`${windowHeight*0.75}px`
    //blockH=windowHeight*0.75
    block1.style.width=`${windowWidth*0.35*0.08}px`
    block.style.width=`${windowWidth*0.35*0.08}px`
    blockW=windowWidth*0.35*0.08
    hole.style.width=`${windowWidth*0.35*0.08}px`
    holeW=windowWidth*0.35*0.08
    hole.style.height=`${windowHeight*0.75*0.5}px`//0.25//0.4
    holeH=windowHeight*0.75*0.5//0.25
    character.style.width=`${windowWidth*0.35*0.15}px`//0.04
    characterW=windowWidth*0.35*0.1
    character.style.height=`${windowWidth*0.35*0.15}px`//0.04//0.1
    characterH=windowWidth*0.35*0.1
    character.style.top=`${gameH/2-characterH/2}px`
    character.style.left=`${gameW/2-characterW/2}px`
    block.style.height=`${gameH/2-holeH/2}px`
    block1.style.height=`${gameH/2-holeH/2}px`
    block1.style.top=`${gameH/2+holeH/2}px`
    hole.style.top=`${gameH/2-holeH/2}px`
    GX.style.display="flex"
    winningMessageElement.style.width=`${gameW}px`
    winningMessageElement.style.height=`${gameH}px`
}

//------------------------------------------------  galaxy fold -------------------------------------------------------------
function check(){
    if( window.screen.width<600 ){
        bar.style.width="80%"
    }else{
        bar.style.width="350px"
    }

    if(window.screen.width<=300){
        document.documentElement.style.setProperty('--gx-height', '30px');
        document.documentElement.style.setProperty('--gx-pdg', '40px');
        document.documentElement.style.setProperty('--gx-font', '18px');
    }

    if( windowWidth < window.screen.width && orientLL==false && windowWidth != window.screen.height && user=="phone"  ){//the user just unfolded his phone // big

        document.documentElement.style.setProperty('--block-R', `${window.screen.width}px`);
        document.documentElement.style.setProperty('--block-L', `${-window.screen.width*0.05}px`);
        game.style.width=`${window.screen.width}px`
        gameW=window.screen.width
        game.style.height=`${window.screen.height}px`
        gameH=window.screen.height
        block1.style.width=`${window.screen.width*0.05}px`
        block.style.width=`${window.screen.width*0.05}px`
        blockW=window.screen.width*0.05
        hole.style.width=`${window.screen.width*0.05}px`
        holeW=window.screen.width*0.05
        hole.style.height=`${window.screen.height*0.5}px`
        holeH=window.screen.height*0.5//0.25//0.4
        character.style.width=`${window.screen.width*0.1}px`//0.5
        characterW=window.screen.width*0.1
        character.style.height=`${window.screen.width*0.1}px`//0.5
        characterH=window.screen.width*0.1
        character.style.left=`${window.screen.width/2-characterW/2}px`
        winningMessageElement.style.width=`${gameW}px`
        winningMessageElement.style.height=`${gameH}px`
    }else if( windowWidth > window.screen.width && orientLL==false && windowWidth != window.screen.height && user=="phone"  ){//the user just folded his phone // little
                game.style.width=`${window.screen.width}px`
                gameW=window.screen.width
                game.style.height=`${window.screen.height}px`
                gameH=window.screen.height
                hole.style.height=`${window.screen.height*0.5}px`
                holeH=window.screen.height*0.5//0.25//0.4
                character.style.width=`${window.screen.width*0.2}px`//0.05
                characterW=window.screen.width*0.2//0.05
                character.style.height=`${window.screen.width*0.2}px`
                characterH=window.screen.width*0.2
                character.style.left=`${window.screen.width/2-characterW/2}px`
                document.documentElement.style.setProperty('--block-R', `${window.screen.width}px`);
                if(window.screen.width>=600){
                    block.style.width=`${window.screen.width*0.08}px`
                    blockW=window.screen.width*0.08
                    block1.style.width=`${window.screen.width*0.08}px`
                    hole.style.width=`${window.screen.width*0.08}px`
                    holeW=window.screen.width*0.08
                    document.documentElement.style.setProperty('--block-L', `${-window.screen.width*0.08}px`);
                }else{
                    block.style.width=`${window.screen.width*0.1}px`
                    blockW=window.screen.width*0.1
                    block1.style.width=`${window.screen.width*0.1}px`
                    hole.style.width=`${window.screen.width*0.1}px`
                    holeW=window.screen.width*0.1
                    document.documentElement.style.setProperty('--block-L', `${-window.screen.width*0.1}px`);
                }
                winningMessageElement.style.width=`${gameW}px`
                winningMessageElement.style.height=`${gameH}px`
    }else if( windowWidth == window.screen.width && orientLL==false && windowWidth != window.screen.height && user=="phone" ){//no changes
        if( window.screen.width>window.screen.height ){//unfolded state // big
                    document.documentElement.style.setProperty('--block-R', `${window.screen.width}px`);
                    document.documentElement.style.setProperty('--block-L', `${-window.screen.width*0.05}px`);
                    game.style.width=`${window.screen.width}px`
                    gameW=window.screen.width
                    game.style.height=`${window.screen.height}px`
                    gameH=window.screen.height
                    block1.style.width=`${window.screen.width*0.05}px`
                    block.style.width=`${window.screen.width*0.05}px`
                    blockW=window.screen.width*0.05
                    hole.style.width=`${window.screen.width*0.05}px`
                    holeW=window.screen.width*0.05
                    hole.style.height=`${window.screen.height*0.5}px`
                    holeH=window.screen.height*0.5//0.25//0.4
                    character.style.width=`${window.screen.width*0.1}px`//0.5
                    characterW=window.screen.width*0.1
                    character.style.height=`${window.screen.width*0.1}px`//0.5
                    characterH=window.screen.width*0.1
                    character.style.left=`${window.screen.width/2-characterW/2}px`
                    winningMessageElement.style.width=`${gameW}px`
                    winningMessageElement.style.height=`${gameH}px`
        }else{//folded state // little
                game.style.width=`${window.screen.width}px`
                gameW=window.screen.width
                game.style.height=`${window.screen.height}px`
                gameH=window.screen.height
                hole.style.height=`${window.screen.height*0.5}px`//0.4
                holeH=window.screen.height*0.5//0.25
                character.style.width=`${window.screen.width*0.2}px`//0.05
                characterW=window.screen.width*0.2//0.05
                character.style.height=`${window.screen.width*0.2}px`
                characterH=window.screen.width*0.2
                character.style.left=`${window.screen.width/2-characterW/2}px`
                document.documentElement.style.setProperty('--block-R', `${window.screen.width}px`);
                if(window.screen.width>=600){
                    block.style.width=`${window.screen.width*0.08}px`
                    blockW=window.screen.width*0.08
                    block1.style.width=`${window.screen.width*0.08}px`
                    hole.style.width=`${window.screen.width*0.08}px`
                    holeW=window.screen.width*0.08
                    document.documentElement.style.setProperty('--block-L', `${-window.screen.width*0.08}px`);
                }else{
                    block.style.width=`${window.screen.width*0.1}px`
                    blockW=window.screen.width*0.1
                    block1.style.width=`${window.screen.width*0.1}px`
                    hole.style.width=`${window.screen.width*0.1}px`
                    holeW=window.screen.width*0.1
                    document.documentElement.style.setProperty('--block-L', `${-window.screen.width*0.1}px`);
                }
                winningMessageElement.style.width=`${gameW}px`
                winningMessageElement.style.height=`${gameH}px`
        }
    }
}

function loop(){
    
    check();

    requestAnimationFrame(loop);
}
if(user=="phone"){
    loop();
}
//---------------------------------------------------------------------------------------------------------------------------
var jumping = 0;
var counter = 0;
var canJump=true;


restartButton.addEventListener('click', startGame);

function startGame(){
    winningMessageElement.classList.remove('show');
    character.style.visibility="visible";
    canJump=true;
    interstellar.play();
}

hole.addEventListener('animationiteration', () => {
    //block1.style.bottom="0"
    var random = Math.random()*(gameH-holeH);
    //var htop=gameH+random;
    block.style.height=`${random}px`;
    block1.style.height=`${gameH-random-holeH}px`
    block1.style.top=`${random+holeH}px`
    hole.style.top = random + "px";
    if( winningMessageElement.classList.contains('show')==false ){
        counter++;
    }
});
setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping==0 && canJump ){
        character.style.top = (characterTop+5)+"px";
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    //var cTop = -(gameH-characterTop);
    //var htop=gameH+holeTop
    var htop=holeTop;
    if(           (characterTop>(gameH-characterH/2))   ||   (   (blockLeft<gameW/2+characterW/2)&&(blockLeft>gameW/2-characterW/2)&&( (characterTop<htop)||(characterTop>htop+holeH) )   )         ){
        //alert("Game over. Score: "+(counter-1));
        character.style.visibility="hidden";
        character.style.top = gameH/2-characterH/2 + "px";
        winningMessageElement.classList.add('show');
        canJump=false;
        counter=0;
    }
    barr.innerText=`Score : ${counter}`
},10);

function jump(){
    if(user=="phone"){
        document.documentElement.requestFullscreen();
    }
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6) &&(jumpCount<19) && canJump ){//&&(jumpCount<15)//19
            character.style.top = (characterTop-5)+"px";//5
            //let imgSrc = imgBird.getAttribute("src");
            //let BIRD_IMG = imgSrc == "bird-up.png" ? "bird-down.png" : "bird-up.png";
            //imgBird.setAttribute("src", BIRD_IMG);
        }
        if(jumpCount>20){//20
            clearInterval(jumpInterval);
            //imgBird.setAttribute("src","bird.png");
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
}