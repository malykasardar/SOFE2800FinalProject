const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gameSpeed = .7;

class Tilemap{
    constructor(game){
        this.game = game;
        this.platform = new Platform();
        this.spike = new Spike();
        this.rows = this.game.tileMapRow;
        this.cols = this.game.tileMapCol;
        this.tilesize = this.game.tileSize;
        this.platform.width = this.tilesize;
        this.platform.height = this.tilesize;
        this.tilemap = [
                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                        ]; 
    }
    getTileValue(row,col){
        return this.tilemap[row*this.cols + col]
    }
    draw(context){
        for (let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.cols; j++){
                    if ( this.getTileValue(i,j) === 1){
                        this.platform = new Platform(this.tilesize*j, this.tilesize*i,this.tilesize,this.tilesize,platformSprite);
                        this.game.allPlatforms.push(this.platform);
                        this.platform.draw(context);
                    }
                    if ( this.getTileValue(i,j) === 2)  {
                        this.spike = new Spike(this.tilesize*j, this.tilesize*i,this.tilesize,this.tilesize,spikeSprite);
                        this.game.allPlatforms.push(this.spike);
                        this.spike.draw(context);
                    }  
            }
        }
    }
    update(){
        this.game.allPlatforms.forEach(platform =>{
            if(!(platform instanceof MovingPlatform))
           this.game.allPlatforms.splice(this.game.allPlatforms.indexOf(platform),1);
        })
        //this.game.allPlatforms = [];
    }
}
class Layer {
    constructor(image, speedModifier){
        this.x=0;
        this.y=0;
        this.width=canvas.width;
        this.height=canvas.height;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }
        this.x = (this.x - this.speed);
        
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

function toggleScreen(id, toggle){
    let element = document.getElementById(id);
    let display = ( toggle )? 'block':'none';
    element.style.display = display;
}

function selectLevel(id){
    if(id=="level1"){startGame()}
    if(id=="level2"){alert("level2")}
    if(id=="level3"){startGame()}
}
function prepareGameCanvas(){
    this.toggleScreen('level-menu',false);
    this.toggleScreen('canvas', true);
    canvas.width = 1200;
    canvas.height = 675;
}
 
function startGame(){

    prepareGameCanvas();

    const layer1 = new Layer(backgroundLayer1,0);
    const layer2 = new Layer(backgroundLayer2,0);
    const layer3 = new Layer(backgroundLayer3,0);
    const layer4 = new Layer(backgroundLayer4,.8);
    const layer5 = new Layer(backgroundLayer5,.3);

    const gameObjects = [layer1, layer2, layer3, layer4, layer5];

    const game = new Game(canvas.width, canvas.height, 18,32);

    let movingPlatform1 = new MovingPlatform(game,game.tileSize*16,game.tileSize*8,200,30,movingPlatformSprite,'X',2.0);
    let movingPlatform2 = new MovingPlatform(game,game.tileSize*25,game.tileSize*10,200,30,movingPlatformSprite,'Y',2.0);
    //let movingPlatform2 = new MovingPlatform(game,movingPlatformSprite,837.5,600,'X',2.0);
   // let movingPlatform3 = new MovingPlatform(game,movingPlatformSprite,875,600,'X',2.0);
    movingPlatform1.addPlatform();
    movingPlatform2.addPlatform();
   // movingPlatform2.addPlatform();
   // movingPlatform3.addPlatform();
    function renderParallax(){
        gameObjects.forEach(object => {
            object.update();
            object.draw(ctx);
        });
    }
  
    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height); 
        renderParallax();
        game.update();
        console.log()
        game.draw(ctx);   //call Game draw to draw objects
        requestAnimationFrame(animate) //tell browser to execute arg before next repaint
    }
    animate(0);
}
