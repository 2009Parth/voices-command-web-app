screen_height = 0;
screen_width = 0;
draw_apple = "";
speak_data = "";
to_number = "";
x = 0;
y = 0;
apple = "";



function preload()
{
    apple = loadImage('apple.png');
}



var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();







function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 





recognition.onresult = function(event)
{
   console.log(event); 
   
   content = event.results[0][0].transcript;
   
   document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 

   to_number = Number(content);
   
   if(Number.isInteger(to_number))
   {
        draw_apple = "set";
   }
   else
   {
    document.getElementById("status").innerHTML = "The speech has not recognized a number"; 
   }
}



function setup()
{
   screen_width = window.innerWidth-50;
   screen_height = window.innerHeight-50;
   canvas = createCanvas(screen_width, screen_height-175);
   canvas.position(25, 200);
}


function draw()
{
   if(draw_apple == "set")
   {
    for(var i = 1 ; i <= to_number; i++)
    {
      x = Math.floor(Math.random() * 1275);
      y = Math.floor(Math.random() * 350);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = "Started drawing Apple";
    speak_data = to_number+ "Apple drawn";
    speak();
    draw_apple = "";
    }
}









function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}