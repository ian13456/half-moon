class HalfMoonModel {
  constructor(xs, ys, minError) {
    this.model = tf.sequential()
    let hidden1 = tf.layers.dense({
      inputShape: [2],
      units: 16,
      activation: 'tanh'
    })
    let output = tf.layers.dense({
      units: 1,
      activation: 'sigmoid'
    })
    this.model.add(hidden1)
    this.model.add(output)

    const optimizer = tf.train.adam(learningRate)
    this.model.compile({
      optimizer: optimizer,
      loss: 'meanSquaredError'
    })

    this.config = {
      minError
    }

    this.xs = xs
    this.ys = ys

    this.paused = false
    this.pauseButton = document.getElementById('pause')
    this.pauseButton.addEventListener('click', () => {
      if (this.paused) {
        this.paused = false
        this.pauseButton.innerHTML = 'pause'
        this.train()
      } else {
        this.paused = true
        this.pauseButton.innerHTML = 'resume'
      }
    })
  }

  train = () => {
    setTimeout(() => this.trainSelf(), timeout)
  }

  trainSelf = () => {
    this.trainModel().then((result) => {
      // /console.log(result.history.loss[0]);
      const loss = result.history.loss[0]
      visualizer.updateEpochLoss(loss)
      if (loss > this.config.minError) {
        if (!this.paused) {
          setTimeout(() => this.trainSelf(), timeout)
        }
      } else {
        this.pauseButton.disabled = true
      }
    })
  }

  trainModel = () => {
    return this.model.fit(this.xs, this.ys, {
      shuffle: true,
      epochs: 1
    })
  }

  predict = (xs) => {
    return this.model.predict(xs)
  }
}
