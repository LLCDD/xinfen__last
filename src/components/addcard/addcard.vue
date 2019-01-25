<template>
  <div class="addcard">
    <div>
      <span>银行名称</span>
      <input type="text" placeholder="输入银行名称" v-model="name">
    </div>
    <div>
      <span>银行卡号</span>
      <input type="text" placeholder="输入银行卡号" v-model="card">
    </div>
    <div>
      <span>持卡人姓名</span>
      <input type="text" placeholder="输入持卡人姓名" v-model="username">
    </div>
    <button @click="add()">确认添加</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      name: "",
      card: ""
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "添加银行卡");
    this.$store.commit("fanhui", true);
  },
  methods: {
    add() {
      // this.$router.push("/card");
      const _this = this;
      _this.http
        .post("/api/bind_card", {
          bank_name: _this.name,
          bank_code: _this.card,
          user_name: _this.username
        })
        .then(res => {
          if (res.code == 200) {
            _this.$router.replace({ name: "card" });
            _this.$toasted.success("添加成功").goAway(1000);
          } else if (res.code == 400) {
            _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    }
  }
};
</script>
<style scoped>
.addcard {
  padding-top: 0.88rem;
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
}
.addcard > div {
  width: 100%;
  background: #fff;
  height: 0.82rem;
  border-bottom: 2px solid #f5f5f5;
  line-height: 0.8rem;
  padding-left: 0.3rem;
}
.addcard > div > span {
  font-size: 0.3rem;
  color: #1e853c;
  display: inline-block;
  width: 1.8rem;
}
.addcard > div > input {
  font-size: 0.3rem;
  height: 90%;
}
button {
  width: 86%;
  height: 0.8rem;
  background: #1e853c;
  border-radius: 0.5rem;
  margin-left: 7%;
  margin-top: 0.52rem;
  color: #fff;
}
</style>
