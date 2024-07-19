document.addEventListener("DOMContentLoaded", (event) => {
    const map = {
      width: 500,
      height: 500,
      background: "white",
    }
  
    let playerUnit = {
      color: "green",
      x: 10,
      y: 10,
      width: 20,
      height: 20,    
    }
  
    let canvas = document.getElementById("canvas");
    let canvasContext = canvas.getContext("2d"); 
    
    canvas.width = map.width;
    canvas.height = map.height;
  
    function drawFrame() {
      canvasContext.clearRect(0, 0, map.width, map.height);
      drawBackground();
      drawPlayerUnit();
    }
    
    function drawBackground() {
        canvasContext.fillStyle = map.background;
        canvasContext.fillRect(0, 0, map.width, map.height);
    }
   
    function drawPlayerUnit() {
      canvasContext.fillStyle = playerUnit.color;
      canvasContext.fillRect(playerUnit.x, playerUnit.y, playerUnit.width, playerUnit.height);
    }
  
    function play() {
      drawFrame();
      requestAnimationFrame(play);
   }
   
  
    function onPressArrowUp() {
      playerUnit.y -= 5;
    }
  
    function onPressArrowDown() {
      playerUnit.y += 5;
    }
  
    function onPressArrowLeft() {
      playerUnit.x -= 5;
    }
  
    function onPressArrowRight() {
      playerUnit.x += 5;
    }
  
    function onPressKey(event) {
      const key = event.key;
  
      switch (key) {
        case 'ArrowUp': onPressArrowUp(); break;
        case 'ArrowDown': onPressArrowDown(); break;
        case 'ArrowLeft': onPressArrowLeft(); break;
        case 'ArrowRight': onPressArrowRight(); break;
      }
    }
  
    function initEventsListeners() {
      document.addEventListener("keydown", onPressKey);
    }
  
    initEventsListeners();
    play();
  });



  ///////////////////////////////

 // import drawObject from './drawStaticObject.js';

document.addEventListener("DOMContentLoaded", (event) => {  

  const map = {
    width: 500,
    height: 500,
    background: "white",
  }

  const wall = {
    color: "gray",
    x: 200,
    y: 175,
    width: 100,
    height: 150,
  }

    let hero0 = new Image();
    hero0.src = "./images/hero0.png";
    let hero45 = new Image();
    hero45.src = "./images/hero45.png";
    let hero90 = new Image();
    hero90.src = "./images/hero90.png";
    let hero135 = new Image();
    hero135.src = "./images/hero135.png";
    let hero180 = new Image();
    hero180.src = "./images/hero180.png";
    let hero225 = new Image();
    hero225.src = "./images/hero225.png";
    let hero270 = new Image();
    hero270.src = "./images/hero270.png";
    let hero315 = new Image();
    hero315.src = "./images/hero315.png";
    let enemyImage = new Image();
    enemyImage.src = "./images/flower.png";
        
  const playerHero = {
    x: 10,
    y: 10,
    speed: 3,
    width: 20,
    height: 20,
    image: hero270,
  }

  const enemyArray = [];
  
  // const enemy = {
  //   x: 470,
  //   y: 470,
  //   speed: 2,
  //   width: 20,
  //   height: 20,
  //   image: enemyImage,
  //   aroundX: false,
  //   aroundY: false,
  //   target: {
  //     x: getRandom(480),
  //     y: getRandom(480),
  //     width: 20,
  //     height: 20,
  //     color: "blue",
  //   }
  // }

  for (let i = 0; i < 3; i++) {
    enemyArray.push({
      x: 470,
      y: 470,
      speed: 2,
      width: 20,
      height: 20,
      image: enemyImage,
      aroundX: false,
      aroundY: false,
      target: {
        x: getRandom(480),
        y: getRandom(480),
        width: 20,
        height: 20,
        color: "blue",
      }
    });
    enemyArray[i].x -= enemyArray[i].width * i;   
  }

  console.log(enemyArray);
  
  let pressed = {};
  let canvas = document.getElementById("canvas");
  let canvasContext = canvas.getContext("2d"); 
 
  canvas.width = map.width;
  canvas.height = map.height;  

  function checkCollision(obj1, obj2) {
    if(obj1.x < obj2.x + obj2.width
      && obj1.x + obj1.width > obj2.x
      && obj1.y < obj2.y + obj2.height
      && obj1.y + obj1.height > obj2.y) {
        return true;
      } 
  }

  function onPressKey(event) {
    pressed[event.code] = true;   
  }

  function onReleasingKey(event) {
    pressed[event.code] = false;
  }

  function drawBackground() {
    canvasContext.fillStyle = map.background;
    canvasContext.fillRect(0, 0, map.width, map.height);
  }  

  function rotatePlayerHero() {
    if(pressed['ArrowUp']) {
      playerHero.image = hero90;
    }
    if(pressed['ArrowDown']) {
      playerHero.image = hero270;
    }
    if(pressed['ArrowLeft']) {
      playerHero.image = hero180;
    }
    if(pressed['ArrowRight']) {
      playerHero.image = hero0;
    }
    if(pressed['ArrowUp'] && pressed['ArrowLeft']) {
      playerHero.image = hero135;
    }
    if(pressed['ArrowUp'] && pressed['ArrowRight']) {
      playerHero.image = hero45;
    }
    if(pressed['ArrowDown'] && pressed['ArrowLeft']) {
      playerHero.image = hero225;
    }
    if(pressed['ArrowDown'] && pressed['ArrowRight']) {
      playerHero.image = hero315;
    } 
  }

  function playerHeroMove() {
    if(pressed['ArrowUp'] && playerHero.y > 0) {
      playerHero.y -= playerHero.speed;
      if(playerHero.y < 1) {
        playerHero.y = 0;
      }
      if(checkCollision(playerHero, wall)) {
        playerHero.y = wall.y + wall.height;
      }
    }

    if(pressed['ArrowDown'] && playerHero.y + playerHero.height < map.height) {
      playerHero.y += playerHero.speed;
      if(playerHero.y + playerHero.height > map.height) {
        playerHero.y = map.height - playerHero.height;
      }
      if(checkCollision(playerHero, wall)) {
        playerHero.y = wall.y - playerHero.height;
      }
    }

    if(pressed['ArrowLeft'] && playerHero.x > 0) {
      playerHero.x -= playerHero.speed;
      if(playerHero.x < 1) {
        playerHero.x = 0;
      }
      if(checkCollision(playerHero, wall)) {
        playerHero.x = wall.x + wall.width;
      }
    }

    if(pressed['ArrowRight'] && playerHero.x + playerHero.width < map.width) {
      playerHero.x += playerHero.speed;
      if(playerHero.x + playerHero.width > map.width) {
        playerHero.x = map.width - playerHero.width;
      }
      if(checkCollision(playerHero, wall)) {
        playerHero.x = wall.x - playerHero.width;
      }
    } 
  }

  function enemyMove() {
    for(let i = 0; i < enemyArray.length; i++) {
      let distance = getDistance(enemy, enemy.target);
      let prevEnemyX = enemy.x;
      let prevEnemyY = enemy.y;       

      if(!enemy.aroundX && !enemy.aroundY) {
        if(enemy.x < enemy.target.x) {
          enemy.x += enemy.speed;
        } else if(enemy.x > enemy.target.x + enemy.target.width / 5) {
          enemy.x -= enemy.speed;
        }
        if(enemy.y < enemy.target.y) {
          enemy.y += enemy.speed;
        } else if(enemy.y > enemy.target.y + enemy.target.height / 5){
          enemy.y -= enemy.speed;
        }

        // enemy.x += (enemy.target.x - enemy.x) * enemy.speed / distance;
        // enemy.y += (enemy.target.y - enemy.y) * enemy.speed / distance;
      }    

      if(checkCollision(enemy, wall)) {
        if(prevEnemyY < wall.y + wall.height && prevEnemyY + enemy.height > wall.y) {
          if(prevEnemyX > enemy.x) {
            enemy.x = wall.x + wall.width;    
          } else {
            enemy.x = wall.x - enemy.width;
          }
        }
        if(prevEnemyX < wall.x + wall.width && prevEnemyX + enemy.width > wall.x) {
          if(prevEnemyY > enemy.y) {        
            enemy.y = wall.y + wall.height;
          } else {
            enemy.y = wall.y - enemy.height;
          }          
        } 
      }

      // if(prevEnemyX > enemy.x) {
      //   if(checkCollision(enemy, wall) && 
      //     prevEnemyY < wall.y + wall.height && prevEnemyY + enemy. height > wall.y) {
      //       enemy.x = wall.x + wall.width;    
      //   }
      // } else {
      //     if(checkCollision(enemy, wall) && 
      //       prevEnemyY < wall.y + wall.height && prevEnemyY + enemy. height > wall.y) {
      //         enemy.x = wall.x - enemy.width;
      //     }
      // }
      // if(prevEnemyY > enemy.y) {
      //   if(checkCollision(enemy, wall) &&
      //     prevEnemyX < wall.x + wall.width && prevEnemyX + enemy.width > wall.x) {
      //     enemy.y = wall.y + wall.height;
      //   }
      // } else {
      //     if(checkCollision(enemy, wall) && 
      //     prevEnemyX < wall.x + wall.width && prevEnemyX + enemy.width > wall.x) {
      //       enemy.y = wall.y - enemy.height;
      //     }
      // } 

      if(prevEnemyX === enemy.x && prevEnemyY === enemy.y) {
        if(enemy.y < wall.y + wall.height && enemy.y + enemy.height > wall.y) {
          enemy.aroundY = true;
        }
        if(enemy.x < wall.x + wall.width && enemy.x + enemy.width > wall.x) {
          enemy.aroundX = true;
        }
        // console.log(enemy.aroundX, enemy.aroundY);
      }

      if(enemy.aroundY) {
        if(enemy.y < wall.y + wall.height / 2) {
          enemy.y -= enemy.speed;
        } else {
          enemy.y += enemy.speed;
        }
        if(enemy.y >= wall.y + wall.height || enemy.y + enemy.height <= wall.y) {
          enemy.aroundY = false;
          if(enemy.x < enemy.target.x) {
            enemy.x += enemy.speed;
          } else {
            enemy.x -= enemy.speed;
          }
        }
      }
      if(enemy.aroundX) {
        if(enemy.x < wall.x + wall.width / 2) {
          enemy.x -= enemy.speed;
        } else {
          enemy.x += enemy.speed;
        }
        if(enemy.x >= wall.x + wall.width || enemy.x + enemy.width <= wall.x) {
          enemy.aroundX = false;
          if(enemy.y < enemy.target.y) {
            enemy.y += enemy.speed;
          } else {
            enemy.y -= enemy.speed;
          }
        }
      }

      // console.log(enemy.aroundX, enemy.aroundY)
    }

    // for(let i = 0; i < enemyArray.length - 1; i++) {
    //   for(let n = i + 1; n < enemyArray.length; n++) {
    //     if(checkCollision(enemyArray[i], enemyArray[n])) {
    //       if(enemyArray[i].x < enemyArray[n].x) {
    //         enemyArray[n].x = enemyArray[i].x + enemyArray[i].width;
    //       } else {
    //         enemyArray[i].x = enemyArray[n].x + enemyArray[n].width;
    //       }
    //       if(enemyArray[i].y < enemyArray[n].y) {
    //         enemyArray[n].y = enemyArray[i].y + enemyArray[i].height;
    //       } else {
    //         enemyArray[i].y = enemyArray[n].y + enemyArray[n].height;
    //       }         
    //     }
    //   }
    // }

    for(let i = 0; i < enemyArray.length - 1; i++) {
      for(let n = i + 1; n < enemyArray.length; n++) {
        if(checkCollision(enemyArray[i], enemyArray[n])) {
          if(enemyArray[i].x < enemyArray[n].x) {
            enemyArray[i].x -= enemyArray[i].speed;
            enemyArray[n].x += enemyArray[n].speed;
          } else {
            enemyArray[i].x += enemyArray[i].speed;
            enemyArray[n].x -= enemyArray[n].speed;
          }
          if(enemyArray[i].y < enemyArray[n].y) {
            enemyArray[i].y -= enemyArray[i].speed;
            enemyArray[n].y += enemyArray[n].speed;
          } else {
            enemyArray[i].y += enemyArray[i].speed;
            enemyArray[n].y -= enemyArray[n].speed;
          }         
        }
      }
    }
  }

  function getRandom(max) {
    return Math.floor(Math.random() * max);
  }

  function getDistance(obj1, obj2) {
    return Math.sqrt(Math.pow((obj1.x - obj2.x), 2) + Math.pow((obj1.y - obj2.y), 2))
  }

  function drawPersonage(obj) {
    canvasContext.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
  }

  function drawObject(obj) {
    canvasContext.fillStyle = obj.color;
    canvasContext.fillRect(obj.x, obj.y, obj.width, obj.height);
  }

  function play() {
    canvasContext.clearRect(0, 0, map.width, map.height);
    
    drawBackground();
    drawObject(wall);
    drawPersonage(playerHero);
    playerHeroMove();
    // drawPersonage(enemy);    
    // drawObject(enemy.target);
    for(const enemy of enemyArray) {
      drawPersonage(enemy);    
      drawObject(enemy.target);
    }

    enemyMove();        
    
    for(const enemy of enemyArray) {
      if(checkCollision(enemy, enemy.target)) {
        enemy.target.x = getRandom(480);
        enemy.target.y = getRandom(480);
      }
    }

    requestAnimationFrame(play);
  }

  function updTarget() {
    for(const enemy of enemyArray) {
      enemy.target.x = getRandom(480);
      enemy.target.y = getRandom(480);
    }
  }

  function initEventsListeners() {
    document.addEventListener("keydown", onPressKey);
    document.addEventListener("keyup", onReleasingKey);
  }

  initEventsListeners();
  play();
  setInterval(rotatePlayerHero, 100);
  setInterval(updTarget, 10000);
});

/////////////////////////

// import drawObject from './drawStaticObject.js';

document.addEventListener("DOMContentLoaded", (event) => {  

  const map = {
    width: 500,
    height: 500,
    background: "white",
  }  

    let hero0 = new Image();
    hero0.src = "./images/hero0.png";
    let hero45 = new Image();
    hero45.src = "./images/hero45.png";
    let hero90 = new Image();
    hero90.src = "./images/hero90.png";
    let hero135 = new Image();
    hero135.src = "./images/hero135.png";
    let hero180 = new Image();
    hero180.src = "./images/hero180.png";
    let hero225 = new Image();
    hero225.src = "./images/hero225.png";
    let hero270 = new Image();
    hero270.src = "./images/hero270.png";
    let hero315 = new Image();
    hero315.src = "./images/hero315.png";
    let enemyImage = new Image();
    enemyImage.src = "./images/flower.png";
        
  const playerHero = {
    x: 10,
    y: 10,
    speed: 3,
    width: 20,
    height: 20,
    image: hero270,
  }

  const enemyArray = [];
  
  // const enemy = {
  //   x: 470,
  //   y: 470,
  //   speed: 2,
  //   width: 20,
  //   height: 20,
  //   image: enemyImage,
  //   aroundX: false,
  //   aroundY: false,
  //   target: {
  //     x: getRandom(480),
  //     y: getRandom(480),
  //     width: 20,
  //     height: 20,
  //     color: "blue",
  //   }
  // }

  for (let i = 0; i < 1; i++) {
    enemyArray.push({
      x: 470,
      y: 470,
      speed: 2,
      width: 20,
      height: 20,
      image: enemyImage,
      aroundX: false,
      aroundY: false,
      target: {
        x: getRandom(480),
        y: getRandom(480),
        width: 20,
        height: 20,
        color: "blue",
      }
    });
    enemyArray[i].x -= enemyArray[i].width * i;   
  }

  console.log(enemyArray);

  let objects = [{}, {}, {}];

  async function getObjects() {
    let data;
    let response = await fetch('./scripts/map.json');
    if(response.ok) {
      data = await response.json();
      
      for(let i = 0; i < data.objects.length-2; i++) {
        objects[i] = data.objects[i];
      }

      // for(let obj of data.objects) {
      //   objects.push(obj);
      // }      
      
      // objects = data.objects;

           
      // objects[0] = data.objects[0];
      // objects[1] = data.objects[1];
      // objects[2] = data.objects[2];
    
    } else {
      alert('Map loading error.');
    }    
  }

  console.log(objects.length);
  console.log(objects);
  console.log(objects[0])
  
  let pressed = {};
  let canvas = document.getElementById("canvas");
  let canvasContext = canvas.getContext("2d"); 
 
  canvas.width = map.width;
  canvas.height = map.height;  

  function checkCollision(obj1, obj2) {
    if(obj1.x < obj2.x + obj2.width
      && obj1.x + obj1.width > obj2.x
      && obj1.y < obj2.y + obj2.height
      && obj1.y + obj1.height > obj2.y) {
        return true;
      } 
  }

  function onPressKey(event) {
    pressed[event.code] = true;   
  }

  function onReleasingKey(event) {
    pressed[event.code] = false;
  }

  function drawBackground() {
    canvasContext.fillStyle = map.background;
    canvasContext.fillRect(0, 0, map.width, map.height);
  }  

  function rotatePlayerHero() {
    if(pressed['ArrowUp']) {
      playerHero.image = hero90;
    }
    if(pressed['ArrowDown']) {
      playerHero.image = hero270;
    }
    if(pressed['ArrowLeft']) {
      playerHero.image = hero180;
    }
    if(pressed['ArrowRight']) {
      playerHero.image = hero0;
    }
    if(pressed['ArrowUp'] && pressed['ArrowLeft']) {
      playerHero.image = hero135;
    }
    if(pressed['ArrowUp'] && pressed['ArrowRight']) {
      playerHero.image = hero45;
    }
    if(pressed['ArrowDown'] && pressed['ArrowLeft']) {
      playerHero.image = hero225;
    }
    if(pressed['ArrowDown'] && pressed['ArrowRight']) {
      playerHero.image = hero315;
    } 
  }

  function playerHeroMove() {
    if(pressed['ArrowUp'] && playerHero.y > 0) {
      playerHero.y -= playerHero.speed;
      if(playerHero.y < 1) {
        playerHero.y = 0;
      }
      for(const wall of objects) {
        if(checkCollision(playerHero, wall)) {
          playerHero.y = wall.y + wall.height;
        }
      }
    }

    if(pressed['ArrowDown'] && playerHero.y + playerHero.height < map.height) {
      playerHero.y += playerHero.speed;
      if(playerHero.y + playerHero.height > map.height) {
        playerHero.y = map.height - playerHero.height;
      }
      for(const wall of objects) {
        if(checkCollision(playerHero, wall)) {
          playerHero.y = wall.y - playerHero.height;
        }
      }
    }

    if(pressed['ArrowLeft'] && playerHero.x > 0) {
      playerHero.x -= playerHero.speed;
      if(playerHero.x < 1) {
        playerHero.x = 0;
      }
      for(const wall of objects) {
        if(checkCollision(playerHero, wall)) {
          playerHero.x = wall.x + wall.width;
        }
      }
    }

    if(pressed['ArrowRight'] && playerHero.x + playerHero.width < map.width) {
      playerHero.x += playerHero.speed;
      if(playerHero.x + playerHero.width > map.width) {
        playerHero.x = map.width - playerHero.width;
      }
      for(const wall of objects) {
        if(checkCollision(playerHero, wall)) {
          playerHero.x = wall.x - playerHero.width;
        }
      }
    } 
  }

  function enemyMove() {
    for(const enemy of enemyArray) {
      let distance = getDistance(enemy, enemy.target);
      let prevEnemyX = enemy.x;
      let prevEnemyY = enemy.y;
      let objIndex;       

      if(!enemy.aroundX && !enemy.aroundY) {
        if(enemy.x < enemy.target.x) {
          enemy.x += enemy.speed;
        } else if(enemy.x > enemy.target.x + enemy.target.width / 5) {
          enemy.x -= enemy.speed;
        }
        if(enemy.y < enemy.target.y) {
          enemy.y += enemy.speed;
        } else if(enemy.y > enemy.target.y + enemy.target.height / 5){
          enemy.y -= enemy.speed;
        }

        // enemy.x += (enemy.target.x - enemy.x) * enemy.speed / distance;
        // enemy.y += (enemy.target.y - enemy.y) * enemy.speed / distance;
      }
      
      for(let i = 0; i < objects.length; i++) {
        if(checkCollision(enemy, objects[i])) {
          if(prevEnemyY < objects[i].y + objects[i].height && prevEnemyY + enemy.height > objects[i].y) {
            if(prevEnemyX > enemy.x) {
              enemy.x = objects[i].x + objects[i].width;    
            } else {
              enemy.x = objects[i].x - enemy.width;
            }
          }
          if(prevEnemyX < objects[i].x + objects[i].width && prevEnemyX + enemy.width > objects[i].x) {
            if(prevEnemyY > enemy.y) {        
              enemy.y = objects[i].y + objects[i].height;
            } else {
              enemy.y = objects[i].y - enemy.height;
            }          
          } 
        }

        // if(prevEnemyX > enemy.x) {
        //   if(checkCollision(enemy, wall) && 
        //     prevEnemyY < wall.y + wall.height && prevEnemyY + enemy. height > wall.y) {
        //       enemy.x = wall.x + wall.width;    
        //   }
        // } else {
        //     if(checkCollision(enemy, wall) && 
        //       prevEnemyY < wall.y + wall.height && prevEnemyY + enemy. height > wall.y) {
        //         enemy.x = wall.x - enemy.width;
        //     }
        // }
        // if(prevEnemyY > enemy.y) {
        //   if(checkCollision(enemy, wall) &&
        //     prevEnemyX < wall.x + wall.width && prevEnemyX + enemy.width > wall.x) {
        //     enemy.y = wall.y + wall.height;
        //   }
        // } else {
        //     if(checkCollision(enemy, wall) && 
        //     prevEnemyX < wall.x + wall.width && prevEnemyX + enemy.width > wall.x) {
        //       enemy.y = wall.y - enemy.height;
        //     }
        // } 

        if(prevEnemyX === enemy.x && prevEnemyY === enemy.y) {
          if(enemy.y < objects[i].y +objects[i].height && enemy.y + enemy.height > objects[i].y) {
            enemy.aroundY = true;
          }
          if(enemy.x < objects[i].x +objects[i].width && enemy.x + enemy.width > objects[i].x) {
            enemy.aroundX = true;
          }
          objIndex = i;
        }

        if(enemy.aroundY) {
          if(enemy.y < objects[objIndex].y + objects[objIndex].height / 2) {
            enemy.y -= enemy.speed;
          } else {
            enemy.y += enemy.speed;
          }
          if(enemy.y >= objects[objIndex].y + objects[objIndex].height || enemy.y + enemy.height <= objects[objIndex].y) {
            enemy.aroundY = false;
            if(enemy.x < enemy.target.x) {
              enemy.x += enemy.speed;
            } else {
              enemy.x -= enemy.speed;
            }
          }
        }
        if(enemy.aroundX) {
          if(enemy.x < objects[objIndex].x + objects[objIndex].width / 2) {
            enemy.x -= enemy.speed;
          } else {
            enemy.x += enemy.speed;
          }
          if(enemy.x >= objects[objIndex].x + objects[objIndex].width || enemy.x + enemy.width <= objects[objIndex].x) {
            enemy.aroundX = false;
            if(enemy.y < enemy.target.y) {
              enemy.y += enemy.speed;
            } else {
              enemy.y -= enemy.speed;
            }
          }
        }
      }
    }

    for(let i = 0; i < enemyArray.length - 1; i++) {
      for(let n = i + 1; n < enemyArray.length; n++) {
        if(checkCollision(enemyArray[i], enemyArray[n])) {
          if(enemyArray[i].x < enemyArray[n].x) {
            enemyArray[i].x -= enemyArray[i].speed;
            enemyArray[n].x += enemyArray[n].speed;
          } else {
            enemyArray[i].x += enemyArray[i].speed;
            enemyArray[n].x -= enemyArray[n].speed;
          }
          if(enemyArray[i].y < enemyArray[n].y) {
            enemyArray[i].y -= enemyArray[i].speed;
            enemyArray[n].y += enemyArray[n].speed;
          } else {
            enemyArray[i].y += enemyArray[i].speed;
            enemyArray[n].y -= enemyArray[n].speed;
          }         
        }
      }
    }
  }

  function getRandom(max) {
    return Math.floor(Math.random() * max);
  }

  function getDistance(obj1, obj2) {
    return Math.sqrt(Math.pow((obj1.x - obj2.x), 2) + Math.pow((obj1.y - obj2.y), 2))
  }

  function drawPersonage(obj) {
    canvasContext.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
  }

  function drawObject(obj) {
    canvasContext.fillStyle = obj.color;
    canvasContext.fillRect(obj.x, obj.y, obj.width, obj.height);
  }

  function play() {
    canvasContext.clearRect(0, 0, map.width, map.height);
    
    drawBackground();
    drawPersonage(playerHero);
    playerHeroMove();

    for(const wall of objects) {
      drawObject(wall);
    }
    for(const enemy of enemyArray) {
      drawPersonage(enemy);    
      drawObject(enemy.target);
    }

    enemyMove();        
    
    for(const enemy of enemyArray) {
      if(checkCollision(enemy, enemy.target)) {
        enemy.target.x = getRandom(480);
        enemy.target.y = getRandom(480);
      }
    }

    requestAnimationFrame(play);
  }

  function updTarget() {
    for(const enemy of enemyArray) {
      enemy.target.x = getRandom(480);
      enemy.target.y = getRandom(480);
    }
  }

  function initEventsListeners() {
    document.addEventListener("keydown", onPressKey);
    document.addEventListener("keyup", onReleasingKey);
  }

  initEventsListeners();
  play();
  getObjects();

  setInterval(rotatePlayerHero, 100);
  setInterval(updTarget, 10000);
});
