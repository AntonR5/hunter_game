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
      canvasContext.fillStyle = plauerUnit.color;
      canvasContext.fillRect(plauerUnit.x, plauerUnit.y, plauerUnit.width, plauerUnit.height);
    }
  
    function play() {
      drawFrame();
      requestAnimationFrame(play);
   }
   
  
    function onPressArrowUp() {
      plauerUnit.y -= 5;
    }
  
    function onPressArrowDown() {
      plauerUnit.y += 5;
    }
  
    function onPressArrowLeft() {
      plauerUnit.x -= 5;
    }
  
    function onPressArrowRight() {
      plauerUnit.x += 5;
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

  