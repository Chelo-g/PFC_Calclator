<template>
  <div>
    <div>目標摂取カロリーは{{ this.$store.getters.TargetCalorie | unit_kCal }}です。</div>
    <div>
      <table class="calTable">
        <tr>
          <th>現在の体重(kg)</th>
          <th>
            <input
              v-model.number="BodyWeight"
              type="number"
              @change="doTargetUpdata"
              min="0"
              value="aa"
            />
          </th>
        </tr>
        <tr>
          <th>蛋白質(kcal)</th>
          <th>
            <input
              v-model.number="ProteinCal"
              type="number"
              name="ProtainCalBox"
              @change="doProteinUpdata"
              min="0"
            />
          </th>
        </tr>
        <tr>
          <th>脂質(kcal)</th>
          <th>
            <input
              v-model.number="FatCal"
              name="FatCalBox"
              type="number"
              @change="doFatUpdata"
              min="0"
            />
          </th>
        </tr>
        <tr>
          <th>炭水化物(kcal)</th>
          <th>
            <input
              v-model.number="CarbonateCal"
              type="number"
              name="CarbonateCalBox"
              @change="doCarbonateUpdata"
              min="0"
            />
          </th>
        </tr>
      </table>
    </div>
    <div>
      <button @click="ketoAddClick">ケトジェニックダイエット目標値</button>
      <button @click="lowfatAddClick">ローファットダイエット目標値</button>
    </div>
    <div class="chart">
      <PFCBlanceChart ref="BlanceChart" />
    </div>
  </div>
</template>

<script>
import PFCBlanceChart from '@/components/TargetCalorieCalc/PFCBlanceChart.vue';
// ストレージに保存
// https://jp.vuejs.org/v2/examples/todomvc.html
// 食品リスト
var STORAGE_KEY_CAL = 'pfc-calc-cal';
var pfcCalcCalStorage = {
  fetch: function() {
    var cal = JSON.parse(localStorage.getItem(STORAGE_KEY_CAL) || '[]');
    //  console.log(cal)
    return cal;
  },
  save: function(cal) {
    //  console.log(cal)
    localStorage.setItem(STORAGE_KEY_CAL, JSON.stringify(cal));
  },
};

export default {
  components: {
    PFCBlanceChart,
  },
  name: 'Calculate',
  data: function() {
    return {
      //        BodyWeight:50,
      //        ProteinCal:0,
      //        FatCal:0,
      //        CarbonateCal:0
      BodyWeight: this.$store.getters.BodyWeight,
      ProteinCal: this.$store.getters.ProteinCalorie,
      FatCal: this.$store.getters.FatCalorie,
      CarbonateCal: this.$store.getters.CarbonateCalorie,
    };
  },
  filters: {
    unit_kCal: function(val) {
      return Math.round(val) + 'Kcal';
    },
    unit_g: function(val) {
      return Math.round(val) + 'g';
    },
  },
  watch: {
    watchCal: {
      handler: function(watchCal) {
        pfcCalcCalStorage.save(watchCal);
      },
      deep: true,
    },
  },
  beforeCreate() {
    this.$store.dispatch('setCalfromStroage', pfcCalcCalStorage.fetch());
  },
  computed: {
    watchCal() {
      var item = {
        TargetCalorie: this.$store.getters.TargetCalorie,
        ProteinCalorie: this.$store.getters.ProteinCalorie,
        FatCalorie: this.$store.getters.FatCalorie,
        CarbonateCalorie: this.$store.getters.CarbonateCalorie,
        BodyWeight: this.$store.getters.BodyWeight,
      };
      return item;
    },
  },
  methods: {
    ketoAddClick: function() {
      //ケトジェニック理想値
      //inputに各カロリー値を入力
      this.FatCal = Math.round(this.$store.getters.TargetCalorie * 0.7);
      this.CarbonateCal = Math.round(4 * 20);
      this.ProteinCal = Math.round(
        this.$store.getters.TargetCalorie - this.FatCal - this.CarbonateCal
      );
      //Vuexに渡す
      this.$store.dispatch('doProteinUpdata', this.ProteinCal * 1);
      this.$store.dispatch('doFatUpdata', this.FatCal * 1);
      this.$store.dispatch('doCarbonateUpdata', this.CarbonateCal * 1);
      //グラフの再描写、子コンポーネントのメソッドを親から実行
      this.$refs.BlanceChart.fillData();
      this.$emit('chartUpdata');
    },
    lowfatAddClick: function() {
      //ローファット理想値
      //inputに各カロリー値を入力
      this.FatCal = Math.round(30 * 9);
      this.ProteinCal = Math.round(this.BodyWeight * 2 * 4);
      this.CarbonateCal = Math.round(
        this.$store.getters.TargetCalorie - this.FatCal - this.ProteinCal
      );
      //Vuexに渡す
      this.$store.dispatch('doProteinUpdata', this.ProteinCal * 1);
      this.$store.dispatch('doFatUpdata', this.FatCal * 1);
      this.$store.dispatch('doCarbonateUpdata', this.CarbonateCal * 1);
      //グラフの再描写、子コンポーネントのメソッドを親から実行
      this.$refs.BlanceChart.fillData();
      this.$emit('chartUpdata');
    },
    //input直接変更時にVuexに渡す
    doTargetUpdata(event) {
      this.$store.dispatch('doTargetUpdata', event.target.value * 24);
      this.$store.dispatch('doWeightUpdata', event.target.value * 1);
    },
    doProteinUpdata(event) {
      this.$store.dispatch('doProteinUpdata', event.target.value * 1);
      //グラフの再描写、子コンポーネントのメソッドを親から実行
      this.$refs.BlanceChart.fillData();
      this.$emit('chartUpdata');
    },
    doFatUpdata(event) {
      this.$store.dispatch('doFatUpdata', event.target.value * 1);
      //グラフの再描写、子コンポーネントのメソッドを親から実行
      this.$refs.BlanceChart.fillData();
      this.$emit('chartUpdata');
    },
    doCarbonateUpdata(event) {
      this.$store.dispatch('doCarbonateUpdata', event.target.value * 1);
      //グラフの再描写、子コンポーネントのメソッドを親から実行
      this.$refs.BlanceChart.fillData();
      this.$emit('chartUpdata');
    },
  },
};
</script>

<style scoped>
.Box {
  padding-top: 4px;
  padding-right: 4px;
  padding-bottom: 2px;
  text-align: center;
}
.calTable {
  border-collapse: collapse;
  border-spacing: 0;
  text-align: center;
  width: auto;
  display: inline-block;
}
td {
  text-align: center;
  vertical-align: middle;
}
.calTable input {
  width: 50px;
}

.chart {
  max-width: 300px;
  margin: auto;
}
</style>
