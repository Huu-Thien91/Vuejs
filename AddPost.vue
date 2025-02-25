<template>
    <div class="add">
        <h1>Add new post</h1>
        <input type="text" v-model="form.title" placeholder="Enter title">
        <p class="msg-error" v-if="errors.title">{{ errors.title }}</p>

        <textarea v-model="form.content" placeholder="Enter content" rows="6"></textarea>
        <p class="msg-error" v-if="errors.content">{{ errors.content }}</p>
        <button @click="addPost()">Add new Post</button>
        <button class="list-post">
            <router-link to="/">Go to list post</router-link>
        </button>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            form: {
                title: '',
                content: ''
            },
            errors: {}
        };
    },
    methods: {
        async addPost() {
            if (this.validatePost()) {
                let item = {
                    title: this.form.title,
                    content: this.form.content
                };

                try {
                    let result = await axios.post("http://localhost:3000/posts", item);
                    if (result && result.status === 201) {
                        Swal.fire({
                            title: "Good job!",
                            text: "Data post",
                            icon: "success",
                            timer: 1000
                        });
                        setTimeout(() => {
                            this.$router.push({ name: 'Home' });
                        }, 1000);
                    }
                } catch (error) {
                    console.error("Lỗi khi thêm bài viết:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to add new post",
                        icon: "error",
                        timer: 1000
                    });
                }
            }
        },
        validatePost() {
            const errors = {};
            if (!this.form.title) {
                errors.title = "Title is required!";
            }

            if (!this.form.content) {
                errors.content = "Content is required!";
            }
            this.errors = errors;
            return Object.keys(errors).length === 0;
        }
    }
};
</script>

<style scoped>
h1 {
    text-align: center;
}
</style>
