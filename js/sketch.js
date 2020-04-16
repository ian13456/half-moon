// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/106-xor-tfjs.html
// XOR with tf.js
// https://youtu.be/N3ZnNa01BPM

let nn
let model
let cols
let rows
let inputs
let visualizer
let gridSamples
let dotSamples
let resolution = 20
let learningRate = 0.2

const timeout = 1
const { data, output } = getModifiedPoints(points)
const train_xs = tf.tensor2d(data)
const train_ys = tf.tensor2d(output)
const dataClone = JSON.parse(JSON.stringify(data))
dotSamples = train_xs.clone()

visualizer = new Visualizer(data, output)

function setup() {
  createCanvas(CANVAS_DIMENSION, CANVAS_DIMENSION).parent('my-cvs')
  cols = width / resolution
  rows = height / resolution

  // Create the input data
  inputs = []
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols
      let x2 = j / rows
      inputs.push([x1, x2])
    }
  }
  gridSamples = tf.tensor2d(inputs)

  model = new HalfMoonModel(train_xs, train_ys, 0.001)
  model.train()
}

function draw() {
  if (!model.paused) {
    background(0)
    tf.tidy(() => {
      // Get the predictions
      let ys = model.predict(gridSamples)
      let y_values = ys.dataSync()
      visualizer.drawGrids(y_values)

      let ys2 = model.predict(dotSamples)
      let y2_values = ys2.dataSync()
      visualizer.drawSamples(y2_values)
    })
  }
}
