<template lang="html">
  <div class="listing divider">
    <div class="row">
      <div class="col text-center">
        <img :src="listingData.Logos[0]" class="img-fluid" alt="Shop Logo" />
      </div>
      <div class="col text-left">

        <table>
          <tbody>
            <tr>
              <td>Preis:</td>
              <td>  {{listingData.DisplayPrice}}</td>
            </tr>
            <tr>
              <td>Versand:</td>
              <td>  {{listingData.DisplayShipping}}</td>
            </tr>
          </tbody>
        </table>

        <b-button target="_blank" rel="noopener noreferrer" @click="redirect()" :block="true">Zum Shop</b-button>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  props: ['listingData'],
  methods: {
    redirect() {
      window.location = this.listingData.Deeplink;
    }
  }
}
</script>

<style scoped lang="css">
  .img-fluid{
    margin-top: 20px;
  }
</style>
