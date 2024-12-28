//Create divs for grid inside container element

const container = 1000;

const sketchArea = document.querySelector("#sketcharea");
sketchArea.style.width = `${container}px`;
sketchArea.style.height = `${container}px`;

let grid = 16;

function createGridDivs() {
  // Clear the previous grid
  sketchArea.innerHTML = "";

  // Get the actual container size (ensures it adapts to screen)
  const containerSize = sketchArea.offsetWidth;

  // Calculate the size of each square
  const squareSize = container / grid;

  for (let i = 0; i < grid * grid; i++) {
    const gridSquare = document.createElement("div");

    gridSquare.style.width = `${squareSize}px`;
    gridSquare.style.height = `${squareSize}px`;
    gridSquare.style.backgroundColor = "white";
    gridSquare.style.border = "1px solid grey";

    gridSquare.addEventListener("mouseover", () => {
      gridSquare.style.backgroundColor = "lightblue";
    });

    sketchArea.appendChild(gridSquare);
  }
}

createGridDivs();

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
