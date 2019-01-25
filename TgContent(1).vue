<template>
    <div class="footer">
      <div class="choice">
          <div v-for="(item,index) of list" :key="index" @click="metabolic(index)" :class="item.sas ? 'active' : '' ">
            <p class="tit">{{item.title}}个</p>
            <span class="con">{{item.content}}元</span>
          </div>
      </div>
        <div class="entry">
          <span>其他数量</span>
           <input type="text" v-model="realname" class="othermoney"  @blur="final">
           <span class="smallnum">最小充值数量为100个</span>
            <p>人民币 : {{rate}}元</p>
           <div class="pay">
             <span>支付方式 : </span>
            <select v-model="type">
            <option value="1" class="opback">支付宝</option>
            <option value="2">微信</option>
          </select>
           </div>
           <div class="safely">
               <span>支付密码 : </span>
               <input type="password" v-model="address">
           </div>
        </div>
        <div class="foot" @click="accept">
            确认充值
        </div>
        <div id="webpay">

        </div>
    </div>
</template>

<script>
let aliChannel;
let wxChannel;
window.plus && plus.payment.getChannels(function(channels) {
  for(var i = 0; i < channels.length; i++) {
    if (channels[i].id == "wxpay") {
      wxChannel=channels[i];
    }else{
      aliChannel=channels[i];
    }
  }
})
  
export default {
  name: "marketfoot",
  props: {
    list: Array
  },
  data() {
    return {
      realname: "",
      address: "",
      rate1: null,
      type: 1,
      ditic: "",
      rate: null
      // active:''
    };
  },
  created() {
    this.http.get("/api/recharge/plat", {}).then(res => {
      this.rate1 = res.data.rate1;
    });
  },
  watch: {
    realname(curVal) {
      if (/[^\d]/g.test(curVal)) {
        this.realname = this.realname.replace(/[^\d]/g, "");
      }
      if (this.realname != "") {
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].sas = false;
        }
      }
    }
  },
  methods: {
    metabolic(index) {
      this.realname = 0;
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].sas = false;
      }
      this.list[index].sas = true;
      this.ditic = this.list[index].content;
      this.rate = this.list[index].content;
    },
    async accept() {
      console.log(window.location.href)
      if ((!this.realname && !this.ditic) || !this.address || !this.type) {
        this.$toasted.error("请输入完善信息", { icon: "error" }).goAway(2000);
        return;
      }
      if (this.rate < 700) {
        this.$toasted
          .error("充值数量不能小于100", { icon: "error" })
          .goAway(2000);
        return;
      }
      if(this.type==1){
        try {
        // await等待一个异步返回的结果 如果没有await 会报user is undefined 获取不到
        let res = await this.http.post("/api/recharge/add_plat", {
          num: this.rate ? this.rate/7 : this.ditic/7,
          type: this.type,
          security: this.address
        });
        if (res.code == 200) {
            let _this=this
            let payConfig = res.data.pay
            const div = document.getElementById('webpay')
            div.innerHTML = payConfig 
            document.forms.alipaysubmit.submit(); 
        } else {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1500);
        }
      } catch (error) {
        this.$toasted.error(error.message, { icon: "error" }).goAway(2000);
      }
    }else if(this.type==2){
      try {
        // await等待一个异步返回的结果 如果没有await 会报user is undefined 获取不到
        let res = await this.http.post("/api/recharge/add_plat", {
          num: this.rate ? this.rate/7 : this.ditic/7,
          type: this.type,
          security: this.address
        });
        if (res.code == 200) {
          let _this=this
          let payConfig =res.data.pay
            plus.payment.request(
              wxChannel,
              payConfig,
              result=> {
                plus.nativeUI.alert("支付成功！", ()=> {
                  _this.$router.replace({ name: "lotterydraw" })
                });
              },
              function(error) {
                plus.nativeUI.alert("支付未成功");
              }
            );
          
          // this.$toasted.success("充值成功").goAway(1500);
          // this.$router.replace({ name: "personal" });
          
        } else {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1500);
        }
      } catch (error) {
        this.$toasted.error(error.message, { icon: "error" }).goAway(2000);
      }
    }
    },
    //失去焦点判断输入的金额并换算成游戏币
    final() {
      this.rate = this.realname * 7;
    }
  }
};
</script>

<style scoped>
.footer {
  width: 100%;
  padding: 0 4%;
  margin-top: 0.3rem;
  background: #ffffff;
}
.choice {
  width: 100%;
  height: 2.9rem;
  margin-bottom: 0.3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.choice div {
  width: 30.5%;
  height: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #ccc;
  color: #5136d9;
}
.smallnum {
  width: 100%;
}
.choice div .tit {
  font-size: 0.36rem;
  margin-bottom: 0.12rem;
}
.choice div.active {
  color: #ffffff;
  background: url("../../../../../public/image/marketbutton.png") no-repeat;
  background-size: 100% 1.3rem;
}
.choice div .con {
  font-size: 0.24rem;
}
.choice :nth-child(4) {
  margin-top: 0.3rem;
}
.choice :nth-child(5) {
  margin-top: 0.3rem;
}
.choice :nth-child(6) {
  margin-top: 0.3rem;
}
select {
  width: 100%;
}
.entry {
  height: 4.8rem;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
.terrace {
  width: 100%;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
}
.entry input {
  width: 100%;
  height: 0.78rem;
  border: 1px solid #ccc;
  border-radius: 0.1rem;
  padding-left: 0.2rem;
  background: #eeeeee;
}
.entry .othermoney {
  background: #ffffff;
  border: 1px solid transparent;
  border-bottom: 1px solid #ccc;
}
.pay {
  display: flex;
  background: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 0.1rem;
  height: 0.81rem;
  width: 100%;
  padding-left: 0.2rem;
}
.pay select {
  height: 0.77rem;
  background: none;
}
.pay span {
  width: 30%;
  line-height: 0.78rem;
}
.safely {
  display: flex;
  align-items: center;
  height: 0.82rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.1rem;
  background: #eeeeee;
  padding-left: 0.2rem;
}
.safely span {
  width: 20%;
}
.safely input {
  border: none;
  flex: 1;
}
.entry > :nth-child(2) {
  margin-top: 0.12rem;
  margin-bottom: 0.24rem;
  width: 100%;
}
.entry > :nth-child(3) {
  margin-bottom: 0.1rem;
}
.entry > :nth-child(5) {
  margin-bottom: 0.1rem;
}
.entry > :nth-child(4) {
  margin-bottom: 0.24rem;
}
.entry > input::-webkit-input-placeholder {
  text-align: left;
  font-size: 0.24rem;
  color: #ccc;
}
.foot {
  padding: 0 4%;
  border-radius: 0.15rem;
  height: 0.8rem;
  background: url("../../../../../public/image/marketbutton.png") no-repeat;
  background-size: 100% 0.8rem;
  margin: auto;
  margin-top: 0.84rem;
  margin-bottom: 0.35rem;
  text-align: center;
  line-height: 0.8rem;
  color: #ffffff;
}
.opback {
  background: url("../../../../../public/image/youxibi.png") no-repeat left
    center;
  background-size: 0.4rem 0.4rem;
}
</style>