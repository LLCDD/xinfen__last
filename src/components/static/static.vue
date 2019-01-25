<template>
  <div class="static">
    <table class="table">
      <tr style="height:0.8rem">
        <th class="thc">时间</th>
        <th class="thc">金额</th>
        <th class="thc">操作</th>
      </tr>
      <tr style="height:0.8rem;border:0" v-for="(item,index) in list" :key="index">
        <td style="color:#999">{{ item.created_at }}</td>
        <td style="color:#000">{{ item.meet_money }}</td>
        <td style="color:#000">{{ item.meet_lead }}</td>
      </tr>
    </table>
    <div v-if="center" class="center" style="width:100%;">暂无跟多数据</div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      list: [],
      center: false
    };
  },
  beforeCreate() {
    Toast.loading({
      mask: true,
      message: "加载中..."
    });
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "动态收益记录");
    this.$store.commit("fanhui", true);
    this.http
      .post("/api/profit", { type: 1 })
      .then(res => {
        if (res.code == 200) {
          console.log(res);
          console.log(res.data.data.length);
          if (res.data.data.length > 0) {
            this.list = res.data.data;
          } else {
            this.center = true;
          }

          Toast.clear();
        } else if (res.code == 400) {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
  }
};
</script>
<style scoped>
.static {
  padding-top: 0.88rem;
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
  color: #999;
  margin-top: 0.6rem;
}
</style>
