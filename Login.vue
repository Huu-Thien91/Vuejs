<template>
    <div>
        <div class="login">
            <h1>Login</h1>
            <input type ="text" placeholder="Email" v-model="form.email">
            <p class="msg-error" v-if="errors.email">{{ errors.email }}</p>
            <input type="text" placeholder="Password" v-model="form.password">
            <p class="msg-error" v-if="errors.password">{{ errors.password }}</p>
            <p class="msg-error">{{ msgError }}</p>
            <button style="margin-top:50px;" @click="Login()">Login</button>
            <p class="btn-login">
                <router-link to="/sign-up">Sign Up</router-link>
            </p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
            form:{
                email: '',
                password: ''
            },
            msgError:'',
            errors:{}
        }
    },
    methods:{
        async Login(){
            if(this.validateUser()){
                let data = [];
                let result = await axios.get("http://localhost:3000/users");
                if(result.status == 200 && result.data.length >0){
                    data = result.data.filter(item => item.email == this.form.email && item.password == this.form.password);
                    if(data.length > 0){
                        localStorage.setItem('userLogin',JSON.stringify(data[0]));
                        this.$router.push({name:'Home'})
                    }
                else {
                    this.msgError = 'Email and Passord is invalid';
                    }
                }
            }
        },
        validateUser(){
            const errors = {};

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
    }
}
</script>
<style scoped>
h1 {
    text-align: center;
}
</style>