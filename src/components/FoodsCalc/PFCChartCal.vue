<template>
  <PFCChartCal :chart-data="datacollection" :options="options"></PFCChartCal>
</template>

<script>
import PFCChartCal from "./vue-Chart.js";

export default {
  //↓コンポーネントにもBarChartを宣言しておくことを忘れないように(動作しなくなる)
    components: {
      PFCChartCal
    },
    data() {
      return {
        datacollection: null,
        options: null
      }
    },
    mounted() {
      this.fillData();
    },
    methods: {
      fillData() {
        this.datacollection = {
          labels: ["Protein", "Fat", "Carbonate"],
          datasets: [
            {
              label:"目標値",
              data: [this.$store.getters.ProteinCalorie, this.$store.getters.FatCalorie, this.$store.getters.CarbonateCalorie],
              backgroundColor:"rgb(110, 110, 110)",
              borderColor: "black",
              borderWidth: 1
            },
            {
              label:"計算値",
              data: [this.$store.getters.getsumParam("Protein")*4,this.$store.getters.getsumParam("Fat")*9,this.$store.getters.getsumParam("Carbo")*4],
              backgroundColor:"rgb(255, 255, 255)",
              borderColor: "black",
              borderWidth: 1
            }
          ]
        },
        this.options={
         scales:{
          yAxes:[
            {
            ticks:{
              callback: function(value) {
                return value + 'kcal';
              },
              beginAtZero: true,
              min: 0,
            }
            }
          ]
         }
        };
      }
    }
}
</script>