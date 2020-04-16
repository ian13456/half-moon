class Visualizer {
  constructor(network, data) {
    this.network = network
    this.data = data
  }

  drawSamples = (results) => {
    this.data.forEach((item, i) => {
      const [first, second] = item
      const result = results[i] * 255

      const c = 255 - result

      push()
      fill(c, result, 0)
      circle(Math.round(first + 250), Math.round(second + 250), 10)
      pop()
    })
  }

  addSample = (sample) => {
    console.log(sample)
    this.samples.push(sample)
  }
}
