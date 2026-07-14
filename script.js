
const birdImg = new Image();
birdImg.src = 'files/flappy bird.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

birdImg.onload = () => {
ctx.fillStyle = 'yellow';
ctx.fillRect(50, 200, 30, 30);
ctx.drawImage(birdImg, 50, 200, 34, 24);
}
