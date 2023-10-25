const gridWrapper = document.getElementById('grid-wrapper');
const cleanButton = document.getElementById('clean-button');
const grid = document.createElement('div');

const squares = [];
grid.id = 'grid-container';

let isMouseDown = false;

function handleMouseEvents(e) {
  if (e.type === 'mousedown') {
    isMouseDown = true;
  }
  if (e.type === 'mouseup') {
    isMouseDown = false;
  }
  if (e.type === 'mousemove' && isMouseDown) {
    e.target.style.backgroundColor = 'pink';
  }
}

let boxWidth;  // Moved boxWidth to global scope to make it available in makeBox

function makeBox() {
  let box = document.createElement('div');  // Added let before box
  box.style.height = `${boxWidth}px`;
  box.style.width = `${boxWidth}px`;
  box.style.border = `1px solid black`;
  box.addEventListener('mousedown', handleMouseEvents);
  box.addEventListener('mouseup', handleMouseEvents);
  box.addEventListener('mousemove', handleMouseEvents);
  squares.push(box);
  return box;
}

function makeGrid() {
  const gridSize = 16;
  boxWidth = 20;  // Moved boxWidth assignment here
  const margin = 20;

  for (let row = 0; row < gridSize; row++) {
    let rowDiv = document.createElement('div');
    rowDiv.className = 'grid-row';
    for (let col = 0; col < gridSize; col++) {
      let box = makeBox();  // Added let before box
      rowDiv.appendChild(box);
    }
    grid.appendChild(rowDiv);
  }

  gridWrapper.style.width = `${gridSize * (boxWidth + 1) + margin}px`;
  gridWrapper.style.height = `${gridSize * (boxWidth + 1) + margin}px`;

  gridWrapper.appendChild(grid);
}

makeGrid();

// Added a listener on the document to set isMouseDown to false
document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

cleanButton.addEventListener('click', () => {
  squares.forEach((element) => {
    element.style.backgroundColor = 'transparent';
  });
});
