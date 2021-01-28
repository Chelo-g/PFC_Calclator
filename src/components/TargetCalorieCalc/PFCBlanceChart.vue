<template>
  <PFCBlanceChart :chart-data="datacollection"></PFCBlanceChart>
</template>

<script>
import PFCBlanceChart from './PFCBlanceChart.js';

export default {
  //↓コンポーネントにもBarChartを宣言しておくことを忘れないように(動作しなくなる)
  components: {
    PFCBlanceChart,
  },
  data() {
    return {
      datacollection: { labels: [], datasets: [] },
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ['Protein', 'Fat', 'Carbonate'],
        datasets: [
          {
            data: [
              this.$store.getters.ProteinCalorie,
              this.$store.getters.FatCalorie,
              this.$store.getters.CarbonateCalorie,
            ],
            backgroundColor: ['rgb(110, 110, 110)', 'rgb(190, 190, 190)', 'rgb(255, 255, 255)'],
            borderColor: 'gray',
            borderWidth: 1,
          },
        ],
      };
    },
  },
};
</script>
