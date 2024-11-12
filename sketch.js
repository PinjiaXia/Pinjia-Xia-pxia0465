let img;                    
let numSegments = 300; 
let noiseScale = 0.01;      // Scale for Perlin noise, controls "jitter" intensity

function preload() {
  img = loadImage('assets/Claude_Monet,_Saint-Georges_majeur_au_crépuscule.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);  
}

function draw() {
  background(255, 20); // Semi-transparent background to create a trailing effect 
  
  // Calculate scale factor to fit the image within the canvas while maintaining aspect ratio
  let scaleFactor = min(width / img.width, height / img.height);
  let displayWidth = img.width * scaleFactor; 
  let displayHeight = img.height * scaleFactor; 

  // Center the image on the canvas by calculating offsets
  let offsetXCanvas = (width - displayWidth) / 2;
  let offsetYCanvas = (height - displayHeight) / 2;

  let segmentWidth = displayWidth / numSegments;
  let segmentHeight = displayHeight / numSegments;

  // Loop through each segment's position to create a dynamic mosaic effect with noise-based jitter
  for (let y = 0; y < displayHeight; y += segmentHeight) {
    for (let x = 0; x < displayWidth; x += segmentWidth) {
      
      // Calculate the original image coordinates for the current segment
      let originalX = x / scaleFactor;
      let originalY = y / scaleFactor;
      
      // Get the color of the pixel at the segment's center in the original image
      let segmentColour = img.get(originalX, originalY);
      
      fill(segmentColour[0], segmentColour[1], segmentColour[2], 150); // Transparency set to 150
      noStroke();
      
      // Use Perlin noise to create a smooth random offset for each segment
      let noiseX = noise((x + frameCount) * noiseScale, y * noiseScale); 
      let noiseY = noise(x * noiseScale, (y + frameCount) * noiseScale); 
      
      // Map the noise values to a range for offsetting the ellipse position
      let offsetXNoise = map(noiseX, 0, 1, -5, 5); 
      let offsetYNoise = map(noiseY, 0, 1, -5, 5);

      ellipse(offsetXCanvas + x + offsetXNoise, offsetYCanvas + y + offsetYNoise, segmentWidth, segmentHeight);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size on window resize
}
