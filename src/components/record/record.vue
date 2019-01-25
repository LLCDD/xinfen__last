<template>
  <div class="record">
    <p class="recordp">
      <span>输入金额</span>
      <input type="text" placeholder="输入所需提现金额" v-model="money">
    </p>
    <div class="sj">
      <span>温馨提示：</span>
      <br>
      <span class="spanr">提现必须为100的倍数提现</span>
      <br>
      <button @click="ok()">确认申请提现</button>
    </div>
    <p class="recordp1">
      <span>申请记录</span>
    </p>
    <table class="table">
      <tr style="height:0.8rem">
        <th class="thc">时间</th>
        <th class="thc">金额</th>
        <th class="thc">状态</th>
      </tr>
      <tr style="height:0.8rem;border:0" v-for="(item,index) in list" :key="index" v-if="tr">
        <td style="color:#999">{{ item.created_at }}</td>
        <td style="color:#000">{{ item.money }}</td>
        <td v-if="item.money_status == 1" style="color:#1e853c">提交成功</td>
        <td v-if="item.money_status == 0" style="color:#999">申请中</td>
      </tr>
    </table>
    <div v-if="center" class="center" style="color:#999">暂无更多数据</div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: "提现记录",
      money: "",
      tr: false,
      list: [],
      center: false
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
    this.$store.commit("header", "提现记录");
    this.$store.commit("fanhui", true);
    // 提现记录
    const _this = this;
    _this.http
      .post("/api/get_money_list")
      .then(res => {
        if (res.code == 200) {
          if (res.data.data.length > 0) {
            _this.list = res.data.data;
          } else {
            this.center = true;
          }
          _this.tr = true;
          Toast.clear();
        } else if (res.code == 400) {
          _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
  },
  methods: {
    ok() {
      console.log("ok");
      if (this.money == "") {
        this.$toasted.error("提现金额不能为空").goAway(1200);
      } else {
        const _this = this;
        _this.http
          .post("/api/get_money", { money: _this.money })
          .then(res => {
            if (res.code == 200) {
              _this.money = "";
              _this.$toasted.success(res.message).goAway(1000);
            } else if (res.code == 400) {
              _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
            }
          })
          .catch(res => {
            _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          });
      }

      this.http.post("/api/get_money_list").then(res => {
        if (res.code == 200) {
          this.list = res.data.data;
        }
      });
    }
  }
};
</script>
<style scoped>
.record {
  min-height: 100%;
  background: #f5f5f5;
  padding-top: 0.88rem;
}
.recordp {
  height: 0.8rem;
  background: #fff;
  font-size: 0.3rem;
  line-height: 0.8rem;
  padding-left: 0.3rem;
}
.recordp > span {
  color: #1e853c;
  display: inline-block;
  width: 1.82rem;
}
.sj {
  height: 2.4rem;
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.sj > span {
  color: #851e1e;
  font-size: 0.24rem;
}
.spanr {
  display: inline-block;
  margin-top: 0.18rem;
  margin-bottom: 0.4rem;
}
button {
  width: 85%;
  height: 0.8rem;
  border-radius: 0.5rem;
  color: #fff;
  background: #1e853c;
  margin-left: 7%;
  font-size: 0.3rem;
}
.recordp1 {
  width: 100%;
  height: 0.8rem;
  background: #fff;
  padding-left: 0.3rem;
  color: #1e853c;
  font-size: 0.3rem;
  line-height: 0.8rem;
}
.recordp1 > span {
  padding-left: 0.2rem;
  height: 0.4rem;
  line-height: 0.4rem;
  border-left: 3px solid #1e853c;
}
.table {
  margin-top: 0.1rem;
  background: #fff;
  width: 100%;
}
.thc {
  color: #1e853c;
  font-size: 0.3rem;
}
table {
  border: 0;
}
th {
  border: 0;
  border-bottom: 2px solid #f5f5f5;
}
td {
  border: 0;
  border-bottom: 2px solid #f5f5f5;
}
.center {
  text-align: center;
  width: 100%;
  margin-top: 0.3rem;
}
</style>
