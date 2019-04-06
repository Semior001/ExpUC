<template>
    <logged-in-layout>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Example Component</div>

                        <div class="card-body">
                            This is my main apptesttest
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </logged-in-layout>
</template>

<script>
    import LoggedInLayout from './LoggedInLayout'
    export default {
        name: 'Home',
        components: {
            LoggedInLayout
        }
    }
</script>
