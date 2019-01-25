<template>
  <div class="div">
    <mt-swipe :auto="4000" style="width:100%;height:3.78rem">
      <mt-swipe-item v-for="(item,index) in list" :key="index">
        <img style="height:100%;width:100%" :src="url +'/'+ item" alt>
      </mt-swipe-item>
    </mt-swipe>
    <div class="nr">
      <span class="xie">
        <img src="../../assets/img/header.png" alt>
      </span>
      <div class="nr1">
        <van-swipe
          :show-indicators="false"
          :autoplay="3000"
          :touchable="false"
          :duration="1000"
          vertical
          style="height:100%;"
          class="back"
        >
          <van-swipe-item v-for="(item,index) in list1" :key="index">
            <p class="xf">{{ item.content }}</p>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="event">
      <router-link tag="span" to="/whypropaganda">
        <img src="../../assets/img/01.png" alt>
        <span>如何宣传</span>
      </router-link>
      <router-link tag="span" to="/vip">
        <img src="../../assets/img/2.png" alt>
        <span>鑫峰会员</span>
      </router-link>
      <router-link tag="span" to="/propaganda">
        <img src="../../assets/img/3.png" alt>
        <span>推广二维码</span>
      </router-link>
      <router-link tag="span" to="/outer">
        <img src="../../assets/img/6.png" alt>
        <span>关于我们</span>
      </router-link>
    </div>
    <van-popup v-model="show" class="toast">
      <div class="toaste">公告信息</div>
      <div class="div5" v-html="html"></div>
      <div class="toaste" @click="toasts">我知道了</div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import { Popup } from "vant";
import { Swipe, SwipeItem } from "vant";

export default {
  data() {
    return {
      msg: "首页",
      show: false,
      list: JSON.parse(localStorage.getItem("img")),
      url: localStorage.getItem("url"),
      html: "",
      list1: [
        "今日头条阿看到你逢狼时刻带你飞拉克等你发来看十多年",
        "今日头条1",
        "今日头条3",
        "今日头条4"
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
    this.$store.commit("footerTab", true);
    this.$store.commit("header", "鑫峰视觉");
    this.$store.commit("fanhui", false);
    const _this = this;
    if (localStorage.getItem("token")) {
      const _this = this;
      if (localStorage.getItem("toast") <= 1) {
        _this.show = true;
        _this.http.post("/api/notice_list").then(res => {
          if (res.code == 200) {
            _this.html = res.data.data.content;
          }
        });
        localStorage.setItem("toast", 3);
      } else {
        _this.show = false;
      }
    }
    _this.http
      .post("/api/index_info")
      .then(res => {
        if (res.code == 200) {
          Toast.clear();
          // console.log(res.data.banner);
          _this.list1 = res.data.data;
          _this.list = res.data.banner;
          localStorage.setItem("img", JSON.stringify(res.data.banner));
        } else if (res.code == 400) {
          Toast.clear();
          _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        Toast.clear();
        _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
    // console.log(JSON.parse(localStorage.getItem("img")));
    // console.log(localStorage.getItem("token"));
  },
  methods: {
    toasts() {
      this.show = false;
    }
  }
};
</script>
<style scope="">
.div {
  min-height: 100%;
  background: #f5f5f5;
  padding-top: 0.88rem;
  width: 100%;
}
.nr {
  width: 100%;
  height: 1.2rem;
  background: #fff;
  padding: 0.2rem 0;
  padding-left: 0.3rem;
}
.xie {
  /* font-size: 0.36rem;
  color: #1e853c;
  font-style: italic;
  font-weight: 700; */
  display: inline-block;
  width: 12%;
  /* line-height: 0.4rem; */
  /* margin-right: 0.34rem; */
}
.nr1 {
  /* display: inline-block; */
  height: 100%;
  float: right;
  width: 82%;
  padding-left: 0.3rem;
  margin-left: 0.34rem;
  border-left: 2px solid #1e853c;
  background: #afd9d8;
}
.nr1 > p {
  line-height: 0.36rem;
  font-size: 0.24rem;
}
.event {
  margin-top: 0.2rem;
  width: 100%;
  height: 3.22rem;
  background: #fff;
}
.event > span {
  display: inline-block;
  width: 50%;
  height: 50%;
  border-right: 2px solid #f5f5f5;
  border-bottom: 2px solid #f5f5f5;
  padding-top: 0.32rem;
  padding-left: 0.6rem;
}
.event > span > img {
  height: 1rem;
  width: 1rem;
}
.event > span > span {
  margin-left: 0.22rem;
  font-size: 0.26rem;
}
.xie > img {
  height: 100%;
  width: 100%;
}
.toast {
  background: #e6e6e6;
  height: 84%;
  width: 80%;
  border-radius: 6px;
  overflow: hidden;
}
.toaste {
  height: 8%;
  background: #1e853c;
  font-size: 0.34rem;
  color: #fff;
  text-align: center;
  line-height: 0.88rem;
}
.div5 {
  height: 84%;
  width: 100%;
  overflow-y: auto;
  color: #333333;
}
.back {
  padding-top: 0.06rem;
  overflow: hidden;
}
.xf {
  font-family: "楷体";
  font-weight: 600;
  font-size: 0.34rem;
  line-height: 0.34rem;
}
</style>
