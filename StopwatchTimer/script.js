const minuteslabel = document.getElementById('minutes');
const secondslabel = document.getElementById('seconds');
const millisecondslabel = document.getElementById('milliseconds');

const startbtn = document.getElementById('Startbtn');
const stopbtn = document.getElementById('Stopbtn');
const pausebtn = document.getElementById('PauseBtn');
const resetbtn = document.getElementById('Resetbtn');

const lablist = document.getElementById('laplist');

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

startbtn.addEventListener('click',startTimer);
stopbtn.addEventListener('click',stopTimer);
pausebtn.addEventListener('click',pauseTimer);
resetbtn.addEventListener('click',resetTimer);

function startTimer(){
     interval =setInterval(updateTimer,10);
     startbtn.disabled = true;
}
 
function stopTimer(){
     clearInterval(interval); 
     AddToLabList();
     resetTimerData();
     startbtn.disabled = false;
}

function pauseTimer(){
    clearInterval(interval);
    startbtn.disabled = false;
}
 
function resetTimer(){
    clearInterval(interval);
    resetTimerData();
    startbtn.disabled = false;
}

function updateTimer(){
    milliseconds ++;
    if(milliseconds ==100){
        milliseconds = 0;
        seconds ++;
        if(seconds == 60){
            seconds = 0;
            minutes ++;
        }
    }

    displayTimer();
}

 function displayTimer(){
     millisecondslabel.textContent= padTime(milliseconds);
     secondslabel.textContent = padTime(seconds);
     minuteslabel.textContent = padTime(minutes); 
 }
 
 function padTime(time){
        return time.toString().padStart(2,'0');
 }

 function resetTimerData(){
    milliseconds = 0;
    seconds =0;
    minutes = 0 ;
    displayTimer();
 }

 function AddToLabList(){

    const laptime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
     const listitem = document.createElement('li');
     listitem.innerHTML  = `<span>Lap ${lablist.childElementCount+1} </span> ${laptime}`;
     lablist.appendChild(listitem);
 }