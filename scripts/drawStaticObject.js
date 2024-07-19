function drawObject(obj) {
  canvasContext.fillStyle = obj.color;
  canvasContext.fillRect(obj.x, obj.y, obj.width, obj.height);
} 
   

export default drawObject;