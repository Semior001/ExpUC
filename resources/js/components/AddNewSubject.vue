<template>
    <div>
        <Navigation />
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
                                    @submit.prevent="onSubmit"
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

                                        <div class="hidden-sm-and-down">

                                            <v-layout justify-center mt-5>
                                                <h3>Teacher</h3>
                                            </v-layout>
                                            <v-layout justify-center class="green--text">
                                                Please, firstly, try to find teacher in the list of existing teachers.
                                            </v-layout>
                                            <v-layout justify-center class="green--text">
                                                <b>Only in the case, if your teacher doesn't appear in the list, add him<sup>(her)</sup> with him<sup>(her)</sup> exact full name</b>
                                            </v-layout>

                                            <v-radio-group v-model="selectedTeacher">
                                                <v-data-table
                                                        :headers="teacherTable_Headers"
                                                        :items="teachers"
                                                        pagination.rowsPerPage="100000"
                                                        v-model="teachers"
                                                >
                                                    <template v-slot:items="props">
                                                        <td>{{ props.item.name }}</td>
                                                        <td>{{ props.item.surname }}</td>
                                                        <td>{{ props.item.patronymic }}</td>
                                                        <td>
                                                            <v-radio
                                                                    :key="props.index"
                                                                    :value="props.index"
                                                                    primary
                                                                    hide-details
                                                            ></v-radio>
                                                        </td>
                                                    </template>
                                                    <template v-slot:footer>
                                                        <td>
                                                            <v-text-field
                                                                    class="mt-3"
                                                                    v-model="newTeacherName"
                                                                    label="New Teacher's name">
                                                            </v-text-field>
                                                        </td>
                                                        <td>
                                                            <v-text-field
                                                                    class="mt-3"
                                                                    v-model="newTeacherSurname"
                                                                    label="New Teacher's surname">
                                                            </v-text-field>
                                                        </td>
                                                        <td>
                                                            <v-text-field
                                                                    class="mt-3"
                                                                    v-model="newTeacherPatronymic"
                                                                    label="New Teacher's patronymic">
                                                            </v-text-field>
                                                        </td>
                                                        <td>
                                                            <v-btn color="success">
                                                                save
                                                            </v-btn>
                                                        </td>
                                                    </template>
                                                </v-data-table>
                                            </v-radio-group>

                                        </div>

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
    import Navigation from './Navigation';

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

                name: '',
                weekday: '',
                startTime: '',
                endTime: '',
                place: '',

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
                        value: ''
                    },
                ],

                selectedTeacher: null,

                teachers: [
                    {
                        name: 'Test1',
                        surname: 'Test1_s',
                        patronymic: 'Test1_p'
                    },
                    {
                        name: 'Test2',
                        surname: 'Test2_s',
                        patronymic: 'Test2_p'
                    },
                    {
                        name: 'Test3',
                        surname: 'Test3_s',
                        patronymic: 'Test3_p'
                    },
                    {
                        name: 'Test4',
                        surname: 'Test4_s',
                        patronymic: 'Test4_p'
                    },
                    {
                        name: 'Test5',
                        surname: 'Test5_s',
                        patronymic: 'Test5_p'
                    },
                    {
                        name: 'Test6',
                        surname: 'Test6_s',
                        patronymic: 'Test6_p'
                    },
                ]

                // todo add teacher choose and

            };
        },
        components: {
            Navigation
        },
        methods: {
            onSubmit(){

            }
        },
        computed: {
            is_screen_small() {
                return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
            }
        }
    }

</script>