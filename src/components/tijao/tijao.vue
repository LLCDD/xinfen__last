<template>
  <div class="tijao">
    <p class="personal">
      <span>提交任务</span>
    </p>
    <div class="photo">
      <p>上传图片</p>
      <div class="photo1">
        <div v-for="(item,index) in list" :key="index">
          <div class="warp">
            <img class="img4" :src="item" alt>
          </div>
        </div>
      </div>
      <van-uploader class="photo2" :after-read="onRead" accept="image/gif, image/jpeg" multiple></van-uploader>
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
    <button @click="tijao()">确定提交</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "提交任务详情",
      list: [],
      count: 0
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "提交任务详情");
    this.$store.commit("fanhui", true);
    // console.log(this.$route.params.id);
  },
  methods: {
    onRead(file) {
      console.log(file);
      var _this = this;

      lrz(file.content)
        .then(function(rst) {
          console.log(rst);
          _this.list.push(rst.base64);
        })
        .catch(function(error) {
          //失败时执行
        })
        .always(function() {
          //不管成功或失败，都会执行
        });
    },
    tijao() {
      if (this.count == 0) {
        this.count++;
        this.http
          .post("/api/push_task", {
            no: this.$route.params.id,
            data: this.list
          })
          .then(res => {
            if (res.code == 200) {
              // console.log(res);
              this.$toasted.success("提交成功").goAway(1000);
              this.$router.replace({ name: "Submitatask" });
            } else if (res.code == 400) {
              this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
            }
          })
          .catch(res => {
            this.$toasted.error("网络超时", { icon: "error" }).goAway(1000);
          });
      } else {
        this.$toasted.error("正在提交中...").goAway(1000);
        const _this = this;
        setTimeout(function() {
          _this.count = 0;
        }, 3000);
      }
    }
  }
};
</script>
<style scoped>
.tijao {
  min-height: 100%;
  padding-top: 0.88rem;
  background: #f5f5f5;
}
.personal {
  height: 0.8rem;
  padding-left: 0.3rem;
  line-height: 0.8rem;
  font-size: 0.3rem;
  color: #1e853c;
  background: #fff;
}
.personal > span {
  border-left: 2px solid #1e853c;
  padding-left: 0.2rem;
}
.photo {
  margin-top: 0.1rem;
  min-height: 2.3rem;
  background: #fff;
  padding-left: 0.3rem;
  padding-top: 0.24rem;
  overflow: hidden;
}
.photo > p {
  color: #1e853c;
  font-size: 0.3rem;
  margin-bottom: 0.26rem;
}
.photo1 > div {
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 5px;
  border: 1px solid #999;
  overflow: hidden;
  float: left;
  margin-top: 0.1rem;
}
.photo1 > div {
  margin-left: 0.2rem;
}
.photo2 {
  height: 1.2rem;
  width: 1.2rem;
  text-align: center;
  /* border: 1px solid #999; */
  float: left;
  /* margin-top: 0.26rem; */
  border-radius: 4px;
  margin-left: 0.3rem;
  margin-top: 0.1rem;
  background: url("../../assets/img/add.png") no-repeat bottom;
  background-size: cover;
}
.icon {
  color: #999;
  font-size: 0.7rem;
  line-height: 1.2rem;
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
  margin-bottom: 0.2rem;
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
button {
  height: 0.8rem;
  width: 84%;
  margin-left: 8%;
  margin-top: 0.4rem;
  background: #1e853c;
  color: #fff;
  font-size: 0.3rem;
  border-radius: 0.5rem;
}
.warp {
  height: 100%;
  width: 100%;
}
.img4 {
  height: 100%;
  width: 100%;
  display: block;
}
</style>
