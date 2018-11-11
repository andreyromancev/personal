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
    font-family: 'Nunito', sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    background: $c-background
    min-height: 100vh
    width: 100vw
</style>
