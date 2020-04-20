<template>
  <div class="login">
    <form @submit.prevent="login" class="login-box">
      <input type="text" v-model="username" />
      <input type="password" v-model="password" />
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      username: '',
      password: ''
    }
  },
  // created() {
  //   if (localStorage.getItem('token') !== null) this.$router.push({ path: '/' })
  // },
  methods: {
    login() {
      this.$axios
        .post('/api/v1/login', {
          username: this.username,
          password: this.password
        })
        .then(resp => {
          alert(resp.data.msg)
          if (resp.data.data.api_token !== undefined) {
            const api_token = resp.data.data.api_token
            console.log(api_token)
            localStorage.setItem('token', api_token)
            this.$router.push({ path: '/' })
          }
        })
    }
  }
}
</script>

<style>
.login {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  display: flex;
  flex-direction: column;
  min-width: 300px;
}

.login-box > input {
  outline: none;
  border: none;
  border: 1px solid #d1d5da;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 3px;
}

.login-box > button {
  outline: none;
  border: none;
  border: 1px solid #d1d5da;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 3px;
}
</style>