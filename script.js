const sketchArea = document.querySelector("#sketcharea");
let grid = 16; // Initial grid size
let isRandomColor = false; // Flag to track if random color mode is active
let isDarkeningMode = false; // Flag to track if darkening mode is active
let currentColor = "lightblue";

// Function to create the color input
const colorInput = document.createElement("input");
colorInput.type = "color";
colorInput.style.display = "none";
document.body.appendChild(colorInput);

// Function to generate random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to darken a color by 10%
function darkenColor(element) {
  // Get current darkness level or initialize it
  let darkness = Number(element.dataset.darkness) || 0;

  if (darkness < 1) {
    // Check if square isn't completely black
    darkness += 0.1; // Increase darkness by 10%
    element.dataset.darkness = darkness;

    let currentColor = element.style.backgroundColor;
    if (!currentColor || currentColor === "lightblue") {
      currentColor = isRandomColor ? getRandomColor() : "rgb(173, 216, 230)"; // lightblue
    }

    let [r, g, b] = currentColor.match(/\d+/g).map(Number);
    r = Math.floor(r * (1 - darkness));
    g = Math.floor(g * (1 - darkness));
    b = Math.floor(b * (1 - darkness));

    element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
  return element.style.backgroundColor;
}

// Function to get current color based on mode
function getCurrentColor(element) {
  if (isDarkeningMode) {
    darkenColor(element);
    return;
  }
  return isRandomColor ? getRandomColor() : currentColor;
}

// Add this new function to handle color change
function changeColor(color) {
  currentColor = color;
  isRandomColor = false;
  isDarkeningMode = false;
  btnRColor.style.backgroundColor = "#4CAF50";
  btnRColor.textContent = "Randomize Color";
  btnDarken.style.backgroundColor = "#9c27b0";
  btnDarken.textContent = "Darkening Mode";
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
          e.target.style.backgroundColor = getCurrentColor(e.target);
        }
      });

      // Add mouse down effect
      gridSquare.addEventListener("mousedown", (e) => {
        e.target.style.backgroundColor = getCurrentColor(e.target);
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

// Add event listener for the new button
const btnChangeColor = document.querySelector("#btnChangeColor");
btnChangeColor.addEventListener("click", () => {
  colorInput.click();
});

colorInput.addEventListener("change", (e) => {
  changeColor(e.target.value);
});

const btnRColor = document.querySelector("#btnRColor");
btnRColor.addEventListener("click", () => {
  isRandomColor = !isRandomColor;
  isDarkeningMode = false;
  btnRColor.style.backgroundColor = isRandomColor ? "#ff4444" : "#4CAF50";
  btnRColor.textContent = isRandomColor ? "Normal Color" : "Randomize Color";
  btnDarken.style.backgroundColor = "#9c27b0";
  btnDarken.textContent = "Darkening Mode";
});

// Darkening mode button handler
const btnDarken = document.querySelector("#btnDarken");
btnDarken.addEventListener("click", () => {
  isDarkeningMode = !isDarkeningMode;
  isRandomColor = false;
  btnDarken.style.backgroundColor = isDarkeningMode ? "#ff4444" : "#9c27b0";
  btnDarken.textContent = isDarkeningMode ? "Normal Mode" : "Darkening Mode";
  btnRColor.style.backgroundColor = "#4CAF50";
  btnRColor.textContent = "Randomize Color";
});

// Handle window resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(createGridDivs, 100);
});
