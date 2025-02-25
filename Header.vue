<template>
    <div class="nav">
        <ul>
            <div class="nav-left">
                <li>
                    <router-link to="/add-post/">Add Post</router-link>
                </li>
                <li>
                    <router-link :to="'/update-user/' + userId">Cap Nhat Thong Tin Tai Khoan</router-link>
                </li>
                <li><a @click="Logout()">Logout</a></li>
            </div>
            <div class="nav-right">
                <li class="user-name">Welcome : {{ userName }}</li>
            </div>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: '',
            userId: ''
        };
    },
    created() {
        let userLogin = localStorage.getItem("userLogin");
        if (userLogin) {
            userLogin = JSON.parse(userLogin);
            this.userName = userLogin.name || '';
            this.userId = userLogin.id || '';
        }
    },
    methods: {
        Logout() {
            localStorage.removeItem("userLogin");
            this.$router.push({
                name: "Login"
            });
        },
    },
};
</script>

<style>
.nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #333;
    padding: 0;
    z-index: 1000;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
.nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.nav-left {
    display: flex;
    align-items: center;
}
.nav-right {
    margin-left: auto;
}
.nav li {
    margin: 0 10px;
}
li a {
    display: block;
    color: white;
    font-size: 16px;
    padding: 14px 16px;
    text-decoration: none;
    transition: 0.3s;
}
li a:hover {
    background-color: #04aa6d;
    border-radius: 5px;
}
.logout {
    cursor: pointer;
}
.logout a:hover {
    background-color: #e74c3c;
    border-radius: 5px;
}
.user-name {
    color: white;
    font-weight: bold;
}
body {
    padding-top: 60px;
}
</style>
