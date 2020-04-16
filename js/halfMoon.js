const points = []
for (let i = 0; i < NUMBER_OF_POINTS; i++) {
  const radius = Math.random()
  const theta = Math.random() * 2 * Math.PI
  points.push([radius, theta])
}

function getModifiedPoints(points) {
  const newPoints = []
  const output = []

  for (let point of points) {
    if (point[1] > Math.PI) {
      newPoints.push([
        ((RADIUS_RANGE[0] + point[0] * (RADIUS_RANGE[1] - RADIUS_RANGE[0])) *
          Math.cos(point[1]) -
          RADIUS_RANGE[0] / 2 +
          CANVAS_DIMENSION / 2) /
          CANVAS_DIMENSION,
        ((RADIUS_RANGE[0] + point[0] * (RADIUS_RANGE[1] - RADIUS_RANGE[0])) *
          Math.sin(point[1]) -
          DISTANCE / 2 +
          CANVAS_DIMENSION / 2) /
          CANVAS_DIMENSION
      ])
      output.push([1])
    } else {
      newPoints.push([
        ((RADIUS_RANGE[0] + point[0] * (RADIUS_RANGE[1] - RADIUS_RANGE[0])) *
          Math.cos(point[1]) +
          (RADIUS_RANGE[0] + RADIUS_RANGE[1]) / 2 -
          RADIUS_RANGE[0] / 2 +
          CANVAS_DIMENSION / 2) /
          CANVAS_DIMENSION,
        ((RADIUS_RANGE[0] + point[0] * (RADIUS_RANGE[1] - RADIUS_RANGE[0])) *
          Math.sin(point[1]) +
          DISTANCE / 2 +
          CANVAS_DIMENSION / 2) /
          CANVAS_DIMENSION
      ])
      output.push([0])
    }
  }

  return { data: newPoints, output }
}

function train(neuron) {
  neuron.train(getModifiedPoints(points), 100)
}
