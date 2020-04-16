// let perceptron
let visualizer
let network

let xs
let inputs
let outputs

function setup() {
  const canvas = createCanvas(CANVAS_DIMENSION, CANVAS_DIMENSION)
  canvas.parent('my-cvs')

  model = tf.sequential()
  const hidden = tf.layers.dense({
    inputShape: [2],
    units: 16,
    activation: 'sigmoid'
  })
  const output = tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  })
  model.add(hidden)
  model.add(output)

  const optimizer = tf.train.adam(0.2)
  model.compile({
    optimizer: optimizer,
    loss: 'meanSquaredError'
  })

  inputs = []
  outputs = []
  const data = getModifiedPoints(points)
  data.forEach((item) => {
    const [x, y, output] = item
    const i = [x, y]
    const o = [output]

    inputs.push(i)
    outputs.push(o)
  })

  xs = tf.tensor2d(inputs)
  outputs = tf.tensor2d(outputs)
  visualizer = new Visualizer(model, data)

  setTimeout(train, 10)
}

function train() {
  trainModel().then((result) => {
    ///console.log(result.history.loss[0]);
    setTimeout(train, 10)
  })
}

function trainModel() {
  return model.fit(xs, outputs, {
    shuffle: true,
    epochs: 1
  })
}

function draw() {
  background(0)

  tf.tidy(() => {
    // Get the predictions
    let ys = model.predict(xs)
    let y_values = ys.dataSync()

    visualizer.drawSamples(y_values)

    // Draw the results
    // console.log(y_values)
  })
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
