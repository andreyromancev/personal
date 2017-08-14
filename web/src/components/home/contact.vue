<template>
    <transition name="modal">
        <div class="modal__mask" @click="$emit('close')">
            <div class="modal__wrapper">
                <table class="modal__container" @click.stop>
                    <tr><td>
                        <input v-model="email" class="field email" type="email" placeholder="Email"/>
                    </td></tr>
                    <tr><td>
                        <textarea v-model="message" class="field message" placeholder="Message"></textarea>
                    </td></tr>
                    <tr><td>
                        <div class="modal__button" @click="send">send</div>
                    </td></tr>
                </table>
            </div>
        </div>
    </transition>
</template>

<script>
import * as axios from 'axios'

export default {
    data () {
        return {
            showModal: false,
            email: '',
            message: ''
        }
    },

    methods: {
        send: function () {
            axios.post('/api/contact', {
                email: this.email,
                message: this.message
            })
            this.$emit('close')
        }
    }
}

</script>

<style scoped lang="sass">
  @import "colors"

  .modal__mask
    position: fixed
    z-index: 9998
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, .5)
    display: table
    transition: opacity .2s ease

  .modal__wrapper
    display: table-cell
    vertical-align: middle

  .modal__container
    width: 100%
    max-width: 400px
    margin: 0 auto
    padding: 20px 30px 10px 30px
    background-color: #fff
    color: $c-background
    border-radius: 1px
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
    transition: all .2s ease
    td
      padding: 2px

  .modal-enter
    opacity: 0

  .modal-leave-active
    opacity: 0

  .modal-enter .modal__container,
  .modal-leave-active .modal__container
    -webkit-transform: scale(1.05)
    transform: scale(1.05)

  .field
    width: 100%
    box-sizing: border-box
    resize: none
    outline: 0 transparent
    background: $c-background
    border: none
    color: white
    padding: 10px
    border-radius: 1px
    font-family: 'Source Sans Pro'
    &::-webkit-input-placeholder
      color: $c-text
    &:-ms-input-placeholder
      color: $c-text
    &::-moz-placeholder
      color: $c-text
    &:-moz-placeholder
      color: $c-text

  .message
    height: 150px

  .modal__button
    text-align: center
    font-family: 'Montserrat'
    cursor: pointer
    transition: all 0.2s
    padding: 10px
    font-weight: bold
    &:hover
      background: $c-background
      color: $c-text

</style>

