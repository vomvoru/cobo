import CanvasEngine from './CanvasEngine'

const width = 500
const height = 300
const ce = CanvasEngine.create({ width, height })

const ballRadius = 10
let x = width / 2
let y = height - 30

let dx = 2
let dy = -2

ce.addTick((cv) => {
  if (x + dx > width - ballRadius || x + dx < ballRadius) {
    dx = -dx
  }
  if (y + dy > height - ballRadius || y + dy < ballRadius) {
    dy = -dy
  }

  x += dx
  y += dy

  cv.arc(x, y, ballRadius)
  cv.fill('#0095DD')
})

ce.addTick(
  (cv) => {
    cv.arc(x + 10, y + 10, ballRadius)
    cv.fill('#0095DD')
  },
  {
    gap: 1000,
  },
)

const app = document.getElementById('app')
app.appendChild(ce.getCanvas())

const progress = document.getElementById('progress')

let load

const loading = () => {
  load = ce.preload().next()
  if (load.done === true) {
    ce.run()
    return
  }

  const [max, value] = load.value
  progress.max = max
  progress.value = value
  load = ce.preload().next()

  setTimeout(loading, 10)
}

loading()
