

import Phaser from 'phaser';


const config = {
  height:600,
  width:800,
  type: Phaser.AUTO,
  physics:{
    default: "arcade",
    arcade:{
      debug: true
    }
  },
  scene:{
    preload: preload,
    create: create,
    update: update
  }
}
const VELOCITY = 200;
let bird = null;
let upperPipe = null;
let lowerPipe = null;

const pipeVerticalDistanceRange = [150,250];
let pipeVerticalDistance = Phaser.Math.Between(pipeVerticalDistanceRange[0],pipeVerticalDistanceRange[1])
function preload(){
  // debugger;
  this.load.image("sky","assets/sky.png");
//   load the bird for the sprite
  this.load.image("bird","assets/bird.png");
  this.load.image("pipe","assets/pipe.png");
}
function create(){
  // debugger;
  this.add.image(0,0,"sky").setOrigin(0)
  bird = this.physics.add.sprite(config.width * 0.1 , config.height / 2 ,"bird").setOrigin(0);
  bird.body.gravity.y = 400;
  upperPipe = this.add.sprite(400,100,"pipe").setOrigin(0,1);
  lowerPipe = this.add.sprite(400,upperPipe.y + pipeVerticalDistance,"pipe").setOrigin(0,0);
  this.input.on("pointerdown",flap);
  this.input.keyboard.on("keydown_SPACE",flap);
}

function update(time, delta){
  if(bird.body.position.y >= (config.height) || bird.body.position.y <= 0){
    alert('damn it man, you lost')
    restart()
  }
}

function flap(){
  debugger;
  bird.body.velocity.y = -VELOCITY;
}

function restart(){
  bird.y = config.height/2;
  bird.x = config.width * 0.1;
  bird.body.velocity.y = 0;
}


new Phaser.Game(config)