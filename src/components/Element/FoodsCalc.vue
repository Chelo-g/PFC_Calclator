<template>
    <div>
        <div>
            <div>
                <el-table
                    :data="calTable"
                    stripe
                    border
                    size="mini"
                    height="145"
                    style="width: 100% margin-top: 20px">
                    <el-table-column
                    prop="name"
                    label="Name">
                    </el-table-column>
                    <el-table-column
                    prop="Protein"
                    label="蛋白質(kcal)">
                    </el-table-column>
                    <el-table-column
                    prop="Fat"
                    label="脂質(kcal)">
                    </el-table-column>
                    <el-table-column
                    prop="Carbo"
                    label="炭水化物(kcal)">
                    </el-table-column>
                    <el-table-column
                    prop="Sum"
                    label="合計(kcal)">
                    </el-table-column>
                </el-table>
            </div>
        <div class="raido__list">
            <el-radio-group v-model="radioList" size="small" @change='selectListNumber'>
            <el-radio-button label="1" >List 1</el-radio-button>
            <el-radio-button label="2" >List 2</el-radio-button>
            <el-radio-button label="3" >List 3</el-radio-button>
            <el-radio-button label="4" >List 4</el-radio-button>
            <el-radio-button label="5" >List 5</el-radio-button>
            </el-radio-group>
        </div>
            <div class="foodlist__table">
                <el-table
                    :data="sortList"
                    stripe
                    border
                    size="mini"
                    height="220"
                    style="width: 100% margin-top: 20px">
                    <el-table-column
                    prop="name"
                    label="Name"
                    width="300">
                    </el-table-column>
                    <el-table-column
                    prop="Protein"
                    sortable
                    label="蛋白質(g)"
                    width="110">
                    </el-table-column>
                    <el-table-column
                    prop="Fat"
                    sortable
                    label="脂質(g)"
                    width="110">
                    </el-table-column>
                    <el-table-column
                    prop="Carbo"
                    sortable
                    label="炭水化物(g)"
                    width="110">
                    </el-table-column>
                    <el-table-column
                    label="(g)"
                    sortable
                    width="160">
                    <template slot-scope="scope">
                        <el-input-number
                            v-model="sortList[scope.$index]['weight']"
                            :step="10"
                            @change="doChartUpdate"
                            size="mini"
                            controls-position="right"
                            >
                        </el-input-number>
                    </template>
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="Del"
                    width="80">
                    <template slot-scope="scope">
                        <el-button class=""
                            @click="saveFoods(limited[scope.$index])"
                            size="mini"
                            plain
                            >
                            Del
                        </el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>

        </div>
    </div>
</template>

<script>
// ストレージに保存
// https://jp.vuejs.org/v2/examples/todomvc.html
// 食品リスト
var STORAGE_KEY_FOOD = 'pfc-calc-foodlist'
var pfcCalcFoodStorage = {
  fetch: function () {
    var foods = JSON.parse(localStorage.getItem(STORAGE_KEY_FOOD) || '[]')
    return foods
  },
  save: function (foods) {
    localStorage.setItem(STORAGE_KEY_FOOD, JSON.stringify(foods))
  }
}

export default {
    data:function() {
        return {
            sort:{
                key:"",//Sort Key
                isAsc:false //昇順ならtrue,降順ならfalse
            },
            radioList:1,
        }
    },
    created() {
        //初めにローカルストレージより読み込む
        this.$store.dispatch('setSelectFoodfromStroage',pfcCalcFoodStorage.fetch())
    },
    watch:{
        //selectFoodListを監視し変更時にローカルストレージに保存
        watchSelectFoods:{
            handler: function(watchSelectFoods){
                pfcCalcFoodStorage.save(watchSelectFoods);
            },
            deep: true
        }
    },
    computed:{
        //ソート機能
        //https://qiita.com/HagaSpa/items/7f9440e7d5d73a2896a3
        sortList:function(){
            let list = this.$store.getters.filterSelectFoods;

            //昇順、降順
            if(this.sort.key){
                list.sort((a,b)=>{
                    a = a[this.sort.key];
                    b = b[this.sort.key];
                    return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1);
                });
            }
            return list;
        },
        //Vuex値の監視用
        watchSelectFoods(){
            return this.$store.getters.SelectFoods;
        },
        totalCal(){
            var item = this.$store.getters.getsumParam("Protein")*4 + this.$store.getters.getsumParam("Fat")*9 + this.$store.getters.getsumParam("Carbo")*4
            return item.toFixed(1)
        },
        calTable(){
            var item1 = [];
            var item2 = [];
            var item3 = [];
            var list = [];
            this.$set(item1,"name","目標値")
            this.$set(item1,"Protein",this.$store.getters.ProteinCalorie.toFixed(1))
            this.$set(item1,"Fat",this.$store.getters.FatCalorie.toFixed(1))
            this.$set(item1,"Carbo",this.$store.getters.CarbonateCalorie.toFixed(1))
            this.$set(item1,"Sum",this.$store.getters.TargetCalorie.toFixed(1))
            list.push(item1)

            this.$set(item2,"name","合計値")
            this.$set(item2,"Protein",(this.$store.getters.getsumParam("Protein") * 4).toFixed(1))
            this.$set(item2,"Fat", (this.$store.getters.getsumParam("Fat") * 9).toFixed(1))
            this.$set(item2,"Carbo",(this.$store.getters.getsumParam("Carbo") * 4).toFixed(1))
            this.$set(item2,"Sum",this.totalCal)
            list.push(item2)

            this.$set(item3,"name","目標-合計")
            this.$set(item3,"Protein",(this.$store.getters.ProteinCalorie - this.$store.getters.getsumParam("Protein")*4).toFixed(1))
            this.$set(item3,"Fat",  (this.$store.getters.FatCalorie - this.$store.getters.getsumParam("Fat")*9).toFixed(1))
            this.$set(item3,"Carbo",(this.$store.getters.CarbonateCalorie - this.$store.getters.getsumParam("Carbo")*4).toFixed(1))
            this.$set(item3,"Sum",(this.$store.getters.TargetCalorie - this.totalCal).toFixed(1))
            list.push(item3)
            return list
        }
    },
    methods: {
        sortBy: function(key) {
            this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
            this.sort.key = key;
        },
        sortedClass: function(key) {
            return this.sort.key === key ? `sorted ${this.sort.isAsc ? 'asc' : 'desc' }` : '';
        },
        //indexの取得
        //https://yoshikiito.net/blog/archives/1028/
        dellFood(name){
            //console.log(index)
            this.$store.dispatch("doFoodDel",name)
            this.$emit("chartUpdata")
        },
        doChartUpdate(){
            this.$emit("chartUpdata")
        },
        pointRound:function(num,weight){
            return (Math.round(num * weight/10)/10).toFixed(1)
        },
        judgeRedText(value){
            if(value<0){
                return "redText"
            }
        },
        selectListNumber(listNumber){
            this.$store.dispatch("changeSelectList",listNumber)
            this.$emit("chartUpdata")
        },

    },
}
</script>

<style scoped>
.foodlist__table{
    margin-bottom: 15px;
}

.raido__list{
    text-align: left;
}

.calCalc__table{
    text-align: center;
}

.calcTable{
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
    width: auto;
    display: inline-block;
}
.trCacl th{
    width: 150px;
}

td{
    border: 1px solid  gray;
}
th{
    border: 1px solid  gray;
}

.listTable{
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
    width: auto;
    display: inline-block;
}

.listTable td{
    text-align: center; /* center checkbox horizontally */
    vertical-align: middle; /* center checkbox vertically */
}
.itemName{
    font-size: 16px;
}
.thPFC{
    width: 130px;
}
.thName{
    width: 600px;
}
.thAuto{
    width: 75px;
}
.listTable input{
  width: 50px;
}
.redText{
    color: red;
}

.chart {
max-width: 300px;
margin:  150px auto;
display: inline-block;
}

th.sorted.desc::after{
    display: inline-block;
    content: '▼';
}
th.sorted.asc::after{
    display: inline-block;
    content: '▲';
}
</style>