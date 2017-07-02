<template>
  <div class="home">
    <div class="content">
      <div class="content__name">Andrey<br>Romancev</div>
      <div class="content__title">full stack web developer</div>
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
  @import 'modularscale'

  .home
    width: 100%
    height: 100%

    display: flex
    justify-content: center
    align-items: center

    //font-family: 'Montserrat'
    font-family: 'Source Sans Pro'

    color: white

  .content
    text-align: center

  .content__name
    //font-family: 'Abel'
    font-family: 'Montserrat'
    //font-family: 'Source Sans Pro'
    @include ms-respond(font-size, 3)
    //letter-spacing: 0.05em
    line-height: 60px
    margin-bottom: 10px

  .content__title
    @include ms-respond(font-size, 1)
</style>
