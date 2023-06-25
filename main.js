const canvas = document.getElementById("canvas");


const ctx = canvas.getContext("2d");



// array stores the data for the circles

var circleData = [
  { x: 60, y: 50, color: "yellow", originalColor: "yellow", hit: false },
  { x: 60, y: 150, color: "blue", originalColor: "blue", hit: false },
  { x: 60, y: 250, color: "red", originalColor: "red", hit: false },
  { x: 60, y: 350, color: "green", originalColor: "green", hit: false },
];

// array stores the data for the arrows

var arrowData = [
  { x: 600, y: 50 },
  { x: 600, y: 150 },
  { x: 600, y: 250 },
  { x: 600, y: 350 },
];


var animationId;
var clickedCircleIndex = -1;

// drawing the circles on the canvas

function drawCircles() {
  for (var i = 0; i < circleData.length; i++) {
    ctx.beginPath();
    ctx.arc(circleData[i].x, circleData[i].y, 30, 0, Math.PI * 2, false);
    ctx.fillStyle = circleData[i].color;
    ctx.fill();
    ctx.stroke()
    ctx.lineWidth= 1.5
    ctx.fillStyle = "black"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = "12px sans-serif"
    ctx.fillText("click me", circleData[i].x, circleData[i].y)
  }
}

// drawing the arrows on the canvas

function drawArrows() {
  for (var i = 0; i < arrowData.length; i++) {
    ctx.beginPath();
    ctx.moveTo(arrowData[i].x, arrowData[i].y);
    ctx.lineTo(arrowData[i].x + 30, arrowData[i].y - 13);
    ctx.lineTo(arrowData[i].x + 30, arrowData[i].y - 3);
    ctx.lineTo(arrowData[i].x + 60, arrowData[i].y - 3);
    ctx.lineTo(arrowData[i].x + 60, arrowData[i].y + 3);
    ctx.lineTo(arrowData[i].x + 30, arrowData[i].y + 3);
    ctx.lineTo(arrowData[i].x + 30, arrowData[i].y + 13);
    ctx.lineTo(arrowData[i].x, arrowData[i].y);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }
}




function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircles();
  drawArrows();

  if (clickedCircleIndex !== -1) {
    var circle = circleData[clickedCircleIndex];
    var arrow = arrowData[clickedCircleIndex];

    // calculates the distance between the circle and arrow
    var dx = circle.x - arrow.x;
    var dy = circle.y - arrow.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 30) {
      var vx = dx / distance;
      var vy = dy / distance;
      var speed = 10;

      arrow.x += vx * speed;
      arrow.y += vy * speed;
    }

    // Check for collision
    if (distance <= 30 && !circle.hit) {
      circle.hit = true;
      circle.color = "gray";
    }
  }

  animationId = requestAnimationFrame(draw);
}




function handleClick(event) {
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  // Check if the click is inside any circle
  for (var i = 0; i < circleData.length; i++) {
    var circle = circleData[i];
    var distance = Math.sqrt(
      (mouseX - circle.x) * (mouseX - circle.x) +
        (mouseY - circle.y) * (mouseY - circle.y)
    );

    if (distance <= 30 && !circle.hit) {
      clickedCircleIndex = i;
      break;
    }
  }
}



function handleReset() {
  cancelAnimationFrame(animationId);

  for (var i = 0; i < circleData.length; i++) {
    circleData[i].hit = false;
    circleData[i].color = circleData[i].originalColor;
    arrowData[i].x = 600;
    arrowData[i].y = 50 + i * 100;
  }

  clickedCircleIndex = -1;
  draw();
}



// Event listeners
canvas.addEventListener("click", handleClick);
document.getElementById("resetButton").addEventListener("click", handleReset);

// Initial draw
draw();
