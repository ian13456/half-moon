// let perceptron
// let visualizer
let neuron

function setup() {
  const canvas = createCanvas(CANVAS_DIMENSION, CANVAS_DIMENSION)
  canvas.parent('my-cvs')

  neuron = new Neuron(2)

  // perceptron = new Perceptron(samples, targets, 0.2, 0.001, 2000)
  // visualizer = new Visualizer(samples, targets, perceptron)
  // visualizer.forceLine()
}

function draw() {
  background('#393e46')

  const xyPoints = getModifiedPoints(points)

  line(
    0,
    (-neuron.w[1] * -250 + neuron.w[0]) / neuron.w[2] + 250,
    500,
    (-neuron.w[1] * 250 + neuron.w[0]) / neuron.w[2] + 250
  )

  for (let x in xyPoints) {
    let color = 'green'
    if (neuron.activate(x) && x[2] == 1) color = 'yellow'
    else if (!neuron.activate(x) && x[2] == 0) color = 'red'
    else if (neuron.activate(x) && x[2] == 0) color = 'purple'
    push()
    stroke(color)
    circle(Math.round(x[0] + 250), Math.round(x[1] + 250), 1)
    pop()
  }

  // visualizer.drawLine()
  // visualizer.drawSamples()
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

// setInterval(() => {
//   perceptron.step()
//   visualizer.calculateLine()
// }, 500)
