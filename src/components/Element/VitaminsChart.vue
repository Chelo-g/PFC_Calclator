<template>
<div class="chart">
  <VitaminsChart :chart-data="datacollection" :options="options"></VitaminsChart>
</div>
</template>

<script>
import VitaminsChart from "./vue-Chart-Horizon.js";
import { mapGetters } from 'vuex';

export default {
  //↓コンポーネントにもBarChartを宣言しておくことを忘れないように(動作しなくなる)
    components: {
      VitaminsChart
    },
    data() {
      return {
        datacollection: { labels:[], datasets: [] },
        options: null
      }
    },
    mounted() {
      this.fillData();
    },
    computed:{
      ...mapGetters(['getsumParam'])
    },
    methods: {
      fillData() {
        this.datacollection = {
          labels: ["ビタミンA","ビタミンB1","ビタミンB2","ビタミンB6","ビタミンB12", "ビタミンC","ビタミンD","ビタミンE","ビタミンK","ナイアシン","葉酸","パントテン酸","ビオチン",],
          datasets: [
            {
              label:"計算値/推奨値(%)",
              data: [(this.getsumParam("VITA")/900*100).toFixed(1),(this.getsumParam("VITB1")/1.4*100).toFixed(1),(this.getsumParam("VITB2")/1.6*100).toFixed(1),(this.getsumParam("VITB6")/1.4*100).toFixed(1),(this.getsumParam("VITB12")/2.4*100).toFixed(1),(this.getsumParam("VITC")/100*100).toFixed(1),(this.getsumParam("VITD")/5.5*100).toFixed(1),(this.getsumParam("VITE")/6.5*100).toFixed(1),(this.getsumParam("VITK")/150*100).toFixed(1),(this.getsumParam("NIA")/15*100).toFixed(1),(this.getsumParam("FOL")/400*100).toFixed(1),(this.getsumParam("PANTAC")/5*100).toFixed(1),(this.getsumParam("BIOT")/50*100).toFixed(1)],
              backgroundColor:"#DCDFE6"
            }
          ]
        },
        this.options={
        maintainAspectRatio: false,
         scales:{
          xAxes:[
            {
            ticks:{
              callback: function(value) {
                return value + '%';
              },
              beginAtZero: true,
              min: 0,
            }
            }
          ]
         }
        }
      }
    }
}
</script>

<style scope>
.chart{
  width: 300px;
}

</style>