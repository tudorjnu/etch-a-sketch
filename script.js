const cleanButton = document.getElementById('clean-button');
const grid = document.getElementById('grid-container');
const slider = document.getElementById("grid-size");
const sliderField = document.getElementById('slider-field');

let isMouseDown = false;

const updateSliderField = value => {
  sliderField.textContent = `${value} x ${value}`;
};

// Initial setup
grid.className = 'grid-container';
updateSliderField(slider.value);

const handleMouseEvents = e => {
  if (e.type === 'mousedown') isMouseDown = true;
  if (e.type === 'mouseup') isMouseDown = false;
  if (e.type === 'mousemove' && isMouseDown) {
    e.target.style.backgroundColor = '#212529';
  }
};

const addMouseEvents = box => {
  ['mousedown', 'mouseup', 'mousemove'].forEach(event => {
    box.addEventListener(event, handleMouseEvents);
  });
};

const makeBox = () => {
  const box = document.createElement('div');
  box.className = 'grid-box';
  addMouseEvents(box);
  return box;
};

const makeGrid = gridSize => {
  for (let row = 0; row < gridSize; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'grid-row';
    for (let col = 0; col < gridSize; col++) {
      rowDiv.appendChild(makeBox());
    }
    grid.appendChild(rowDiv);
  }
};

const clearGrid = () => {
  const squares = grid.querySelectorAll('.grid-box');
  squares.forEach(element => element.style.backgroundColor = 'transparent');
};

document.addEventListener('mouseup', () => isMouseDown = false);

cleanButton.addEventListener('click', clearGrid);

slider.oninput = function() {
  const gridElements = grid.querySelectorAll('*');
  gridElements.forEach(element => element.remove());
  makeGrid(this.value);
  updateSliderField(this.value);
};

// Initial grid
makeGrid(16);
