<template>
<v-text-field placeholder="Search" class="expanding-search mt-3" 
 :class="{'closed':searchClosed && !$store.state.search}" 
 @input="$store.dispatch('setSearchAction',$event)"
 @focus="searchClosed =false"
 @blur="searchClosed = true"
 filled dense clearable prepend-inner-icon="mdi-magnify" :value="$store.state.search" :disabled="$store.state.sorting"></v-text-field>
</template>

<script>
export default {
    data(){
        return{
            searchClosed:true
        }
    }
}
</script>

<style lang="sass">
    .expanding-search
        transition: max-width 2s
        .v-input__slot
            cursor: pointer !important
            &:before, &:after
                border: transparent !important
        &.closed
            max-width:45px
                
</style>
