<template>
    <div v-on:mousemove="onCanvasCursor" class="home">
        <div class="wrapper">
            <canvas class="bubble-canvas"></canvas>
            <div class="content">
                <div class="content__name">Andrey Romancev</div>
                <div class="content__title">software engineer</div>
                <div class="media">
                    <div class="divider"></div>
                    <div class="media__icon-container">
                        <a class="media__icon" href="https://github.com/andreyromancev" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                        <a class="media__icon" href="https://www.linkedin.com/in/romancev/" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg>
                        </a>
                        <a class="media__icon" href="#" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/></svg>
                        </a>
                    </div>
                    <div class="divider"></div>
                </div>
            </div>
            <div class="contacts">
                <div class="email">
                     <transition name="bubble">
                        <div v-if="isBubbleShown" class="copy-bubble">copied to clipboard</div>
                    </transition>
                    <span @click="copyText">andrey@romancev.com</span>
                </div> |
                <span @click="isContactShown = true"> send message</span>
            </div>
        </div>

        <contact v-if="isContactShown" @close="isContactShown = false" :isTouch="isTouch"></contact>
    </div>
</template>

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
              isContactShown: false,
              isBubbleShown: false
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
          },

          copyText: function (e) {
              const el = document.createElement('input')
              el.value = e.currentTarget.textContent
              document.body.appendChild(el)
              el.select()
              document.execCommand('copy')
              document.body.removeChild(el)

              this.isBubbleShown = true
              if (this.bubbleTimer) { clearTimeout(this.bubbleTimer) }
              this.bubbleTimer = setTimeout(() => { this.isBubbleShown = false }, 1000)
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
        margin-bottom: 30px

    .media
        margin: auto
        width: 350px
        max-width: 100vw

    .divider
        border: 0
        height: 1px
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba($c-text, 0.75), rgba(0, 0, 0, 0))
        margin: 5px auto
        width: 100%

    .media__icon-container
        height: 40px

    .media__icon
        display: inline-block
        fill: $c-text
        margin: 0 5px
        width: 40px
        height: 40px
        @include transition(fill 0.2s)
        &:hover
            fill: whitesmoke
        svg
            width: 100%
            height: 100%

    .contacts
        position: absolute
        bottom: 20px
        span
            cursor: pointer
            margin: 0 5px
            @include transition(color 0.2s)
            &:hover
                color: whitesmoke

    .copy-bubble
        position: relative
        bottom: 5px
        margin: auto
        width: 100%
        text-align: center
        font-size: 13px

    .bubble-enter-active, .bubble-leave-active
        transition: opacity .3s, bottom .3s

    .bubble-enter
        opacity: 0
        bottom: -10px

    .bubble-leave-to
        opacity: 0

    .email
        display: inline-block



</style>
