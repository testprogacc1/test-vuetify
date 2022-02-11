<template>
<v-dialog :value="true" persistent max-width="290">
    <v-card>
        <v-card-title class="headline">
            Delete  task?
        </v-card-title>
        <v-card-text>Are you sure you want to delete "{{task.title}}".</v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" text @click="$emit('close')">
                No
            </v-btn>
            <v-btn color="red darken-1" text @click="deleteTask()">
                Yes
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    name: 'DialogDelete',
    props:['task'],
    methods: {
        deleteTask() {
            this.$store.dispatch('deleteTasks', this.task.id);
        }
    }
}
</script>

<style>

</style>
