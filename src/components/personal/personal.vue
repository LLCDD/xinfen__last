<template>
  <div class="personal">
    <div class="header">
      <div>
        <img :src="src" alt>
        <!-- <van-uploader class="price" :after-read="onRead">
          <van-icon name="photograph"/>
        </van-uploader>-->
        <input
          type="file"
          class="uploadphoto"
          @change="uploadphoto($event)"
          ref="inputer"
          multiple
          accept="image/*"
        >
      </div>
      <p>{{ nickname }}</p>
    </div>
    <div class="dynamic">
      <div class="first" @click="statics()">
        <img src="../../assets/img/icon2.png" alt>
        <div>动态收益
          <br>
          <span>{{ static }}</span>
        </div>
      </div>
      <div class="two" @click="dynamics()">
        <img src="../../assets/img/icon1.png" alt>
        <div>静态收益
          <br>
          <span>{{ dynamic }}</span>
        </div>
      </div>
    </div>
    <div class="data">
      <div class="dw">
        <router-link tag="p" to="/data">个人资料</router-link>
        <img class="dw1" src="../../assets/img/gr.png" alt>
        <img class="dw2" src="../../assets/img/jinruyou.png" alt>
      </div>
      <div class="dw">
        <router-link tag="p" to="/team">我的团队</router-link>
        <img class="dw1" src="../../assets/img/td.png" alt>
        <img class="dw2" src="../../assets/img/jinruyou.png" alt>
      </div>
    </div>
    <div class="data1">
      <div class="dw">
        <router-link tag="p" to="/card">绑定银行卡</router-link>
        <img class="dw1" src="../../assets/img/bank.png" alt>
        <img class="dw2" src="../../assets/img/jinruyou.png" alt>
      </div>
      <div class="dw">
        <router-link tag="p" to="/advertising">广告合作商家</router-link>
        <img class="dw1" src="../../assets/img/gg.png" alt>
        <img class="dw2" src="../../assets/img/jinruyou.png" alt>
      </div>
      <div class="dw">
        <router-link tag="p" to="/record">提现记录</router-link>
        <img class="dw1" src="../../assets/img/tx.png" alt>
        <img class="dw2" src="../../assets/img/jinruyou.png" alt>
      </div>
    </div>
    <div class="data2">
      <div class="dw">
        <router-link tag="p" to="/service">客服中心</router-link>
        <img class="dw1" src="../../assets/img/kf.png" alt>
        <img class="dw2" src="../../assets/img/jinruyou.png" alt>
      </div>
      <div class="dw">
        <router-link tag="p" to="/problem">问题反馈</router-link>
        <img class="dw1" src="../../assets/img/wt.png" alt>
        <img class="dw2" src="../../assets/img/jinruyou.png" alt>
      </div>
      <div class="dw">
        <router-link tag="p" to="/Set">设置</router-link>
        <img class="dw1" src="../../assets/img/sz.png" alt>
        <img class="dw2" src="../../assets/img/jinruyou.png" alt>
      </div>
    </div>

    <button @click="exit()">安全退出</button>
  </div>
</template>
<script>
import { Uploader } from "vant";
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: "个人中心",
      nickname: "",
      dynamic: "0.00",
      static: "0.00",
      src: "http://192.168.0.111/uploads/timg.gif",
      url: localStorage.getItem("url")
    };
  },
  beforeCreate() {
    Toast.loading({
      mask: true,
      message: "加载中..."
    });
  },
  mounted() {
    if (localStorage.getItem("avatar")) {
      this.src = localStorage.getItem("avatar");
    }
    this.$store.commit("headerTab", false);
    this.$store.commit("footerTab", true);
    this.$store.commit("fanhui", false);

    this.http
      .post("/api/get_info")
      .then(res => {
        if (res.code == 200) {
          Toast.clear();
          if (res.data.move_money) {
            this.static = res.data.move_money;
          }
          if (res.data.quiet_money) {
            this.dynamic = res.data.quiet_money;
          }
          if (res.data.name) {
            this.nickname = res.data.name;
          }
          if (res.data.title_image) {
            this.src = this.url + "/" + res.data.title_image;
            localStorage.setItem(
              "avatar",
              this.url + "/" + res.data.title_image
            );
          } else {
            this.src = res.data.default_image;
          }
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
    exit() {
      localStorage.clear();
      this.$router.push("/");
      this.$toasted.success("退出成功").goAway(1500);
    },
    // 静态
    dynamics() {
      this.$router.push("/dynamic");
    },
    // 动态
    statics() {
      this.$router.push("/static");
    },
    // 头像
    // onRead(file) {
    //   // console.log(file.content);
    //   this.http
    //     .post("/api/upload", { image: file.content })
    //     .then(res => {
    //       if (res.code == 200) {
    //         console.log(res.data);
    //         this.$toasted.success("修改成功").goAway(1000);
    //         this.src = res.data.file_path;
    //         localStorage.setItem("avatar", res.data.file_path);
    //       } else if (res.code == 400) {
    //         this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
    //       }
    //     })
    //     .catch(res => {
    //       this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
    //     });
    // }
    uploadphoto(e) {
      var file = e.target.files[0];
      var filesize = file.size;
      var filename = file.name;
      // 2,621,440   2M
      var reader = new FileReader();
      reader.readAsDataURL(file);
      const _this = this;
      reader.onload = function(e) {
        // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
        var imgcode = e.target.result;
        // console.log(imgcode);
        _this.http
          .post("/api/upload", { image: imgcode })
          .then(res => {
            if (res.code == 200) {
              _this.$toasted.success("修改成功").goAway(1000);
              _this.src = res.data.file_path;
              localStorage.setItem("avatar", res.data.file_path);
              // _this.$store.commit("avatar", res.data.file_path);
            } else if (res.code == 400) {
              _this.$toasted
                .error(res.data.message, { icon: "error" })
                .goAway(2000);
            }
          })
          .catch(res => {
            _this.$toasted.error(res.message, { icon: "error" }).goAway(2000);
          });
      };
    }
  }
};
</script>
<style scoped="">
.personal {
  min-height: 100%;
  background: #f5f5f5;
}
.header {
  height: 3.04rem;
  width: 100%;
  background: #1e853c;
  text-align: center;
  padding-top: 0.44rem;
}
.header > div {
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  background: #f5f5f5;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  border: 0.1rem solid #62aa77;
  z-index: 99999;
}
.header > div > img {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}
.header > p {
  color: #fff;
  margin-top: 0.18rem;
}
.dynamic {
  height: 2.2rem;
  background: #fff;
}
.dynamic > div {
  height: 1.64rem;
  width: 45.6%;
  border-radius: 0.15rem;
  float: left;
  margin-top: 0.28rem;
  /* background: pink; */
}
.first {
  background: url("../../assets/img/icon2b.png") no-repeat;
  background-size: cover;
  margin-left: 4%;
}
.two {
  background: url("../../assets/img/icon1b.png") no-repeat top;
  background-size: cover;
  margin-left: 4px;
}
.dynamic > div > img {
  display: block;
  border: 0;
  height: 1.24rem;
  width: 1.24rem;
  margin-left: 0.2rem;
  float: left;
  margin-top: 0.14rem;
}
.first > div {
  padding-top: 0.35rem;
  margin-left: 0.1rem;
  float: left;
  font-size: 0.36rem;
  color: #fff;
}
.two > div {
  padding-top: 0.35rem;
  margin-left: 0.1rem;
  float: left;
  font-size: 0.36rem;
  color: #fff;
}
.two > div > span {
  display: inline-block;
  margin-top: 0.24rem;
}
.first > div > span {
  display: inline-block;
  margin-top: 0.24rem;
}
.data {
  margin-top: 0.2rem;
  background: #fff;
}
.data > div {
  height: 0.82rem;
  font-size: 0.3rem;
  line-height: 0.82rem;
  padding-left: 0.9rem;
  border-bottom: 2px solid #f5f5f5;
}
.data > p {
  height: 0.82rem;
  font-size: 0.3rem;
  line-height: 0.82rem;
  padding-left: 0.9rem;
  border-bottom: 2px solid #f5f5f5;
}

.data1 {
  margin-top: 0.2rem;
  background: #fff;
}
.data1 > div {
  height: 0.82rem;
  font-size: 0.3rem;
  line-height: 0.82rem;
  padding-left: 0.9rem;
  border-bottom: 2px solid #f5f5f5;
}
.data1 > p {
  height: 0.82rem;
  font-size: 0.3rem;
  line-height: 0.82rem;
  padding-left: 0.9rem;
  border-bottom: 2px solid #f5f5f5;
}
.data2 {
  margin-top: 0.2rem;
  background: #fff;
}
.data2 > div {
  height: 0.82rem;
  font-size: 0.3rem;
  line-height: 0.82rem;
  padding-left: 0.9rem;
  border-bottom: 2px solid #f5f5f5;
}
.data2 > p {
  height: 0.82rem;
  font-size: 0.3rem;
  line-height: 0.82rem;
  padding-left: 0.9rem;
  border-bottom: 2px solid #f5f5f5;
}
button {
  margin-top: 0.4rem;
  margin-bottom: 1.4rem;
  height: 0.8rem;
  width: 92%;
  margin-left: 4%;
  background: #1e853c;
  font-size: 0.3rem;
  color: #fff;
  border-radius: 6px;
}
.dw {
  position: relative;
}
.dw1 {
  position: absolute;
  left: 0.34rem;
  top: 0.28rem;
  height: 0.28rem;
}
.dw2 {
  height: 0.38rem;
  position: absolute;
  right: 0.08rem;
  top: 0.14rem;
}
.uploadphoto {
  background: red;
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 99;
  opacity: 0;
}
@media screen and (max-width: 320px) {
  .first > div {
    font-size: 0.12rem;
  }
  .two > div {
    font-size: 0.12rem;
  }
}
</style>
