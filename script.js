
const birdImg = new Image();
birdImg.src = 'files/flappy bird.png';



const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

birdImg.onload = () => {
ctx.fillStyle = 'yellow';
ctx.fillRect(50, 200, 30, 30);
ctx.drawImage(birdImg, 50, 200, 34, 24);
}

window.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        velocity = -7; //jump
    }
});

let birdX = 50; 
let birdY = 200;
let velocity = 0;

let pipex = canvas.width; // pipe starts at the right edge of the canvas
let pipey = 250; // pipe height
let pipeWidth = 50; // pipe width
let pipHeight = 200; // pipe height
const gravity = 0.4;    

function update() {
    velocity += gravity; // Movement
    birdY += velocity; // apply movement
    pipex -= 2; // move pipe to the left


 ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas

    ctx.fillStyle = 'green'; // set pipe color
    ctx.fillRect(pipex, pipey, pipeWidth, pipHeight); // draw pipe

    if (pipex < -50) { // reset pipe position when it goes off screen
        pipex = canvas.width;
        pipey = Math.random() * (canvas.height - 200); // randomize pipe height
    }
   
    ctx.drawImage(birdImg, birdX, birdY, 34, 24); // draws bird 34 width and 24 height
    
    requestAnimationFrame(update); // loop 


}

birdImg.onload = () => {
    update(); // Start game loop
}