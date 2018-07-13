import Particles from 'react-particles-js';
const para=
{
  particles: {

    number:
    {
      value:170,
      density:
      {
      enable:true,
      value_area:800
      }
    }
  }
}
const canvas =document.querySelector('canvas');
const score_plate=document.getElementsByClassName("score-screen")[0];

const status=document.getElementsByClassName("status")[0];
const userName_2=document.getElementsByClassName("username")[1]; // the username in the last screen


//const modal_3= document.getElementsByClassName("modal-3")[0]; // The second page



const box=30; //box dimension 
let snake=[];
let score=0;

const setInitial = (snake) =>
{
snake[0]={x:10*box,y:10*box};
snake[1]={x:9*box,y:10*box};
return snake;
}

snake=setInitial(snake);



let ctx =canvas.getContext('2d');



let rand_width=0;
let rand_height=0;

//function to generate random object
const generateTarget =()=>
{

//this is just for testing later we will make them seperate functions

//Now generating the random target within the grid
 rand_width= Math.floor(canvas.width * Math.random())+1;  // this gives a number between 0 and canvas width
 rand_height= Math.floor(canvas.height * Math.random())+1; //this gives a number between 0 and canvas height
//these has to be a multiple of 30
rand_width= rand_width- rand_width%30;
rand_height= rand_height - rand_height%30;
ctx.fillStyle="pink";
ctx.fillRect(rand_width,rand_height,box-2,box-2);
}


//function that displays the snake

const updateField= ()=>
{
  
  for(let i=0;i<snake.length;i++) //looping through snake
{
  //head will be red

  if(i===0)
  {
    ctx.fillStyle="red";
    ctx.fillRect(snake[i].x,snake[i].y,box-2,box-2);
    //ctx.strokeRect(snake[i].x,snake[i].y,box,box);
  }

  // rest all of different color
  else
  {
    ctx.fillStyle="blue";
    ctx.fillRect(snake[i].x,snake[i].y,box-2,box-2);
   // ctx.strokeRect(snake[i].x,snake[i].y,box,box); (i wanted to add this , but there is no way i have till now)
  }
}

}

updateField();
generateTarget();


//function to check if user has lost the game or not
const LostGame=(head,array)=>
{
  let temp=0;
  //conditon1- if the head crooses the border

  if(head.x<0 || head.y<0 || head.x>canvas.width-30 || head.y>canvas.height-30)
  {
    temp=1;
    return(1);
  }
  //condition2- if the user touches any part of its tail-for this i have to check each part of its tail and compare

  for(let i=1;i<array.length;i++)
  {
    if(head.x===array[i].x && head.y===array[i].y)
    {
      temp=1;
    }

  }

  return temp;
}





let direction="right";
//functions that defines the direction , recieves the new head , deletes the tail and updates it .
const fun =(event)=>
{
  let isReverseDirection=false;

  if(event.keyCode===37)
  {
    if(direction==="right")
    {
      isReverseDirection=true;
    }
    else
    {
    direction="left";
    }

  }

  else if(event.keyCode===38)
  {
    if(direction==="down")
    {
      isReverseDirection=true;
    }

    else
    {

    direction="top";
    }
  }

  else if(event.keyCode===39)
  {
    if(direction==="left")
    {
      isReverseDirection=true;
    }
    else
    {
    direction="right";
    }
  }
  else if(event.keyCode===40)
  {
    if(direction==="top")
    {
      isReverseDirection=true;
    }

    else
    {
      direction="down";
    }
  }

  //this will have to work only if the direction is not reverse of the current one
 

  if(!isReverseDirection)
  {

  let newHead = createNewHead(snake[0],direction);
  snake.unshift(newHead);

    //   if( direction == "left") snakeX -= box;
    // if( direction == "top") snakeY -= box;
    // if( direction == "rightT") snakeX += box;
    // if( direction == "down") snakeY += box;
  
  if(newHead.x==rand_width && newHead.y===rand_height)
  {
     //increase the length of the snake and generate a new target
    console.log("won");
    score++;
    score_plate.innerHTML="Score:"+score;
    console.log("Score:"+score);
   
    generateTarget();
  }

  else
  {
    
    ctx.clearRect(snake[snake.length-1].x,snake[snake.length-1].y,box,box); 

    snake.pop();
  }


  if(LostGame(newHead,snake))
  {

    console.log("you have lost the game");
    userName_2.innerHTML=text_field.value;
    status.innerHTML=`Your final score is:${score}.`
    modal_3.style.display="block";
    for(let i=0;i<snake.length;i++)
  {
    console.log(snake[i]);
    ctx.clearRect(snake[i].x,snake[i].y,box-2,box-2);
  }
  snake=[];

  snake=setInitial(snake);



  }

  updateField();


  }

  
  
}



//function that returns the newly created head
const createNewHead= (oldHead,direction)=>
{

  let newHead;

  switch(direction)
  {

    case("left"):
      newHead={x:oldHead.x-=box,y:oldHead.y};
      break;

    case("right"):
    newHead={x:oldHead.x+box,y:oldHead.y};
    break;
    
    case("top"):
      newHead={x:oldHead.x,y:oldHead.y-box};
      break;

    case("down"):
    newHead={x:oldHead.x,y:oldHead.y+box};
    break;
  }

  return(newHead);
}

window.addEventListener('keydown',fun);

