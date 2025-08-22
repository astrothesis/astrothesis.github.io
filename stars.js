// Shooting stars animation
const canvas = document.getElementById('shootingStars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class ShootingStar {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(0, canvas.width);
    this.y = random(0, canvas.height / 2);
    this.len = random(80, 120);
    this.speed = random(6, 10);
    this.size = random(1, 2);
    this.angle = Math.PI / 4; // diagonal top-left → bottom-right
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);

    if (this.x > canvas.width || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.len * Math.cos(this.angle), this.y - this.len * Math.sin(this.angle));
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.len * Math.cos(this.angle), this.y - this.len * Math.sin(this.angle));
    ctx.strokeStyle = gradient;
    ctx.lineWidth = this.size;
    ctx.stroke();
  }
}

let stars = [];
for (let i = 0; i < 10; i++) {
  stars.push(new ShootingStar());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
