<script setup>

</script>

<template>
<router-view></router-view>
</template>

<style>
.h1{
  text-align: center;
  margin-bottom: 15px;
}
.register button, .login button, .add button{
  width: 320px;
  height: 40px;
  display: block;
  margin: 10px auto;
  border: 1px solid lightgreen;
  background: lightgreen;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}
.register input, .login input, .add input, .add textarea{
  width: 300px;
  height: 40px;
  margin :10px auto;
  display: block;
  padding-left: 10px;
  border :1px solid #ccc;
  border-radius: 5px;

}
.add textarea{
  height: auto!important;
  min-height: 80px;
}
.btn-login{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
}
.list-post{
  margin-top: 5px;
}
</style>
