/**
 * Gentle Ambient Botanical Leaves Particle System
 * Pure HTML5 Canvas - lightweight, smooth 60fps, responsive
 */

(function () {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let isEnabled = true;
  let animationId = null;

  // Particle configuration
  const LEAF_COUNT = Math.min(32, Math.floor(window.innerWidth / 40));
  const leaves = [];

  const LEAF_COLORS = [
    'rgba(82, 183, 136, 0.45)',
    'rgba(149, 213, 178, 0.40)',
    'rgba(45, 106, 79, 0.35)',
    'rgba(214, 158, 46, 0.30)',
    'rgba(183, 121, 31, 0.25)'
  ];

  class Leaf {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 12 + 8;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.02;
      this.color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
      this.swayFactor = Math.random() * 0.02 + 0.005;
      this.swayOffset = Math.random() * 100;
    }

    update() {
      this.angle += this.angularSpeed;
      this.y += this.speedY;
      this.x += Math.sin(this.y * this.swayFactor + this.swayOffset) * 0.8 + this.speedX;

      if (this.y > height + 25 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      ctx.fillStyle = this.color;
      ctx.beginPath();
      // Draw smooth organic leaf curve
      ctx.moveTo(0, -this.size);
      ctx.quadraticCurveTo(this.size * 0.6, 0, 0, this.size);
      ctx.quadraticCurveTo(-this.size * 0.6, 0, 0, -this.size);
      ctx.fill();

      // Subtle center vein
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.8);
      ctx.lineTo(0, this.size * 0.8);
      ctx.stroke();

      ctx.restore();
    }
  }

  for (let i = 0; i < LEAF_COUNT; i++) {
    leaves.push(new Leaf());
  }

  function render() {
    if (!isEnabled) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < leaves.length; i++) {
      leaves[i].update();
      leaves[i].draw(ctx);
    }

    animationId = requestAnimationFrame(render);
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Pause rendering when tab is hidden to conserve battery & CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationId) cancelAnimationFrame(animationId);
    } else if (isEnabled) {
      render();
    }
  });

  // Export toggle globally
  window.toggleAmbientLeaves = function () {
    isEnabled = !isEnabled;
    if (isEnabled) {
      render();
    } else {
      ctx.clearRect(0, 0, width, height);
      if (animationId) cancelAnimationFrame(animationId);
    }
    return isEnabled;
  };

  render();
})();
