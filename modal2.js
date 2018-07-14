const modal_1=document.getElementsByClassName("modal-1")[0]; // The first page
const modal_2= document.getElementsByClassName("modal-2")[0]; // The second page
const modal_3= document.getElementsByClassName("modal-3")[0]; // The losing status page
const text_field=document.getElementsByClassName("text-field")[0]; //the name of the person entered 
const submit_button=document.getElementsByClassName("submit_button")[0]; // the submit button
const start_button=document.getElementsByClassName("start_button")[0]; //the game start button
const restart_button=document.getElementsByClassName("restart_button")[0]; //the game restart button
const userName=document.getElementsByClassName("username")[0];// the username in the second screen
const user_screen=document.getElementsByClassName("user-screen")[0];//user name that has to be displayed on the top of the game screen
const score_screen=document.getElementsByClassName("score-screen")[0];// score plate at the top

userName.innerHTML=text_field.value;
modal_2.style.display="none";


const onNameSubmit =()=>
{
  if(text_field.value!="")
  {
  userName.innerHTML=text_field.value;
  modal_1.style.display="none";
  modal_2.style.display="block";

  }

  else
  {
    console.log("Entet the name to proceed"); //we wil show this as a error message on screen later
  }
}

const onGameStart= () =>
{
  setGame();

  user_screen.innerHTML="Hey "+text_field.value;

  user_screen.innerHTML="Hey , "+text_field.value;
  score_screen.innerHTML="Score:"+points;

  modal_2.style.display="none";
}

const onGameRestart =() =>
{
  setGame();
  modal_3.style.display="none";
  score=0;
  score_screen.innerHTML="Score:"+points;

}






submit_button.addEventListener("click",onNameSubmit);
start_button.addEventListener("click",onGameStart);
restart_button.addEventListener("click",onGameRestart);


