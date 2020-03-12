const NUMBER_OF_POINTS = 2000
const RADIUS_RANGE = [100, 110]
const DISTANCE = -50

const points = []
for (let i = 0; i < NUMBER_OF_POINTS; i++) {
  const radius = Math.random()
  const theta = Math.random() * 2 * Math.PI
  points.push([radius, theta])
}

function getModifiedPoints(points) {
  const newPoints = []

  for (let point in points) {
    if (point[1] > Math.PI)
      newPoints.push([
        (RADIUS_RANGE[0] + point[0] * (RADIUS_RANGE[1] - RADIUS_RANGE[0])) * Math.cos(point[1]),
        (RADIUS_RANGE[0] + point[0] * (RADIUS_RANGE[1] - RADIUS_RANGE[0])) * Math.sin(point[1]) -
          DISTANCE / 2,
        1
      ])
    else
      newPoints.push([
        (RADIUS_RANGE[0] + point[0] * (RADIUS_RANGE[1] - RADIUS_RANGE[0])) * Math.cos(point[1]) +
          (RADIUS_RANGE[0] + RADIUS_RANGE[1]) / 2,
        (RADIUS_RANGE[0] + point[0] * (RADIUS_RANGE[1] - RADIUS_RANGE[0])) * Math.sin(point[1]) +
          DISTANCE / 2,
        0
      ])
  }

  return newPoints
}

function train(neuron) {
  neuron.train(getModifiedPoints(points), 1)
}
