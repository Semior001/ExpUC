<template>
    <div>
        <v-content>
            <v-layout align-center justify-center row full-height>
                <v-flex xs10 lg8 pt-5>
                    <v-card>
                        <v-card-title>
                            <v-layout justify-center>
                                <span class="headline">Add new subject</span>
                            </v-layout>
                        </v-card-title>
                        <v-container>
                            <v-form
                                    ref="form"
                                    lazy-validation
                                    @submit.prevent="submitNewSubject"
                            >
                                <v-layout justify-center>
                                    <v-flex xs10 lg10>
                                        <v-alert
                                                class="mb-2"
                                                :value="!!alertMessage"
                                                :type="alertMessageType">
                                            {{ alertMessage }}
                                        </v-alert>

                                        <v-layout justify-center mb-5 mt-4>
                                            <v-subheader class="green--text">
                                                Please set the subject name exactly as it is in your wsp schedule. Also, depends on the kind of the subject, you have to put " (Lecture)" after the name of subject or " (Practice)".
                                                <br>
                                                Example: "Physics I (Lecture)"
                                            </v-subheader>
                                        </v-layout>

                                        <v-text-field
                                                v-model="name"
                                                label="Subject name"
                                                :rules="[rules.required]">
                                        </v-text-field>

                                        <v-select
                                                v-model="weekday"
                                                :items="weekdays"
                                                label="Week day"
                                                :rules="[rules.required]"
                                        ></v-select>

                                        <v-text-field
                                                v-model="place"
                                                label="Place (A cabinet (or another kind of territory), where the lesson take place)"
                                                :rules="[rules.required]">
                                        </v-text-field>

                                        <div class="row mt-3">
                                            <div class="col-lg-6">
                                                <v-layout justify-center>
                                                    <v-time-picker
                                                            v-model="startTime"
                                                            format="24hr"
                                                            :rules="[rules.required]">
                                                        <v-layout justify-center>
                                                            <h3>
                                                                Lesson's <span style="color: red; ">starting</span> time
                                                            </h3>
                                                        </v-layout>
                                                    </v-time-picker>
                                                </v-layout>
                                            </div>
                                            <div class="col-lg-6">
                                                <v-layout justify-center >
                                                    <v-time-picker
                                                            v-model="endTime"
                                                            format="24hr"
                                                            :rules="[rules.required]"
                                                            :class="is_screen_small ? 'mt-3' : ''">
                                                        <v-layout justify-center>
                                                            <h3>
                                                                Lesson's <span style="color: red; ">ending</span> time
                                                            </h3>
                                                        </v-layout>
                                                    </v-time-picker>
                                                </v-layout>
                                            </div>
                                        </div>

                                        <v-layout justify-center mt-5>
                                            <h3>Teacher</h3>
                                        </v-layout>
                                        <v-layout justify-center class="green--text">
                                            Please, firstly, try to find teacher in the list of existing teachers.
                                        </v-layout>
                                        <v-layout justify-center class="green--text">
                                            <b>Only in the case, if your teacher doesn't appear in the list, add him<sup>(her)</sup> with him<sup>(her)</sup> exact full name</b>
                                        </v-layout>

                                        <v-form @submit.prevent="getTeachers" id="searchTeacherForm">
                                            <v-text-field
                                                    form="searchTeacherForm"
                                                    v-model="searchTeacher"
                                                    label="Search teacher by name/surname/patronymic (press enter to run search)">
                                            </v-text-field>
                                        </v-form>

                                        <v-radio-group v-model="selectedTeacher" class="radio-group-full-width" style="overflow: scroll">
                                            <v-data-table
                                                    :headers="teacherTable_Headers"
                                                    :items="teachers"
                                                    v-model="teachers"
                                                    :loading="loadingTeachers"
                                                    :pagination.sync="paginationTeachers"
                                                    :total-items="totalTeachers"
                                            >
                                                <template v-slot:no-data>
                                                    <v-alert :value="true" color="error" icon="warning">
                                                        Sorry, nothing to display here :(
                                                    </v-alert>
                                                </template>
                                                <template v-slot:items="props">
                                                    <td>{{ props.item.name }}</td>
                                                    <td>{{ props.item.surname }}</td>
                                                    <td>{{ props.item.patronymic }}</td>
                                                    <td>
                                                        <v-radio
                                                                :key="props.index"
                                                                :value="props.item.id"
                                                                primary
                                                                hide-details
                                                                :rules="[rules.required]"
                                                        ></v-radio>
                                                    </td>
                                                </template>
                                                <template v-slot:footer>
                                                    <tr>
                                                        <td>
                                                            <v-form class="newTeacherForm">
                                                                <v-text-field
                                                                        form="newTeacherForm"
                                                                        class="mt-3"
                                                                        v-model="newTeacherName"
                                                                        :rules="[rules.required]">
                                                                </v-text-field>
                                                            </v-form>
                                                        </td>
                                                        <td>
                                                            <v-form class="newTeacherForm">
                                                                <v-text-field
                                                                        form="newTeacherForm"
                                                                        class="mt-3"
                                                                        v-model="newTeacherSurname"
                                                                        :rules="[rules.required]">
                                                                </v-text-field>
                                                            </v-form>
                                                        </td>
                                                        <td>
                                                            <v-form class="newTeacherForm">
                                                                <v-text-field
                                                                        form="newTeacherForm"
                                                                        class="mt-3"
                                                                        v-model="newTeacherPatronymic"
                                                                        :rules="[rules.required]">
                                                                </v-text-field>
                                                            </v-form>
                                                        </td>
                                                        <td>
                                                            <v-btn :disabled="newTeacherAddDisabled" type="button" color="success" @click.end="addNewTeacher">
                                                                add
                                                            </v-btn>
                                                        </td>
                                                    </tr>
                                                </template>
                                            </v-data-table>
                                        </v-radio-group>

                                        <v-layout justify-end>
                                            <v-btn type="submit" color="success">save</v-btn>
                                        </v-layout>

                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-content>
    </div>
</template>
<script>
    export default{
        name: 'AddNewSubject',
        data: function(){
            return {
                alertMessage: '',
                alertMessageType: 'error',

                rules: {
                    required: value => (!!value || value === 0) || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                },
                weekdays: [
                    {
                        text: 'Monday',
                        value: 0
                    },
                    {
                        text: 'Tuesday',
                        value: 1
                    },
                    {
                        text: 'Wednesday',
                        value: 2
                    },
                    {
                        text: 'Thursday',
                        value: 3
                    },
                    {
                        text: 'Friday',
                        value: 4
                    },
                    {
                        text: 'Saturday',
                        value: 5
                    },
                    {
                        text: 'Sunday',
                        value: 6
                    }
                ],

                newTeacherName: '',
                newTeacherSurname: '',
                newTeacherPatronymic: '',

                teacherTable_Headers: [
                    {
                        text: 'Name',
                        align: 'left',
                        value: 'name',
                    },
                    {
                        text: 'Surname',
                        align: 'left',
                        value: 'surname',
                    },
                    {
                        text: 'Patronymic',
                        align: 'left',
                        value: 'patronymic',
                    },
                    {
                        text: '',
                        value: '',
                        sortable: false
                    },
                ],

                paginationTeachers: {},
                loadingTeachers: false,
                totalTeachers: 0,
                teachers: [],
                searchTeacher: '',
                newTeacherAddDisabled: false,

                name: '',
                weekday: '',
                startTime: '',
                endTime: '',
                place: '',
                selectedTeacher: null,
            };
        },
        methods: {
            submitNewSubject(){
                if (!this.$refs.form.validate() || !this.startTime || !this.endTime || !this.selectedTeacher) {
                    this.alertMessageType = 'error';
                    this.alertMessage = 'Oops! It looks like you forgot to write something...';
                    return;
                }

                axios({
                    url: '/api/subjects/add',
                    data: {
                        'name': this.name,
                        'weekday': this.weekday,
                        'start_time': this.startTime,
                        'end_time': this.endTime,
                        'place': this.place,
                        'selectedTeacher': this.selectedTeacher
                    },
                    method: 'POST'
                }).then(response => {
                    if(response.status === 200) {
                        // todo скролл наверх и показ алерта об успешном создании предмета (очистка формы, возможно)
                        window.scrollTo(0,0);
                        this.alertMessageType = 'success';
                        this.alertMessage = 'Success! Your subject has been saved! Go to your schedule to watch it';
                        return;
                    }
                    window.scrollTo(0,0);
                    this.alertMessageType = 'error';
                    this.alertMessage = 'Oops! ' + response;
                }).catch(error => {
                    this.alertMessageType = 'error';
                    this.alertMessage = error;
                });

            },
            getTeachers(){
                this.loadingTeachers = true;

                const { sortBy, descending, page, rowsPerPage } = this.paginationTeachers;

                axios({
                    url: '/api/teachers/list?page=' + page
                    + '&sortBy=' + sortBy
                    + '&order=' + (descending ? 'desc' : 'asc')
                    + '&itemsPerPage=' + rowsPerPage
                    + '&search=' + this.searchTeacher,
                    method: 'GET'
                }).then(response => {
                    if(response.status === 200){
                        this.teachers = response.data.data;
                        this.totalTeachers = response.data.total;
                        return;
                    }
                    this.teachers = [];
                }).catch(error => {
                    this.teachers = [];
                });

                this.loadingTeachers = false;
            },
            addNewTeacher(){
                if(!this.newTeacherPatronymic || !this.newTeacherSurname || !this.newTeacherName)
                    return;

                this.newTeacherAddDisabled = true;

                axios({
                    url: '/api/teachers/add',
                    data: {
                        'name': this.newTeacherName,
                        'surname': this.newTeacherSurname,
                        'patronymic': this.newTeacherPatronymic
                    },
                    method: 'POST'
                }).then(response => {
                    if(response.status === 200){
                        this.newTeacherName = '';
                        this.newTeacherSurname = '';
                        this.newTeacherPatronymic = '';
                        this.getTeachers();
                        return;
                    }
                    alert(response.data);
                }).catch(error => {
                    alert(error);
                });

                this.newTeacherAddDisabled = false;
            }
        },
        watch: {
            paginationTeachers: {
                handler(){
                    this.getTeachers();
                },
                deep: true
            }
        },
        computed: {
            is_screen_small() {
                return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
            }
        },
        mounted() {
            this.getTeachers();
        }
    }

</script>
<style scoped>
    .radio-group-full-width >>>.v-input__control {
        width: 100%
    }
</style>