<template>
  <v-toolbar-title class="text-subtitle-1 ml-4">{{date}}</v-toolbar-title>
</template>

<script>
import { format } from 'date-fns'

export default {
    data(){
        return{
            date:''
        }
    },
    methods:{
        getDate(){
            this.date = format(new Date(),'MMMM d, H:mm:ss')
            setTimeout(this.getDate,2000)
        }
    },
    mounted(){
        this.getDate();
    }
}
</script>

<style>
</style>