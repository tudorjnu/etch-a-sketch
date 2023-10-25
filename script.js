const gridWrapper = document.getElementById('grid-wrapper');
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
    // Your code here
    e.target.style.backgroundColor = 'pink';
  }
}

function makeGrid() {
  const gridSize = 3;
  const boxWidth = 50;
  const margin = 20;

  for (let row = 0; row < gridSize; row++) {
    let rowDiv = document.createElement('div');
    rowDiv.className = 'grid-row';

    for (let col = 0; col < gridSize; col++) {
      let box = document.createElement('div');
      box.className = 'grid-box';
      squares.push(box);
      box.addEventListener('mousedown', handleMouseEvents);
      box.addEventListener('mouseup', handleMouseEvents);
      box.addEventListener('mousemove', handleMouseEvents);
      rowDiv.appendChild(box);
    }
    grid.appendChild(rowDiv);
  }

  // Moved these lines outside the loop and added 'px'
  gridWrapper.style.width = `${gridSize * (boxWidth + 1) + margin}px`;
  gridWrapper.style.height = `${gridSize * (boxWidth + 1) + margin}px`;

  gridWrapper.appendChild(grid);
}

makeGrid();

