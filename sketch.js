let img;                     
let particles = [];          // Array to store particle objects 
let noiseScale = 0.01;       // Scale for Perlin noise, controls "jitter" intensity 

function preload() {
  img = loadImage('assets/Claude_Monet,_Saint-Georges_majeur_au_crépuscule.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);   
  let scaleFactor = min(width / img.width, height / img.height);
  img.resize(img.width * scaleFactor, img.height * scaleFactor);

  // Create particles at intervals across the image and store them in the particles array
  for (let y = 0; y < img.height; y += 10) {          
    for (let x = 0; x < img.width; x += 10) {         
      let c = img.get(x, y);                          
      particles.push(new Particle(x, y, c));          // Create and store a new particle 
    }
  }
}

function draw() {
  background(255, 20);   // Semi-transparent background for trailing effect 
  
  // Update and display each particle示
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
    this.size = 5;      
  }

  update() {
    // Generate noise-based offsets for smooth, dynamic movement 
    let noiseX = noise((this.baseX + frameCount) * noiseScale, this.baseY * noiseScale); 
    let noiseY = noise(this.baseX * noiseScale, (this.baseY + frameCount) * noiseScale); 

    // Map noise values to a range for offsetting position 
    let offsetX = map(noiseX, 0, 1, -5, 5);        
    let offsetY = map(noiseY, 0, 1, -5, 5);      
    
    // Apply offsets to the particle's current position 
    this.x = this.baseX + offsetX;
    this.y = this.baseY + offsetY;
  }

  display() {
    // Set fill color with transparency and draw the particle 
    fill(this.color[0], this.color[1], this.color[2], 150); // Transparency set to 150 
    noStroke();                                             
    ellipse(this.x, this.y, this.size, this.size);          
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size on window resize 
}
