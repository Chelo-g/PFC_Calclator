<template>
  <div class="chart">
    <NutrientsChart :chart-data="datacollection" :options="options"></NutrientsChart>
  </div>
</template>

<script>
import NutrientsChart from './vue-Chart-Horizon.js';
import { mapGetters } from 'vuex';

export default {
  //↓コンポーネントにもBarChartを宣言しておくことを忘れないように(動作しなくなる)
  components: {
    NutrientsChart,
  },
  data() {
    return {
      datacollection: { labels: [], datasets: [] },
      options: null,
    };
  },
  mounted() {
    this.fillData();
  },
  computed: {
    ...mapGetters(['getsumParam']),
  },
  methods: {
    fillData() {
      (this.datacollection = {
        labels: [
          '水溶性食物繊維',
          '不溶性食物繊維',
          'ナトリウム',
          'カリウム',
          'カルシウム',
          'マグネシウム',
          'リン',
          '鉄',
          '亜鉛',
        ],
        datasets: [
          {
            label: '計算値/推奨値(%)',
            data: [
              ((this.getsumParam('FIBSOL') / 10) * 100).toFixed(1),
              ((this.getsumParam('FIBINS') / 10) * 100).toFixed(1),
              ((this.getsumParam('NA') / 3150) * 100).toFixed(1),
              ((this.getsumParam('K') / 2500) * 100).toFixed(1),
              ((this.getsumParam('CA') / 725) * 100).toFixed(1),
              ((this.getsumParam('MG') / 350) * 100).toFixed(1),
              ((this.getsumParam('P') / 1000) * 100).toFixed(1),
              ((this.getsumParam('FE') / 7.5) * 100).toFixed(1),
              ((this.getsumParam('ZN') / 10) * 100).toFixed(1),
            ],
            backgroundColor: 'rgb(255, 255, 255)',
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      }),
        (this.options = {
          scales: {
            xAxes: [
              {
                ticks: {
                  callback: function(value) {
                    return value + '%';
                  },
                  beginAtZero: true,
                  min: 0,
                },
              },
            ],
          },
        });
    },
  },
};
</script>

<style scope>
.chart {
  width: 300px;
}
</style>
