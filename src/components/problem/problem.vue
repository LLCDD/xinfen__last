<template>
  <div class="problem">
    <p class="problemp">
      <span>反馈问题</span>
      <input type="text" placeholder="输入反馈的问题" v-model="tit">
    </p>
    <div class="problemd">
      <span>反馈详情</span>
      <textarea v-model="text" rows="10" placeholder="输入反馈详细内容(500字以内)"></textarea>
    </div>
    <button @click="tijao()">确认提交</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tit: "",
      text: ""
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "问题反馈");
    this.$store.commit("fanhui", true);
  },
  methods: {
    tijao() {
      if (this.tit == "" && this.text == "") {
        this.$toasted.error("反馈内容不能为空").goAway(1200);
      } else {
        this.http
          .post("/api/feedback", {
            title: this.tit,
            content: this.text
          })
          .then(res => {
            if (res.code == 200) {
              this.$toasted.success("提交成功").goAway(1000);
              this.tit = this.text = "";
              this.$router.replace({ name: "personal" });
            } else if (res.code == 400) {
              this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
            }
          })
          .catch(res => {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          });
      }
    }
  }
};
</script>
<style scoped="">
.problem {
  min-height: 100%;
  background: #f5f5f5;
  padding-top: 0.88rem;
}
.problemp {
  height: 0.8rem;
  background: #fff;
  font-size: 0.3rem;
  line-height: 0.8rem;
  padding-left: 0.3rem;
}
.problemp > span {
  color: #1e853c;
  display: inline-block;
  width: 1.82rem;
}
.problemd {
  width: 100%;
  height: 4.8rem;
  margin-top: 0.1rem;
  background: #fff;
  padding-top: 0.3rem;
  padding-left: 0.3rem;
}
.problemd > span {
  display: block;
  font-size: 0.3rem;
  color: #1e853c;
  margin-bottom: 0.2rem;
}
.problemd > textarea {
  font-size: 0.3rem;
  width: 90%;
}
button {
  margin-top: 0.4rem;
  width: 85%;
  height: 0.8rem;
  background: #1e853c;
  border-radius: 0.5rem;
  margin-left: 7%;
  color: #fff;
}
</style>
