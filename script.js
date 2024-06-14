console.log("Welcome peeps!");
let songindex=0;
let audioElement=new Audio('1.mp3');
let masterplay=document.getElementById('masterplay');
let songbar=document.getElementById('songbar');
let songitems=Array.from(document.getElementsByClassName('songitems'));
let repeat=document.getElementById('repeat');
let isrepeating=false;
let name=document.getElementById('name');

let songlist=[
    {songname:"A MAN WITHOUT LOVE" ,filepath:'1.mp3',coverpath:'A MAN WITHOUT LOVE.webp'},
    {songname:"CAN'T HELP FALLING IN LOVE" ,filepath:'2.mp3',coverpath:'Cant help falling in love.jpg'},
    {songname:"I WANNA BE YOURS" ,filepath:'3.mp3',coverpath:'i wanna be yours.jpeg'},
    {songname:"PERFECT" ,filepath:'4.mp3',coverpath:'per.jpg'},
    {songname:"HEAVENLY" ,filepath:'5.mp3',coverpath:'CIGARETTES AFTER SEX.jpg'},
    {songname:"SWAY" ,filepath:'6.mp3',coverpath:'sway.jpg'},
    {songname:"WE DON'T TALK ANYMORE" ,filepath:'7.mp3',coverpath:'we dont talk anymore.jpeg'},
]    
//for writing the newly added songs
songitems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songlist[i].coverpath;
    element.getElementsByClassName('songname')[0].innerText=songlist[i].songname;
   
})


// handle play  pause click
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        document.getElementById(songindex).classList.remove('fa-play-circle');
        document.getElementById(songindex).classList.add('fa-pause-circle');
        name.innerText=songlist[songindex].songname;
        
        
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        document.getElementById(songindex).classList.remove('fa-pause-circle');
        document.getElementById(songindex).classList.add('fa-play-circle');
    }
})
//listen to events, running for master key 
audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    songbar.value=progress;
})
// if there is some change in bar
songbar.addEventListener('change',()=>{
    audioElement.currentTime=(songbar.value * audioElement.duration)/100;
})
//per song listener
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songinnerplay')).forEach((element)=>
        {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })
        audioElement.pause();
}
Array.from(document.getElementsByClassName('songinnerplay')).forEach((element)=>
{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        index=parseInt(e.target.id)
        if (index === songindex && !audioElement.paused) {
            audioElement.pause();  // Pause if it's the current song and playing
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterplay.classList.remove('fa-pause-circle');
            masterplay.classList.add('fa-play-circle');
        }
        else{
            songindex=index;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=songlist[index].filepath;
        audioElement.currentTime=0;
        songbar.value=0;
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        name.innerText=songlist[songindex].songname;
        
        
        }
        
        
    })

})
// to repeat the song 
repeat.addEventListener('click',()=>{
   isrepeating=!isrepeating;
   repeat.classList.toggle('active');
   if(isrepeating){
    repeat.style.color='black';
   }
   else{
    repeat.style.color="white ";
   }
}

);
// repeat functionality
audioElement.addEventListener('ended',()=>{
    if(isrepeating){
        audioElement.currentTime=0;
        audioElement.play();
        name.innerText=songlist[songindex].songname;
    
        
    }
    else{
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        document.getElementById(songindex).classList.remove('fa-pause-circle');
        document.getElementById(songindex).classList.add('fa-play-circle');
    }
    
})
// autoplay next
audioElement.addEventListener('ended',()=>{
    if(!isrepeating){
    if(songindex<7){
        songindex+=1;
    }
    audioElement.src=songlist[songindex].filepath;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
    name.innerText=songlist[songindex].songname;
    
    

}
})
// for next button
next.addEventListener('click',()=>{
    if(songindex>7){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audioElement.src=songlist[songindex].filepath;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
    name.innerText=songlist[songindex].songname;
    
    
})
//for previous button
previous.addEventListener('click',()=>{
    if(songindex<0){
        songindex=7;
    }
    else{
        songindex-=1;
    }
    audioElement.src=songlist[songindex].filepath;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
    name.innerText=songlist[songindex].songname;
    
    
})







