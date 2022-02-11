<template>
<v-dialog :value="true" persistent max-width="290">
    <v-card>
        <v-card-title class="headline">
            Edit task
        </v-card-title>
        <v-card-text>
            Edit the title of this task:
            <v-text-field v-model="editTaskText" @keyup.enter="saveTask()" />
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="$emit('close')">
                CANCEL
            </v-btn>
            <v-btn color="red darken-1" text :disabled="taskTitleInvalid" @click="saveTask()">
                SAVE
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    name: 'DialogDelete',
    props: ['task'],
    data: () => ({
        editTaskText: ''
    }),
    computed: {
        taskTitleInvalid() {
            return !this.editTaskText || this.editTaskText == this.task.title
        }
    },
    methods: {
        saveTask() {
            if (!this.taskTitleInvalid) {
                let payload = {
                    id: this.task.id,
                    title: this.editTaskText
                };
                this.$store.dispatch('updateTasksTitle', payload);
                this.$emit('close');
                this.$vuetify.goTo(0,{duration:0})
            }
        }
    },
    mounted() {
        this.editTaskText = this.task.title
    }
}
</script>

<style>

</style>
