
const status=document.getElementsByClassName("status")[0];
const userName_2=document.getElementsByClassName("username")[1]; 

//for audio
let dead = new Audio();
let eat = new Audio();
let left =new Audio();
let right =new Audio();
let up =new Audio();
let down =new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";



let gameOn=true;  //flag to know when we have to start the game
let btnP;  //this is to set the game interval
let temp_interval;
let points=0;
let positionX=10;
let positionY=10;
let tcX=60;//the tiles count in x direction
let tcY=30;//the tiles count in y direction
let gs=20;//grid size
let TargetX=15;
let TargetY=15;
let xv=0;
let yv=0;//velocity in x and y direction
let snake=[];
let tail = 3;
let firstTime=true;

//because we have to keep moving the snake ,defining the velocity will be better
//so this function changes the velocity in every direction
let direction="right";
let isReverseDirection =false;
let keyPressed=false;





 




















