<template>
  <div class="Set">
    <router-link tag="p" to="/changpassword">
      <span>修改密码</span>
      <img class="img" src="../../assets/img/jinruyou.png" alt>
    </router-link>
    <p>
      <span>版本信息</span>
      <span style="float:right;color:#999">1.1.1</span>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "设置"
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "设置");
    this.$store.commit("fanhui", true);
  }
};
</script>
<style scoped="">
.Set {
  height: 100%;
  background: #f5f5f5;
  padding-top: 0.88rem;
}
.Set > p {
  height: 0.8rem;
  padding-left: 0.3rem;
  line-height: 0.8rem;
  color: #1e853c;
  border-bottom: 2px solid #f5f5f5;
  background: #fff;
  position: relative;
  padding-right: 0.3rem;
}
.img {
  height: 0.3rem;
  position: absolute;
  right: 0.3rem;
  top: 0.24rem;
}
</style>
