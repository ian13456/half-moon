class Visualizer {
  constructor(data) {
    this.data = data

    this.epoch = 1

    this.epochDOM = document.getElementById('epoch')
    this.lossDOM = document.getElementById('loss')
  }

  drawGrids = (output) => {
    let index = 0
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let br = output[index] * 255
        push()
        fill(br)
        noStroke()
        rect(i * resolution, j * resolution, resolution, resolution)
        fill(255 - br)
        textSize(8)
        textAlign(CENTER, CENTER)
        text(
          nf(output[index], 1, 2),
          i * resolution + resolution / 2,
          j * resolution + resolution / 2
        )
        pop()
        index++
      }
    }
  }

  drawSamples = (output) => {
    this.data.forEach((item, i) => {
      const [first, second] = item
      const result = output[i] * 255
      const c = 255 - result

      push()
      fill(c, result, 0)
      circle(first * CANVAS_DIMENSION, second * CANVAS_DIMENSION, 10)
      pop()
    })
  }

  updateEpochLoss = (loss) => {
    this.epochDOM.innerHTML = `Epoch: ${this.epoch++}`
    this.lossDOM.innerHTML = `Loss: ${loss.toFixed(3)}`
  }

  addSample = (sample) => {}
}
