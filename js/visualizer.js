class Visualizer {
  constructor(neuron) {
    this.neuron = neuron

    this.point1 = createVector(0, 0)
    this.point2 = createVector(0, 0)

    this.nextPoint1 = createVector(0, 0)
    this.nextPoint2 = createVector(0, 0)
  }

  drawSamples = () => {
    const xyPoints = getModifiedPoints(points)

    for (let x of xyPoints) {
      let color = 'green'
      if (neuron.activate(x) && x[2] == 1) color = 'yellow'
      else if (!neuron.activate(x) && x[2] == 0) color = 'red'
      else if (neuron.activate(x) && x[2] == 0) color = 'purple'
      push()
      stroke(color)
      circle(Math.round(x[0] + 250), Math.round(x[1] + 250), 1)
      pop()
    }
  }

  drawLine = () => {
    const amount = 0.1

    const v1 = p5.Vector.lerp(this.point1, this.nextPoint1, amount)
    const v2 = p5.Vector.lerp(this.point2, this.nextPoint2, amount)

    push()
    stroke('#bbe1fa')
    strokeWeight(5)
    line(v1.x, v1.y, v2.x, v2.y)
    pop()

    this.point1 = v1
    this.point2 = v2
  }

  calculateLine = () => {
    this.nextPoint1 = createVector(
      0,
      (-neuron.w[1] * -250 + neuron.w[0]) / neuron.w[2] + 250
    )

    this.nextPoint2 = createVector(
      500,
      (-neuron.w[1] * 250 + neuron.w[0]) / neuron.w[2] + 250
    )
  }

  forceLine = () => {
    this.calculateLine()
    this.point1 = this.nextPoint1
    this.point2 = this.nextPoint2
  }

  addSample = sample => {
    console.log(sample)
    this.samples.push(sample)
  }
}
