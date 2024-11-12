let img;                   
let numSegments = 300;    

function preload() {
  img = loadImage('assets/Claude_Monet,_Saint-Georges_majeur_au_crépuscule.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // Set canvas size to window dimensions 
  // Remove noLoop() to enable continuous drawing
}

function draw() {
  background(255, 20); // Semi-transparent background to create a trailing effect 
  
  // Calculate scale factor to fit the image within the canvas while maintaining aspect ratio
  let scaleFactor = min(width / img.width, height / img.height);
  let displayWidth = img.width * scaleFactor;  
  let displayHeight = img.height * scaleFactor; 

  // Center the image on the canvas by calculating offsets
  let offsetX = (width - displayWidth) / 2;
  let offsetY = (height - displayHeight) / 2;

  let segmentWidth = displayWidth / numSegments;
  let segmentHeight = displayHeight / numSegments;

  // Loop through each segment's position to create a subtle, jittery mosaic effect
  for (let segYPos = 0; segYPos < displayHeight; segYPos += segmentHeight) {
    for (let segXPos = 0; segXPos < displayWidth; segXPos += segmentWidth) {
     
      let originalX = segXPos / scaleFactor;
      let originalY = segYPos / scaleFactor;
      
      // Get the color of the pixel at the segment's center in the original image
      let segmentColour = img.get(originalX, originalY);
      
      fill(segmentColour[0], segmentColour[1], segmentColour[2], 150); // Transparency set to 150
      noStroke();
      
      // Add slight random offset for dynamic, jittery effect
      let offsetXRandom = random(-1, 1); 
      let offsetYRandom = random(-1, 1); 
      
      // Draw an ellipse at the current segment's position with random jitter
      ellipse(offsetX + segXPos + offsetXRandom, offsetY + segYPos + offsetYRandom, segmentWidth, segmentHeight);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size on window resize 
}
