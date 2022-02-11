<template>
<v-app id="inspire">

    <v-navigation-drawer v-model="drawer" :mobile-breakpoint="768" app>
        <v-img src="https://picsum.photos/1920/1080?random" height="170" class="pa-4 pt-7" gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)">
            <v-avatar size="70">
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="Jay Raval">
            </v-avatar>
            <div class="white--text text-subtitle-1 font-weight-bold">Jay Raval</div>
            <div class="white--text text-subtitle-2">jay__raval</div>
        </v-img>

        <v-list dense nav>
            <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark src="https://picsum.photos/1920/1080?random" prominent :height="$route.path === '/'?238:170">
        <template v-slot:img="{ props }">
            <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"></v-img>
        </template>

        <v-container class="header-container pa-0">
            <v-row>
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
                <search />
            </v-row>
            <v-row>
                <v-toolbar-title class="text-h4 ml-4">{{$store.state.appTitle}}</v-toolbar-title>
            </v-row>
            <v-row>
                <live-date-time />
            </v-row>
            <v-row v-if="$route.path === '/'">
                <field-add-task />
            </v-row>
        </v-container>
    </v-app-bar>

    <v-main>
        <router-view />
        <snack-bar />
    </v-main>
</v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        items: [{
                title: 'Todo',
                icon: 'mdi-format-list-checks',
                to: '/'
            },
            {
                title: 'About',
                icon: 'mdi-help-box',
                to: '/about'
            },
        ]
    }),
    mounted(){
        this.$store.dispatch('getTasks')
    },
    components: {
        'field-add-task':require('@/components/Todo/FieldAddTask.vue').default,
        'snack-bar': require('@/components/Shared/Snackbar.vue').default,
        'search': require('@/components/Tools/Search.vue').default,
        'live-date-time': require('@/components/Tools/LiveDateTime.vue').default
    }
}
</script>
<style lang="sass">
    .header-container
        max-width: none !important
</style>