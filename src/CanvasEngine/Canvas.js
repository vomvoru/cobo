const createCanvas = (attributes) => {
  const canvas = document.createElement('canvas')

  Object.keys(attributes).forEach((key) => {
    canvas.setAttribute(key, attributes[key])
  })

  return canvas
}

const create = ({ width, height }) => {
  const canvas = createCanvas({ width, height })
  const ctx = canvas.getContext('2d')

  return {
    getDOM: () => canvas,
    clear: () => ctx.clearRect(0, 0, width, height),
    arc: (x, y, radius) => {
      ctx.arc(x, y, radius, 0, Math.PI * 2)
    },
    fill: (style) => {
      ctx.fillStyle = style
      ctx.fill()
    },
    begin: () => ctx.beginPath(),
    close: () => ctx.closePath(),
  }
}

export default {
  create,
}
