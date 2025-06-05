// Kart döndürme işlemi
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// Quiz efektleri
const options = document.querySelectorAll(".option");
options.forEach(option => {
  option.addEventListener("click", () => {
    const text = option.textContent.trim();
    if (text === "Huzur") {
      createConfetti();
    } else if (text === "Kaos") {
      flashLightning();
    } else if (text === "Merak") {
      sparkleEffect();
    } else if (text === "Üzüntü") {
      createRain();
    }
    option.classList.add("selected");
    setTimeout(() => option.classList.remove("selected"), 1500);
  });
});

// Konfeti tüm ekran
function createConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.position = "fixed";
    confetti.style.top = Math.random() * 100 + "vh";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    confetti.style.borderRadius = "50%";
    confetti.style.zIndex = "9999";
    confetti.style.opacity = "0.8";
    confetti.style.animation = "confetti-fall 2s ease forwards";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2000);
  }
}

// Şimşek efekti
function flashLightning() {
  const flash = document.createElement("div");
  flash.style.position = "fixed";
  flash.style.top = 0;
  flash.style.left = 0;
  flash.style.width = "100%";
  flash.style.height = "100%";
  flash.style.backgroundColor = "white";
  flash.style.opacity = "0.8";
  flash.style.zIndex = "9999";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 200);
}

// Yıldız efekti
function sparkleEffect() {
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.style.position = "fixed";
    star.style.top = Math.random() * 100 + "vh";
    star.style.left = Math.random() * 100 + "vw";
    star.style.width = "5px";
    star.style.height = "5px";
    star.style.backgroundColor = "yellow";
    star.style.borderRadius = "50%";
    star.style.opacity = "0.8";
    star.style.zIndex = "9999";
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2000);
  }
}

// Yağmur efekti
function RainEffect() {
  for (let i = 0; i < 30; i++) {
    const drop = document.createElement("div");
    drop.style.position = "fixed";
    drop.style.top = "-10px";
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.width = "2px";
    drop.style.height = "15px";
    drop.style.backgroundColor = "blue";
    drop.style.opacity = "0.5";
    drop.style.zIndex = "9999";
    drop.style.animation = "fall 1s linear forwards";
    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), 1000);
  }
}

// Canvas çizim
const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");
let painting = false;

function startPosition(e) { painting = true; draw(e); }
function endPosition() { painting = false; ctx.beginPath(); }
function draw(e) {
  if (!painting) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctx.lineWidth = document.getElementById("brushSize").value;
  ctx.lineCap = "round";
  ctx.strokeStyle = document.getElementById("brushColor").value;
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);
document.getElementById("clearCanvas").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.addEventListener('DOMContentLoaded', () => {
  // Sanatçı mı AI mı? doğru-yanlış kontrolü
  const sliderCards = document.querySelectorAll('.slider .art-guess-card');

  sliderCards.forEach(card => {
    const correctAnswer = card.getAttribute('data-correct');
    const buttons = card.querySelectorAll('.guess-btn');
    const feedback = card.querySelector('.guess-feedback');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const userAnswer = button.getAttribute('data-answer');
        if (userAnswer === correctAnswer) {
          feedback.textContent = '✔ Doğru!';
          feedback.style.color = 'lightgreen';
        } else {
          feedback.textContent = '❌ Yanlış!';
          feedback.style.color = 'red';
        }
      });
    });
  });

  // Slider ileri-geri kontrolü
  const track = document.querySelector('.slider-track');
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  let currentIndex = 0;

  nextBtn.addEventListener('click', () => {
    if (currentIndex < sliderCards.length - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  function updateSlider() {
    const width = sliderCards[0].clientWidth;
    track.style.transform = `translateX(-${width * currentIndex}px)`;
  }
});


// Ekstra animasyonlar
const confettiStyle = document.createElement('style');
confettiStyle.innerHTML = `
@keyframes confetti-fall { 0% { transform: scale(1) translateY(0); opacity: 1; } 100% { transform: scale(0.5) translateY(100px); opacity: 0; } }
@keyframes fall { to { transform: translateY(100vh); opacity: 0; } }
`;
document.head.appendChild(confettiStyle);
