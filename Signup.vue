<template>
    <div>
    <div class="register">
        <h1>Sign up</h1>
        <input type="text" v-model="form.name" placeholder="Name">
        <p class="msg-error" v-if="errors.name">{{ errors.name }}</p>
        <br>
        <input type="text" v-model="form.email" placeholder="Email">
        <p class="msg-error" v-if="errors.email">{{ errors.email }}</p>
        <br>
        <input type="text" v-model="form.password" placeholder="Password">
        <p class="msg-error" v-if="errors.password">{{ errors.password }}</p>
        <br>
        <button @click="Signup()">Sign up</button>

    </div>
    </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2'

export default{
    data(){
        return{
            form:{
                name:'',
                email:'',
                password:'',
            },
            errors:{}
        }  
    },
    methods:{
        async Signup(){
            if (this.validateUser()){
                let userItem ={
                    name: this.form.name,
                    email: this.form.email,
                    password: this.form.password,
                }
                let result = await axios.post("http://localhost:3000/users", userItem);
                if(result.status == 201){
                    Swal.fire({
                        title: "Good job!",
                        text: "You clicked the button!",
                        icon: "success",
                        timer:1000
                    });
                    setTimeout(() => {
                        this.$router.push({
                            name:'Home'
                        },1000)
                    })
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
    }
}
</script>