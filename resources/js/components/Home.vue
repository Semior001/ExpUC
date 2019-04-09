<template>
    <div>
        <Toolbar />

        <div class="container">
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
                                        <td>Created At</td>
                                        <td>{{ userCreatedAt }}</td>
                                    </tr>
                                    <tr>
                                        <td>Updated At</td>
                                        <td>{{ userUpdatedAt }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as axios from "axios";
    import Toolbar from './Toolbar';

    export default {
        name: 'Home',
        data: () => {
            return {
                'userEmail': '',
                'userName': '',
                'userCreatedAt': '',
                'userUpdatedAt': ''
            };
        },
        components: {
            Toolbar
        },
        mounted() {
            this.userEmail = this.$store.getters.userData.email;
            this.userName = this.$store.getters.userData.name;
            this.userCreatedAt = this.$store.getters.userData.created_at;
            this.userUpdatedAt = this.$store.getters.userData.updated_at;
        }
    }
</script>
