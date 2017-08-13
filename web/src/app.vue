<template>
  <div class="app">
    <home></home>
  </div>
</template>

<script>
import Home from './components/home/home'

export default {
    name: 'app',
    components: {
        Home
    }
}
</script>

<style lang="sass">
  @import "colors"

  body
    margin: 0

  .app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    background: $c-background
    min-height: 100vh
    width: 100vw

  @font-face
    font-family: 'Abel'
    src: url('~@/assets/font/abel.ttf') format('truetype')

  @font-face
    font-family: 'Montserrat'
    src: url('~@/assets/font/montserrat.ttf')

  @font-face
    font-family: 'Source Sans Pro'
    src: url('~@/assets/font/source_sans_pro.ttf')
</style>
