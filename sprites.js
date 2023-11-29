var game = null;
const level1_backgroundLayer0 = new Image();
level1_backgroundLayer0.src = 'Glacial-mountains-parallax-background_vnitti/Layers/clouds_mg_2.png'
const level1_backgroundLayer1 = new Image();
level1_backgroundLayer1.src = 'Glacial-mountains-parallax-background_vnitti/Layers/sky.png'
const level1_backgroundLayer3 = new Image();
level1_backgroundLayer3.src = 'Glacial-mountains-parallax-background_vnitti/Layers/glacial_mountains.png'
const level1_backgroundLayer2 = new Image();
level1_backgroundLayer2.src = 'Glacial-mountains-parallax-background_vnitti/Layers/glacial_mountains_lightened.png'
const level1_backgroundLayer4 = new Image();
level1_backgroundLayer4.src = 'Glacial-mountains-parallax-background_vnitti/Layers/clouds_mg_1.png'
const level1_backgroundLayer5 = new Image();
level1_backgroundLayer5.src = 'Glacial-mountains-parallax-background_vnitti/Layers/clouds_mg_2.png'

const level1_background = new Array(level1_backgroundLayer0,level1_backgroundLayer1,
                                    level1_backgroundLayer2,level1_backgroundLayer3,
                                    level1_backgroundLayer4,level1_backgroundLayer5);
const level1_backgroundSpeedMod = new Array(.2,0,0,0,.5,.7);

const level2_backgroundLayer1 = new Image();
level2_backgroundLayer1.src = 'Sunset/1.png'
const level2_backgroundLayer2 = new Image();
level2_backgroundLayer2.src = 'Sunset/2.png'
const level2_backgroundLayer3 = new Image();
level2_backgroundLayer3.src = 'Sunset/3.png'
const level2_backgroundLayer4 = new Image();
level2_backgroundLayer4.src = 'Sunset/4.png'
const level2_backgroundLayer5 = new Image();
level2_backgroundLayer5.src = 'Sunset/5.png'
const level2_backgroundLayer6 = new Image();
level2_backgroundLayer6.src = 'Sunset/6.png'
const level2_backgroundLayer7 = new Image();
level2_backgroundLayer7.src = 'Sunset/7.png'
const level2_backgroundLayer8 = new Image();
level2_backgroundLayer8.src = 'Sunset/8.png'


const level2_background = new Array(level2_backgroundLayer1,level2_backgroundLayer2,
                                    level2_backgroundLayer3,level2_backgroundLayer4,
                                    level2_backgroundLayer5,level2_backgroundLayer6,
                                    level2_backgroundLayer7,level2_backgroundLayer8
                                    );
const level2_backgroundSpeedMod = new Array(.3,0,.4,0,0,0,0,0);


const level3_backgroundLayer1 = new Image();
level3_backgroundLayer1.src = 'Haunted-forest/background_1.png'
const level3_backgroundLayer3 = new Image();
level3_backgroundLayer3.src = 'Haunted-forest/background_2.png'
const level3_backgroundLayer2 = new Image();
level3_backgroundLayer2.src = 'Haunted-forest/background_3.png'
const level3_backgroundLayer4 = new Image();
level3_backgroundLayer4.src = 'Haunted-forest/background_4.png'
const level3_backgroundLayer5 = new Image();
level3_backgroundLayer5.src = 'Haunted-forest/background_5.png'

const level3_background = new Array(level3_backgroundLayer1,level3_backgroundLayer2,level3_backgroundLayer3,
    level3_backgroundLayer4,level3_backgroundLayer5);
const level3_backgroundSpeedMod = new Array(0,0,0,0,0);



const spikeSprite = new Image();
spikeSprite.src = 'backgroundLayers/spike.png'
const platformSprite = new Image();
platformSprite.src = 'backgroundLayers/platform.png'

const playerSprite = new Image();
playerSprite.src = 'backgroundLayers/player-normal.png';

const movingPlatformSprite = new Image();
movingPlatformSprite.src = 'backgroundLayers/movingcloud.png';

const goalSprite = new Image();
goalSprite.src = 'backgroundLayers/treasure.png';

const tilemap_level1 = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,1,0,0,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,
    1,0,0,0,1,1,1,0,0,1,0,0,0,0,1,2,2,2,2,2,2,2,1,2,2,0,0,0,0,0,0,1,
    1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,
    1,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,1,0,0,1,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,1,
    1,0,0,0,1,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,1,0,1,2,2,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]; 

const tilemap_level2 = 
[
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,0,3,0,3,0,0,0,0,0,0,0,0,1,
    1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,2,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,2,0,0,0,0,0,1,
    1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,
    1,0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,
    1,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,2,0,0,0,1,
    1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,1,
    1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,2,0,1,
    1,1,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,
    1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];    


const tilemap_level3 = 
[
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,1,1,1,0,1,1,1,0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];    

const level1_config = 
{
    level: 1,
    canvas_wd: 1200,
    canvas_ht: 675,
    tilemapRows:18,
    tilemapCols:32,
    tilemap: tilemap_level1,
    backgroundLayers: level1_background,
    backgroundSpeedMod: level1_backgroundSpeedMod
}
const level2_config = 
{
    level: 2,
    canvas_wd: 1200,
    canvas_ht: 675,
    tilemapRows:18,
    tilemapCols:32,
    tilemap: tilemap_level2,
    backgroundLayers: level2_background,
    backgroundSpeedMod: level2_backgroundSpeedMod
}
const level3_config = 
{
    level: 3,
    canvas_wd: 1200,
    canvas_ht: 675,
    tilemapRows:18,
    tilemapCols:32,
    tilemap: tilemap_level3,
    backgroundLayers: level3_background,
    backgroundSpeedMod: level3_backgroundSpeedMod
}