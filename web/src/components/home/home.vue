<template>
    <div v-on:mousemove="onCanvasCursor" class="home">
        <div class="wrapper">
            <canvas class="bubble-canvas"></canvas>
            <div class="content">
                <div class="content__name">Andrey Romancev</div>
                <div class="content__title">software engineer</div>
                <div class="buttons">
                    <div class="divider"></div>
                    <div v-bind:class="{ touch: isTouch }"
                         @click="isContactShown = true"
                         class="content__button">contact</div>
                    <div class="divider"></div>
                </div>
            </div>
            <a href="mailto:andrey@romancev.com" class="email">andrey@romancev.com</a>
        </div>

        <contact v-if="isContactShown" @close="isContactShown = false" :isTouch="isTouch"></contact>
    </div>
</template>
s
<script>
  import { BubbleDrawer } from './bubbles'
  import { isTouchscreen } from '@/utils/device'
  import Contact from './contact'

  export default {
      components: {
          Contact
      },

      data () {
          return {
              isTouch: isTouchscreen(),
              isContactShown: false
          }
      },

      created () {
          this.bubbles = null
          this.bounce = !this.isTouch

          window.addEventListener('deviceorientation', this.onOrientation, true)
      },

      mounted () {
          this.bubbles = new BubbleDrawer(document.getElementsByClassName('bubble-canvas')[0])
          this.bubbles.start()
      },

      methods: {
          onCanvasCursor: function (e) {
              if (!this.bounce || this.isContactShown) return

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
        top: 0
        left: 0
        position: absolute
        width: 100vw
        height: 100vh

    .home
        font-family: avenir next,avenir,sans-serif
        min-height: 100vh
        user-select: none
        color: $c-text

    .wrapper
         display: flex
         align-items: center
         justify-content: center
         width: 100%
         min-height: 100vh

    .content
        text-align: center
        z-index: 10
        padding-bottom: 200px

    .content__name
        font-weight: lighter
        font-size: 40px
        line-height: 35px
        cursor: default
        margin-bottom: 10px
        @include breakpoint(xs)
            font-size: 70px
            line-height: 60px

    .content__title
        font-weight: normal
        font-size: 22px
        cursor: default
        margin-bottom: 100px

    .buttons
        margin: auto
        max-width: 100vw
        width: 500px

    .content__button
        box-sizing: border-box
        display: inline-block
        border: 1px solid $c-text
        border-radius: 1px
        padding: 5px
        width: 6em
        cursor: pointer
        margin: 0 5px
        white-space: nowrap
        font-size: 15px
        color: inherit
        text-decoration: none
        -webkit-tap-highlight-color: transparent
        &:not(:hover)
            @include transition(color 0.2s, background-color 0.2s)
        &:hover:not(.touch)
            background: $c-text
            color: $c-background
        &:active
            background: darken($c-text, 10%)
            border-color: darken($c-text, 10%)
            color: $c-background
        @include breakpoint(xs)
            font-size: 20px

    .email
        position: absolute
        bottom: 30px
        color: inherit
        text-decoration: none
        font-size: 17px

    .divider
        border: 0
        height: 1px
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba($c-text, 0.75), rgba(0, 0, 0, 0))
        margin: 10px auto
        width: 100%

</style>
