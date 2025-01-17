// import drawObject from './drawStaticObject.js';

document.addEventListener("DOMContentLoaded", (event) => {  

  const map = {
    width: 1000,
    height: 500,
    background: "white",
  }  

    let hero0 = new Image();
    hero0.src = "./images/hero/hero0.png";
    let hero45 = new Image();
    hero45.src = "./images/hero/hero45.png";
    let hero90 = new Image();
    hero90.src = "./images/hero/hero90.png";
    let hero135 = new Image();
    hero135.src = "./images/hero/hero135.png";
    let hero180 = new Image();
    hero180.src = "./images/hero/hero180.png";
    let hero225 = new Image();
    hero225.src = "./images/hero/hero225.png";
    let hero270 = new Image();
    hero270.src = "./images/hero/hero270.png";
    let hero315 = new Image();
    hero315.src = "./images/hero/hero315.png";

    let enemy0 = new Image();
    enemy0.src = "./images/enemy/enemy0.png";
    let enemy45 = new Image();
    enemy45.src = "./images/enemy/enemy45.png";
    let enemy90 = new Image();
    enemy90.src = "./images/enemy/enemy90.png";
    let enemy135 = new Image();
    enemy135.src = "./images/enemy/enemy135.png";
    let enemy180 = new Image();
    enemy180.src = "./images/enemy/enemy180.png";
    let enemy225 = new Image();
    enemy225.src = "./images/enemy/enemy225.png";
    let enemy270 = new Image();
    enemy270.src = "./images/enemy/enemy270.png";
    let enemy315 = new Image();
    enemy315.src = "./images/enemy/enemy315.png";
        
  const playerHero = {
    x: 10,
    y: 10,
    speed: 3,
    width: 20,
    height: 20,
    image: hero270,
    HP: 10,
  }

  const enemyArray = [];
  
  // const enemy = {
  //   x: 470,
  //   y: 470,
  //   prevX: x,
  //   prevY: y,
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
      x: 970,
      y: 470,
      prevX: 970,
      prevY: 470,
      speed: 1,
      width: 20,
      height: 20,
      image: enemy90,
      aroundX: false,
      aroundY: false,
      hunting: false,
      target: {
        x: getRandom(980),
        y: getRandom(480),
        width: 20,
        height: 20,
        color: "blue",
      },
      bulletSpeed: 5,
      bullet: [],
    });
    enemyArray[i].x -= enemyArray[i].width * i;   
  }

  console.log(enemyArray);

  let objects = [];

  async function getObjects() {
    let data;
    let response = await fetch('./scripts/map1.json');
    if(response.ok) {
      data = await response.json();    
      objects = data.objects;
      } else {
      alert('Map loading error.');
    }    
  }

  
  let pressed = {};
  let canvas = document.getElementById("canvas");
  let canvasContext = canvas.getContext("2d"); 
 
  canvas.width = map.width;
  canvas.height = map.height;  

  function checkRectangleCollision(obj1, obj2) {
    if(obj1.x < obj2.x + obj2.width
      && obj1.x + obj1.width > obj2.x
      && obj1.y < obj2.y + obj2.height
      && obj1.y + obj1.height > obj2.y) {
        return true;
      } 
  }

  ///////////////

  function checkLineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {

    let A = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    let B = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  
    if (A >= 0 && A <= 1 && B >= 0 && B <= 1) {
      return true;
    }
  }

  function checkLineRectangleCollision(x1, y1, x2, y2, obj) {
    
    let left = checkLineIntersection(x1, y1, x2, y2, obj.x, obj.y, obj.x, obj.y + obj.height);
    let right = checkLineIntersection(x1, y1, x2, y2, obj.x + obj.width, obj.y, obj.x + obj.width, obj.y + obj.height);
    let top = checkLineIntersection(x1, y1, x2, y2, obj.x, obj.y, obj.x + obj.width, obj.y);
    let bottom = checkLineIntersection(x1, y1, x2, y2, obj.x, obj.y + obj.height, obj.x + obj.width, obj.y + obj.height);

    if (left || right || top || bottom) {
      return true;
    }
  }

//////////////////////

  function attackEnemy() {
    for(let i = 0; i < enemyArray.length; i++) {
      if(getDistance(enemyArray[i], playerHero) < 30) {
        // console.log('attack');
        // delete enemyArray[i];
      }
    }
  }

  function onPressKey(event) {
    pressed[event.code] = true;
    
    if(event.code === 'Space') {
      attackEnemy();
    }
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
        if(checkRectangleCollision(playerHero, wall)) {
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
        if(checkRectangleCollision(playerHero, wall)) {
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
        if(checkRectangleCollision(playerHero, wall)) {
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
        if(checkRectangleCollision(playerHero, wall)) {
          playerHero.x = wall.x - playerHero.width;
        }
      }
    } 
  }

  function rotateEnemy() {
    for(let enemy of enemyArray) {
      if(enemy.y < enemy.prevY) {
        enemy.image = enemy90;
      }
      if(enemy.y > enemy.prevY) {
        enemy.image = enemy270;
      }
      if(enemy.x < enemy.prevX) {
        enemy.image = enemy180;
      }
      if(enemy.x > enemy.prevX) {
        enemy.image = enemy0;
      }
      if(enemy.y < enemy.prevY && enemy.x < enemy.prevX) {
        enemy.image = enemy135;
      }
      if(enemy.y < enemy.prevY && enemy.x > enemy.prevX) {
        enemy.image = enemy45;
      }
      if(enemy.y > enemy.prevY && enemy.x < enemy.prevX) {
        enemy.image = enemy225;
      }
      if(enemy.y > enemy.prevY && enemy.x > enemy.prevX) {
        enemy.image = enemy315;
      } 
    }
  }

  function enemyMove() {
    for(const enemy of enemyArray) {
      let distance = getDistance(enemy, enemy.target);      
      let objIndex; 
      
      enemy.prevX = enemy.x;
      enemy.prevY = enemy.y;

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
        if(checkRectangleCollision(enemy, objects[i])) {
          if(enemy.prevY < objects[i].y + objects[i].height && enemy.prevY + enemy.height > objects[i].y) {
            if(enemy.prevX > enemy.x) {
              enemy.x = objects[i].x + objects[i].width;    
            } else {
              enemy.x = objects[i].x - enemy.width;
            }
          }
          if(enemy.prevX < objects[i].x + objects[i].width && enemy.prevX + enemy.width > objects[i].x) {
            if(enemy.prevY > enemy.y) {        
              enemy.y = objects[i].y + objects[i].height;
            } else {
              enemy.y = objects[i].y - enemy.height;
            }          
          } 
        }

        // if(prevEnemyX > enemy.x) {
        //   if(checkRectangleCollision(enemy, wall) && 
        //     prevEnemyY < wall.y + wall.height && prevEnemyY + enemy. height > wall.y) {
        //       enemy.x = wall.x + wall.width;    
        //   }
        // } else {
        //     if(checkRectangleCollision(enemy, wall) && 
        //       prevEnemyY < wall.y + wall.height && prevEnemyY + enemy. height > wall.y) {
        //         enemy.x = wall.x - enemy.width;
        //     }
        // }
        // if(prevEnemyY > enemy.y) {
        //   if(checkRectangleCollision(enemy, wall) &&
        //     prevEnemyX < wall.x + wall.width && prevEnemyX + enemy.width > wall.x) {
        //     enemy.y = wall.y + wall.height;
        //   }
        // } else {
        //     if(checkRectangleCollision(enemy, wall) && 
        //     prevEnemyX < wall.x + wall.width && prevEnemyX + enemy.width > wall.x) {
        //       enemy.y = wall.y - enemy.height;
        //     }
        // } 

        if(enemy.prevX === enemy.x && enemy.prevY === enemy.y) {
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

      rotateEnemy();
    }

    // for(let i = 0; i < enemyArray.length - 1; i++) {
    //   for(let n = i + 1; n < enemyArray.length; n++) {
    //     if(checkRectangleCollision(enemyArray[i], enemyArray[n])) {
    //       if(enemyArray[i].x < enemyArray[n].x) {
    //         enemyArray[i].x -= enemyArray[i].speed;
    //         enemyArray[n].x += enemyArray[n].speed;
    //       } else {
    //         enemyArray[i].x += enemyArray[i].speed;
    //         enemyArray[n].x -= enemyArray[n].speed;
    //       }
    //       if(enemyArray[i].y < enemyArray[n].y) {
    //         enemyArray[i].y -= enemyArray[i].speed;
    //         enemyArray[n].y += enemyArray[n].speed;
    //       } else {
    //         enemyArray[i].y += enemyArray[i].speed;
    //         enemyArray[n].y -= enemyArray[n].speed;
    //       }         
    //     }
    //   }
    // }
  }

  function getRandom(max) {
    return Math.floor(Math.random() * max);
  }

  function getDistance(obj1, obj2) {
    return Math.sqrt(Math.pow((obj1.x - obj2.x), 2) + Math.pow((obj1.y - obj2.y), 2))
  }

  function getAngle(obj1, obj2) {
    let x =(obj1.x + obj1.width / 2) - (obj2.x + obj2.width / 2);
    let y = (obj1.y + obj1.height / 2) - (obj2.y + obj2.height / 2);
    let angle;

    if(x === 0) {
      return (y < 0) ? angle = 270 : angle = 90;
    } 
    if(y === 0) {
      return (x < 0) ? angle = 0 : angle = 180;
    }
    angle = Math.atan(y / x) * 180 / Math.PI;
    if(x > 0) {
      angle += 180;
    } else if(y > 0) {
      angle += 360;
    }     
    angle = 360 - angle;

    return angle;
  }

  function findTarget() {
    let beginLineX = playerHero.x + playerHero.width / 2;
    let beginLineY = playerHero.y + playerHero.height / 2;

    for(const enemy of enemyArray) {
      let angle = getAngle(enemy, playerHero);
      let endLineX = enemy.x + enemy.width / 2;
      let endLineY = enemy.y + enemy.height / 2;

      canvasContext.beginPath();
      canvasContext.moveTo(beginLineX, beginLineY);
      canvasContext.lineTo(endLineX, endLineY);
      canvasContext.closePath();
      canvasContext.stroke();

      if(getDistance(enemy, playerHero) < 300 && !enemy.hunting) {
        // if(((enemy.x > enemy.prevX && enemy.y === enemy.prevY) && (angle <= 22.5 || angle > 337.5))
        //   || ((enemy.x > enemy.prevX && enemy.y < enemy.prevY) && (angle <= 67.5 && angle > 22.5))
        //   || ((enemy.x === enemy.prevX && enemy.y < enemy.prevY) && (angle <= 112.5 && angle > 67.5))
        //   || ((enemy.x < enemy.prevX && enemy.y < enemy.prevY) && (angle <= 157.5 && angle > 112.5))
        //   || ((enemy.x < enemy.prevX && enemy.y === enemy.prevY) && (angle <= 202.5 && angle > 157.5))
        //   || ((enemy.x < enemy.prevX && enemy.y > enemy.prevY) && (angle <= 247.5 && angle > 202.5))
        //   || ((enemy.x === enemy.prevX && enemy.y > enemy.prevY) && (angle <= 292.5 && angle > 247.5))
        //   || ((enemy.x > enemy.prevX && enemy.y > enemy.prevY) && (angle <= 337.5 && angle > 292.5))
        // ) {
        //   enemy.hunting = true;
        // }

        if(((enemy.x > enemy.prevX && enemy.y === enemy.prevY) && (angle <= 45 || angle > 315))
          || ((enemy.x > enemy.prevX && enemy.y < enemy.prevY) && (angle <= 90 && angle > 0))
          || ((enemy.x === enemy.prevX && enemy.y < enemy.prevY) && (angle <= 135 && angle > 45))
          || ((enemy.x < enemy.prevX && enemy.y < enemy.prevY) && (angle <= 180 && angle > 90))
          || ((enemy.x < enemy.prevX && enemy.y === enemy.prevY) && (angle <= 225 && angle > 135))
          || ((enemy.x < enemy.prevX && enemy.y > enemy.prevY) && (angle <= 270 && angle > 180))
          || ((enemy.x === enemy.prevX && enemy.y > enemy.prevY) && (angle <= 315 && angle > 225))
          || ((enemy.x > enemy.prevX && enemy.y > enemy.prevY) && (angle <= 360 && angle > 270))
        ) {
          enemy.hunting = true;
        } 
      } 

      if(enemy.hunting) {
        for(let wall of objects) {
          if(checkLineRectangleCollision(beginLineX, beginLineY, endLineX, endLineY, wall)) {
            enemy.hunting = false;
          } 
        }
      }
    }
  }

  function drawPersonage(obj) {
    canvasContext.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
  }

  function drawObject(obj) {
    canvasContext.fillStyle = obj.color;
    canvasContext.fillRect(obj.x, obj.y, obj.width, obj.height);
  }

  function shot(enemy) {  
    let distance = getDistance(enemy, enemy.target);
    // let x = enemy.x + enemy.width / 2;
    // let y = enemy.y + enemy.height / 2;
    // let dX = (enemy.target.x - enemy.x) * enemy.bulletSpeed / distance;
    // let dY = (enemy.target.y - enemy.y) * enemy.bulletSpeed / distance;

    if(enemy.bullet.length === 0) {
      enemy.bullet.push({
        color: "red",
        width: 5,
        height: 5,
        x: enemy.x + enemy.width / 2,
        y: enemy.y + enemy.height / 2,
        dX: (enemy.target.x - enemy.x) * enemy.bulletSpeed / distance,
        dY: (enemy.target.y - enemy.y) * enemy.bulletSpeed / distance,
      });
    }

    if(enemy.bullet.length != 0) {
      enemy.bullet[0].x += enemy.bullet[0].dX;
      enemy.bullet[0].y += enemy.bullet[0].dY;
    }
  }

  function play() {
    canvasContext.clearRect(0, 0, map.width, map.height);
    
    drawBackground();
    drawPersonage(playerHero);
    playerHeroMove();
    enemyMove(); 

    for(const wall of objects) {
      drawObject(wall);
    }
    for(const enemy of enemyArray) {
      drawPersonage(enemy);    
      drawObject(enemy.target);
      
      findTarget()

      if(enemy.hunting) {
        enemy.speed = 2;
        enemy.target.x = playerHero.x;
        enemy.target.y = playerHero.y;
        shot(enemy);
      } else if(checkRectangleCollision(enemy, enemy.target)) {
        enemy.speed = 1;
        enemy.target.x = getRandom(480);
        enemy.target.y = getRandom(480);
      }

      if(enemy.bullet.length != 0) {
        drawObject(enemy.bullet[0]);
        shot(enemy);

        if(checkRectangleCollision(enemy.bullet[0], playerHero)) {
          playerHero.HP--;
          enemy.bullet.pop();
        } 
      }

      if(enemy.bullet.length != 0) {
        if(enemy.bullet[0].x < 0 
          || enemy.bullet[0].y < 0
          || enemy.bullet[0].x > map.width
          ||enemy.bullet[0].y > map.height
        ) {
          enemy.bullet.pop();
        }
      }

      for(const wall of objects) {
        if(enemy.bullet.length != 0) {
          if(checkRectangleCollision(wall, enemy.bullet[0])) {
            enemy.bullet.pop();
          }
        }
      }
    } 
    
    if(playerHero.HP === 0) {
      console.log('GAME OVER');
    }
  
    requestAnimationFrame(play);
  }

  function updTarget() {
    for(const enemy of enemyArray) {
      if(!enemy.hunting) {
        enemy.target.x = getRandom(480);
        enemy.target.y = getRandom(480);
      }
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


