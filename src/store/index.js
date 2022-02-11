import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        appTitle: process.env.VUE_APP_TITLE,
        search: null,
        sorting: false,
        tasks: [
            // {
            //     id: 1,
            //     title: 'Task1',
            //     done: false,
            //     dueDate: '2020-10-16'
            // },
            // {
            //     id: 2,
            //     title: 'Task2',
            //     done: true,
            //     dueDate: '2022-11-16'
            // },
            // {
            //     id: 3,
            //     title: 'Task3',
            //     done: false,
            //     dueDate: null
            // }
        ],
        snackbar: {
            show: false,
            text: ''
        }
    },
    mutations: {
        addTask(state, newTask) {
            state.tasks.push(newTask);
        },
        updateTaskTitle(state, updatedTask) {
            let task = state.tasks.find(task => task.id === updatedTask.id);
            task.title = updatedTask.title;
        },
        updateTaskDueDate(state, updatedTask) {
            let task = state.tasks.find(task => task.id === updatedTask.id);
            task.dueDate = updatedTask.dueDate;
        },
        doneTask(state, id) {
            let task = state.tasks.find(task => task.id === id);
            task.done = !task.done;
        },
        deleteTask(state, id) {
            state.tasks = state.tasks.filter(task => task.id != id);
        },
        setTasks(state, tasks) {
            state.tasks = tasks
        },
        showSnackbar(state, text) {
            let timeout = 0;
            if (state.snackbar.show) {
                state.snackbar.show = false;
                timeout = 300;
            }
            setTimeout(() => {
                state.snackbar.text = text;
                state.snackbar.show = true;
            }, timeout);
        },
        hideSnackbar(state) {
            state.snackbar.show = false;
        },
        setSearch(state, value) {
            state.search = value;
        },
        toogleSorting(state) {
            state.sorting = !state.sorting
        }
    },
    actions: {
        getTasks(store) {
            db.collection('tasks').get().then(tasks => {
                store.commit('setTasks', tasks)
            })
        },
        addTasks(store, newTaskTitle) {
            let newTask = {
                id: Date.now(),
                title: newTaskTitle,
                done: false,
                dueDate: null
            }
            db.collection('tasks').add(newTask).then(() => {
                store.commit('addTask', newTask);
                store.commit('showSnackbar', 'Task added!');
            })
        },
        updateTasksTitle(store, updatedTask) {
            db.collection('tasks').doc({ id: updatedTask.id }).update({ title: updatedTask.title }).then(() => {
                store.commit('updateTaskTitle', updatedTask);
                store.commit('showSnackbar', 'Task Updated!');
            })
        },
        updateTasksDueDate(store, updatedTask) {
            db.collection('tasks').doc({ id: updatedTask.id }).update({ dueDate: updatedTask.dueDate }).then(() => {
                store.commit('updateTaskDueDate', updatedTask);
                store.commit('showSnackbar', 'Task Due Date Updated!');
            })
        },
        doneTasks(store, id) {
            let task = store.state.tasks.find(task => task.id === id);

            db.collection('tasks').doc({ id: id }).update({ done: !task.done }).then(() => {
                store.commit('doneTask', id);
            })
        },
        deleteTasks(store, id) {
            db.collection('tasks').doc({ id: id }).delete().then(() => {
                store.commit('deleteTask', id);
                store.commit('showSnackbar', 'Task deleted!');
            })

        },
        setTasksAction(store, tasks) {
            db.collection('tasks').set(tasks)
            store.commit('setTasks', tasks)
        },
        showSnackbar({ commit }, value) {
            commit('showSnackbar', value);
        },
        hideSnackbar({ commit }) {
            commit('hideSnackbar');
        },
        setSearchAction({ commit }, value) {
            commit('setSearch', value);
        },
        toogleSortingAction({ commit }) {
            commit('toogleSorting');
        }
    },
    getters: {
        tasksFiltered(state) {
            if (!state.search) {
                return state.tasks
            }
            return state.tasks.filter(task =>
                task.title.toLowerCase().includes(state.search.toLowerCase())
            )
        }
    }
})