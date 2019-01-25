<template>
  <div class="outer">
    <div class="warp">
      <p class="warp_p">鑫峰视觉</p>
      <div class="warp_div">鑫峰视觉是专为鑫峰易行网宣传和推广的APP子平台，旨在让更多的人了解、熟悉鑫峰易行网功能和业务板块。</div>
      <div
        class="warp_div1"
      >鑫峰易行网是共享服务领域的互联网平台，为用户提供在线预约、到店餐饮、零售实体、CBD商务多功能厅、VIP商务机场贵宾厅、以及后续油品优惠、外卖餐饮、酒店住宿、商务出行、票务服务，以新型多样化商业机制为蓝图，为仍未成熟共享服务业市场探索新型商业机制，以打造闭环式APP商业模式为己任来满足不同人群需求，力图构建有活力的异业联盟。</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "关于我们"
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "关于我们");
    this.$store.commit("fanhui", true);
  }
};
</script>
<style scoped="">
.outer {
  padding-top: 0.88rem;
  background: #f5f5f5;
  min-height: 100%;
}
.warp {
  padding-left: 0.3rem;
  padding-right: 0.4rem;
}
.warp_p {
  font-size: 0.36rem;
  color: #1e853c;
  font-weight: 600;
  padding-top: 0.58rem;
  padding-bottom: 0.64rem;
}
.warp_div {
  line-height: 0.5rem;
  font-weight: 600;
  font-size: 0.3rem;
}
.warp_div1 {
  line-height: 0.5rem;
  font-weight: 600;
  font-size: 0.3rem;
  margin-top: 0.6rem;
}
</style>

