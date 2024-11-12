let img;                       
let particles = [];            // Array to store particle objects
let noiseScale = 0.02;         // Scale for Perlin noise to control drifting effect Perlin 
let maxOffset = 30;            // Maximum offset for floating effect
let interactionRadius = 80;    // Radius of interaction area with mouse

function preload() {
  img = loadImage('assets/Claude_Monet,_Saint-Georges_majeur_au_crépuscule.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);  
  img.resize(width, height);                 
  noStroke();                               
  
  // Initialize particles at intervals of 10 pixels 
  for (let y = 0; y < img.height; y += 10) {
    for (let x = 0; x < img.width; x += 10) {
      let c = img.get(x, y);                 
      particles.push(new Particle(x, y, c)); 
    }
  }
}

function draw() {
  background(0, 20); // Set a low-opacity black background to create a trailing effect 

  // Update and display all particles 
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();  
    particles[i].display();  
  }
}

// Particle class
class Particle {
  constructor(x, y, col) {
    this.baseX = x;               
    this.baseY = y;                
    this.x = x;
    this.y = y;
    this.color = color(col);       // Particle color
    this.color.setAlpha(150);      // Set initial alpha for trailing effect 
    this.size = random(3, 8);      // Random particle size between 3 and 8 
  }

  // Update particle position to simulate floating 
  update() {
    let time = frameCount * 0.03;  // Time factor for Perlin noise
    let offsetX = map(noise(this.baseX * noiseScale, this.baseY * noiseScale, time), 0, 1, -maxOffset, maxOffset);
    let offsetY = map(noise(this.baseY * noiseScale, this.baseX * noiseScale, time), 0, 1, -maxOffset, maxOffset);

    // Update position with offset to simulate floating 
    this.x = this.baseX + offsetX;
    this.y = this.baseY + offsetY;
  }

  // Display the particle 
  display() {
    let d = dist(mouseX, mouseY, this.x, this.y);  // Calculate distance from mouse

    // If within interaction radius, enlarge particle with random factor
    if (d < interactionRadius) {
      randomSeed(frameCount); // Set random seed for scaling effect each frame
      let randomSizeFactor = random(1.3, 1.8); // Scale factor between 1.3 and 1.8
      fill(this.color);
      ellipse(this.x, this.y, this.size * randomSizeFactor, this.size * randomSizeFactor);
    } else {
      fill(this.color);
      ellipse(this.x, this.y, this.size, this.size); 
    }
  }
}

function mousePressed() {
  // Reset all particles to their base positions on mouse press 
  for (let i = 0; i < particles.length; i++) {
    particles[i].x = particles[i].baseX;
    particles[i].y = particles[i].baseY;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);  // Adjust canvas size on window resize
  particles = [];                          // Clear particle array 
  setup();                                 
}
