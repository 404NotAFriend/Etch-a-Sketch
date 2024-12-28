const sketchArea = document.querySelector("#sketcharea");
let grid = 16; // Initial grid size

// Function to generate random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function createGridDivs() {
  // Clear previous grid
  sketchArea.innerHTML = "";

  // Get the container dimensions
  const containerSize = sketchArea.offsetWidth;
  const squareSize = containerSize / grid;

  // Create rows and squares
  for (let i = 0; i < grid; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.style.height = `${squareSize}px`;

    for (let j = 0; j < grid; j++) {
      const gridSquare = document.createElement("div");
      gridSquare.classList.add("grid-square");
      gridSquare.style.width = `${squareSize}px`;
      gridSquare.style.height = "100%";

      // Add hover effect
      gridSquare.addEventListener("mouseover", (e) => {
        if (e.buttons === 1) {
          // Only color when mouse button is held down
          e.target.style.backgroundColor = "lightblue";
        }
      });

      // Add mouse down effect
      gridSquare.addEventListener("mousedown", (e) => {
        e.target.style.backgroundColor = "lightblue";
      });

      row.appendChild(gridSquare);
    }
    sketchArea.appendChild(row);
  }
}

// Prevent drag selection while drawing
sketchArea.addEventListener("dragstart", (e) => e.preventDefault());

// Create initial grid
createGridDivs();

// Resize grid button handler
const btnResize = document.querySelector("#btnSize");
btnResize.addEventListener("click", () => {
  let newSize = parseInt(prompt("Enter new grid size (1-100):", grid));
  if (!isNaN(newSize) && newSize > 0 && newSize <= 100) {
    grid = newSize;
    createGridDivs();
  } else {
    alert("Invalid input. Please enter a number between 1 and 100.");
  }
});

// Handle window resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(createGridDivs, 100);
});
