var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["81e3eefc-a2a9-4971-adee-ec777302c86c","0e361fbd-ac3c-4724-9410-a8403fddaf19","58cfe588-9b37-4e88-80cf-888fabdcaa42","6b8e3730-5516-44d1-986a-026d5cd2faa2","7ea0ad1c-1bbe-4d4a-bfb1-4db0ee05e6ca"],"propsByKey":{"81e3eefc-a2a9-4971-adee-ec777302c86c":{"name":"sheet_hero_walk.png_1","sourceUrl":null,"frameSize":{"x":90,"y":30},"frameCount":1,"looping":true,"frameDelay":12,"version":"XyL0F07p5_zFM7cx8z555OrypGIjN_UM","loadedFromSource":true,"saved":true,"sourceSize":{"x":90,"y":30},"rootRelativePath":"assets/81e3eefc-a2a9-4971-adee-ec777302c86c.png"},"0e361fbd-ac3c-4724-9410-a8403fddaf19":{"name":"country-platform-preview.png_1","sourceUrl":null,"frameSize":{"x":650,"y":450},"frameCount":1,"looping":true,"frameDelay":12,"version":"ECmqSwr9b2JwTjoUG1sLdrdShUT3jySY","loadedFromSource":true,"saved":true,"sourceSize":{"x":650,"y":450},"rootRelativePath":"assets/0e361fbd-ac3c-4724-9410-a8403fddaf19.png"},"58cfe588-9b37-4e88-80cf-888fabdcaa42":{"name":"ular-gif-4 (2).jpg_1","sourceUrl":null,"frameSize":{"x":150,"y":120},"frameCount":1,"looping":true,"frameDelay":12,"version":"xFF_W7SaqSZRuYMcCIR2ZVdAVgdWSAwQ","loadedFromSource":true,"saved":true,"sourceSize":{"x":150,"y":120},"rootRelativePath":"assets/58cfe588-9b37-4e88-80cf-888fabdcaa42.png"},"6b8e3730-5516-44d1-986a-026d5cd2faa2":{"name":"cloud","sourceUrl":"assets/api/v1/animation-library/aX2YZonbCWuo3OEMcTzG3b5He1i9qu1E/category_environment/cloud.png","frameSize":{"x":260,"y":134},"frameCount":1,"looping":true,"frameDelay":2,"version":"aX2YZonbCWuo3OEMcTzG3b5He1i9qu1E","loadedFromSource":true,"saved":true,"sourceSize":{"x":260,"y":134},"rootRelativePath":"assets/api/v1/animation-library/aX2YZonbCWuo3OEMcTzG3b5He1i9qu1E/category_environment/cloud.png"},"7ea0ad1c-1bbe-4d4a-bfb1-4db0ee05e6ca":{"name":"moving car.jpg_1","sourceUrl":"assets/v3/animations/Ni-YJcQWbUijTdkJruDYyXe7I8nlS6q61SrGtx2Ra4E/7ea0ad1c-1bbe-4d4a-bfb1-4db0ee05e6ca.png","frameSize":{"x":1280,"y":720},"frameCount":1,"looping":true,"frameDelay":4,"version":"iDwWg6m3jivNy4WcL5v9MWNE4ZGvXdw_","loadedFromSource":true,"saved":true,"sourceSize":{"x":1280,"y":720},"rootRelativePath":"assets/v3/animations/Ni-YJcQWbUijTdkJruDYyXe7I8nlS6q61SrGtx2Ra4E/7ea0ad1c-1bbe-4d4a-bfb1-4db0ee05e6ca.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

/*"1. Create a background sprite as per your choice and give movement to the background.
2. Create the Knight sprite using create sprites option and scale it accordingly using sprite.scale code.
3. Spawn the snakes and clouds using functions as covered in C11 class.
4. Call the functions created by you.
5. Use the concept of random number to spawn the different animals and clouds."*/

var bg = createSprite(200,200,400,400);
bg.setAnimation("         1");
bg.x = bg.width/2;

var knight = createSprite(0,360,10,40);
knight.setAnimation("sheet_hero_walk.png_1");
knight.scale = 2.0;

var ground = createSprite(200,369,400,3);
//ground.setAnimation("ground2");
ground.x = ground.width /2;
ground.visible = false;

function draw() {
  
  background("white");
  
  bg.velocityX = -2;
  
  if (bg.x<100){
    bg.x = bg.width/2;
  }
  //console.log(knight);
  
  if (keyDown("space")){
    knight.velocityY = -15;
  } 
  
  knight.velocityY = knight.velocityY + 0.7;
  
  knight.collide(ground);
  
  spawnSnake();
  spawnClouds();
  drawSprites();
}

function spawnSnake() {
  if(World.frameCount % 60 === 0) {
    var snake = createSprite(400,345,10,40);
    snake.velocityX = -6;
    
    //generate random obstacles
    var rand = randomNumber(1,6);
    snake.setAnimation("ular-gif-4 (2).jpg_1");
  
    snake.scale = 0.5;
    snake.lifetime = 70;
  }
}


function spawnClouds() {
  if(World.frameCount % 60 === 0) {
    var cloud = createSprite(400,320,10,40);
    cloud.velocityX = -4;
    cloud.y = randomNumber(10,150);
    cloud.setAnimation("cloud");
  
    cloud.scale = 0.2;
    cloud.lifetime = 100;
  }
}

    
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
