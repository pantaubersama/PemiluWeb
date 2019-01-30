<template>
  <div class="card catatan-partai">
    <div class="content-head">
      <p class="question">Partai mana yang paling cocok dengan pilihan kamu?</p>
      <p class="answer">({{ selected.name || 'Belum menentukan pilihan' }})</p>
    </div>
    <div class="content-body">
      <ul>
        <li v-for="partai in politicalParties" :key="partai.id">
          <a
            href="javascript:void(0)"
            @click.stop="$emit('onSelected', partai.id)"
            :class="{ selected: selected.id === partai.id }"
          >
            <div class="thumbnail">
              <img
                :src="partai.image.medium_square.url"
                :alt="`partai-${partai.number}`"
                v-if="partai.image.medium_square.url"
              >
              <img src="~@/assets/user.svg" alt="partai" v-else>
            </div>
            <div class="info">
              <h6>{{ partai.name }}</h6>
              <p>No. Urut {{ partai.number }}</p>
            </div>
          </a>
        </li>
      </ul>
      <button
        class="btn choice"
        type="button"
        @click.stop="$emit('onSelected', null)"
        :class="{ selected: (!selected || !selected.id) }"
      >Belum menentukan pilihan</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatatanPartaiComponent',
  props: {
    selected: Object,
    politicalParties: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.catatan-partai
  margin: 32px 0 0
  padding: 0
  width: 100%
  display: flex
  justify-content: center
  align-items: center

.content-head
  background: white
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%
  padding: 0
  margin: 20px 0 0

  .question, .answer
    font-family: Lato
    font-size: 14px
    font-weight: 400
    font-style: italic
    line-height: 17px
    color: #7c7c7c
    padding: 8px 20px 0
    margin: 0
    text-align: center

  .answer
    color: #f2771d
    font-style: normal
    padding: 4px 0
    margin-bottom: 8px

.content-body
  display: flex
  flex-direction: column
  align-items: center
  padding: 20px 0
  width: 320px

  ul
    list-style: none
    width: 100%

    li
      padding: 0
      margin: 8px 0

      a
        background-color: #f9f9f9
        border: 1px solid #f4f4f4
        width: 100%
        display: flex
        justify-content: flex-start
        align-items: center
        flex-direction: row

        &:hover, &:focus, &:active
          background-color: #e5e5e5

        &.selected
          border: 1px solid #f2771d
          background-color: #f2771d

          .info
            h6, p
              color: #ffffff

      .thumbnail
        margin: 0
        padding: 0
        display: flex
        justify-content: center
        align-items: center
        flex: 0 60px

        img
          width: 50px
          height: 50px

      .info
        margin-left: 10px
        display: flex
        justify-content: center
        align-items: flex-start
        flex-direction: column
        flex: 1
        h6
          font-family: BwModelica, Lato
          font-weight: 600
          font-size: 13px
          color: #4f4f4f
          line-height: 18px
          margin: 4px 0 2px
        p
          font-family: Lato
          font-weight: 400
          font-size: 12px
          color: #4f4f4f
          margin: 0

button.choice
  border: 1px solid #f4f4f4
  background-color: #f9f9f9
  border-radius: 0
  padding: 8px
  text-align: center
  font-family: Lato
  font-size: 16px
  line-height: 1.19
  letter-spacing: 0.5px
  color: #7c7c7c
  margin: 4px 0 0
  width: 320px

  &.selected
      border-color: #f2771d
      background-color: #f2771d
      color: white

</style>
