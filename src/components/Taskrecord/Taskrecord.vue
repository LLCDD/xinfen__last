<template>
  <div class="Taskrecord">
    <div class="tab">
      <p>
        <router-link tag="span" to="audit">审核中</router-link>
      </p>
      <p>
        <router-link tag="span" to="complete">已完成</router-link>
      </p>
      <p>
        <router-link tag="span" to="through">未通过</router-link>
      </p>
    </div>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <router-view style="position: absolute"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "阿是多少呢"
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "任务记录");
    this.$store.commit("fanhui", false);
    this.$store.commit("fanhui1", true);
  }
};
</script>
<style scoped>
.Taskrecord {
  padding-top: 0.88rem;
  min-height: 100%;
  width: 100%;
  background: #f5f5f5;
  /* overflow: hidden; */
}
.tab {
  height: 0.8rem;
  background: #fff;
}
.tab > p {
  width: 33.3%;
  float: left;
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.3rem;
  height: 100%;
}
.tab > p > span {
  display: inline-block;
  height: 100%;
}
.router-link-active {
  color: #1e853c;
  border-bottom: 2px solid #1e853c;
}
</style>

