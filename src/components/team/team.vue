<template>
  <div class="team">
    <p>
      <span class="tuandu">一级团队</span>
      <span class="ren">{{ one }}人</span>
    </p>
    <p>
      <span class="tuandu">二级团队</span>
      <span class="ren">{{ two }}人</span>
    </p>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      one: "0",
      two: "0"
    };
  },
  beforeCreate() {
    Toast.loading({
      mask: true,
      message: "加载中...",
      duration: "100000"
    });
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "我的团队");
    this.$store.commit("fanhui", true);
    this.http
      .post("/api/tem_num")
      .then(res => {
        if (res.code == 200) {
          this.one = res.data.tem1;
          this.two = res.data.tem2;
          Toast.clear();
        } else if (res.code == 400) {
          Toast.clear();
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        Toast.clear();
        this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
  }
};
</script>
<style scoped="">
.team {
  min-height: 100%;
  background: #f5f5f5;
  padding-top: 0.88rem;
}
.team > p {
  height: 0.84rem;
  line-height: 0.84rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  background: #fff;
  border-bottom: 2px solid #f5f5f5;
}
.tuandu {
  color: #1e853c;
  font-size: 0.28rem;
}
.ren {
  float: right;
  color: #999999;
}
</style>
