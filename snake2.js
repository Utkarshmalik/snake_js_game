
const status=document.getElementsByClassName("status")[0];
const userName_2=document.getElementsByClassName("username")[1]; 
let gameOn=true;
let btnP =1
const setGame=()=>{
  
 gameOn=true
  startGame()
  btnP =btnP*10


}
const stopGame=()=>{
  gameOn=false
   userName_2.innerHTML=text_field.value;
   status.innerHTML=` Your final score is:${points}`;
       modal_3.style.display="block";
  stop();
}



const stop=()=>{
   
  positionX=positionY=10;
  xv=yv=0;
}

const startGame=()=>{
  
    canvas=document.querySelector("canvas");
    ctx=canvas.getContext("2d");
    if(gameOn===true){
    document.addEventListener("keydown",keyPush);
    
    setInterval(game,1000 *btnP /10);
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
 ctx.fillStyle="blue";

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

  if(positionX<=-1 || positionY<=-1 || positionX>tcX || positionY>tcY)
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
   
    if(TargetX==positionX && TargetY==positionY) {
      points++;
        tail++;
       newTarget()
    }
    ctx.fillStyle="red";
    ctx.fillRect(TargetX*gs,TargetY*gs,gs-2,gs-2);//gs-2 for border because stroke rect is not working
}
}


