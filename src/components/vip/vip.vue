<template>
  <div class="vip">
    <div class="vip1">
      <img src="../../assets/img/vip.png" alt>
    </div>
    <div class="anniu">
      <div>
        <span class="first">鑫峰会员</span>
        <span class="last">￥588</span>
        <div class="sanjiao">
          <img src="../../assets/img/right.png" alt>
        </div>
      </div>

      <button @click="vip()">成为会员</button>
    </div>
    <div class="footer">
      <p class="p">鑫峰会员：</p>
      <div>
        <p style="font-weight:900">
          付款588元获得鑫峰视觉推广和发圈权限 , 同时注册 "鑫峰易行网" 生活服务类平台获得588元平台代金券和成为
          黄金会员资格 , 永久赠送每年大年初一 "588鑫峰黄金礼包"
        </p>
        <p>1. 静态：每天在朋友圈宣传推广鑫峰易行网收入5元。</p>
        <p>2. 动态：直推介绍会员奖励58元 , 一级推二级 , 一级会员发圈 , 奖励3元/天 , 二级会员发圈 , 奖励1元/天</p>
      </div>
      <p class="p1">为平台招募广告 , 奖励广告收益50%。</p>
    </div>
  </div>
</template>
<script>
let wxChannel;
window.plus &&
  plus.payment.getChannels(function(channels) {
    for (var i = 0; i < channels.length; i++) {
      if (channels[i].id == "wxpay") {
        wxChannel = channels[i];
      }
    }
  });
export default {
  data() {
    return {
      msg: "vip"
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "鑫峰会员");
    this.$store.commit("fanhui", true);
  },
  methods: {
    async vip() {
      try {
        // await等待一个异步返回的结果 如果没有await 会报user is undefined 获取不到
        let res = await this.http.post("/api/wechatPay").then(res => {
          if (res.code == 200) {
            console.log(res);
            let _this = this;
            let payConfig = res.data.pay;
            plus.payment.request(
              wxChannel,
              payConfig,
              result => {
                plus.nativeUI.alert("支付成功！", () => {
                  _this.$router.replace({ name: "index" });
                });
              },
              function(error) {
                plus.nativeUI.alert("支付未成功");
              }
            );
          } else {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1500);
          }
        });
      } catch (error) {
        this.$toasted.error(error.message, { icon: "error" }).goAway(2000);
      }
    }
  }
};
</script>
<style scoped="">
.vip {
  padding-top: 0.88rem;
  min-height: 100%;
  background: #f5f5f5;
}
.vip1 {
  width: 100%;
  height: 5.02rem;
}
.vip1 > img {
  height: 100%;
  width: 100%;
}
.anniu {
  height: 2.7rem;

  margin-top: 0.3rem;
}
.anniu > div {
  height: 0.8rem;
  width: 3.6rem;
  position: relative;
  border: 1px solid #1e853c;
  margin: 0 auto;
}
.anniu > div > .first {
  display: inline-block;
  width: 55.5%;
  line-height: 0.77rem;
  font-size: 0.3rem;
  font-weight: 600;
  background: #cccccc;
  text-align: center;
}
.anniu > div > .last {
  color: #851e1e;
  font-weight: 600;
  width: 44.1%;
  display: inline-block;
  text-align: center;
  background: #fff;
  height: 100%;
  float: right;
  line-height: 0.77rem;
}
.sanjiao {
  position: absolute;
  height: 0;
  width: 0%;
  border-width: 10px;
  border-style: solid;
  border-color: #fff #1e853c #1e853c #fff;
  right: 0;
  bottom: 0;
}
.sanjiao > img {
  width: 0.2rem;
  position: absolute;
}
button {
  width: 84%;
  margin-top: 0.4rem;
  margin-left: 8%;
  background: #1e853c;
  color: #fff;
  height: 0.8rem;
  border-radius: 0.5rem;
  font-size: 0.3rem;
  margin-bottom: 0.4rem;
}
.footer {
  /* height: 3.2rem; */
  padding-top: 0.28rem;
  padding-left: 0.3rem;
  padding-right: 0.34rem;
  background: #fff;
  font-weight: 900;
  font-size: 0.3rem;
}
.footer > .p {
  font-size: 0.3rem;
  color: #1e853c;
  font-weight: 550;
  margin-bottom: 0.1rem;
}
.footer > div > p {
  line-height: 0.4rem;
}
.p1 {
  padding-top: 0.5rem;
  padding-bottom: 0.8rem;
  color: #1e853c;
}
</style>