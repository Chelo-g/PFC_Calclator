<template>
  <div class="container">
    <div class="targetCalcContainer">
      <TargetCalc @chartUpdata="chartUpdata"/>
    </div>
    <div class="foodCalcContainer">
      <FoodCalc @chartUpdata="chartUpdata"/>
    <div class="compFoodSearch">
      <FoodSearch @chartUpdata="chartUpdata"/>
    </div>
    </div>
      <div class="chartPFCContainer chart">
          <PFCChartCal ref="ChartCal" />
          <PFCChartWeight ref="ChartWeight" />
      </div>
      <div class="chartVNContainer">
          <NutrientsChart ref="ChartNutrients" />
          <VitaminsChart ref="ChartVitamins" />
      </div>
        <div class="chartVNContainer chart">
      </div>
      <div class="footerContainer">
        食品データソース：<a href="https://www.mext.go.jp/a_menu/syokuhinseibun/1365297.htm">日本食品標準成分表2015年版（七訂）</a>



      </div>
  </div>
</template>

<script>
//sonouti
//オリジナルのPFC追加
//ビタミン剤当追加
import TargetCalc from '@/components/TargetCalorieCalc/TargetCalorieCalc.vue'

import FoodCalc from '@/components/FoodsCalc/FoodsCalc'
import FoodSearch from '@/components/FoodShearch/FoodShearch'
import PFCChartCal from '@/components/FoodsCalc/PFCChartCal.vue'
import PFCChartWeight from '@/components/FoodsCalc/PFCChartWeight.vue'
import NutrientsChart from '@/components/FoodsCalc/NutrientsChart.vue'
import VitaminsChart from '@/components/FoodsCalc/VitaminsChart.vue'

export default {
  components: {
    TargetCalc,
    FoodSearch,
    FoodCalc,
    PFCChartCal,
    PFCChartWeight,
    NutrientsChart,
    VitaminsChart
  },
  methods: {
    chartUpdata:function(){
        this.$refs.ChartCal.fillData();
        this.$refs.ChartWeight.fillData();
        this.$refs.ChartNutrients.fillData();
        this.$refs.ChartVitamins.fillData();
    },
  },
}
</script>

<style>
/*
参考
https://ics.media/entry/15649/
*/
.container{
  display: grid;
  grid-template-columns: 50px 10fr 1fr 1fr 1fr 50px;
  grid-template-rows: 1fr 45px;
}


.foodCalcContainer{
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}

.chartPFCContainer{
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
}
.chartVNContainer{
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 2;
}
.targetCalcContainer{
  grid-column-start: 5;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 2;
}
.footerContainer{
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 2;
  grid-row-end: 3;
}
a {
  font-weight: bold;
  color: #2c3e50;
}
</style>