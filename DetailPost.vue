<template>
    <Header></Header>
    <div class="add">
        <h1>details</h1>
        <div>
            <input type="text" v-model="form.title" disabled>
            <textarea rows="6" v-model="form.content" disabled></textarea>
        </div>
        <button class="list-post"><a href="/">Go to list post</a></button>
    </div>
</template>
<script>
import axios from 'axios';
import Header from './Header.vue';
export default {
    data(){
        return {
            form:{
                title: '',
                content: ''
            }
        }
    },
    components: {
        Header       
    },
    async created(){
        let result = await axios.get("http://localhost:3000/posts/" + this.$route.params.id);
        if (result.status === 200){
            this.form.title = result.data.title;
            this.form.content = result.data.content;
        }
        console.log(result);
        
    }
}
</script>
