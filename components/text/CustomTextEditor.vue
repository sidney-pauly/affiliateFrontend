<template>
    <div>
        <h5>Text</h5>
        <textarea type="text" class="form-control" placeholder="Text" aria-label="name" v-model="text.Content" />
        <h5>color</h5>
        <input type="color" class="form-control" aria-label="name" v-model="text.Color" />
        <h5>Allignment</h5>
        <b-form-select v-model="text.Alignment" :options="textAlignmentOptions" class="mb-3" />
        <h5>Size</h5>
         <input type="range" min="1" max="300" class="form-control" placeholder="rank" v-model="text.Size" value="40"/>
        <h5>Spacing</h5>
        <input type="range" min="1" max="100" class="form-control" placeholder="rank" v-model="text.Spacing" value="1"/>
    </div>
</template>

<script>
export default {
    props: ['text'],
    data () {
        return{
            textAlignmentOptions: ['left', 'center', 'right']
        }
    }
}
</script>

<style>

</style>


