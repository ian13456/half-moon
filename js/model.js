class HalfMoonModel {
  constructor() {
    this.model = tf.sequential()
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
    this.model.add(hidden1)
    this.model.add(hidden2)
    this.model.add(output)

    const optimizer = tf.train.adam(learningRate)
    this.model.compile({
      optimizer: optimizer,
      loss: 'meanSquaredError'
    })
  }

  train = () => {
    setTimeout(this.trainSelf, timeout)
  }

  trainSelf = () => {
    this.trainModel().then((result) => {
      // /console.log(result.history.loss[0]);
      visualizer.updateEpochLoss(result.history.loss[0])
      setTimeout(this.trainSelf, timeout)
    })
  }

  trainModel = () => {
    return this.model.fit(train_xs, train_ys, {
      shuffle: true,
      epochs: 1
    })
  }
}
