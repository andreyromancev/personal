<template>
    <div v-on:mousemove="onCanvasCursor" class="home">
        <div class="wrapper" v-bind:class="{ blurred: isContactShown }">
            <canvas class="bubble-canvas"></canvas>
            <div class="content">
                <div class="content__name">Andrey<br>Romancev</div>
                <div class="content__title">full stack web developer</div>
                <div class="buttons">
                    <div class="divider"></div>
                    <a href="https://github.com/andreyromancev/personal" target="_blank" class="content__button">view code</a>
                    <div @click="isContactShown = true" class="content__button">contact me</div>
                    <div class="divider"></div>
                </div>
                <a href="mailto:andrey@romancev.com" class="content__email">andrey@romancev.com</a>
            </div>
        </div>

        <contact v-if="isContactShown" @close="isContactShown = false"></contact>
    </div>
</template>

<script>
  import { BubbleDrower } from './bubbles'
  import { isTouchscreen } from '@/utils/device'
  import Contact from './contact'

  export default {
      components: {
          Contact
      },

      data () {
          return {isContactShown: true}
      },

      created () {
          this.bubbles = null
          this.bounce = !isTouchscreen()

          window.addEventListener('deviceorientation', this.onOrientation, true)
      },

      mounted () {
          this.bubbles = new BubbleDrower(document.getElementsByClassName('bubble-canvas')[0])
          this.bubbles.start()
      },

      methods: {
          onCanvasCursor: function (e) {
              if (!this.bounce) return

              this.bubbles.setBouncerPosition(e.clientX, e.clientY)
          },

          onOrientation: function (e) {
              this.bubbles.setTilt(e.gamma)
          }
      }
  }

</script>

<style scoped lang="sass">
  @import "colors"
  @import "mixins"

  .bubble-canvas
    position: fixed
    width: 100vw
    height: 100vh

  .home
    font-family: 'Source Sans Pro'
    min-height: 100vh
    user-select: none

  .wrapper
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    min-height: 100vh
    &.blurred
      @include filter(blur, 2px)

  .content
    text-align: center
    color: $c-text
    z-index: 10

  .content__name
    font-family: 'Montserrat'
    font-size: 40px
    line-height: 35px
    cursor: default
    margin-bottom: 100px
    @include breakpoint(xs)
      font-size: 70px
      line-height: 60px
      margin-bottom: 250px

  .content__title
    font-size: 18px
    cursor: default
    font-weight: bold
    word-spacing: 1.1em
    @include breakpoint(xs)
      word-spacing: 2em
      letter-spacing: 0.1em

  .buttons
    max-width: 100vw
    width: 900px

  .content__button
    box-sizing: border-box
    display: inline-block
    border: 1px solid $c-text
    border-radius: 1px
    padding: 5px
    width: 9em
    cursor: pointer
    margin: 0 5px
    font-family: 'Montserrat'
    white-space: nowrap
    font-size: 15px
    color: inherit
    text-decoration: none
    -webkit-tap-highlight-color: transparent
    &:not(:hover)
      @include transition(color 0.2s, background-color 0.2s)
    &:hover
      background: $c-text
      color: $c-background
    &:active
      background: darken($c-text, 10%)
      border-color: darken($c-text, 10%)

    @include breakpoint(xs)
      font-size: 20px

  .content__email
    color: inherit
    text-decoration: none
    font-size: 17px
    user-select: initial

  .divider
    border: 0
    height: 1px
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba($c-text, 0.75), rgba(0, 0, 0, 0))
    margin: 10px auto
    width: 100%

  .logo
    height: 80px
    margin: 70px 0
</style>
