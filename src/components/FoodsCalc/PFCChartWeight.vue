<template>
  <PFCChartWeight :chart-data="datacollection" :options="options"></PFCChartWeight>
</template>

<script>
import PFCChartWeight from './vue-Chart.js';

export default {
  //↓コンポーネントにもBarChartを宣言しておくことを忘れないように(動作しなくなる)
  components: {
    PFCChartWeight,
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
  methods: {
    fillData() {
      (this.datacollection = {
        labels: ['Protein', 'Fat', 'Carbonate'],
        datasets: [
          {
            label: '目標値',
            data: [
              this.$store.getters.ProteinWeight,
              this.$store.getters.FatWeight,
              this.$store.getters.CarbonateWeight,
            ],
            backgroundColor: 'rgb(110, 110, 110)',
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: '計算値',
            data: [
              this.$store.getters.getsumParam('Protein'),
              this.$store.getters.getsumParam('Fat'),
              this.$store.getters.getsumParam('Carbo'),
            ],
            backgroundColor: 'rgb(255, 255, 255)',
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      }),
        (this.options = {
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function(value) {
                    return value + 'g';
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
