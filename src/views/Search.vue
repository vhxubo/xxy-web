<template>
  <div class="search">
    <form @submit.prevent="search" class="search-form">
      <div class="search__box">
        <input class="search__keyword" type="text" v-model="keyword" />
        <button class="search__submit" type="submit">查询</button>
      </div>
    </form>
    <ul class="qa-list">
      <li :key="index" class="qa-list__item" v-for="(item,index) in results">
        <div class="qa-list__item-question">{{item.q}}</div>
        <hr class="hrs" />
        <div class="qa-list__item-answer">{{item.a}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'search',
  data: function() {
    return {
      keyword: '',
      results: []
    }
  },
  created() {
    if (!localStorage.getItem('token')) this.$router.push({ name: 'login' })
  },
  methods: {
    search() {
      let token = localStorage.getItem('token')
      let keyword = this.keyword
      if (keyword !== '')
        this.$axios({
          method: 'post',
          url: '/api/v1/searchQuestion',
          data: {
            keyword: keyword
          },
          headers: { token: token }
        }).then(resp => {
          console.log(resp.data)
          this.results = resp.data.data
        })
    }
  }
}
</script>

<style>
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.search__box {
  border: 1.5px solid #d1d5da;
  border-radius: 3px;
  background: #fff;
  margin-top: 50px;
  margin-bottom: 40px;
  display: flex;
}

.search__keyword {
  outline: none;
  border: none;
  min-width: 500px;
  height: 40px;
  margin: 5px 10px;
  flex: 1;
  align-items: center;
}

.search__submit {
  outline: none;
  border: none;
  background-color: transparent;
  padding-right: 20px;
  font-weight: 600;
  line-height: 1;
}

@media only screen and (max-width: 680px) {
  .search {
    padding: 0 20px;
  }
  .search-form {
    width: 100%;
  }
  .search__box {
    width: 100%;
  }
  .search__keyword {
    min-width: unset;
  }
}

.qa-list {
  display: block;
  list-style: none;
  text-align: start;
  line-height: 1.5;
  max-width: 850px;
}

.qa-list__item {
  padding: 15px;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  margin-bottom: 10px;
}

.qa-list__item-question {
  font-weight: 600;
}
.qa-list__item-answer {
  color: red;
}

.hrs {
  border: none;
  border-top: 0.8px solid #d1d5da;
  margin: 8px 0;
}
</style>