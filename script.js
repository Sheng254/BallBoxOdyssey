document.addEventListener("DOMContentLoaded", function() {
  const box = document.getElementById("box");
  const ball = document.getElementById("ball");
  const livesCount = document.getElementById("lives-count");
  const messageDisplay = document.getElementById("message-display");

  const boxWidth = box.offsetWidth;
  const boxHeight = box.offsetHeight;
  const ballWidth = ball.offsetWidth;
  const ballHeight = ball.offsetHeight;

  let ballX = (boxWidth - ballWidth) / 2;
  let ballY = (boxHeight - ballHeight) / 2;

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  let lives = 3; // Initial number of lives
  livesCount.textContent = lives;

  let gameActive = true; // Track game state

  // Function to create a mine element
  function createMine() {
    const mine = document.createElement("div");
    mine.className = "mine"; // Add the 'mine' class
    return mine;
  }

  // Function to generate random coordinates
  function generateRandomCoordinates() {
    const x = Math.floor(Math.random() * (boxWidth - 20));
    const y = Math.floor(Math.random() * (boxHeight - 20));
    return { x, y };
  }

  // Function to generate mines
  function generateMines() {
    for (let i = 0; i < 30; i++) {
      const mine = createMine();
      const { x, y } = generateRandomCoordinates();
      mine.style.top = y + "px";
      mine.style.left = x + "px";
      box.appendChild(mine);
    }
  }

  generateMines();

  let foodItem = createFoodItem();
  box.appendChild(foodItem);

  // Function to stop the game and display game over message
  function stopGame() {
    console.log("Game over!");
    messageDisplay.textContent = "Game over!"; // Display a message
    gameActive = false; // Stop the game and disable input
    document.removeEventListener("keydown", handleKeyDown); // Disable keydown event listener
  }

  document.addEventListener("keydown", function(event) {
    if (lives <= 0) {
      return; // Ignore key input when lives are <= 0
    }
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

    // Get all mine elements
    const mines = document.getElementsByClassName("mine");

    // Check for collision with mines
    let collisionDetected = false;
    for (let i = 0; i < mines.length; i++) {
      if (isColliding(ball, mines[i])) {
        // Handle collision with mines (e.g., reduce life count)
        console.log("Collision with a mine!");
        lives--;

        if (lives === 0) {
          livesCount.textContent = lives;
          // Game over logic here
          stopGame();
          break; // Remove the line 'collisionDetected = true;'
        }

        // Update lives count
        livesCount.textContent = lives;
        collisionDetected = true;
        break;
      }
    }

    if (collisionDetected) {
      return; // If collision detected, don't update ball position
    }

    // Check for collision with food item
    if (isColliding(ball, foodItem)) {
      // Handle collision with food item (e.g., increase score)
      console.log("Collected a food item!");

      // Remove the food item from the box
      box.removeChild(foodItem);

      // Generate a new food item
      foodItem = createFoodItem();
      box.appendChild(foodItem);
    }
  });

  // Function to create a food item element
  function createFoodItem() {
    const foodItem = document.createElement("div");
    foodItem.className = "food-item";
    return foodItem;
  }

  // Function to check collision between two elements
  function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }
});
