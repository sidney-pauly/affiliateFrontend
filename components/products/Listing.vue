<template lang="html">
  <div class="listing divider">
    <div class="row">
      <div class="col text-center">
        <img :src="listingData.Logos[0]" class="img-fluid" alt="Shop Logo" />
      </div>
      <div class="col text-left">

        <table>
          <tr>
            <td>Preis:</td>
            <td>  {{listingData.DisplayPrice}}</td>
          </tr>
          <tr>
            <td>Versand:</td>
            <td>  {{listingData.DisplayShipping}}</td>
          </tr>
        </table>

        <b-button :href="listingData.Deeplink" block="true">Zum Shop</b-button>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  props: ['listingData']
}
</script>

<style scoped lang="css">
  .img-fluid{
    margin-top: 20px;
  }
</style>
