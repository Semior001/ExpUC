<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                absolute
                dark
        >

            <!-- todo синхронный запрос на получение данных о пользователе -->

            <v-list class="pa-1">

                <v-list-tile avatar tag="div">
                    <v-list-tile-avatar>
                        <img src="https://www.gravatar.com/avatar/d9cac07df57d8ffd99b0861f4d1d65f5" alt="whoops">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ userName }} {{ userSurname }}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn icon @click.stop="drawer = !drawer">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>

            <v-divider />

            <v-list class="pt-0" dense>
                <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        @click.end="item.action"
                >
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-divider />

                <v-list-tile
                    @click.end="logout"
                >
                    <v-list-tile-action></v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

        </v-navigation-drawer>

        <v-toolbar>
            <v-toolbar-side-icon
                    @click.stop="drawer = !drawer"
            ></v-toolbar-side-icon>
            <v-toolbar-title>ExpUC</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn text block depressed
                       v-for="item in items"
                       :key="item.title"
                       @click.end="item.action"
                >
                    <v-icon>{{ item.icon }}</v-icon> {{ item.title }}
                </v-btn>
                <v-btn text block depressed @click.end="logout">Logout</v-btn>
            </v-toolbar-items>

        </v-toolbar>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                userName: '',
                userSurname: '',
                drawer: false,
                items: []
            }
        },
        mounted() {
            this.$store.dispatch('user/LOAD_USER_DATA').then(() => {
                this.userName = this.$store.getters['user/name'];
                this.userSurname = this.$store.getters['user/surname'];
            });
            this.$router.options.routes.forEach(route => {
                if(route.showInToolbar !== false){
                    this.items.push({
                        title: route.title,
                        icon: route.icon,
                        action: () => {this.$router.push(route.path)}
                    })
                }
            })
        },
        methods: {
            logout: function(){
                this.$store.dispatch('user/AUTH_LOGOUT');
                this.$router.go();
            }
        }
    }
</script>