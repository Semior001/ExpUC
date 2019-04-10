<template>
    <div>
        <Navigation />

        <!--Body-->

        <v-container>
            <v-card>
                <v-card-title>
                    Test title
                </v-card-title>
                <v-container>
                    test body
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import Navigation from './Navigation'
    export default {
        name: 'Schedule',
        components: {
            Navigation
        },
        mounted() {
        }
    }
</script>
