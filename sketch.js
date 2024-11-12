let img;                    // Variable to hold the loaded image
let numSegments = 300;      // Number of segments to divide the image into for mosaic effect

function preload() {
  img = loadImage('assets/Claude_Monet,_Saint-Georges_majeur_au_crépuscule.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // Set canvas size to window dimensions
  noLoop();                                
}

function draw() {
  background(255);                         
  
  // Calculate scale factor to fit the image within the canvas while maintaining aspect ratio
  let scaleFactor = min(width / img.width, height / img.height);
  let displayWidth = img.width * scaleFactor;   
  let displayHeight = img.height * scaleFactor; 

  // Center the image on the canvas by calculating offsets
  let offsetX = (width - displayWidth) / 2;
  let offsetY = (height - displayHeight) / 2;

  
  let segmentWidth = displayWidth / numSegments;
  let segmentHeight = displayHeight / numSegments;

  // Loop through each segment's position to draw the mosaic effect
  for (let segYPos = 0; segYPos < displayHeight; segYPos += segmentHeight) {
    for (let segXPos = 0; segXPos < displayWidth; segXPos += segmentWidth) {
      
      let originalX = segXPos / scaleFactor;
      let originalY = segYPos / scaleFactor;
      
      let segmentColour = img.get(originalX + (segmentWidth / scaleFactor) / 2, originalY + (segmentHeight / scaleFactor) / 2);
      
      fill(segmentColour);
      noStroke();
      ellipse(offsetX + segXPos, offsetY + segYPos, segmentWidth, segmentHeight);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size on window resize
  redraw();                               
}
