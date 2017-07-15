const MIN_RADIUS = 10
const MAX_RADIUS = 100
const FLOAT_FACTOR = 1
const BUBBLE_RATE = 0.5


class Bubble {
    constructor (ctx) {
        this.ctx = ctx
        this.radius = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS
        this.x = Math.random() * window.innerWidth
        this.y = window.innerHeight + this.radius
    }

    draw () {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
        this.ctx.closePath()
    }
}

export class BubbleDrower {
    constructor (canvasElement) {
        this.element = canvasElement
        this.ctx = canvasElement.getContext('2d')

        this.isRunning = false
        this.frameTime = null
        this.frameFactor = null
        this.bubbles = new Set()
        this.spawnTimer = null
    }

    spawnBubble () {
        this.bubbles.add(new Bubble(this.ctx))
        this.spawnTimer = setTimeout(() => this.spawnBubble(), 1000 * 1000 / BUBBLE_RATE / window.innerWidth)
    }

    start () {
        this.isRunning = true
        this.iterateFrame()

        this.spawnBubble()
    }

    stop () {
        this.isRunning = false
        clearTimeout(this.spawnTimer)
        this.spawnTimer = null
    }

    process () {
        this.element.width = window.innerWidth
        this.element.height = window.innerHeight

        this.ctx.fillStyle = '#383d58'
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'

        for (let bubble of this.bubbles) {
            bubble.draw()
            this.ctx.stroke()
        }

        for (let bubble of this.bubbles) {
            bubble.draw()
            this.ctx.fill()
        }

        for (let bubble of this.bubbles) {
            bubble.y -= (MAX_RADIUS + MIN_RADIUS - bubble.radius) * FLOAT_FACTOR * this.frameFactor
            if (bubble.y < -bubble.radius) this.bubbles.delete(bubble)
        }

        this.iterateFrame()
    }

    iterateFrame () {
        if (!this.isRunning) return

        const time = new Date().getTime()
        this.frameFactor = this.frameTime ? (time - this.frameTime) / 1000 : 0
        this.frameTime = time

        window.requestAnimationFrame(() => this.process())
    }
}
