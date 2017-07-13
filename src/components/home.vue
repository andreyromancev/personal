<template>
  <div class="home">
    <div class="content">

      <div class="content__name">Andrey<br>Romancev</div>
      <img class="logo" src="~@/assets/image/logo.svg">
      <div class="content__title">full stack web developer</div>

      <div class="buttons">
        <div class="divider"></div>
        <div class="content__button">view code</div>
        <div class="content__button">contact me</div>
        <div class="divider"></div>
      </div>

      <a href="mailto:andrey@romancev.com" class="content__email">andrey@romancev.com</a>

    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {}
  }
}
</script>

<style scoped lang="sass">
  @import "colors"
  @import "mixins"

  .home
    font-family: 'Source Sans Pro'
    display: flex
    align-items: center
    justify-content: center
    min-height: 100vh
    user-select: none

  .content
    text-align: center
    color: $c-text

  .content__name
    font-family: 'Montserrat'
    font-size: 70px
    line-height: 60px
    cursor: default

  .content__title
    font-size: 18px
    cursor: default
    word-spacing: 2em
    letter-spacing: 0.1em
    font-weight: bold

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
    font-size: 20px
    &:not(:hover)
      @include transition(color 0.2s, background-color 0.2s)
    &:hover
      background: $c-text
      color: $c-background
    &:active
      background: darken($c-text, 10%)
      border-color: darken($c-text, 10%)

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
