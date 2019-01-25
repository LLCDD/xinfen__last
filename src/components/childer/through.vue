<template>
  <div class="Taskhall">
    <div class="Taskhalla" v-if="show">
      <div v-for="(item,index) in list" :key="index" @click="detail(item.id)">
        <p>{{ item.title }}</p>
        <!-- <p v-if="item.state == 1" class="color">{{ item.state == 1 ?'已提交':'未提交' }}</p> -->
        <p
          v-if="item.meet_status == '未通过'"
          class="color1"
        >{{ item.meet_status == '未通过' ?'未通过':'已提交' }}</p>
        <p class="delate" @click.stop="delate(item.no)">删除</p>
        <img class="img" src="../../assets/img/jinruyou.png" alt>
      </div>
    </div>
    <p class="Taskhallap">
      <span>任务规则</span>
    </p>
    <div class="Taskhallapd">
      <p style="padding-top:0.2rem">1.会员每天可领取2条朋友圈发布任务</p>
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
      show: false,
      list: [
        { name: "任务名称", state: 0, id: 1 },
        { name: "任务名称", state: 0, id: 2 },
        { name: "任务名称", state: 0, id: 3 },
        { name: "任务名称", state: 0, id: 4 }
      ]
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
    this.$store.commit("header", "任务记录");
    // this.$store.commit("fanhui", false);
    this.http
      .post("/api/my_task", { type: 2 })
      .then(res => {
        if (res.code == 200) {
          Toast.clear();
          console.log(res);
          this.show = true;
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
    detail() {},
    // 删除
    delate(id) {
      // console.log(id);
      this.http.post("/api/del_task", { no: id }).then(res => {
        if (res.code == 200) {
          console.log(res);
          this.http
            .post("/api/my_task", { type: "2" })
            .then(res => {
              if (res.code == 200) {
                console.log(res.data);
                this.list = res.data.data;
              } else if (res.code == 400) {
                this.$toasted
                  .error(res.message, { icon: "error" })
                  .goAway(1000);
              }
            })
            .catch(res => {
              this.list = [];
            });
          this.$toasted.success(res.message).goAway(1000);
        }
      });
    }
  }
};
</script>
<style scoped="">
.Taskhall {
  /* padding-top: 0.88rem; */
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
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
  color: #851e1e;
  margin-top: 0.2rem;
}
.img {
  position: absolute;
  z-index: 1;
  height: 0.28rem;
  right: 0.2rem;
  top: 34%;
}
.Taskhallap {
  margin-top: 0.4rem;
  height: 0.8rem;
  line-height: 0.8rem;
  padding-left: 0.3rem;
  background: #fff;
  font-size: 0.3rem;
  color: #1e853c;
  margin-bottom: 0.1rem;
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
.delate {
  border: 1px solid #999;
  width: 1rem;
  text-align: center;
  color: #999;
  border-radius: 4px;
  float: right;
  position: relative;
  bottom: 0.2rem;
}
</style>

