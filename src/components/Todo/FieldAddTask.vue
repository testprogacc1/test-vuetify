<template>
<v-text-field class="field-add-task pa-3" outlined hide-details clearable placeholder="Add Task" v-model="newTaskTitle" @keyup.enter="addTask">
    <template v-slot:append>
      <v-icon @click="addTask" :disabled="newTaskTitleInvalid">mdi-plus</v-icon>
    </template>
</v-text-field>
</template>

<script>
export default {
    name: 'FieldAddTask',
    data() {
        return {
            newTaskTitle: '',
        }
    },
    computed: {
        newTaskTitleInvalid() {
            return !this.newTaskTitle
        }
    },
    methods: {
        addTask() {
            if (!this.newTaskTitleInvalid) {
                //this.$store.commit('addTask',this.newTaskTitle);
                this.$store.dispatch('addTasks', this.newTaskTitle);
                this.newTaskTitle = '';
            }
        }
    }
}
</script>
<style lang="sass">
    .field-add-task.v-input--is-focused
        .v-input__slot
            background: rgba(31, 94, 129, 0.5) !important
</style>