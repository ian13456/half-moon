// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/106-xor-tfjs.html
// XOR with tf.js
// https://youtu.be/N3ZnNa01BPM

let nn
let xs
let model
let cols
let rows
let inputs
let visualizer
let resolution = 20
let learningRate = 0.2

const { data, output } = getModifiedPoints(points)
const train_xs = tf.tensor2d(data)
const train_ys = tf.tensor2d(output)
visualizer = new Visualizer(data, output)

const timeout = 1

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
  xs = tf.tensor2d(inputs)

  model = tf.sequential()
  let hidden1 = tf.layers.dense({
    inputShape: [2],
    units: 16,
    activation: 'sigmoid'
  })
  let hidden2 = tf.layers.dense({
    units: 8,
    activation: 'tanh'
  })
  let output = tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  })
  model.add(hidden1)
  model.add(hidden2)
  model.add(output)

  const optimizer = tf.train.adam(learningRate)
  model.compile({
    optimizer: optimizer,
    loss: 'meanSquaredError'
  })

  setTimeout(train, timeout)
}

function train() {
  trainModel().then((result) => {
    // /console.log(result.history.loss[0]);
    visualizer.updateEpochLoss(result.history.loss[0])
    setTimeout(train, timeout)
  })
}

function trainModel() {
  return model.fit(train_xs, train_ys, {
    shuffle: true,
    // batchSize: 32,
    epochs: 1
  })
}

function draw() {
  background(0)

  tf.tidy(() => {
    // Get the predictions
    let ys = model.predict(xs)
    let y_values = ys.dataSync()
    visualizer.drawGrids(y_values)

    let ys2 = model.predict(train_xs)
    let y2_values = ys2.dataSync()
    visualizer.drawSamples(y2_values)
  })
}
