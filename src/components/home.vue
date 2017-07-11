<template>
  <div class="home">
    <div class="content">

      <div class="header-content">
        <div class="content__name">Andrey<br>Romancev</div>
        <div class="content__title">full stack web developer</div>
      </div>

      <div class="middle-content">
        <div>
          <div class="divider"></div>
          <div class="content__button">view code</div>
          <div class="content__button">contact me</div>
          <div class="divider"></div>
        </div>
      </div>

      <div class="footer-content">
        <a href="mailto:andrey@romancev.com" class="content__email">andrey@romancev.com</a>
      </div>

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
  .home
    width: 100%
    height: 100%
    //font-family: 'Montserrat'
    font-family: 'Source Sans Pro'

  .content
    display: flex
    flex-flow: column
    justify-content: center
    align-items: center
    text-align: center
    color: white
    height: 100%

  .header-content
    padding-top: 100px

  .middle-content
    flex: 1
    display: flex
    align-items: center

  .footer-content
    padding-bottom: 40px

  .content__name
    //font-family: 'Abel'
    font-family: 'Montserrat'
    //font-family: 'Source Sans Pro'
    font-size: 60px
    line-height: 55px

  .content__title
    margin-top: 10px
    font-size: 20px

  .content__button
    display: inline-block
    border: 1px solid white
    border-radius: 1px
    padding: 5px
    width: 100px
    cursor: pointer
    margin: 10px 5px
    font-family: 'Montserrat'
    font-weight: bold

  .content__email
    color: white
    text-decoration: none
    font-size: 20px

  .divider
    border: 0
    height: 1px
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.75), rgba(0, 0, 0, 0))
    margin: 10px 0
    max-width: 500px
    width: 100%
</style>
