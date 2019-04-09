<template>
    <v-navigation-drawer
            :mini-variant="mini"
            absolute
            dark
    >
        <v-list class="pa-1">
            <v-list-tile v-if="mini" @click.stop="mini = !mini">
                <v-list-tile-action>
                    <v-icon>chevron_right</v-icon>
                </v-list-tile-action>
            </v-list-tile>

            <v-list-tile avatar tag="div">
                <v-list-tile-avatar>
                    <img src="https://www.gravatar.com/avatar/d9cac07df57d8ffd99b0861f4d1d65f5">
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>{{ userName }} {{ userSurname }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                    <v-btn icon @click.stop="mini = !mini">
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>

    </v-navigation-drawer>
</template>

<script>
    export default {
        data: () => {
            return {
                userName: '',
                userSurname: '',
                mini: false,
            }
        },
        mounted() {
            console.log("toolbar mounted");
            this.userName = this.$store.getters.userData.name;
            this.userSurname = this.$store.getters.userData.surname;
        },
        methods: {
            toggleNavigationDrawer(){
                console.log("toggled");
                this.drawer = !this.drawer;
            }
        }
    }
</script>