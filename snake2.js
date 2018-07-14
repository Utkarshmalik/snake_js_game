//I have fixed some issues but generated some other like opposite direction blocking is not present
//secondly colloision with itself it is just eating it self and not ending the game


const status=document.getElementsByClassName("status")[0];
const userName_2=document.getElementsByClassName("username")[1]; 
score_screen=document.getElementsByClassName("score-screen")[0];


//for audio
let dead = new Audio();
let eat = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";


let gameOn=true;  //flag to know when we have to start the game
let btnP;  //this is to set the game interval
let temp_interval;

let points=0;
positionX=positionY=10;
 tcX=60;//the tiles count in x direction
 tcY=30;//the tiles count in y direction
 gs=20;//grid size
TargetX=TargetY=15;//
xv=yv=0;//velocity in x and y direction
let snake=[];
tail = 3;
let firstTime=true;

//because we have to keep moving the snake ,defining the velocity will be better
//so this function changes the velocity in every direction
let direction="right";
let isReverseDirection =false;
let keyPressed=false;

const keyPush=(evt)=>{
    switch(evt.keyCode) {
        case 37:
        if(direction==="right")
        {
          isReverseDirection=true;
        }
    else
         {
            xv=-1;yv=0;
            direction="left"
          }
            break;
        case 38:
            if(direction==="down")
            {
              isReverseDirection=true;
            }else{
            xv=0;yv=-1;
            direction="up"
          }
            break;
        case 39:
         if(direction==="left")
          {
            isReverseDirection=true;
          }else
            {
             xv=1;yv=0;
            direction="right"
          }
            break;
        case 40:
            if(direction==="up")
        {
          isReverseDirection=true;
        }else{
          direction="down";
         xv=0;yv=1;
        }
            break;
    }
    keyPressed=true;
}

//random target
const newTarget=()=>{
   TargetX=Math.floor(Math.random()*tcX);
      TargetY=Math.floor(Math.random()*tcY);
}

//function that displays the snake
const updateField= ()=>
{
  for(let i=0;i<snake.length;i++) //looping through snake
{
 ctx.fillStyle="white";

    ctx.fillRect(snake[i].x*gs,snake[i].y*gs,gs-2,gs-2);//for border because stroke rect is not working
    if(firstTime){
        if(snake[i].x==positionX && snake[i].y==positionY) {
            tail = 3;//
            firstTime=false;
          }
}
}
}

const LostGame=(positionX,positionY,snake)=>
{
  let temp=0;
  //conditon1- if the head crooses the border

  if(positionX<-1 || positionY<-1 || positionX>tcX || positionY>tcY)
  {
    temp=1;
    
  }

  //condition2- if the user touches any part of its tail-for this i have to check each part of its tail and compare

  if(keyPressed === true && tail>5){
    for(let i=1;i<snake.length;i++){
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y) {
           temp=1;//
          
          }
        }
        }

 return(temp);
}

const game=()=>{
  if(gameOn===true){
    positionX+=xv;
    positionY+=yv;



    if(LostGame(positionX,positionY,snake)){
      dead.play();
      stopGame()
      }
    //defining the canvas
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

 
    //snake
      updateField();
     
    
    snake.push({x:positionX,y:positionY});
    while(snake.length>tail) {
    snake.shift();
    }
   //snake hits the target
    if(TargetX==positionX && TargetY==positionY) {
      points++;
      eat.play();
      score_screen.innerHTML="Score:"+points;
        tail++;
       newTarget()
    }
    ctx.fillStyle="yellow";
    ctx.fillRect(TargetX*gs,TargetY*gs,gs-2,gs-2);//gs-2 for border because stroke rect is not working
}
}



//function to set the game
const setGame=()=>{
  gameOn=true
   startGame()
   //every time new game was started the interval got divided by 10 so to stop that each time we multiply it by 10
   btnP =btnP*10
 
 }



 //function for running the game
const startGame=()=>{
  btnP=1;
  canvas=document.querySelector("canvas");

  ctx=canvas.getContext("2d");
  if(gameOn===true){
  document.addEventListener("keydown",keyPush);
   temp_interval= setInterval(game,1000 *btnP /10);
  //each time this function is called the time interval is set 
  //for example if this function is called the second time btnP=10 so interval will remain constant 

}
  
}







 //this could be added in the earliew function 
const stop=()=>{
  //setting the position to inital
  positionX=positionY=10;
  //amking the speed zero other wise even if the game is stopped it will keep moving
  xv=yv=0;
  points=0;
  keyPressed=false;
  tail=3;
  direction=undefined;
  clearInterval(temp_interval);
}


//function to stop the game after colloisons with the walls
const stopGame=()=>{
  gameOn=false
   userName_2.innerHTML=text_field.value;
   status.innerHTML=` Your final score is:${points}`;
   modal_3.style.animation="moveInLeft 1s ease-out";
   modal_3.style.display="block";
   

  stop();
}






