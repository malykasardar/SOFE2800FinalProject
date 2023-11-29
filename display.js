const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gameSpeed = .7;

class Tilemap{
    constructor(game, levelTileMap){
        this.game = game;
        this.platform = null;
        this.spike = null;
        this.goal = null;
        this.rows = this.game.tileMapRow;
        this.cols = this.game.tileMapCol;
        this.tilesize = this.game.tileSize;
        this.tilemap = levelTileMap;
    }
    getTileValue(row,col){
        return this.tilemap[row*this.cols + col]
    }
    addPlatforms(){
        for (let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.cols; j++){
                    if ( this.getTileValue(i,j) === 1){
                        this.platform = new Platform(this.tilesize*j, this.tilesize*i,this.tilesize,this.tilesize,platformSprite);
                        this.game.nonPlayerEntities.push(this.platform);
                        //this.platform.draw(context);
                    }
                    if ( this.getTileValue(i,j) === 2)  {
                        this.spike = new Spike(this.tilesize*j, this.tilesize*i,this.tilesize,this.tilesize,spikeSprite);
                        this.game.nonPlayerEntities.push(this.spike);
                        //this.spike.draw(context);
                    }  
                    if ( this.getTileValue(i,j) === 3)  {
                        this.goal = new Goal(this.tilesize*j, this.tilesize*i,this.tilesize,this.tilesize,goalSprite);
                        this.game.nonPlayerEntities.push(this.goal);
                        //this.goal.draw(context);
                    } 
            }
        }
    }
    draw(context){
        this.game.nonPlayerEntities.forEach(nonPlayerEntity =>{
            nonPlayerEntity.draw(context);
        })
    }

}
class Layer {
    constructor(image, speedModifier){
        this.x=0;
        this.y=0;
        this.width=1200;
        this.height=675;
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
class Background{
    constructor(levelConfig){
        this.levelConfig = levelConfig;
        this.layers = [];
    }
    addLayers(){
        for (let i = 0; i < this.levelConfig.backgroundLayers.length;i++){
            let layer = new Layer(this.levelConfig.backgroundLayers[i],this.levelConfig.backgroundSpeedMod[i]);
            this.layers.push(layer);
        }
    }
    update(){
       this.layers.forEach(layer => {
            layer.update();
       }) 
    }
    draw(context){
        this.layers.forEach(layer => {
            layer.draw(context);
       }) 
    }
}
function toggleScreen(id, toggle){
    let element = document.getElementById(id);
    let display = ( toggle )? 'block':'none';
    element.style.display = display;
}
function selectLevel(id){
    if(id=="level1"){startGame(level1_config);}
    if(id=="level2"){startGame(level2_config);}
    if(id=="level3"){startGame(level3_config);}
}
function prepareGameCanvas(){
    this.toggleScreen('level-menu',false);
    this.toggleScreen('canvas', true);
    this.toggleScreen('in-game-menu', true);
    canvas.width = 1200;
    canvas.height = 675;
}
function returnToMenu(){
    game = null;
    this.toggleScreen("game-win",false);
    this.toggleScreen('level-menu',true);
    this.toggleScreen('canvas', false);
    this.toggleScreen('in-game-menu', false);
}
function gameWin(){
    this.toggleScreen("game-win",true);
    this.toggleScreen('level-menu',false);
    this.toggleScreen('canvas', false);
    this.toggleScreen('in-game-menu', false);
}
function startGame(levelConfig){

    prepareGameCanvas();

    game = new Game(levelConfig);
    game.background.addLayers();
    game.tilemap.addPlatforms();
    if(levelConfig.level == 1){
        let movingPlatform1 = new MovingPlatform(game,game.tileSize*16,game.tileSize*8,200,30,movingPlatformSprite,'X',2.0,225);
        let movingPlatform2 = new MovingPlatform(game,game.tileSize*25,game.tileSize*10,200,30,movingPlatformSprite,'Y',2.0,225);
        movingPlatform1.addPlatform();
        movingPlatform2.addPlatform();
    }
    if(levelConfig.level == 2){
        let movingPlatform1 = new MovingPlatform(game,game.tileSize*18,game.tileSize*16,200,30,movingPlatformSprite,'Y',-2.0,300);
        let movingPlatform2 = new MovingPlatform(game,game.tileSize*26,game.tileSize*3,200,30,movingPlatformSprite,'Y',2.0,600);
        movingPlatform1.addPlatform();
        movingPlatform2.addPlatform();
    }/*
    if(levelConfig.level == 3){
        let movingPlatform1 = new MovingPlatform(game,game.tileSize*16,game.tileSize*8,200,30,movingPlatformSprite,'X',2.0,300);
        let movingPlatform2 = new MovingPlatform(game,game.tileSize*25,game.tileSize*10,200,30,movingPlatformSprite,'Y',2.0,300);
        movingPlatform1.addPlatform();
        movingPlatform2.addPlatform();
    }*/

    function animate(){
        if(game != null){
        ctx.clearRect(0,0,canvas.width,canvas.height); 
        game.update();
        console.log()
        game.draw(ctx);   //call Game draw to draw objects
        requestAnimationFrame(animate) //tell browser to execute arg before next repaint
        }
    }

    animate(0);
}
