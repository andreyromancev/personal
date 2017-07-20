const MIN_RADIUS = 10
const MAX_RADIUS = 100
const BUBBLE_RATE = 0.7
const BOUNCE_SPEED = 100
const BOUNCER_RADIUS = 70
const BOUNCER_BOUNCE_SPEED = 2000


class Bubble {
    constructor (x, y, radius, riseAngle) {
        this.radius = radius || Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS
        this.x = x || Math.random() * window.innerWidth
        this.y = y || window.innerHeight + this.radius
        this.riseAngle = riseAngle || 90
    }

    draw (ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
        ctx.closePath()
    }

    rise (speedFactor) {
        const delta = (MAX_RADIUS + MIN_RADIUS - this.radius) * speedFactor
        const angle = this.riseAngle * (Math.PI / 180)
        this.x += Math.cos(angle) * delta
        this.y -= Math.sin(angle) * delta
    }

    bounce (speedFactor, bubble, speed) {
        if (Object.is(this, bubble)) return
        const distance = Math.hypot(bubble.x - this.x, bubble.y - this.y)
        const maxRange = bubble.radius + this.radius

        if (distance > maxRange) return

        const angle = Math.atan2(this.y - bubble.y, this.x - bubble.x)
        const radiusFactor = bubble.radius / (this.radius + bubble.radius)
        const mergeFactor = 1 - distance / maxRange
        const hardRange = Math.max(bubble.radius, this.radius)
        const delta = Math.max((speed || BOUNCE_SPEED) * mergeFactor * radiusFactor * speedFactor, hardRange - distance)

        this.x += Math.cos(angle) * delta
        this.y += Math.sin(angle) * delta
    }

    isOutOfScreen () {
        if (this.x < -this.radius) return true
        if (this.x > window.innerWidth + this.radius) return true
        if (this.y < -this.radius) return true
        if (this.y > window.innerHeight + this.radius) return true

        return false
    }
}


export class BubbleDrower {
    constructor (canvasElement) {
        this.element = canvasElement

        this.isRunning = false
        this.frameTime = null
        this.frameFactor = null
        this.bubbles = new Set()
        this.spawnTimer = null
        this.bouncer = null
        this.spawnSide = 'bottom'
    }

    spawnBubble () {
        let bubble = new Bubble()
        switch (this.spawnSide) {
            case 'top':
                bubble.y = 0 - bubble.radius
                bubble.riseAngle = 270
                break
            case 'left':
                bubble.x = 0 - bubble.radius
                bubble.y = window.innerHeight * Math.random()
                bubble.riseAngle = 0
                break
            case 'right':
                bubble.x = window.innerWidth + bubble.radius
                bubble.y = window.innerHeight * Math.random()
                bubble.riseAngle = 180
                break
        }
        this.bubbles.add(bubble)
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

    setBouncerPosition (x, y) {
        if (
            x <= BOUNCER_RADIUS || x >= window.innerWidth - BOUNCER_RADIUS ||
            y <= BOUNCER_RADIUS || y >= window.innerHeight - BOUNCER_RADIUS
        ) {
            delete this.bouncer
            return
        }

        if (!this.bouncer) {
            this.bouncer = new Bubble(x, y, BOUNCER_RADIUS)
        } else {
            this.bouncer.x = x
            this.bouncer.y = y
        }
    }

    setRiseAngle (beta, gamma) {
        if (gamma > 5) this.spawnSide = 'right'
        else if (gamma < -5) this.spawnSide = 'left'
        else if (beta < -5) this.spawnSide = 'top'
        else this.spawnSide = 'bottom'
    }

    process () {
        this.element.width = window.innerWidth
        this.element.height = window.innerHeight
        const ctx = this.element.getContext('2d')

        ctx.fillStyle = '#3c415d'
        ctx.strokeStyle = '#4b5070'
        ctx.lineWidth = 5

        for (let b of this.bubbles) {
            b.draw(ctx)
            ctx.stroke()
        }

        for (let b of this.bubbles) {
            b.draw(ctx)
            ctx.fill()
        }

        if (this.bouncer) {
            ctx.save()

            ctx.globalCompositeOperation = 'destination-out'
            this.bouncer.draw(ctx)
            ctx.fill()

            ctx.globalCompositeOperation = 'source-atop'
            this.bouncer.draw(ctx)
            ctx.stroke()

            ctx.restore()
        }

        for (let b1 of this.bubbles) {
            b1.rise(this.frameFactor)
            for (let b2 of this.bubbles) {
                b1.bounce(this.frameFactor, b2)
            }
            if (this.bouncer) {
                b1.bounce(this.frameFactor, this.bouncer, BOUNCER_BOUNCE_SPEED)
            }

            if (b1.isOutOfScreen()) this.bubbles.delete(b1)
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
