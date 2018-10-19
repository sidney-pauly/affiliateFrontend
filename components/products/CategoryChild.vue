<template>
    <div>

        <div v-if="selected" class="bg-success">
            <b-btn class="btn-sm btn" @click="hide = !hide" :disabled="!category.Childs[0]" variant="dark">+</b-btn>
            <div class="inline" id="elem" @click="select">{{category.Title}}</div>
        </div>
        <div v-else>
            <b-btn class="btn-sm btn" @click="hide = !hide" :disabled="!category.Childs[0]" variant="dark">+</b-btn>
            <div class="inline" id="elem" @click="select">{{category.Title}}</div>
        </div>
         
        <div v-if="!hide">
            <category-child v-for="cc in category.Childs"  :key="cc._id" :category="cc" @checked="handThru" v-if="!cc.Link" :numSelected="numSelected"/>
        </div>

    </div>
</template>

<script>
import categoryChild from '@/components/products/CategoryChild.vue'

export default {
    name: 'category-child',
    props: ['category', 'numSelected'],
    components: {
        categoryChild
    },
    data () {
        return {
            hide: true,
            selected: false,
            justChanged: false
        }
    },
    watch: {
        numSelected: function(){
            if(this.numSelected == 0 && this.selected && !this.justChanged){
                this.selected = false
            }
            this.justChanged = false
        }
    },
    methods: {
        select: function(){
            if(this.numSelected < 2 || this.selected){
                this.selected = !this.selected
                this.$emit('checked', {_id: this.category._id, checked: this.selected})
                this.justChanged = true;
            } 
        },
        handThru: function(value){
            this.$emit('checked', value)
        }
    }
}
</script>

<style lang="scss" scoped>
    div{
        margin-left: 20px;
    }
    button{
        display: inline;
        white-space: nowrap;
        
    }
    h5{
        display: inline;
        white-space: nowrap;
    }
    #elem{
        &:hover{
            color: white;
            background-color: grey;
        }
    }


</style>

