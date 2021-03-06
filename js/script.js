
// Animating the banner with moving circles


    var Canvas= document.querySelector(".banner");
    console.log(Canvas);


    var c = Canvas.getContext("2d");
    


    
    function Flash(x, y, dx, dy, radius){
	this.x= x;
	this.y= y;
	this.dx= dx;
	this.dy= dy;
	this.radius= radius;
	
	
	this.draw= function(){
		
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0,  Math.PI*2, false);
		c.strokeStyle="white";
                c.stroke();
                c.fillStyle="black";
		c.fill();	
		};
		
	
	this.Cond= function(){
	
		if(this.x + this.radius > Canvas.width || this.x - this.radius < 0){
			this.dx= -this.dx;
		}
		if(this.y + this.radius > Canvas.height || this.y - this.radius < 0){
		this.dy= -this.dy;
		}
	this.x += this.dx;
	this.y += this.dy;
	this.draw();
	
   };

}



	
var CircArrey=[];
	
for(i=0; i<20; i++){
	
	var x= Math.random()* (Canvas.width - radius * 2) + radius;
	var y= Math.random()* (Canvas.height - radius * 2) + radius;
	var dx= (Math.random()- 0.5) * 5;
	var dy= (Math.random()- 0.5) * 5;
	var radius= 10;
	
	CircArrey[i] = new Flash(x, y, dx, dy, radius);
	}


var Animate= function(){
	requestAnimationFrame(Animate);
	c.clearRect(0,0, Canvas.width, Canvas.height);
	
	for(i=0; i<CircArrey.length; i++){
		CircArrey[i].Cond();
	}
	
}








// the music player codes



    // the css selectors
    var audio = new Audio();
    var index= 0;
    var position;
    
    var SONGName= document.querySelector("#SongTitle");
    var PLayPause= document.querySelector("#playPause");
    var nextList= document.querySelector("#next");
    var prevList= document.querySelector("#prev");
    
    var fillBar= document.querySelector(".loader");
    var ShowTime= document.querySelector("#ShowTime");
    
    var Shuff= document.querySelector("#Shuffle");
    var Repeat= document.querySelector("#Repeat");
    
    


    // sources of the songs in the  audio folder of the project
    var Songs=[
        "./audio/OL-AwonGoonsMi.mp3",
        "./audio/OT Genasis-Traffic.mp3",
        "./audio/Uzikwendu-Si-Eba-Puo.mp3",
        "./audio/Wizkid - In My Bed.mp3",
        "./audio/XXXTENACION SAD Naruto AMV.mp3",
        "./audio/YCEE-JAGABAN.mp3"
    ];
    
    
    
    
    
    
    
// functions for playing the musics
    
    // displays the first song of the song array
    function Aud(){
        audio.src= Songs[0];
        SONGName.innerHTML=  "Song" + Songs[index].substring(0,100);
        audio.pause();
    }
    
    
    // for play and pause
    
    function PlayAndPauseSong(){
        var count=0;
        if(audio.paused){
            audio.play()
            .then(play=>{
                PLayPause.src="./images/PAU.png";
                console.log("it played and then the pause image showed!!!")
            })
            .catch(error=>{
                alert(error + "as a result of playing");
            });
           
             // the animation canvas code for the banner
             Animate();
           
        }else{
            audio.pause();
            PLayPause.src="./images/PL.png";
        }
         
    }

    // displays and play the song based on index of the array
    

    function PlayAndDisplay(){
        audio.src= Songs[index];
        SONGName.innerHTML= "Song" + Songs[index].substring(0,100);
        audio.play()
        .then(play=>{
            console.log("play is working");
        })
        .catch(error=>{
            alert(error + "as a result of playing the music")
        })
        
    }
    
    // for playing next song
    
    function Next(){
        index++;
        if(index === Songs.length){
            index= 0;
        }
        PlayAndDisplay();
        // the animation canvas code for the banner
        Animate();
        PLayPause.src="./images/PAU.png";
       }
    

    // for playing previous song

    function Prev(){
        
        if(index=== 0){
            index= Songs.length;
        }
        index--;
        PlayAndDisplay();
        // the animation canvas code for the banner
        Animate();
        
        PLayPause.src="./images/PAU.png";
    }
    

    //displays the duration meter of the song using css manipulations

    function PlayerBar(){

        position= audio.currentTime/audio.duration;
        fillBar.style.width= position * 100 + "%";
    
        ShowTime.style.left= position * 100 + "%";
        ShowTime.innerHTML= RoundOff(position, 2);
        ShowTime.style.textAlign="center";
               
    }

// Set progress bar
function setProgress(e) {
  const width = fillBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}




    // a wonderful Significant figure generator for the music timing
    
    function RoundOff(n, sig){
        var mult= Math.pow(10, sig-Math.floor(Math.log(n)/ Math.LN10) - 1);
        return Math.round(n * mult)/ mult;
    }

    

    // shuffling the music src in the song array
    function Shuffle(){
        for(i=0; i<1000; i++){
            var a= Math.floor(Math.random()*Songs.length);
            var b= Math.floor(Math.random()*Songs.length);
            var StorA= Songs[a];
            Songs[a]= Songs[b];
            Songs[b]= StorA;
        }
            audio.src= Songs[index];
            SONGName.innerHTML= "Song" + Songs[index].substring(0,100);

            if(audio.paused){
                audio.play().then(play=>{
                    console.log("audio plays and pause shows")
                    PLayPause.src="./images/PAU.png";
                })
                .catch(error=>{
                    console.log(error);
                })
                
            }else{
                audio.pause()

                audio.play().then(play=>{
                    console.log("audio plays when play() was first paused , played again and pause shows")
                    PLayPause.src="./images/PAU.png";
                })
                .catch(error=>{
                    console.log(error);
                })

            }
           

        }




    
    

    // repeat the song
    function Loop(){
        audio.loop= true;
        audio.load();
        audio.play()
            .then(play=>{
                console.log("it played and then the pause image showed 2!!!")
                PLayPause.src="./images/PAU.png";
            })
            .catch(error=>{
                alert(error + "as a result of playing");
            });
    }
    
    
    
    
    
    
    

    
    
    // All our event listener for the buttons
    
    
    window.onload= Aud;
    // Aud();
    
    
    PLayPause.addEventListener("click", function(){
        PlayAndPauseSong();
        
    })
    
    
    nextList.addEventListener("click", function(){
        Next();
    })
    
    prevList.addEventListener("click", function(){
        Prev();
    })
    
    audio.addEventListener("timeupdate", function(){
        PlayerBar();
    })
    

// Click on progress bar
fillBar.addEventListener('click', setProgress);



    Shuff.addEventListener("click", function(){
        
        Shuffle();
        // the animation canvas code for the banner
        Animate(); 
        Shuff.style.background= "white";
        Shuff.style.color= "black";
        Shuff.style.border= "1px solid #ffd200";
        PlayerBar();
        
    })
    
    Repeat.addEventListener("click", function(){
        Loop();
        // the animation canvas code for the banner
        Animate(); 
        Repeat.style.background= "white";
        Repeat.style.color= "black";
        Repeat.style.border= "1px solid #ffd200";
    })
    
    
    
    
     
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
