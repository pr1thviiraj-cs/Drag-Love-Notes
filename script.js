let highestZ = 1;
let activePaper = null;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.currentX = 0;
    this.currentY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;

    this.init();
  }

  init() {
    this.paper.style.transform = `rotateZ(${this.rotation}deg)`;

    this.paper.addEventListener("mousedown", (e) => {
      this.startDrag(e.clientX, e.clientY);
    });

    this.paper.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      this.startDrag(touch.clientX, touch.clientY);
    });
  }

  startDrag(x, y) {
    activePaper = this;
    this.isDragging = true;
    this.startX = x;
    this.startY = y;
    this.paper.style.zIndex = highestZ++;
  }

  move(x, y) {
    if (!this.isDragging) return;

    const dx = x - this.startX;
    const dy = y - this.startY;

    this.currentX += dx;
    this.currentY += dy;

    this.startX = x;
    this.startY = y;

    this.paper.style.transform =
      `translate(${this.currentX}px, ${this.currentY}px) rotateZ(${this.rotation}deg)`;
  }

  stop() {
    this.isDragging = false;
  }
}

const papers = Array.from(document.querySelectorAll(".paper:not(.heart)"));
papers.forEach(p => new Paper(p));


document.addEventListener("mousemove", (e) => {
  if (activePaper) {
    activePaper.move(e.clientX, e.clientY);
  }
});

document.addEventListener("mouseup", () => {
  if (activePaper) {
    activePaper.stop();
    activePaper = null;
  }
});

document.addEventListener("touchmove", (e) => {
  if (activePaper) {
    const touch = e.touches[0];
    activePaper.move(touch.clientX, touch.clientY);
  }
}, { passive: false });

document.addEventListener("touchend", () => {
  if (activePaper) {
    activePaper.stop();
    activePaper = null;
  }
});
