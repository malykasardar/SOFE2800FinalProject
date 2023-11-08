//The controller handles user input
//var controller = new Controller();
//handles 
//var display = new Display();
//
//var game = new Gamepad();
//var engine = new Engine();


const canvas= document.getElementById("canvas");
const ctx= canvas.getContext("2d");

var x=0;
var y=0;
var vxl=0;
var vxr=0;
var vyU=0;
var vyD=0;


function update(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    x+=vxl;
    x+= vxr;
    y+=vyU;
    y+=vyD;
    ctx.fillRect(0,0,50,50)
    requestAnimationFrame(update)
}
update()