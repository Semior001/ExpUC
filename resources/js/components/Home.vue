<template>
    <div>
        <Navigation />
        <v-container>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card bg-dark">
                        <div class="card-header">User profile</div>

                        <div class="card-body">
                            <table class="table table-bordered table-dark">
                                <tbody>
                                <tr>
                                    <td>Email</td>
                                    <td>{{ userEmail }}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{{ userName }}</td>
                                </tr>
                                <tr>
                                    <td>Surname</td>
                                    <td>{{ userSurname }}</td>
                                </tr>
                                <tr>
                                    <td>Telegram</td>
                                    <td>{{ userTelegram }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
    import Navigation from './Navigation'
    export default {
        name: 'Home',
        components: {
            Navigation
        },
        data: () => {
            return {
                'userEmail': '',
                'userName': '',
                'userSurname': '',
                'userTelegram': ''
            };
        },
        mounted() {
        }
    }
</script>
