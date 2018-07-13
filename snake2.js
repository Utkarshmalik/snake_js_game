//I have fixed some issues but generated some other like opposite direction blocking is not present
//secondly colloision with itself it is just eating it self and not ending the game

let dead = new Audio();
let eat = new Audio();


dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";


const status=document.getElementsByClassName("status")[0];
const userName_2=document.getElementsByClassName("username")[1]; 
score_screen=document.getElementsByClassName("score-screen")[0]

let gameOn=true;//flag to know when we have to start the game
//this is to set the game interval 
let btnP =1 

//function to set the game
const setGame=()=>{
 gameOn=true
  startGame()
  //every time new game was started the interval got divided by 10 so to stop that each time we multiply it by 10
  btnP =btnP*10

}
//function to stop the game after colloisons with the walls
const stopGame=()=>{
  gameOn=false
   userName_2.innerHTML=text_field.value;
   status.innerHTML=` Your final score is:${points}`;
   modal_3.style.display="block";
  stop();
}

//this could be added in the earliew function 
const stop=()=>{
  //setting the position to inital
  positionX=positionY=10;
  //amking the speed zero other wise even if the game is stopped it will keep moving
  xv=yv=0;
  points=0
}
//function for running the game
const startGame=()=>{
  
    canvas=document.querySelector("canvas");

    ctx=canvas.getContext("2d");
    if(gameOn===true){
    document.addEventListener("keydown",keyPush);
    setInterval(game,1000 *btnP /10);
    //each time this function is called the time interval is set 
    //for example if this function is called the second time btnP=10 so interval will remain constant 

  }
    
}

let points=0;
positionX=positionY=10;
 tcX=60;//the tiles count in x direction
 tcY=30;//the tiles count in y direction
 gs=20;//grid size
TargetX=TargetY=15;//
xv=yv=0;//velocity in x and y direction
let snake=[];
tail = 3;

//because we have to keep moving the snake ,defining the velocity will be better
//so this function changes the velocity in every direction
const keyPush=(evt)=>{
    switch(evt.keyCode) {
        case 37:
            xv=-1;yv=0;
            break;
        case 38:
            xv=0;yv=-1;
            break;
        case 39:
            xv=1;yv=0;
            break;
        case 40:
            xv=0;yv=1;
            break;
    }
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
        if(snake[i].x==positionX && snake[i].y==positionY) {
            tail = 3;//
}
}
}

const LostGame=(positionX,positionY,array)=>
{
  let temp=0;
  //conditon1- if the head crooses the border

  if(positionX<-1 || positionY<-1 || positionX>tcX || positionY>tcY)
  {
    temp=1;
    return(temp);
  }

  //condition2- if the user touches any part of its tail-for this i have to check each part of its tail and compare

  // for(let i=1;i<array.length;i++)
  // {
  //   if(positionX===array[i].x && positionY===array[i].y)
  //   {
  //     temp=1;
  //   }

  // }

  // return temp;
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


