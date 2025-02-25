<template>
    <div class="container">
        <Header></Header>
        <form class="search-form">
            <input type="text" class="search-input" v-model="textSearch" placeholder="Search posts...">
            <button type="button" class="search-button" @click="searchPost()">Search</button>
        </form>
        <div class="table-container">
            <h1>List of Posts</h1>
            <table id="items">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th class="action">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <td>{{ item.id }}</td>  
                        <td>{{ item.title }}</td>
                        <td v-html="formatContent(item.content)"></td>
                        <td>
                            <button class="btn detail-btn">
                                <router-link :to="'/detail-post/' + item.id">Detail</router-link>
                            </button>
                            <button class="btn update-btn">
                                <router-link :to="'/update-post/' + item.id">Update</router-link>
                            </button>
                            <button class="btn delete-btn" @click="deletepost(item.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            items: [],
            textSearch: ''
        };
    },
    components: {
        Header
    },
    created() {
        this.loadData();
    },
    methods: {
        formatContent(content) {
            return content.replace(/\n/g, '<br>');
        },
        async loadData(textSearch = null) {
            let userLogin = localStorage.getItem("userLogin");
            if (userLogin) {
                userLogin = JSON.parse(userLogin);
                let userId = userLogin.id;
                let result = await axios.get(`http://localhost:3000/posts?userId=${userId}`);
                if (result.status === 200 && result.data.length > 0) {
                    this.items = textSearch != null ? result.data.filter(item => item.title.toLowerCase().includes(textSearch.toLowerCase())) : result.data;
                }
            } else {
                console.error("User is not logged in or userLogin is null.");
            }
        },
        async deletepost(id) {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
            if (result.isConfirmed) {
                let respon = await axios.delete("http://localhost:3000/posts/" + id);
                if (respon.status === 200) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your post has been deleted.",
                        icon: "success",
                        timer: 1000
                    });
                    setTimeout(() => {
                        this.loadData();
                    }, 1000);
                }
            }
        },
        searchPost() {
            this.loadData(this.textSearch);
        }
    }
};
</script>

<style scoped>
/* Container styles */
.container {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
}

/* Search form styles */
.search-form {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.search-input {
    width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    margin-right: 10px;
}

.search-button {
    padding: 10px 15px;
    background-color: #04aa6d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.search-button:hover {
    background-color: #038c58;
}

/* Table container styles */
.table-container {
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

/* Heading styles */
.table-container h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 28px;
    color: #333;
}

/* Table styles */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 18px;
    text-align: left;
}

table th, table td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
}

table th {
    background-color: #04aa6d;
    color: white;
    font-weight: bold;
    text-align: center;
}

tbody tr:hover {
    background-color: #f5f5f5;
}

tbody td {
    text-align: center;
}

/* Button styles */
button.btn {
    background-color: #04aa6d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 0 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

button.btn:hover {
    background-color: #038c58;
}

/* Specific button styles */
button.detail-btn {
    background-color: #3498db;
}

button.detail-btn:hover {
    background-color: #2980b9;
}

button.update-btn {
    background-color: #f1c40f;
}

button.update-btn:hover {
    background-color: #f39c12;
}

button.delete-btn {
    background-color: #e74c3c;
}

button.delete-btn:hover {
    background-color: #c0392b;
}

/* Link styles inside buttons */
button.btn a {
    color: white;
    text-decoration: none;
}

button.btn a:hover {
    text-decoration: underline;
}

/* Action column styles */
th.action {
    width: 200px;
}
</style>
