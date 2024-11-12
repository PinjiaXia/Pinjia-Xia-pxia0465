let img;                      
let particles = [];            // Array to store particle objects
let noiseScale = 0.01;         // Scale for Perlin noise, controls "jitter" intensity
let interactionRadius = 80;    // Radius for interaction effect with mouse

function preload() {
  img = loadImage('assets/Claude_Monet,_Saint-Georges_majeur_au_crépuscule.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);  
  img.resize(width, height);       

  // Create particles at intervals across the image and store them in the particles array
  for (let y = 0; y < img.height; y += 10) {        
    for (let x = 0; x < img.width; x += 10) {        
      let c = img.get(x, y);                         
      particles.push(new Particle(x, y, c));          // Create and store a new particle 
    }
  }
}

function draw() {
  background(0, 20); // Semi-transparent black background for trailing effect 
  
  // Update and display each particle with potential interaction effect
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();                         
    particles[i].display();                     
  }
}

class Particle {
  constructor(x, y, color) {
    this.baseX = x;          
    this.baseY = y;        
    this.x = x;            
    this.y = y;           
    this.color = color;    
    this.size = random(3, 8); // Random size for each particle
  }

  update() {
    // Generate noise-based offsets for smooth, dynamic movement 
    let noiseX = noise((this.baseX + frameCount) * noiseScale, this.baseY * noiseScale); 
    let noiseY = noise(this.baseX * noiseScale, (this.baseY + frameCount) * noiseScale);

    // Map noise values to a larger range for more pronounced offset
    let offsetX = map(noiseX, 0, 1, -30, 30);        
    let offsetY = map(noiseY, 0, 1, -30, 30);       
    // Apply offsets to the particle's current position 
    this.x = this.baseX + offsetX;
    this.y = this.baseY + offsetY;
  }

  display() {
    // Calculate distance from the mouse to determine interaction effect 
    let d = dist(mouseX, mouseY, this.x, this.y);

    if (d < interactionRadius) {                     // If within interaction radius
      let scaleFactor = map(d, 0, interactionRadius, 1.8, 1.0); // Scale based on distance 
      fill(this.color[0], this.color[1], this.color[2], 200);    // Higher opacity
      ellipse(this.x, this.y, this.size * scaleFactor, this.size * scaleFactor); 
    } else {                                         // If outside interaction radius
      fill(this.color[0], this.color[1], this.color[2], 150);  
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
  resizeCanvas(windowWidth, windowHeight);            // Adjust canvas size on window resize 
  particles = [];                                     // Clear existing particles
  setup();                                           
}
