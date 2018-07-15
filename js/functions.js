//function to move the snake on pressing the keys
const keyPush=(evt)=>{
    switch(evt.keyCode) {
        case 37:
         if(direction==="right"){

          isReverseDirection=true;

         }else{

            xv=-1;yv=0;
            direction="left";
            left.play();

          }
          break;
        case 38:
          if(direction==="down"){

              isReverseDirection=true;

            }else{

              xv=0;yv=-1;
              direction="up";
              up.play();

           }
            break;
        case 39:
         if(direction==="left"){

            isReverseDirection=true;

          }else
            {

             xv=1;yv=0;
             direction="right";
             right.play();

          }
            break;
        case 40:
          if(direction==="up"){

          isReverseDirection=true;
          }else{

           xv=0;yv=1;
           direction="down";
           down.play();

          }
            break;
    }
    keyPressed=true;
}



//function to create random target
const newTarget=()=>{

      TargetX=Math.floor(Math.random()*tcX);
      TargetY=Math.floor(Math.random()*tcY);
}



//function that displays the snake
const updateField= ()=>{
 
        for(let i=0;i<snake.length;i++){

              ctx.fillStyle="white";
              ctx.fillRect(snake[i].x*gs,snake[i].y*gs,gs-2,gs-2);//for border because stroke rect is not working
           i
              if(firstTime){

                  if(snake[i].x==positionX && snake[i].y==positionY){
                        tail = 3;//
                        firstTime=false;
                   }
              }
         }
}

const LostGame=(positionX,positionY,snake)=>{

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
                       temp=1;
                  
                     }
                }
            }

 return(temp);
}

//function that stops the game
//this could be added in the earliew function 
const stop=()=>{
 
            positionX=positionY=10;
            xv=yv=0;
            points=0;
            keyPressed=false;
            tail=3;
            direction=undefined;
            clearInterval(temp_interval);

}


//function to stop the game after colloisons with the walls
const stopGame=()=>{

           gameOn=false;
           userName_2.innerHTML=text_field.value;
           status.innerHTML=` Your final score is:${points}`;
           modal_3.style.animation="moveInLeft 1s ease-out";
           modal_3.style.display="block";
           stop();

}


//function for running the game
const startGame=()=>{

            btnP=1;
            //canvas=document.querySelector("canvas");
            ctx=canvas.getContext("2d");

            if(gameOn===true){

                document.addEventListener("keydown",keyPush);
                temp_interval= setInterval(game,1000 *btnP /10);

            }
  
}


//function to set the game
const setGame=()=>{

            gameOn=true;
            startGame();
            btnP =btnP*10
 
 }


 //function for game

 const game=()=>{

     if(gameOn===true){

        positionX+=xv;
        positionY+=yv;



              if(LostGame(positionX,positionY,snake)){

                 dead.play();
                 stopGame();

                }

                //defining the canvas
                ctx.fillStyle="black";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                updateField();
                snake.push({x:positionX,y:positionY});

                    while(snake.length>tail){

                         snake.shift();

                      }


                      //snake hits the target
                     if(TargetX==positionX && TargetY==positionY) {

                                points++;
                                eat.play();
                                score_screen.innerHTML="Score:"+points;
                                tail++;
                                newTarget();

                      }

                  ctx.fillStyle="yellow";
                  ctx.fillRect(TargetX*gs,TargetY*gs,gs-2,gs-2);

        }
}

