<template>
  <div class="Taskhall">
    <div class="Taskhalla" v-if="show">
      <div v-for="(item,index) in list" :key="index" @click="detail(item.no,item.meet_status)">
        <p>{{ item.title }}</p>
        <p
          v-if="item.meet_status == '已提交'"
          class="color"
        >{{ item.meet_status == '已提交'?'已提交':'未提交' }}</p>
        <p
          v-if="item.meet_status == '未提交'"
          class="color1"
        >{{ item.meet_status == '未提交' ?'未提交':'已提交' }}</p>
        <img class="img" src="../../assets/img/jinruyou.png" alt>
      </div>
    </div>
    <p class="Taskhallap">
      <span>任务规则</span>
    </p>
    <div class="Taskhallapd">
      <p>1.会员每天可领取2条朋友圈发布任务</p>
      <p>2.发布朋友圈的时长不低于3小时</p>
      <p>3.发布任务是必须与平台内的文案、图片一致</p>
      <p>4.不得屏蔽微信好友查看您的朋友圈</p>
      <p>5.上传的图片必须输朋友圈的全屏截图</p>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: "任务中心",
      list: [
        { name: "任务名称", state: 2, id: 1 },
        { name: "任务名称", state: 1, id: 2 },
        { name: "任务名称", state: 2, id: 3 },
        { name: "任务名称", state: 1, id: 4 }
      ],
      show: false
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
    this.$store.commit("header", "提交任务");
    this.$store.commit("fanhui", true);
    this.http
      .post("/api/my_task_info")
      .then(res => {
        if (res.code == 200) {
          this.show = true;
          console.log(res);
          Toast.clear();
          this.list = res.data.data;
        } else if (res.code == 400) {
          Toast.clear();
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        Toast.clear();
        this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
  },
  methods: {
    detail(id, state) {
      console.log(id, state);
      if (state != "已提交") {
        this.$router.push("/tijao/" + id);
      } else {
        this.$toasted.error("您已经提交了").goAway(1000);
      }
    }
  }
};
</script>
<style scoped="">
.Taskhall {
  padding-top: 0.88rem;
  min-height: 100%;
  background: #f5f5f5;
}
.Taskhalla {
  padding-top: 0.1rem;
}
.Taskhalla > div {
  position: relative;
  width: 92%;
  height: 1.4rem;
  margin-left: 4%;
  background: #fff;
  margin-top: 0.2rem;
  padding-left: 0.3rem;
  padding-top: 0.3rem;
  border-radius: 4px;
}
.Taskhalla > div > p {
  font-size: 0.3rem;
}
.color {
  color: #1e853c;
  margin-top: 0.2rem;
}
.color1 {
  color: #999;
  margin-top: 0.2rem;
}
.img {
  position: absolute;
  z-index: 1;
  height: 0.28rem;
  right: 0.2rem;
  top: 45%;
}
.Taskhallap {
  margin-top: 0.4rem;
  height: 0.8rem;
  line-height: 0.8rem;
  padding-left: 0.3rem;
  background: #fff;
  font-size: 0.3rem;
  color: #1e853c;
}
.Taskhallap > span {
  display: inline-block;
  padding-left: 0.14rem;
  height: 0.4rem;
  border-left: 3px solid #1e853c;
  line-height: 0.4rem;
}
.Taskhallapd {
  padding-left: 0.3rem;
  background: #fff;
}
.Taskhallapd > p {
  font-size: 0.3rem;
  color: #1e853c;
  padding-bottom: 0.26rem;
}
</style>

