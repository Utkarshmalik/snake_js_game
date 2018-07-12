const modal_1=document.getElementsByClassName("modal-1")[0]; // The first page
const modal_2= document.getElementsByClassName("modal-2")[0]; // The second page
const text_field=document.getElementsByClassName("text-field")[0]; //the name of the person entered 
const submit_button=document.getElementsByClassName("submit_button")[0]; // the submit button
const start_button=document.getElementsByClassName("start_button")[0]; //the game start button
const userName=document.getElementsByClassName("username")[0];// the username in the second screen
const user_screen=document.getElementsByClassName("user-screen")[0];//user name that has to be displayed on the top of the game screen
const score_screen=document.getElementsByClassName("score-screen")[0];// score plate at the top



const onNameSubmit =()=>
{
  if(text_field.value!="")
  {
  userName.innerHTML=text_field.value;
  modal_1.style.display="none";
  }

  else
  {
    console.log("Entet the name to proceed"); //we wil show this as a error message on screen later
  }
}

const onGameStart= () =>
{
  user_screen.innerHTML="Hey "+text_field.value;
  score_screen.innerHTML="Score:"+score;
  modal_2.style.display="none";
}



submit_button.addEventListener("click",onNameSubmit);
start_button.addEventListener("click",onGameStart);


