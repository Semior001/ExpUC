<template>
    <div>

        <Navigation />

        <!--Body-->
        <v-content>
            <v-layout class="hidden-sm-and-down" align-center justify-center row full-height>
                <v-flex xs10 lg8 pt-5>
                    <v-card>
                        <v-card-title>
                            <v-layout justify-center>
                                <span class="headline">Schedule</span>
                            </v-layout>
                        </v-card-title>
                        <v-container>
                            <v-calendar
                                    ref="calendar"
                                    :now="today"
                                    :value="today"
                                    color="primary"
                                    type="week"
                            >
                                <!-- the events at the top (all-day) -->
                                <template v-slot:dayHeadere="{ date }">
                                    <template v-for="event in eventsMap[date]">
                                        <!-- all day events don't have time -->
                                        <div
                                                v-if="!event.time"
                                                :key="event.title"
                                                class="my-event"
                                                @click="open(event)"
                                                v-html="event.title"
                                        ></div>
                                    </template>
                                </template>
                                <!-- the events at the bottom (timed) -->
                                <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
                                    <template v-for="event in eventsMap[date]">
                                        <!-- timed events -->
                                        <div
                                                v-if="event.time"
                                                :key="event.title"
                                                :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                                                class="my-event with-time"
                                                @click="open(event)"
                                                v-html="event.title"
                                        ></div>
                                    </template>
                                </template>
                            </v-calendar>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>

            <v-layout class="hidden-lg-and-up" align-center justify-center row full-height>
                <v-btn>
                    <v-icon>keyboard_arrow_left</v-icon>
                </v-btn>

                <v-btn>
                    <v-icon>keyboard_arrow_right</v-icon>
                </v-btn>

                <v-flex xs10 lg8 pt-5>
                    <v-card>
                        <v-card-title>
                            <v-layout justify-center>
                                <span class="headline">Schedule</span>
                            </v-layout>
                        </v-card-title>
                        <v-container>
                            <v-calendar
                                    color="primary"
                                    type="day"
                            >
                                <template v-slot:dayHeader="{ present }">
                                    <template
                                            v-if="present"
                                            class="text-xs-center"
                                    >
                                        Today
                                    </template>
                                </template>

                                <template v-slot:interval="{ hour }">
                                    <div
                                            class="text-xs-center"
                                    >
                                        {{ hour }} o'clock
                                    </div>
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
    import Navigation from './Navigation'
    export default {
        name: 'Schedule',
        components: {
            Navigation
        },
        data: () => ({
            today: '2019-01-08',
            events: [
                {
                    title: 'Weekly Meeting',
                    date: '2019-01-07',
                    time: '09:00',
                    duration: 45
                },
                {
                    title: 'Thomas\' Birthday',
                    date: '2019-01-10'
                },
                {
                    title: 'Mash Potatoes',
                    date: '2019-01-09',
                    time: '12:30',
                    duration: 180
                }
            ]
        }),
        computed: {
            // convert the list of events into a map of lists keyed by date
            eventsMap () {
                const map = {}
                this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
                return map
            }
        },
        mounted () {
            this.$refs.calendar.scrollToTime('08:00')
        },
        methods: {
            open (event) {
                alert(event.title)
            }
        }
    }
</script>
