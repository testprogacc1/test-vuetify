<template>
  <div class="home ">
    <list-task v-if="$store.state.tasks.length > 0" />
    <no-task v-else/>
    <button-done-sorting v-if="$store.state.sorting"/>
  </div>
</template>

<script>
  export default {
    name: 'Todo',    
    components:{
      'list-task':require('@/components/Todo/ListTask.vue').default,
      'no-task' :require('@/components/Todo/NoTask.vue').default,
      'button-done-sorting':require('@/components/Todo/ButtonDoneSorting.vue').default,
    }
  }
</script>