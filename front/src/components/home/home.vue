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
                        <a class="media__icon" href="https://twitter.com/aromancev">
                            <svg height="32px" style="enable-background:new 0 0 67 67;" version="1.1" viewBox="0 0 67 67" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M37.167,22.283c-2.619,0.953-4.274,3.411-4.086,6.101  l0.063,1.038l-1.048-0.127c-3.813-0.487-7.145-2.139-9.974-4.915l-1.383-1.377l-0.356,1.017c-0.754,2.267-0.272,4.661,1.299,6.271  c0.838,0.89,0.649,1.017-0.796,0.487c-0.503-0.169-0.943-0.296-0.985-0.233c-0.146,0.149,0.356,2.076,0.754,2.839  c0.545,1.06,1.655,2.097,2.871,2.712l1.027,0.487l-1.215,0.021c-1.173,0-1.215,0.021-1.089,0.467  c0.419,1.377,2.074,2.839,3.918,3.475l1.299,0.444l-1.131,0.678c-1.676,0.976-3.646,1.526-5.616,1.568  C19.775,43.256,19,43.341,19,43.405c0,0.211,2.557,1.397,4.044,1.864c4.463,1.377,9.765,0.783,13.746-1.568  c2.829-1.673,5.657-5,6.978-8.221c0.713-1.716,1.425-4.851,1.425-6.354c0-0.975,0.063-1.102,1.236-2.267  c0.692-0.678,1.341-1.419,1.467-1.631c0.21-0.403,0.188-0.403-0.88-0.043c-1.781,0.636-2.033,0.551-1.152-0.402  c0.649-0.678,1.425-1.907,1.425-2.267c0-0.063-0.314,0.042-0.671,0.233c-0.377,0.212-1.215,0.53-1.844,0.72l-1.131,0.361l-1.027-0.7  c-0.566-0.381-1.361-0.805-1.781-0.932C39.766,21.902,38.131,21.944,37.167,22.283z M33,64C16.432,64,3,50.569,3,34S16.432,4,33,4  s30,13.431,30,30S49.568,64,33,64z" style="fill-rule:evenodd;clip-rule:evenodd;fill:;"></path></svg>
                        </a>
                        <a class="media__icon" href="https://www.linkedin.com/in/romancev/">
                            <svg height="32px" style="enable-background:new 0 0 65 65;" version="1.1" viewBox="0 0 65 65" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M50.837,48.137V36.425c0-6.275-3.35-9.195-7.816-9.195  c-3.604,0-5.219,1.983-6.119,3.374V27.71h-6.79c0.09,1.917,0,20.427,0,20.427h6.79V36.729c0-0.609,0.044-1.219,0.224-1.655  c0.49-1.22,1.607-2.483,3.482-2.483c2.458,0,3.44,1.873,3.44,4.618v10.929H50.837z M22.959,24.922c2.367,0,3.842-1.57,3.842-3.531  c-0.044-2.003-1.475-3.528-3.797-3.528s-3.841,1.524-3.841,3.528c0,1.961,1.474,3.531,3.753,3.531H22.959z M34,64  C17.432,64,4,50.568,4,34C4,17.431,17.432,4,34,4s30,13.431,30,30C64,50.568,50.568,64,34,64z M26.354,48.137V27.71h-6.789v20.427  H26.354z" style="fill-rule:evenodd;clip-rule:evenodd;fill:;"></path></svg>
                        </a>
                        <a class="media__icon" href="https://github.com/andreyromancev">
                            <svg height="32px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M256,32C132.3,32,32,134.8,32,261.7c0,101.5,64.2,187.5,153.2,217.9c11.2,2.1,15.3-5,15.3-11.1   c0-5.5-0.2-19.9-0.3-39.1c-62.3,13.9-75.5-30.8-75.5-30.8c-10.2-26.5-24.9-33.6-24.9-33.6c-20.3-14.3,1.5-14,1.5-14   c22.5,1.6,34.3,23.7,34.3,23.7c20,35.1,52.4,25,65.2,19.1c2-14.8,7.8-25,14.2-30.7c-49.7-5.8-102-25.5-102-113.5   c0-25.1,8.7-45.6,23-61.6c-2.3-5.8-10-29.2,2.2-60.8c0,0,18.8-6.2,61.6,23.5c17.9-5.1,37-7.6,56.1-7.7c19,0.1,38.2,2.6,56.1,7.7   c42.8-29.7,61.5-23.5,61.5-23.5c12.2,31.6,4.5,55,2.2,60.8c14.3,16.1,23,36.6,23,61.6c0,88.2-52.4,107.6-102.3,113.3   c8,7.1,15.2,21.1,15.2,42.5c0,30.7-0.3,55.5-0.3,63c0,6.1,4,13.3,15.4,11C415.9,449.1,480,363.1,480,261.7   C480,134.8,379.7,32,256,32z"></path></svg>
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
                    <span @click="copyText" class="link">andrey@romancev.com</span>
                </div> |
                <a href="/blog/" class="link">blog</a> |
                <span @click="showContacts(true)" class="link">send message</span>
            </div>
        </div>

        <contact v-if="isContactShown" @close="showContacts(false)" :isTouch="isTouch"></contact>
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
              isContactShown: window.location.hash === '#contact',
              isBubbleShown: false
          }
      },

      created () {
          this.bubbles = null
          this.bounce = !this.isTouch

          window.addEventListener('deviceorientation', this.onOrientation, true)
          window.onhashchange = function () { this.isContactShown = window.location.hash === '#contact' }.bind(this)
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
          },

          showContacts: function (isShown) {
              window.location.hash = isShown ? 'contact' : ''
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
        width: 100%
        height: 100%

    .home
        height: 100%
        width: 100%
        user-select: none
        color: $c-text

    .wrapper
         display: flex
         align-items: center
         justify-content: center
         width: 100%
         height: 100%

    .content
        text-align: center
        z-index: 10

    .content__name
        font-weight: lighter
        font-size: 30px
        cursor: default
        @include breakpoint(xs)
            font-size: 40px
        @include breakpoint(md)
            font-size: 70px

    .content__title
        font-weight: normal
        font-size: 14px
        cursor: default
        margin-bottom: 10px
        @include breakpoint(xs)
            font-size: 18px
            margin-bottom: 20px
        @include breakpoint(md)
            font-size: 22px
            margin-bottom: 30px

    .link
        color: inherit
        text-decoration: none
        @include transition(color 0.2s)
        cursor: pointer
        &:hover
            color: whitesmoke

    .media
        margin: auto
        width: 150px
        max-width: 100vw
        @include breakpoint(xs)
            width: 200px
        @include breakpoint(md)
            width: 350px

    $media-icon-size: 25px
    $media-icon-size-xs: 35px
    $media-icon-size-md: 45px

    .media__icon-container
        height: $media-icon-size
        @include breakpoint(xs)
            height: $media-icon-size-xs
        @include breakpoint(md)
            height: $media-icon-size-md

    .media__icon
        display: inline-block
        fill: $c-text
        width: $media-icon-size
        height: $media-icon-size
        margin: 0 2px
        @include transition(fill 0.2s)
        @include breakpoint(xs)
            width: $media-icon-size-xs
            height: $media-icon-size-xs
            margin: 0 2px
        @include breakpoint(md)
            width: $media-icon-size-md
            height: $media-icon-size-md
            margin: 0 5px

        &:hover
            fill: whitesmoke
        svg
            width: 100%
            height: 100%

    .divider
        border: 0
        height: 1px
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba($c-text, 0.75), rgba(0, 0, 0, 0))
        margin: 5px auto
        width: 100%

    .contacts
        position: absolute
        bottom: 10px
        color: darken($c-text, 15%)
        font-size: 15px
        @include breakpoint(xs)
            bottom: 15px
            font-size: 17px
        @include breakpoint(md)
            bottom: 20px
            font-size: 20px

        .link
            margin: 0 5px

    .copy-bubble
        position: relative
        bottom: 5px
        margin: auto
        width: 100%
        text-align: center
        font-size: 9px
        @include breakpoint(xs)
            font-size: 12px
        @include breakpoint(md)
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
