class Neuron {
  constructor(n) {
    this.w = []
    this.w.push(Math.random())

    this.n = n

    for (let i = 0; i < n; i++) this.w.push(Math.random())

    this.learningRate = 0.01
  }

  activate = x => {
    x = [...x]
    x.unshift(-1)
    let result = 0
    for (let i = 0; i < this.w.length; i++) result += x[i] * this.w[i]

    return result > 0
  }

  train = (trainingSet, maxIter, currIter = 1) => {
    trainingSet = this.shuffle([...trainingSet])

    let error = 0
    for (let x of trainingSet) {
      let t = x[2]
      let o = -1
      if (this.activate(x)) o = 1
      else o = 0
      error += Math.abs(t - o)
      x = [...x]
      x.unshift(-1)
      for (let i = 0; i < this.w.length; i++) {
        this.w[i] += this.learningRate * (t - o) * x[i]
      }
    }

    // errorDOM.value = error

    if (error == 0 || currIter >= maxIter) return
    else this.train(trainingSet, maxIter, currIter + 1)
  }

  shuffle = a => {
    var j, x, i
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = a[i]
      a[i] = a[j]
      a[j] = x
    }
    return a
  }

  randomizeWeights = () => {
    this.w = []
    this.w.push(Math.random())

    for (let i = 0; i < this.n; i++) this.w.push(Math.random())
  }
}
