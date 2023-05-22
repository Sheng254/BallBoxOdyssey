document.addEventListener("DOMContentLoaded", function() {
  const box = document.getElementById("box");
  const ball = document.getElementById("ball");

  const boxWidth = box.offsetWidth;
  const boxHeight = box.offsetHeight;
  const ballWidth = ball.offsetWidth;
  const ballHeight = ball.offsetHeight;

  let ballX = (boxWidth - ballWidth) / 2;
  let ballY = (boxHeight - ballHeight) / 2;

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  document.addEventListener("keydown", function(event) {
    const key = event.key;

    const stepSize = 10;

    if (key === "ArrowUp" && ballY > 0 && ballY - stepSize >= 0 && ballX >= 0) {
      ballY = Math.max(0, ballY - stepSize);
      ball.style.top = ballY + "px";
    } else if (key === "ArrowDown" && ballY < boxHeight - ballHeight) {
      ballY = Math.min(boxHeight - ballHeight, ballY + stepSize);
      ball.style.top = ballY + "px";
    }

    if (key === "ArrowLeft" && ballX > 0 && ballX - stepSize >= 0 && ballY >= 0) {
      ballX = Math.max(0, ballX - stepSize);
      ball.style.left = ballX + "px";
    } else if (key === "ArrowRight" && ballX < boxWidth - ballWidth && ballY >= 0) {
      ballX = Math.min(boxWidth - ballWidth, ballX + stepSize);
      ball.style.left = ballX + "px";
    }

    event.preventDefault(); // Prevent default arrow key behavior
  });
});
