// let perceptron
let visualizer
let neuron

function setup() {
  const canvas = createCanvas(CANVAS_DIMENSION, CANVAS_DIMENSION)
  canvas.parent('my-cvs')

  neuron = new Neuron(2)

  // perceptron = new Perceptron(samples, targets, 0.2, 0.001, 2000)
  visualizer = new Visualizer(neuron)
  visualizer.forceLine()
}

function draw() {
  background('#393e46')

  visualizer.drawLine()
  visualizer.drawSamples()
}

function windowResized() {
  resizeCanvas(CANVAS_DIMENSION, CANVAS_DIMENSION)
}

// function mouseClicked() {
//   addMouseSample()
// }

// function mouseDragged() {
//   addMouseSample()
// }

// const addMouseSample = () =>
//   visualizer.addSample([
//     (mouseX / CANVAS_DIMENSION) * 3 - 1,
//     -(mouseY / CANVAS_DIMENSION) * 3 + 2
//   ])

setInterval(() => {
  train(neuron)
  visualizer.calculateLine()
}, 500)
