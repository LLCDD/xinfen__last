<template>
  <div class="whypropaganda">
    <div class="whypropaganda1">
      <p>1.扫码下载 "鑫峰视觉APP"</p>
      <p class="p">2.支付588元成为 "鑫峰会员"</p>
      <p class="p">3.任务中心领取任务发朋友圈三小时以上,每天早晚各一次( 备注：建议会员在上班前和下班后或晚上睡觉前)</p>
      <p class="p">4.提交任务按照任务模板截图上传</p>
      <p class="p">5.赚取5元/天宣传费 , 同时额外赚取鑫峰易行网下级会员消费佣金 , 一次注册双重实惠</p>
    </div>
    <div class="whypropaganda2">
      <div class="whypropaganda3">
        <p>1.自己发朋友圈2条赚取5元/天</p>
        <p>2.分享一级发朋友圈赚取3元/天</p>
        <p>3.分享二级发朋友圈赚取1元/天</p>
        <p>4.推荐广告投放50%广告宣传费</p>
        <p>5.介绍好友成为会员赚取58元</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "如何宣传"
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "如何宣传");
    this.$store.commit("fanhui", true);
  }
};
</script>
<style scoped>
.whypropaganda {
  min-height: 100%;
  background: #f5f5f5;
  padding-top: 0.88rem;
}
.whypropaganda1 {
  padding-top: 0.3rem;
  /* height: 45%; */
  width: 100%;
  background: #fff;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  color: #1e853c;
  font-size: 0.3rem;
  padding-bottom: 0.3rem;
}
.p {
  padding-top: 0.7rem;
}
.whypropaganda2 {
  margin-top: 0.2rem;
  background: #fff;
  /* height: 56%; */
  height: 8.1rem;
  width: 100%;
  background: url("../../assets/img/by.png") no-repeat top;
  background-size: cover;
  position: relative;
}
.whypropaganda3 {
  padding-left: 10%;
  width: 92%;
  height: 5.4rem;
  background: #fff8e6;
  border-radius: 0.3rem;
  position: absolute;
  bottom: 0.4rem;
  left: 4%;
}
.whypropaganda3 > p {
  font-size: 0.34rem;
  padding-top: 0.6rem;
  color: #fd6b3d;
}
</style>
