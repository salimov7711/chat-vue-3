<template>
    <VCol>
        <VRow>
            <VCol cols="4" md="4">
                <VCard>
                    <VCol>
                        <VTabs v-model="currentTab" grow stacked>
                            <VTab>
                                <span>Последние сообщения</span>
                            </VTab>

                            <VTab>
                                <span>Курьеры</span>
                            </VTab>

                            <VTab>
                                <span>Рестораны</span>
                            </VTab>
                        </VTabs>

                        <VCardText>
                            <VWindow v-model="currentTab">
                                <VWindowItem
                                    v-for="(userArr, index) in users"
                                    :value="`tab-${index}`"
                                >
                                    <VList lines="two">
                                        <template
                                            v-for="(
                                                userItem, index
                                            ) in userArr.value"
                                            :key="index"
                                        >
                                            <button
                                                @click="getMessages(userItem)"
                                            >
                                                <VListItem>
                                                    <template #prepend>
                                                        <VAvatar
                                                            :image="`src/assets/images/avatars/avatar-1.png`"
                                                        />
                                                    </template>
                                                    <VListItemTitle>
                                                        {{ userItem.name }}
                                                    </VListItemTitle>
                                                    <VListItemSubtitle
                                                        class="mt-1"
                                                    >
                                                        <span
                                                            class="text-xs text-disabled"
                                                            >{{
                                                                userItem.name
                                                            }}</span
                                                        >
                                                    </VListItemSubtitle>
                                                </VListItem>
                                            </button>

                                            <VDivider
                                                v-if="
                                                    index !== userArr.length - 1
                                                "
                                            />
                                        </template>
                                    </VList>
                                </VWindowItem>
                            </VWindow>
                        </VCardText>
                    </VCol>
                </VCard>
            </VCol>
            <VCol cols="8" md="8">
                <VCard height="100%">
                    <div class="message-header">
                        <div class="header-content">
                            <div class="image-wrapper">
                                <img
                                    class="img"
                                    src="@/assets/images/avatars/avatar-1.png"
                                    alt="avatar"
                                />
                            </div>

                            <div class="profile-content">
                                <span class="name">{{ user?.name }}</span>
                                <span v-if="user?.role === 'delivery_man'"
                                    >Курьер</span
                                >
                                <span v-else-if="user?.role === 'restaurant'"
                                    >Ресторан</span
                                >
                                <span v-else>{{ user?.role }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="message-content">
                        <div class="chat-date">
                            <span> 2024-07-06 </span>
                        </div>

                        <div
                            class="messages"
                            v-for="(message, index) in messages"
                            :key="message"
                        >
                            <div class="message">
                                <div class="image-wrapper">
                                    <img
                                        class="img"
                                        src="@/assets/images/avatars/avatar-1.png"
                                        alt="avatar"
                                    />
                                </div>
                                <div class="text-content">
                                    <p>
                                        Доброе утро Алексей. У тебя сегодня пят
                                        доставок. Первая по адресу ул солнечная,
                                        15
                                    </p>
                                </div>
                                <span>13:00</span>
                            </div>
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <input
                            type="text"
                            placeholder="Введите сообщение"
                            v-model="message"
                            @keydown.enter="sendMessage"
                        />
                    </div>
                </VCard>
            </VCol>
        </VRow>
    </VCol>
</template>

<script setup>
const currentTab = ref("tab-1");
import { onMounted } from "vue";
import { ref } from "vue";
import { useDatabaseList, useDatabaseObject, useDatabase } from "vuefire";
import { ref as dbRef, set, push } from "firebase/database";
const db = useDatabase();
const admins = useDatabaseList(dbRef(db, "admins"));
const delivery_mens = useDatabaseList(dbRef(db, "delivery_mens"));
const restaurants = useDatabaseList(dbRef(db, "restaurants"));

const user = ref(undefined);

const userChats = [];

const messages = ref([]);

const message = ref("");

function getMessages(userItem) {
    user.value = userItem;
}
const auth = ref({
    id: "admin_id_1",
});
function sendMessage() {
    const chatId = [auth.value.id, user.value.id].sort().join("_");
    const chatRef = dbRef(db, `chats/${chatId}`);
    set(chatRef, {
        participants: [auth.value.id , user.value.id],
        lastMessage: "Hello",
        lastMessageTimestamp: "2024-09-16T14:00:00Z",
        unreadCounts: {
            [auth.value.id]: 0,
            [user.value.id]: 1,
        },
    });

    message.value = "";
}

const users = ref([admins, delivery_mens, restaurants]);
onMounted(() => {
    console.log(users);
});
</script>

<style lang="scss" scoped>
.v-list-item-title {
    font-size: 12px;
}

v-avatar .v-img {
    width: 28px;
}
.v-list-item-subtitle {
    font-size: 10px;
}
.message-header {
    padding: 0 15px;
    height: 50px;
    border-bottom: solid 2px #e5e7eb;
    margin: 15px;

    .header-content {
        display: flex;

        .profile-content {
            margin-left: 10px;

            span {
                font-size: 10px;
                display: block;
            }
            .name {
                color: black;
                font-size: 12px;
            }
        }
    }
}

.message-content {
    .chat-date {
        display: flex;
        justify-content: center;

        span {
            padding: 10px 20px;
            border-radius: 100px;
            background-color: #f9fafb;
            font-size: 10px;
        }
    }

    height: 86%;
    .messages {
        padding: 20px 0px;
        .message {
            margin: 20px 0px;
            display: flex;
            gap: 20px;
            width: 70%;

            .text-content {
                background-color: #f9fafb;
                border-radius: 20px;
                padding: 10px;
            }
        }
    }
}

.img {
    border-radius: 100px;
    width: 28px;
}

.v-card {
    padding: 10px 20px;
}

.input-wrapper {
    input {
        width: 100%;
        background-color: #f9fafb;
        padding: 20px;
        border-radius: 20px;
    }
}
</style>
