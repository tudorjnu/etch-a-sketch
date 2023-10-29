const cleanButton = document.getElementById('clean-button');
const grid = document.getElementById('grid-container');
let slider = document.getElementById("myRange");
let sliderField = document.getElementById('slider-field');
sliderField.textContent = `${slider.value} x ${slider.value}`

grid.className = 'grid-container';

let isMouseDown = false;

function handleMouseEvents(e) {
  if (e.type === 'mousedown') {
    isMouseDown = true;
  }
  if (e.type === 'mouseup') {
    isMouseDown = false;
  }
  if (e.type === 'mousemove' && isMouseDown) {
    e.target.style.backgroundColor = '#212529';
  }
}

let boxWidth;  // Moved boxWidth to global scope to make it available in makeBox

function makeBox() {
  let box = document.createElement('div');  // Added let before box
  box.className = 'grid-box';
  box.addEventListener('mousedown', handleMouseEvents);
  box.addEventListener('mouseup', handleMouseEvents);
  box.addEventListener('mousemove', handleMouseEvents);
  return box;
}

function makeGrid(gridSize) {

  for (let row = 0; row < gridSize; row++) {
    let rowDiv = document.createElement('div');
    rowDiv.className = 'grid-row';
    for (let col = 0; col < gridSize; col++) {
      let box = makeBox();
      rowDiv.appendChild(box);
    }
    grid.appendChild(rowDiv);
  }
}

makeGrid(16);

// Added a listener on the document to set isMouseDown to false
document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

cleanButton.addEventListener('click', () => {
  let squares = grid.querySelectorAll('.grid-box');
  squares.forEach((element) => {
    element.style.backgroundColor = 'transparent';
  });
});

slider.oninput = function() {
  let gridElements = grid.querySelectorAll('*');
  gridElements.forEach((element) => {
    element.remove();
  })
  makeGrid(this.value);
  sliderField.textContent = `${slider.value} x ${slider.value}`

}
