document.addEventListener("DOMContentLoaded", (event) => {
  const map = {
    width: 500,
    height: 500,
    background: "white",
  }

  let plauerUnit = {
    color: "green",
    x: 10,
    y: 10,
    dx: 3,
    dy: 3,
    width: 20,
    height: 20,    
  }

  let pressed = {};
  let canvas = document.getElementById("canvas");
  let canvasContext = canvas.getContext("2d"); 
  
  canvas.width = map.width;
  canvas.height = map.height;

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

  function playerUnitMove() {
    if(pressed['ArrowUp'] && plauerUnit.y >= 0) {
      plauerUnit.y -= plauerUnit.dy;
    }

    if(pressed['ArrowDown'] && plauerUnit.y + plauerUnit.height <= map.height) {
      plauerUnit.y += plauerUnit.dy;
    }

    if(pressed['ArrowLeft'] && plauerUnit.x >= 0) {
      plauerUnit.x -= plauerUnit.dx;
    }

    if(pressed['ArrowRight'] && plauerUnit.x + plauerUnit.width <= map.width) {
      plauerUnit.x += plauerUnit.dx;
    }
  }

  function drawPlayerUnit() {
    playerUnitMove();

    canvasContext.fillStyle = plauerUnit.color;
    canvasContext.fillRect(plauerUnit.x, plauerUnit.y, plauerUnit.width, plauerUnit.height);
  }

  function drawWall() {
    canvasContext.fillStyle = wall.color;
    canvasContext.fillRect(wall.x, wall.y, wall.width, wall.height);
  }

  function drawFrame() {
    canvasContext.clearRect(0, 0, map.width, map.height);
    drawBackground();
    drawPlayerUnit();
  }

  function play() {
    drawFrame();
    requestAnimationFrame(play);
 }   

  function initEventsListeners() {
    document.addEventListener("keydown", onPressKey);
    document.addEventListener("keyup", onReleasingKey);
  }

  initEventsListeners();
  play();
});
