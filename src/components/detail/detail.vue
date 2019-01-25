<template>
  <div class="detail">
    <p class="header">
      <span v-if="state == '审核中'" :class="{color:state == '审核中'}">审核中</span>
      <span v-if="state == '已完成'" :class="{color1:state == '已完成'}">已完成</span>
      <span v-if="state == '未通过'" :class="{color2:state == '未通过'}">未通过</span>
    </p>
    <div class="nr">
      <div v-if="state == '审核中'">平台正在审核中请耐心等待</div>
      <div v-if="state == '已完成'">
        <p>已通过平台审核</p>
        <p style="padding-top:0.2rem">请查收佣金</p>
      </div>
      <div v-if="state == '未通过'">
        <p>平台审核中有出现不符合规定</p>
        <p style="padding-top:0.2rem">请再次领取任务</p>
      </div>
    </div>
    <p class="header" style="margin-top:0.26rem">
      <span style="color:#1e853c">任务名称内容</span>
    </p>
    <div class="nr1">
      <div>
        <p>请将以下的文案及图片发布到您的朋友圈(点击图片可保存图片到手机)</p>
        <!-- <p style="padding-top:0.2rem">请再次领取任务</p> -->
      </div>
    </div>
    <div class="copy1" style="margin-top:0.1rem">
      <textarea class="copy" v-model="message1" readonly="readonly"></textarea>
      <button
        type="button"
        v-clipboard:copy="message1"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >复制文案</button>
    </div>
    <div class="photo">
      <p class="tu">图片信息</p>
      <div v-for="(item,index) in list" :key="index">
        <!-- {{item}} -->
        <img :src="url+'/'+item" alt>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: "任务详情",
      state: 2,
      list: [],
      message1: "",
      url: ""
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
    if (this.$route.params.id == "undefined") {
      this.$router.replace({ name: "through" });
      this.$toasted.error("任务已下架").goAway(1000);
    }
    // console.log(this.$route.params.id);
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "任务详情");
    this.$store.commit("fanhui", true);
    this.$store.commit("fanhui1", false);
    console.log(this.$route.params.id);
    this.http
      .post("/api/meetTask_info", { no: this.$route.params.id })
      .then(res => {
        if (res.code == 200) {
          Toast.clear();
          console.log(res);
          this.message1 = res.data.data.content;
          this.state = res.data.data.meet_status;
          this.list = res.data.data.task_image;
          this.url = res.data.url;
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
    onCopy(e) {
      console.log(e);
      this.$toasted.success("复制成功").goAway(1000);
    },
    onError(e) {
      this.$toasted.error("Failed to copy texts").goAway(1000);
    }
  }
};
</script>
<style scoped="">
.detail {
  padding-top: 0.88rem;
  min-height: 100%;
  background: #f5f5f5;
}
.color {
  color: #999;
}
.header {
  width: 100%;
  height: 0.8rem;
  background: #fff;
  line-height: 0.8rem;
  font-size: 0.3rem;
  padding-left: 0.3rem;
}
.header > span {
  display: inline-block;
  height: 0.4rem;
  line-height: 0.4rem;
  padding-left: 0.2rem;
  border-left: 2px solid #1e853c;
}
.color1 {
  color: #1e853c;
}
.color2 {
  color: #851e1e;
}
.nr {
  height: 1.4rem;
  margin-top: 0.1rem;
  background: #fff;
  color: #999;
  padding-left: 0.3rem;
  padding-top: 0.3rem;
}
.copy1 {
  width: 100%;
  height: 4rem;
  background: #fff;
  margin-top: 0.1rem;
  padding: 0.3rem;
  color: #999;
  text-align: center;
}
.copy {
  height: 80%;
  width: 100%;
}
.copy1 > button {
  margin: 0 auto;
  border: 1px solid #1e853c;
  color: #1e853c;
  height: 0.56rem;
  width: 2rem;
  background: #fff;
  border-radius: 5px;
}
.photo {
  width: 100%;
  margin-top: 0.1rem;
  background: #fff;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  padding-bottom: 0.3rem;
}
.tu {
  font-size: 0.3rem;
  color: #1e853c;
  padding-top: 0.3rem;
}

.photo > div {
  /* height: 6.24rem; */
  /* height: 1.2rem; */
  width: 100%;
  margin-top: 0.3rem;
  background: pink;
}
.photo > div > img {
  height: 100%;
  width: 100%;
}
.nr1 {
  height: 1.4rem;
  margin-top: 0.1rem;
  background: #fff;
  color: #999;
  padding-left: 0.3rem;
  padding-top: 0.3rem;
  padding-right: 0.3rem;
  border: 0;
  /* margin-left: 0; */
  width: 100%;
}
.nr1 > div > p {
  line-height: 0.4rem;
}
</style>
