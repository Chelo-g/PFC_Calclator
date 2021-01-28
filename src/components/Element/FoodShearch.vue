<template>
  <div>
    <div class="search__conteinar">
      <div class="search__conteinar--conditions">
        <div class="search__conteinar--PFCslider">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6">
              <div class="search__conteinar-proteinBar">
                <el-slider
                  v-model="barProtein"
                  :format-tooltip="formatProtein"
                  range
                  :marks="weightMarks"
                  :max="100"
                >
                </el-slider>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="search__conteinar-fatBar">
                <el-slider
                  v-model="barFat"
                  :format-tooltip="formatFat"
                  range
                  :marks="weightMarks"
                  :max="100"
                >
                </el-slider>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="search__conteinar-carboBar">
                <el-slider
                  v-model="barCarbo"
                  :format-tooltip="formatCarbo"
                  range
                  :marks="weightMarks"
                  :max="100"
                >
                </el-slider>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="search__input">
          {{ sortList.length }} 件中
          <el-input-number v-model="showLimit" size="mini" :min="1" :max="15"> </el-input-number>
          件を表示中
          <el-input
            class="search__input--text"
            type="textbox"
            prefix-icon="el-icon-search"
            placeholder="Search"
            v-model="searchName"
            maxlength="10"
            show-word-limit
            size="small"
          >
          </el-input>
        </div>
      </div>
      <div class="table__result">
        <el-table
          :data="limited"
          stripe
          border
          size="mini"
          height="240"
          style="width: 100% margin-top: 20px"
        >
          <el-table-column prop="name" label="Name" width="450"> </el-table-column>
          <el-table-column prop="Protein" sortable label="蛋白質" width="110"> </el-table-column>
          <el-table-column prop="Fat" sortable label="脂質" width="110"> </el-table-column>
          <el-table-column prop="Carbo" sortable label="炭水化物" width="110"> </el-table-column>
          <el-table-column fixed="right" label="Add" width="80">
            <template slot-scope="scope">
              <el-button
                class="table__result--addbtn"
                @click="saveFoods(limited[scope.$index])"
                size="small"
              >
                Add
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="addFood__container">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="10">
          <div class="">
            <el-input
              type="textbox"
              placeholder="食品名を入力してね"
              v-model="addName"
              maxlength="30"
              show-word-limit
              size="small"
              ref="addName"
            >
            </el-input>
          </div>
        </el-col>
        <el-col :span="25">
          <div class="">
            <el-button @click="addFoods()" size="small" round>
              食品登録
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <div class="addFood__container--proteinBar">
            <el-slider
              v-model="addProtein"
              show-input
              :format-tooltip="formatProtein"
              input-size="mini"
            >
            </el-slider>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="addFood__container--fatBar">
            <el-slider v-model="addFat" show-input :format-tooltip="formatFat" input-size="mini">
            </el-slider>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="addFood__container--carboBar">
            <el-slider
              class="test"
              v-model="addCarbo"
              show-input
              :format-tooltip="formatCarbo"
              input-size="mini"
            >
            </el-slider>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      //値は仮の値
      barProtein: [0, 100],
      barFat: [0, 100],
      barCarbo: [0, 100],
      weightMarks: {
        0: '0g',
        25: '25g',
        50: '50g',
        75: '75g',
        100: '100g',
      },
      addProtein: 0,
      addFat: 0,
      addCarbo: 0,
      addName: '',
      showLimit: 10,
      minFat: 0,
      minProtein: 0,
      minCarbonate: 0,
      maxFat: 100,
      maxProtein: 100,
      maxCarbonate: 100,
      list: [],
      sort: {
        key: '', //Sort Key
        isAsc: false, //昇順ならtrue,降順ならfalse
      },
      searchName: '',
    };
  },
  //読み込み時にリストを読み込む
  created: function() {
    this.list = require('@/components/FoodShearch/Foods.json');
    this.$store.dispatch('setFoodList', this.list);
    //console.log("read Food List")
  },
  computed: {
    //リストから抽出
    //barのMinとmaxを拾ってくる
    matched: function() {
      return this.list.filter(function(el) {
        this.minProtein = this.barProtein[0];
        this.maxProtein = this.barProtein[1];
        this.minFat = this.barFat[0];
        this.maxFat = this.barFat[1];
        this.minCarbonate = this.barCarbo[0];
        this.maxCarbonate = this.barCarbo[1];
        return (
          this.minFat <= el.Fat &&
          el.Fat <= this.maxFat &&
          this.minProtein <= el.Protein && el.Protein <= this.maxProtein &&
          this.minCarbonate <= el.Carbo && el.Carbo <= this.maxCarbonate
        );
      }, this);
    },
    //表示件数調整
    limited: function() {
      return this.sortList.slice(0, this.showLimit);
    },
    //ソート機能
    //https://qiita.com/HagaSpa/items/7f9440e7d5d73a2896a3
    sortList: function() {
      let list = this.matched.slice();

      //昇順、降順
      if (this.sort.key) {
        list.sort((a, b) => {
          a = a[this.sort.key];
          b = b[this.sort.key];
          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1);
        });
      }

      //名前抽出
      if (this.searchName) {
        list = list.filter(element => {
          return Object.keys(element).some(key => {
            if (key === 'name') {
              return element[key].indexOf(this.searchName) > -1;
            }
          });
        });
      }

      return list;
    },
  },
  methods: {
    // sort用キーをセットし、昇順・降順を入れ替える
    sortBy: function(key) {
      this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
      this.sort.key = key;
    },
    sortedClass: function(key) {
      return this.sort.key === key ? `sorted ${this.sort.isAsc ? 'asc' : 'desc'}` : '';
    },
    saveFoods(item) {
      //itemは食品データのオブジェクト
      // console.log(item)
      this.$store.dispatch('doFoodUpdata', item);
      this.$emit('chartUpdata');
    },
    addFoods() {
      var item = {
        weight: 100,
        Protein: parseFloat(this.addProtein),
        Fat: parseFloat(this.addFat),
        Carbo: parseFloat(this.addCarbo),
        name: this.addName,
        lists: { list: this.$store.getters.FoodListNumber },
      };
      this.$store.dispatch('addOriginfood', item);
      //初期化
      this.addProtein = 0;
      this.addFat = 0;
      this.addCarbo = 0;
      this.addName = '';
    },
    formatProtein(val) {
      return '蛋白質: ' + val + ' (g/100g)';
    },
    formatFat(val) {
      return '脂質: ' + val + ' (g/100g)';
    },
    formatCarbo(val) {
      return '炭水化物: ' + val + ' (g/100g)';
    },
  },
};
</script>

<style scoped>
.search__conteinar {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

.search__input {
  margin-top: 15px;
}
.search__input--text {
  width: 200px;
  margin-right: auto;
}
.search__conteinar--PFCslider >>> .el-slider__button {
  border: 2px solid #dcdfe6;
}
.search__conteinar-proteinBar >>> .el-slider__bar {
  background-color: #f56c6c;
}
.search__conteinar-fatBar >>> .el-slider__bar {
  background-color: #e6a23c;
}
.search__conteinar-carboBar >>> .el-slider__bar {
  background-color: #67c23a;
}

.addFood__container {
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
.addFood__container--proteinBar >>> .el-slider__bar {
  background-color: #f56c6c;
}
.addFood__container--proteinBar >>> .el-slider__button {
  border: 2px solid #f56c6c;
}
.addFood__container--fatBar >>> .el-slider__bar {
  background-color: #e6a23c;
}
.addFood__container--fatBar >>> .el-slider__button {
  border: 2px solid #e6a23c;
}
.addFood__container--carboBar >>> .el-slider__bar {
  background-color: #67c23a;
}
.addFood__container--carboBar >>> .el-slider__button {
  border: 2px solid #67c23a;
}

/* 下 全体にかかってるので修正すること*/
</style>
