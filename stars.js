// Setup canvases
const starCanvas = document.getElementById('starfield');
const starCtx = starCanvas.getContext('2d');
starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;

const shootCanvas = document.getElementById('shootingStars');
const shootCtx = shootCanvas.getContext('2d');
shootCanvas.width = window.innerWidth;
shootCanvas.height = window.innerHeight;

// Random stars background
let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    r: Math.random() * 1.5
  });
}

function drawStars() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  starCtx.fillStyle = "black";
  stars.forEach(s => {
    starCtx.beginPath();
    starCtx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    starCtx.fill();
  });
}

// Shooting stars
class ShootingStar {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * shootCanvas.width;
    this.y = Math.random() * (shootCanvas.height / 2);
    this.len = Math.random() * 100 + 50;
    this.speed = Math.random() * 8 + 4;
    this.size = Math.random() * 2;
    this.angle = Math.PI / 4;
  }
  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    if (this.x > shootCanvas.width || this.y > shootCanvas.height) this.reset();
  }
  draw() {
    const grad = shootCtx.createLinearGradient(
      this.x, this.y,
      this.x - this.len * Math.cos(this.angle),
      this.y - this.len * Math.sin(this.angle)
    );
    grad.addColorStop(0, "black");
    grad.addColorStop(1, "transparent");
    shootCtx.beginPath();
    shootCtx.moveTo(this.x, this.y);
    shootCtx.lineTo(
      this.x - this.len * Math.cos(this.angle),
      this.y - this.len * Math.sin(this.angle)
    );
    shootCtx.strokeStyle = grad;
    shootCtx.lineWidth = this.size;
    shootCtx.stroke();
  }
}

let shootingStars = [];
for (let i = 0; i < 8; i++) shootingStars.push(new ShootingStar());

function animate() {
  drawStars();
  shootCtx.clearRect(0, 0, shootCanvas.width, shootCanvas.height);
  shootingStars.forEach(s => { s.update(); s.draw(); });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
  shootCanvas.width = window.innerWidth;
  shootCanvas.height = window.innerHeight;
});
