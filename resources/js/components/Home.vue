<template>
    <div>
        <Navigation />

        <v-layout align-center justify-center row full-height>
            <v-flex xs10 lg8 pt-5>
                <v-card>
                    <v-card-title>
                        <v-layout justify-center>
                            <span class="headline">Information</span>
                        </v-layout>
                    </v-card-title>
                    <v-container>
                        <p>
                            This is an open-source application for Kazakh-British Technical University's students.
                        </p>
                        <p>
                            You may find sources on <a href="https://github.com/Semior001/kbtuchatter">this</a> github repository.
                        </p>
                        <p>
                            I really hope that someone will take a look on this repository, try to improve this application. You may
                            make ax pull-request to suggest me an additional functionality to this application.
                        </p>
                        <p>
                            I guess, that your pull-request will be an improvement of your CV, cause a lot of companies (for instance,
                            Yandex) always asks their candidates for their code examples.
                        </p>
                        <p>
                        <h3>In progress:</h3>
                        <ul>
                            <li>Информация о стажировках</li>
                            <li>Регистрация на всякие КБТУшные мероприятия</li>
                            <li>Общажным
                                <ul>
                                    <li>Показывать номер комнаты, койку</li>
                                    <li>Чекбокс "принисите мне еду, пожалуйста"</li>
                                </ul>
                            </li>
                            <li>Показывать других преподавателей предмета (изменил на показ "похожих" предметов - растояние Левенштейна >= 70%)</li>
                            <li>Показывать другие предметы преподов <i class="fas fa-check"></i></li>
                            <li>Чекбокс для "распишитесь в attendance за меня, пожалуйста"</li>
                            <li>android application</li>
                            <li>Новости по предметам</li>
                            <li>Форум (а может не надо?)</li>
                            <li>Инфа о квизах, рефератах (уведомления)</li>
                            <li>Офис-часы преподов <i class="fas fa-check"></i></li>
                            <li>Просмотр чужого расписания (для просмотра свободного времени у одногруппников (друзей))
                                <ul>
                                    <li>Просмотр чужого расписания <i class="fas fa-check"></i>
                                        <ul>
                                            <li>Просто просмотр расписания <i class="fas fa-check"></i></li>
                                            <li>Поиск пользователя для просмотра расписания <i class="fas fa-check"></i></li>
                                        </ul>
                                    </li>
                                    <li>Возможность сравнивать своё расписание с группой лиц - показывать свободные промежутки времени</li>
                                    <li>Возможность отключить просмотр <b>моего</b> расписания <i class="fas fa-check"></i></li>
                                </ul>
                            </li>

                            <li><span style="text-decoration: line-through;">Добавить коды предметов (типа CSCI1203)</span> (преподы ведут один и тот же предмет - коды одинаковые)</li>
                        </ul>
                        </p>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>

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
