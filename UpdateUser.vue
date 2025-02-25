<template>
    <div class="register">
        <h1>Sign Up</h1>
        <input type="text" v-model="form.name" placeholder="Enter Name">
        <p class="msg-error" v-if="errors.name">{{ errors.name }}</p>

        <input type="text" v-model="form.email" placeholder="Enter Email">
        <p class="msg-error" v-if="errors.email">{{ errors.email }}</p>

        <input type="password" v-model="form.password" placeholder="Enter Password">
        <p class="msg-error" v-if="errors.password">{{ errors.password }}</p>
        <button @click="UpdateUser()">Update</button>
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
                name: '',
                email: '',
                password: ''
            },
            errors:{}
        }
    },
    methods: {
        async UpdateUser() {
            if(this.validateUser()){
            console.log(this.form);
            let item = {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password
            };
            try {
                let result = await axios.put("http://localhost:3000/users/" + this.$route.params.id, item);
                if (result.status == 200) {
                    localStorage.setItem('userLogin', JSON.stringify(result.data));
                    Swal.fire({
                        title: "Good job!",
                        text: "Data Updated",
                        icon: "success",
                        timer: 1000
                    });
                    setTimeout(() => {
                        this.$router.push({
                            name: 'Home'
                        });
                    }, 1000);
                }
            } catch (error) {
                console.error("Lỗi khi cập nhật người dùng:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update user data",
                    icon: "error",
                    timer: 1000
                });
            }
            }
        },
        validateUser(){
            const errors = {};
            if(!this.form.name){
                errors.name ="Name is requied!";
            }

            if(!this.form.email){
                errors.email ="Email is requied!";
            }else if(!this.valiEmail(this.form.email)){
                errors.email = "Valid Email is requied!";
            }

            if(!this.form.password){
                errors.password ="Password is requied!";
            }
            this.errors= errors;
            return Object.keys(errors).length === 0;
        },
        valiEmail(email){
            const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return re.test(email);
            
        }
    },
    mounted() {
        let userLogin = localStorage.getItem("userLogin");
        if (userLogin) {
            userLogin = JSON.parse(userLogin);
            this.form.name = userLogin.name || '';
            this.form.email = userLogin.email || '';
            this.form.password = userLogin.password || '';
        }
    }
};
</script>

<style>
.register {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.register h1 {
    text-align: center;
    margin-bottom: 20px;
}
.register input {
    width: calc(100% - 20px);
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.register button {
    width: calc(100% - 20px);
    padding: 10px;
    background-color: #04aa6d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.register button:hover {
    background-color: #038c58;
}
.list-post a {
    color: white;
    text-decoration: none;
}
.list-post a:hover {
    text-decoration: underline;
}
</style>
