
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
});

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


 ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas

    ctx.fillStyle = 'green'; // set pipe color
    ctx.drawImage(pipeImg, pipex, pipey, pipeWidth, pipHeight); // draw pipe

    if (pipex < -50) { // reset pipe position when it goes off screen
        pipex = canvas.width;
        pipHeight = Math.random() * 500 + 35;  // randomize pipe height
        pipey = canvas.height - pipHeight; // reset pipe y position
    }
   ctx.drawImage(topPipeImg, pipex, 0, pipeWidth, pipey - 150); // draw top pipe
    ctx.drawImage(planeImg, birdX, birdY, 55, 40); // draws plane 34 width and 24 height
    
    requestAnimationFrame(update); // loop 


}

planeImg.onload = () => {
    update(); // Start game loop
}