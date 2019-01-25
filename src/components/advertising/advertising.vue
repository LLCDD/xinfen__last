<template>
  <div class="advertising">
    <p class="advertisingp">
      <span>个人资料</span>
    </p>
    <div class="naph">
      <p class="advertisingp1">
        <span>姓名</span>
        <input type="text" placeholder="输入真实姓名" v-model="username">
      </p>
      <p class="advertisingp1">
        <span>手机号</span>
        <input type="text" placeholder="输入手机号" v-model="phone">
      </p>
    </div>
    <p class="advertisingp" style="margin-top:0.2rem">
      <span>联系地址</span>
    </p>
    <div class="imail">
      <span>详细地址</span>
      <textarea style="margin-top:0.1rem" v-model="text" cols="30" rows="3" placeholder="输入详细地址"></textarea>
    </div>
    <p class="advertisingp" style="margin-top:0.2rem">
      <span>营业执照</span>
    </p>
    <div class="load">
      <p>
        上传执照
        <span>(*可不上传)</span>
        <br>
        <div v-for="(item,index) in list" :key="index">
          <div class="item">
              <img class="iy" :src="item" alt="">
          </div>
        </div>
        <van-uploader v-if="up" class="photo" multiple style="position: relative;">
          <input type='file' class="uploadphoto" @change="uploadphoto($event)" ref="inputer" multiple accept="image/*">
        </van-uploader>
      </p>
    </div>
    <button @click="load()">确认</button>
  </div>
</template>
<script>
import { Uploader } from "vant";
import { Toast } from 'vant'
export default {
  data() {
    return {
      text: "",
      username: "",
      phone: "",
      file: "",
      list:[],
      up:true,
      url:localStorage.getItem('url')
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
    this.$store.commit("header", "广告合作商家");
    this.$store.commit("fanhui", true);
    this.http.post('/api/get_info').then(res =>{
      if(res.code == 200){
        console.log(res)
        Toast.clear()
        if(res.data.seller_mac){
          this.username = res.data.seller_name
          this.phone = res.data.seller_phone
          this.text = res.data.seller_mac
          if(res.data.seller_image){
            this.list.push(this.url +'/'+ res.data.seller_image)
            this.up = false
          }else {
            this.up = true
          }
        }
      }else if (res.code == 400){
         Toast.clear()
        this.$toasted.error(res.message,{icon:"error"}).goAway(1000)
      }
    }).catch(res =>{
       Toast.clear()
        this.$toasted.error(res.message,{icon:"error"}).goAway(1000)
    })
  },
  methods: {
    //   最后的上传事件
    load() {
      const _this = this;
      _this.http
        .post("/api/seller_data", {
          name: _this.username,
          phone: _this.phone,
          mac: _this.text,
          license: _this.file
        })
        .then(res => {
          if (res.code == 200) {
            _this.$toasted.success("操作成功").goAway(1000);
            _this.$router.replace({ name: "personal" });
            // _this.$router.replace({ name: "personal" });
          } else if (res.code == 400) {
            _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    },
    // onRead(file) {
    //   this.file = file.content;
    //   console.log(file.content);
    //   this.list.push(file.content)
    // }
  uploadphoto(e){
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
        _this.list.push(imgcode)
        _this.file = imgcode
        _this.up = false
        // console.log(imgcode)
      };
  }
  }
};
</script>
<style scoped="">
.advertising {
  padding-top: 0.88rem;
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
  
}
.advertisingp {
  height: 0.8rem;
  width: 100%;
  background: #fff;
  padding-left: 0.3rem;
  padding-top: 0.2rem;
}
.advertisingp > span {
  height: 0.4rem;
  display: inline-block;
  border-left: 3px solid #1e853c;
  padding-left: 0.2rem;
  font-size: 0.3rem;
  color: #1e853c;
  line-height: 0.4rem;
}
.naph {
  margin-top: 0.1rem;
}
.naph > .advertisingp1 {
  height: 0.8rem;
  width: 100%;
  background: #fff;
  padding-left: 0.3rem;
  padding-top: 0.2rem;
}
.naph > .advertisingp1 > span {
  color: #1e853c;
  font-size: 0.3rem;
  display: inline-block;
  width: 1.82rem;
}
.imail {
  padding-left: 0.3rem;
  margin-top: 0.1rem;
  width: 100%;
  background: #fff;
  padding-top: 0.28rem;
}
.imail > span {
  color: #1e853c;

  float: left;
  width: 1.82rem;
  font-size: 0.3rem;
}
.imail > textarea {
  font-size: 0.3rem;
}
.load {
  width: 100%;
  height: 2.34rem;
  background: #fff;
  margin-top: 0.1rem;
  padding-top: 0.3rem;
  padding-left: 0.3rem;
}
.load > p {
  color: #1e853c;
  font-size: 0.3rem;
}
.load > p > span {
  color: #999999;
}
button {
  width: 92%;
  margin-left: 4%;
  margin-top: 0.4rem;
  color: #fff;
  height: 0.8rem;
  border-radius: 0.5rem;
  background: #1e853c;
  font-size: 0.3rem;
}
.photo {
  height: 1.2rem;
  width: 1.2rem;
  text-align: center;
  float: left;
  margin-top: 0.26rem;
  border-radius: 4px;
  background: url('../../assets/img/add.png') no-repeat bottom;
  background-size: cover;
}
.uploadphoto {
  height: 1.2rem;
  width: 1.2rem;
  position: absolute;
  top: 0;
  left:0;
  opacity: 0;
  z-index: 99
}
.item {
  border-radius: 4px;
  height: 1.2rem;
  width: 1.2rem;
  overflow: hidden;
  float: left;
  margin-top: 0.26rem;
  margin-right: 0.2rem
}
.iy {
  height: 1.2rem;
  width: 1.2rem;
}
.icon {
  color: #999;
  font-size: 0.7rem;
  line-height: 1.2rem;
}
</style>


