<template>
    <div>
        <v-content>
            <v-layout align-center justify-center row full-height>
                <v-flex xs10 lg10 pt-5>
                    <v-card>
                        <v-card-title>
                            <v-layout justify-center>
                                <span class="headline">Schedule</span>
                            </v-layout>
                        </v-card-title>
                        <v-container>

                            <v-layout justify-center class="hidden-md-and-up">
                                <v-btn @click.end="previousDay">
                                    <v-icon>
                                        keyboard_arrow_left
                                    </v-icon>
                                </v-btn>
                                <v-btn @click.end="nextDay">
                                    <v-icon>
                                        keyboard_arrow_right
                                    </v-icon>
                                </v-btn>
                            </v-layout>

                            <v-calendar
                                    class="hidden-sm-and-down"
                                    ref="calendarWeek"
                                    color="primary"
                                    type="week"
                                    :weekdays="[1,2,3,4,5,6,0]"
                            >
                                <!-- the events at the bottom (timed) -->
                                <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
                                    <template v-for="event in eventsMap()[new Date(date).getDay()]">
                                        <v-menu
                                            :key="event.name"
                                            v-model="event.open">
                                            <template v-slot:activator="{ on }">
                                                <div
                                                        v-if="event.start_time"

                                                        :style="{ top: timeToY(event.start_time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                                                        class="basic-event with-time"
                                                        v-html="event.name"
                                                        v-on="on"
                                                ></div>
                                            </template>
                                            <v-card
                                                    min-width="350px"
                                                    flat
                                            >
                                                <v-toolbar
                                                        color="primary"
                                                >
                                                    <v-btn icon>
                                                        <v-icon>description</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title v-html="event.name"></v-toolbar-title>
                                                </v-toolbar>
                                                <v-card-title primary-title>
                                                    <span>
                                                        <b>ID: </b> {{ event.id }} <br>
                                                        <b>Weekday: </b> {{ event.weekdayName }} <br>
                                                        <b>Start time: </b> {{ event.start_time }} <br>
                                                        <b>End time: </b> {{ event.end_time }} <br>
                                                        <b>Place: </b> {{ event.place }} <br>
                                                        <b>Teacher: </b> <br>
                                                        <template v-for="teacher in event.teachers">
                                                            {{ teacher.surname }} {{ teacher.name }} {{ teacher.patronymic }} <br>
                                                        </template>
                                                        <b>Telegram groups: </b> <br>
                                                        <template v-for="group in event.telegram_groups">
<!--                                                            <a href="{{ group }}">{{ group }}</a>-->
                                                        </template>
                                                    </span>
                                                </v-card-title>
                                                <v-card-actions>
                                                    <v-btn
                                                            flat
                                                            color="secondary"
                                                    >
                                                        Cancel
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-menu>
                                    </template>
                                </template>
                            </v-calendar>

                            <v-calendar
                                    class="hidden-md-and-up"
                                    ref="calendarDay"
                                    color="primary"
                                    type="day"
                                    :start="currentDay"
                                    :weekdays="[1,2,3,4,5,6,0]"
                            >
                                <!-- the events at the bottom (timed) -->
                                <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
                                    <template v-for="event in eventsMap()[new Date(date).getDay()]">
                                        <v-menu
                                                :key="event.name"
                                                v-model="event.open">
                                            <template v-slot:activator="{ on }">
                                                <div
                                                        v-if="event.start_time"

                                                        :style="{ top: timeToY(event.start_time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                                                        class="basic-event with-time"
                                                        v-html="event.name"
                                                        v-on="on"
                                                ></div>
                                            </template>
                                            <v-card
                                                    min-width="350px"
                                                    flat
                                            >
                                                <v-toolbar
                                                        color="primary"
                                                >
                                                    <v-btn icon>
                                                        <v-icon>description</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title v-html="event.name"></v-toolbar-title>
                                                </v-toolbar>
                                                <v-card-title primary-title>
                                                    <span>
                                                        <b>ID: </b> {{ event.id }} <br>
                                                        <b>Weekday: </b> {{ event.weekdayName }} <br>
                                                        <b>Start time: </b> {{ event.start_time }} <br>
                                                        <b>End time: </b> {{ event.end_time }} <br>
                                                        <b>Place: </b> {{ event.place }} <br>
                                                        <b>Teacher: </b> <br>
                                                        <template v-for="teacher in event.teachers">
                                                            {{ teacher.surname }} {{ teacher.name }} {{ teacher.patronymic }} <br>
                                                        </template>
                                                        <b>Telegram groups: </b> <br>
                                                        <template v-for="group in event.telegram_groups">
<!--                                                            <a href="{{ group }}">{{ group }}</a>-->
                                                        </template>
                                                    </span>
                                                </v-card-title>
                                                <v-card-actions>
                                                    <v-btn
                                                            flat
                                                            color="secondary"
                                                    >
                                                        Cancel
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-menu>
                                    </template>
                                </template>
                            </v-calendar>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>

        </v-content>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                events: [],
                currentDay: ''
            };
        },
        created: function(){
            let today = new Date();
            this.currentDay = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            axios({
                url: '/api/subjects/list',
                method: 'GET'
            }).then(response => {
                this.events = response.data;

                this.events.forEach(subject => {
                    let stTime = parseInt(subject.start_time.substr(0, subject.start_time.indexOf(':')), 10) * 60 + parseInt(subject.start_time.substr(subject.start_time.indexOf(':') + 1), 10);
                    let enTime = parseInt(subject.end_time.substr(0, subject.end_time.indexOf(':')), 10) * 60 + parseInt(subject.end_time.substr(subject.end_time.indexOf(':') + 1), 10);
                    subject.duration = enTime - stTime;
                    subject.open = false;

                    if(subject.weekday === 0)
                        subject.weekdayName = 'Sunday';
                    else if(subject.weekday === 1)
                        subject.weekdayName = 'Monday';
                    else if(subject.weekday === 2)
                        subject.weekdayName = 'Tuesday';
                    else if(subject.weekday === 3)
                        subject.weekdayName = 'Wednesday';
                    else if(subject.weekday === 4)
                        subject.weekdayName = 'Thursday';
                    else if(subject.weekday === 5)
                        subject.weekdayName = 'Friday';
                    else if(subject.weekday === 6)
                        subject.weekdayName = 'Saturday';
                });
            }).catch(error => {});
        },
        methods: {
            // convert the list of events into a map of lists keyed by date
            eventsMap () {
                const map = {};
                this.events.forEach(e => (map[e.weekday] = map[e.weekday] || []).push(e));
                return map
            },
            open (event) {
                alert(event)
            },
            nextDay(){
                let nextDay = new Date(this.currentDay);
                nextDay.setDate(nextDay.getDate() + 1);
                this.currentDay = nextDay.getFullYear() + '-' + (nextDay.getMonth() + 1) + '-' + nextDay.getDate();
            },
            previousDay(){
                let prevDay = new Date(this.currentDay);
                prevDay.setDate(prevDay.getDate() - 1);
                this.currentDay = prevDay.getFullYear() + '-' + (prevDay.getMonth() + 1) + '-' + prevDay.getDate();
            }
        },
    }
</script>

<style>
    .theme--dark.v-calendar-daily{
        background-color: inherit;
    }
</style>

<style lang="stylus" scoped>
    .basic-event {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 2px;
        background-color: #1867c0;
        color: #ffffff;
        border: 1px solid #1867c0;
        font-size: 12px;
        padding: 3px;
        cursor: pointer;
        margin-bottom: 1px;
        left: 4px;
        margin-right: 8px;
        position: relative;

    &.with-time {
         position: absolute;
         right: 4px;
         margin-right: 0px;
     }
    }
</style>

