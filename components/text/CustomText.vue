<template>
    <div v-html="text.Content" :style="textStyle"></div>
</template>

<script>
export default {
    props: ['text'],
    computed: {
        textStyle () {
      return {
        color: `${this.text.Color}`,
        textAlign: `${this.text.Alignment}`,
        fontSize: `${this.text.Size}px`,
        letterSpacing: `${this.text.Spacing}px`
      }
    },
    }
}
</script>

<style scoped lang="scss">
    a{
     
    }
</style>


