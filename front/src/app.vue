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

  body, html
    width: 100%
    height: 100%
    margin: 0

  .app
    font-family: 'avenir next', 'Nunito', sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    background: $c-background
    height: 100%
    width: 100%
</style>
