<template>
  <div class="detail">
    <p class="header">
      <span class="color1">{{ title }}</span>
    </p>
    <div class="nr">
      <div>
        <p>请将以下的文案及图片发布到您的朋友圈(点击图片可保存图片到手机)</p>
        <!-- <p style="padding-top:0.2rem">请再次领取任务</p> -->
      </div>
    </div>
    <div class="copy1">
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
        <img :src="url+'/'+item" alt @click="save_img(url+'/'+item)">
      </div>
    </div>
    <div class="bty">
      <button @click="httpy()">立即领取</button>
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
      message1: "",
      list: [1, 2, 3, 4],
      // 任务标题
      title: "",
      // 标题内容
      content: "",
      // 路径的前缀
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
  methods: {
    onCopy(e) {
      console.log(e);
      this.$toasted.success("复制成功").goAway(1000);
    },
    onError(e) {
      this.$toasted.error("Failed to copy texts").goAway(1000);
    },
    // 领取任务
    httpy() {
      const _this = this;
      console.log(this.$route.params.id);
      this.http
        .post("/api/get_task", { no: _this.$route.params.id })
        .then(res => {
          if (res.code == 200) {
            console.log(res);
            this.$toasted.success(res.message).goAway(1000);
            _this.$router.replace({ name: "Taskhall" });
          } else if (res.code == 400) {
            _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    },
    save_img(url) {
      console.log(url);
      //保存图片
      var $$this = this;
      //alert($$this.src);
      plus.nativeUI.showWaiting("正在下载，请稍后");
      // var url = $$this.imgSrc;
      var options = {
        method: "GET",
        filename: "_doc/"
      };
      var dtask = plus.downloader.createDownload(url, options, function(
        download,
        status
      ) {
        console.log(download.filename);
        plus.nativeUI.closeWaiting();
        plus.gallery.save(download.filename, function() {
          $$this.$toasted.success("保存成功").goAway(1500);
        });
      });
      dtask.start();
    }
  },
  mounted() {
    // console.log(this.$route.params.id);
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "任务详情");
    this.$store.commit("fanhui", true);
    const _this = this;
    console.log(this.$route.params.id);
    this.http
      .post("/api/task_info", { no: _this.$route.params.id })
      .then(res => {
        if (res.code == 200) {
          console.log(res.data.url);
          Toast.clear();
          _this.title = res.data.data.title;
          _this.list = res.data.data.task_image;
          _this.message1 = res.data.data.content;
          _this.url = res.data.url;
        } else if (res.code == 400) {
          _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
  }
};
</script>
<style scoped>
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
  padding-right: 0.3rem;
}
.nr > div > p {
  line-height: 0.4rem;
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
  height: 4.24rem;
  width: 100%;
  margin-top: 0.3rem;
  background: pink;
}
.bty {
  width: 100%;
  height: 1.6rem;
  background: #f5f5f5;
  text-align: center;
  color: #fff;
}
.bty > button {
  height: 0.8rem;
  width: 6.34rem;
  margin-top: 0.4rem;
  background: #1e853c;
  border-radius: 0.4rem;
}
.photo > div > img {
  display: block;
  height: 100%;
  width: 100%;
}
</style>
