let img;                    
let numSegments = 300;      

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
  
  let offsetX = (width - displayWidth) / 2;
  let offsetY = (height - displayHeight) / 2;

  let segmentWidth = displayWidth / numSegments;
  let segmentHeight = displayHeight / numSegments;

  for (let segYPos = 0; segYPos < displayHeight; segYPos += segmentHeight) {
    for (let segXPos = 0; segXPos < displayWidth; segXPos += segmentWidth) {
      
      let originalX = segXPos / scaleFactor;
      let originalY = segYPos / scaleFactor;
    
      let segmentColour = img.get(originalX, originalY);
      
      // Set the fill color with transparency and remove stroke
      fill(segmentColour[0], segmentColour[1], segmentColour[2], 150); // Transparency set to 150 
      noStroke();
      
      // Draw an ellipse for each segment with random size for a dynamic effect
      let randomSize = random(segmentWidth * 0.5, segmentWidth * 1.5); // Random size 
      ellipse(offsetX + segXPos, offsetY + segYPos, randomSize, randomSize);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size on window resize 
  redraw();                                
}
