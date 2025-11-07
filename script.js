const elements = document.querySelectorAll('body, .title, .box, .blue, .button, .right,.left');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

elements.forEach(el => {
  observer.observe(el);
});

/*let half = document.getElementById("half");
half.addEventListener("click", function(){ half.classList.add("go"); });*/




	    console.log("JavaScript Connected Succesfully.");
		console.log("Loading Scripts...");

        // Particle background
        document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('particle-canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // Create particles
            const particles = [];
            const particleCount = 80;
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    color: `rgba(0, 231, 168, ${Math.random() * 0.5 + 0.2})`
                });
            }
            
            // Animation loop
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw particles
                particles.forEach(particle => {
                    // Update position
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    
                    // Boundary check
                    if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
                    
                    // Draw particle
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.fill();
                });
                
                // Draw connections
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 150) {
                            const opacity = 1 - distance / 150;
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(50, 140, 255, ${opacity * 0.3})`;
                            ctx.lineWidth = 1;
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
                
                requestAnimationFrame(animate);
            }
            
            animate();
            
        });
		console.log("Scripts Loaded Succesfully!");

        
function s() {
  function startGlows() {
    const canvas = document.getElementById("bg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const DPR = Math.min(2, window.devicePixelRatio || 1);
    function resize() {
      const w = innerWidth, h = innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    addEventListener("resize", resize);

    // تابع easing برای حرکت نرم‌تر
    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    class Glow {
      constructor() {
        this.x = Math.random() * innerWidth;
        this.y = Math.random() * innerHeight;
        this.r = 100 + Math.random() * 150;
        
        // سرعت اولیه کمتر برای حرکت آرام‌تر
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        
        // مقادیر هدف برای حرکت نرم
        this.targetX = this.x;
        this.targetY = this.y;
        this.moving = false;
        this.progress = 0;
        
        // زمان‌بندی برای تغییر جهت
        this.changeDirectionTime = Date.now() + 2000 + Math.random() * 3000;
      }
      
      draw() {
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        g.addColorStop(0, "rgba(0,200,255,0.5)");
        g.addColorStop(1, "rgba(0,180,255,0.0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
      
      update() {
        const now = Date.now();
        
        // تغییر جهت در بازه‌های زمانی تصادفی
        if (now > this.changeDirectionTime) {
          this.changeDirectionTime = now + 2000 + Math.random() * 3000;
          
          // تنظیم هدف جدید با حرکت آرام
          this.startX = this.x;
          this.startY = this.y;
          this.targetX = Math.random() * innerWidth;
          this.targetY = Math.random() * innerHeight;
          this.progress = 0;
          this.moving = true;
        }
        
        if (this.moving) {
          // افزایش پیشرفت با سرعت ثابت
          this.progress += 0.005;
          
          if (this.progress >= 1) {
            this.progress = 1;
            this.moving = false;
          }
          
          // محاسبه موقعیت جدید با easing
          const easeVal = easeOutQuart(this.progress);
          this.x = this.startX + (this.targetX - this.startX) * easeVal;
          this.y = this.startY + (this.targetY - this.startY) * easeVal;
        } else {
          // حرکت آرام تصادفی هنگامی که به هدف رسیده
          this.x += this.vx;
          this.y += this.vy;
        }
        
        // برخورد با لبه‌های صفحه
        if (this.x < -this.r) this.x = innerWidth + this.r;
        if (this.x > innerWidth + this.r) this.x = -this.r;
        if (this.y < -this.r) this.y = innerHeight + this.r;
        if (this.y > innerHeight + this.r) this.y = -this.r;
        
        this.draw();
      }
    }

    const glows = Array.from({ length: 4 }, () => new Glow());
    
    // استفاده از requestAnimationFrame با timestamp برای انیمیشن نرم
    let lastTime = 0;
    const fps = 60;
    const interval = 1000 / fps;
    
    function loop(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      
      if (deltaTime > interval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        glows.forEach(g => g.update());
        lastTime = timestamp - (deltaTime % interval);
      }
      
      requestAnimationFrame(loop);
    }
    
    requestAnimationFrame(loop);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startGlows);
  } else {
    startGlows();
  }
}

s();
