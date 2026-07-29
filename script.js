
const planeImg= new Image();
planeImg.src = 'files/plane.png.png';

const pipeImg = new Image();
pipeImg.src = 'files/pipe.png';

const topPipeImg = new Image();
topPipeImg.src = 'files/topPipe.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

planeImg.onload = () => {
ctx.fillStyle = 'yellow';
ctx.fillRect(50, 200, 30, 30);
ctx.drawImage(planeImg, 50, 200, 100, 100);
}



window.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        velocity = -7; //jump
    }
    if (canRestart && e.code === "Space" && gameOver) {
        // Reset game state
        birdY = 200;
        velocity = 0;
        pipex = canvas.width;
        pipHeight = 200;
        pipey = canvas.height - pipHeight;
        gameOver = false;
        canRestart = false;
        points = 0;
        update(); // Restart the game loop
    }
});

let gameOver = false;
let canRestart = false;

let points = 0;
let pipePassed = false; // Flag to check if the pipe has been passed

function dead() {
    gameOver = true;
    canRestart = false;
    setTimeout(() => {
        canRestart = true;
    }, 3000); // Allow 3 seconds before allowing restart
    alert("Game Over!");
    
    // Optionally, you can reset the game or reload the page here
}
let birdX = 50; 
let birdY = 200;
let velocity = 0;

let pipHeight = 200; // pipe height
let pipex = canvas.width; // pipe starts at the right edge of the canvas
let pipey = canvas.height - pipHeight; // pipe height
let pipeWidth = 50; // pipe width
const gravity = 0.4;    

function update() {
    velocity += gravity; // Movement
    birdY += velocity; // apply movement
    pipex -= 3; // move pipe to the left

    if (gameOver) {
        return; // stop the game loop if the player is dead
    }

 ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas

    ctx.fillStyle = "white";
    ctx.font = "30px PressStart2P";
    ctx.fillText(points, 15, 45); // Display points

    ctx.fillStyle = 'green'; // set pipe color
    ctx.drawImage(pipeImg, pipex, pipey, pipeWidth, pipHeight); // draw pipe

    if (pipex < -50) { // reset pipe position when it goes off screen
        pipex = canvas.width;
        pipHeight = Math.random() * 500 + 35;  // randomize pipe height
        pipey = canvas.height - pipHeight; // reset pipe y position
        pipePassed = false; // reset pipe passed flag
    }
   ctx.drawImage(topPipeImg, pipex, 0, pipeWidth, pipey - 150); // draw top pipe
    ctx.drawImage(planeImg, birdX, birdY, 55, 40); // draws plane 34 width and 24 height
    
    requestAnimationFrame(update); // loop 

    if (pipex + pipeWidth < birdX && !pipePassed) { // check if the bird has passed the pipe 
        points++;
        pipePassed = true;
    } // increment points when the bird passes the pipe
    if (birdY + 40 > canvas.height + 55 || birdY < -55) {
        dead(); // kill the player if they hit the ground or go above the canvas
    }
    if (pipex < birdX + 55 && pipex + pipeWidth > birdX && (birdY < pipey - 150 || birdY + 40 > pipey)) {
        dead(); // kill the player if they hit the pipe
    }
    
    // if (pipex < birdX + 55 && pipex + pipeWidth >)
    


}



planeImg.onload = () => {
    update(); // Start game loop
}