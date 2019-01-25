<template>
  <div class="div">
    <mt-swipe :auto="4000" style="width:100%;height:3.78rem">
      <mt-swipe-item v-for="(item,index) in list" :key="index">
        <img style="height:100%;width:100%" :src="url +'/'+ item" alt>
      </mt-swipe-item>
    </mt-swipe>
    <div class="task">
      <router-link tag="span" to="/Taskhall">
        <img src="../../assets/img/task3.png" alt>
        <br>
        <span>任务大厅</span>
      </router-link>
      <router-link tag="span" to="/Submitatask">
        <img src="../../assets/img/task2.png" alt>
        <br>
        <span>提交任务</span>
      </router-link>
      <router-link tag="span" to="/Taskrecord">
        <img src="../../assets/img/task1.png" alt>
        <br>
        <span>任务记录</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: "",
      list: JSON.parse(localStorage.getItem("img")),
      url: localStorage.getItem("url")
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", true);
    this.$store.commit("header", "任务中心");
    this.$store.commit("fanhui", false);
    this.$store.commit("fanhui1", false);
    Toast.clear();
  }
};
</script>
<style scoped>
.div {
  padding-top: 0.88rem;
  min-height: 100%;
  background: #f5f5f5;
}
.task {
  width: 100%;
  height: 2.52rem;
  background: #fff;
  margin-top: 0.2rem;
}
.task > span {
  width: 33.3%;
  float: left;
  text-align: center;
}
.task > span > img {
  margin-top: 0.42rem;
  height: 1.2rem;
  width: 1.2rem;
}
.task > span > span {
  margin-top: 0.26rem;
  display: inline-block;
}
</style>
