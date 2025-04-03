console.log("nav-footer-test-commited")

// Global variables
let sketches = [];

// Sketch factory function
function createSketch(p) {
  let grid = [];
  let cols, rows;
  let loc = 50;
  let w, h;
  let bgColor, dotColor;

  // Set cols and rows based on screen size
  function setGridSize() {
    let screenWidth = window.innerWidth;
    if (screenWidth >= 1200) { // Desktop
      cols = 2 * 16;
      rows = 2 * 10;
    } else if (screenWidth >= 768) { // Tablet
      cols = 2 * 12;
      rows = 2 * 8;
    } else { // Mobile
      cols = 2 * 8;
      rows = 2 * 18;
    }
  }

  setGridSize();

  p.setup = function() {
    // Get the size of the container
    let container = p.canvas.parentElement;
    w = container.clientWidth;
    h = container.clientHeight;

    // Extract background color from container attribute
    bgColor = container.getAttribute('p5-container-bg') || '#073958';
    dotColor = container.getAttribute('p5-container-dot') || '#F1EFE940';

    // Create canvas with the container's size
    p.createCanvas(w, h);
    
    p.noStroke();
    let rowSize = h/rows;
    let colSize = w/cols;
    for (let i=0; i<cols; i++){
      grid[i] = [];
      for (let j=0; j<rows; j++){
        grid[i][j] = new Cell(p, colSize/2+i*colSize, rowSize/2+j*rowSize, rowSize/6, i*loc+j*loc);
      }
    }
  };

  p.draw = function() {
    p.background(bgColor);
    for (let i=0; i<cols; i++){
      for (let j=0; j<rows; j++){
        grid[i][j].update(p.mouseX, p.mouseY);
        grid[i][j].display();
      }
    }
  };

  p.windowResized = function() {
    // Update canvas size when window is resized
    let container = p.canvas.parentElement;
    w = container.clientWidth;
    h = container.clientHeight;
    p.resizeCanvas(w, h);

    // Recalculate grid
    setGridSize();
    let rowSize = h/rows;
    let colSize = w/cols;
    for (let i=0; i<cols; i++){
      for (let j=0; j<rows; j++){
        grid[i][j].updatePosition(colSize/2+i*colSize, rowSize/2+j*rowSize, rowSize/6);
      }
    }
  };

  class Cell {
    constructor(p, x0, y0, r, angle){
      this.p = p;
      this.r = r;
      this.baseR = r;
      this.angle = angle;
      this.x0 = x0;
      this.y0 = y0;
      this.size = 3; // size of dot
    }

    updatePosition(x0, y0, r) {
      this.x0 = x0;
      this.y0 = y0;
      this.baseR = r;
      this.r = r;
    }

    update(mouseX, mouseY){
    this.x = this.r * this.p.cos(this.angle);
    this.y = this.r * this.p.sin(this.angle);
    this.angle += 0.01;
    
  if (window.innerWidth >= 768) { // Check if screen size is desktop or tablet
    
    
    // Calculate distance from mouse
    let d = this.p.dist(mouseX, mouseY, this.x0 + this.x, this.y0 + this.y);
    
    // If within 100px of mouse, increase radius
    if (d < 100) {
      let rfactor = this.p.map(d, 0, 100, 4, 1); // Map distance to scale factor
      let sfactor = this.p.map(d, 0, 100, 3, 1);
      this.r = this.baseR * rfactor;
      this.size = 3 * sfactor;
    } else {
      this.r = this.baseR;
      this.size = 3; // Reset to original radius when not near mouse
    }
  } else { // On mobile, skip mouse interaction logic
    this.r = this.baseR;
    this.size = 3;
  }
}
    display(){
      this.p.fill(dotColor);
      this.p.noStroke();
      this.p.ellipse(this.x0+this.x, this.y0+this.y, this.size, this.size);
    }
  }
}

// Initialize sketches
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('[p5-container="true"]');
  containers.forEach((container, index) => {
    let sketch = new p5(createSketch, container);
    sketches.push(sketch);
  });
});

//
//----------------------------

gsap.registerPlugin(ScrollTrigger);

// // Get navbar height dynamically
// const navbarHeight = document.querySelector(".navigation").offsetHeight;

// // gsap.to(".nav_contain_0", {
// //   backgroundColor: "rgba(16, 25, 31, 0.4)", // Updated background color with 70% opacity
// //   duration: 0.2,
// //   scrollTrigger: {
// //     trigger: ".is--nav-trigger",
// //     start: `top ${navbarHeight}px`,
// //     end: `bottom ${navbarHeight}px`,
// //     toggleActions: "play reverse play reverse",
// //     markers: true, // Debugging markers
// //   },
// // });

// //const bgColor = getComputedStyle(document.documentElement).getPropertyValue("--bg-color").trim();

// gsap.to(":root", {
//   "--_interations---nav-bg-color":"rgba(64, 64, 64, 0.4)", // Apply --bg-color dynamically
//   //"--_interations---nav-link-color":"--bg-color".trim(), // Apply --bg-color dynamically
//   "--_interations---nav-link-color":"var(--lfi-light--background)", // Apply --bg-color dynamically
//   duration: 0.3,
//   scrollTrigger: {
//     trigger: ".is--nav-trigger",
//     start: `top ${navbarHeight}px`,
//     end: `bottom ${navbarHeight}px`,
//     toggleActions: "play reverse play reverse",
//   },
// });

// ----
const $navTrigger = $(".is--nav-trigger");
const navbarHeight = $(".navigation").outerHeight();

const $navBar = $(".navigation");
const $navBg = $navBar.find(".nav_contain_0");
const $navLinks = $navBar.find(".nav_contain_0 a");
const $navLogo = $navBar.find(".nav_logo");
const $navLogo_dark = $navBar.find(".nav_logo_svg-dark"); 
const $navLogo_light = $navBar.find(".nav_logo_svg-light");
const $navMenuButton = $navBar.find(".nav_menu_button");
const $navButtonLines = $navMenuButton.find(".nav_hamburger_line")

const duration = 0.2;

$navTrigger.each(function () {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: this,
      start: `top ${navbarHeight}px`,
      end: `bottom ${navbarHeight}px`,
      toggleActions: "play reverse play reverse",
      //scrub: true,
      markers: true, // Debugging markers
    }
  });

  tl.to($navBg, 
    { backgroundColor: "rgba(16, 25, 31, 0.4)",
      //borderColor: "rgba(16, 25, 31, 0.71)", // Uncomment and set a value if needed
      duration: duration })
    .to($navLinks, { "--_interations---nav-link-color":"var(--lfi-light--background)", duration: duration },"0")
    .to($navLogo_light, { opacity: 1, duration: duration }, "0")
    .to($navLogo_dark, { opacity: 0, duration: duration }, "0")
    .to($navMenuButton, { borderColor: "rgba(241, 239, 233, 0.2)", duration: duration }, "0")
    .to($navButtonLines, { borderColor: "rgba(248, 248, 247, 1)", duration: duration }, "0")
    
});

