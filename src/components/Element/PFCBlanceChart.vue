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
            backgroundColor: ['#F56C6C', '#E6A23C', '#67C23A'],
          },
        ],
      };
    },
  },
};
</script>
