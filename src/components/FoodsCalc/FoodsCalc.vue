<template>
    <div>
        <div>
            <table class="calcTable">
                <tr class="trCacl">
                    <th>名前</th>
                    <th>蛋白質(kcal)</th>
                    <th>脂質(kcal)</th>
                    <th>炭水化物(kcal)</th>
                    <th>合計(kcal)</th>
                </tr>
                <tr>
                    <th>目標値</th>
                    <th>{{(this.$store.getters.ProteinCalorie).toFixed(1)}}</th>
                    <th>{{(this.$store.getters.FatCalorie).toFixed(1)}}</th>
                    <th>{{(this.$store.getters.CarbonateCalorie).toFixed(1)}}</th>
                    <th>{{(this.$store.getters.TargetCalorie).toFixed(1)}}</th>
                </tr>
                <tr>
                    <th>合計値</th>
                    <th>{{this.$store.getters.getsumParam("Protein").toFixed(1)}}</th>
                    <th>{{this.$store.getters.getsumParam("Fat").toFixed(1)}}</th>
                    <th>{{this.$store.getters.getsumParam("Carbo").toFixed(1)}}</th>
                    <th>{{totalCal}}</th>
                </tr>
                <tr>
                    <th>目標-合計</th>
                    <th :class="judgeRedText(this.$store.getters.ProteinCalorie - this.$store.getters.getsumParam('Protein'))">{{(this.$store.getters.ProteinCalorie - this.$store.getters.getsumParam("Protein")).toFixed(1)}}</th>
                    <th :class="judgeRedText(this.$store.getters.FatCalorie - this.$store.getters.getsumParam('Fat'))">{{(this.$store.getters.FatCalorie - this.$store.getters.getsumParam("Fat")).toFixed(1)}}</th>
                    <th :class="judgeRedText(this.$store.getters.CarbonateCalorie - this.$store.getters.getsumParam('Carbo'))">{{(this.$store.getters.CarbonateCalorie - this.$store.getters.getsumParam("Carbo")).toFixed(1)}}</th>
                    <th :class="judgeRedText(this.$store.getters.TargetCalorie -totalCal)">{{(this.$store.getters.TargetCalorie - totalCal)}}</th>
                </tr>
            </table>
        </div>
        <div>
            リストNo.
            <input type="radio" name="list" checked="checked" @click="selectListNumber(1)">1 |
            <input type="radio" name="list" @click="selectListNumber(2)">2 |
            <input type="radio" name="list" @click="selectListNumber(3)">3 |
            <input type="radio" name="list" @click="selectListNumber(4)">4 |
            <input type="radio" name="list" @click="selectListNumber(5)">5
        </div>

        <div>
        <table class="listTable">
            <thead>
                <tr>
                    <th @click="sortBy('name')" :class="sortedClass('name')" class="thName">名前</th>
                    <th @click="sortBy('Protein')" :class="sortedClass('Protein')" class="thPFC">蛋白質(g)</th>
                    <th @click="sortBy('Fat')" :class="sortedClass('Fat')" class="thPFC">脂質(g)</th>
                    <th @click="sortBy('Carbo')" :class="sortedClass('Carbo')" class="thPFC">炭水化物(g)</th>
                    <th @click="sortBy('weight')" :class="sortedClass('weight')" class="thAuto">量(g)</th>
                    <th >Del</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in sortList" :key="index">
                    <th class="itemName">{{item.name}}</th>
                    <th>{{pointRound(item.Protein,item.weight)}}</th>
                    <th>{{pointRound(item.Fat,item.weight)}}</th>
                    <th>{{pointRound(item.Carbo,item.weight)}}</th>
                    <th><input type="number" v-model.number="item.weight" @change="doChartUpdate" step="10"></th>
                    <th><button @click="dellFood(item.name)">del</button></th>
                </tr>
            </tbody>
        </table>
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
            var item = this.$store.getters.getsumParam("Protein") + this.$store.getters.getsumParam("Fat") + this.$store.getters.getsumParam("Carbo")
            return item.toFixed(1)
        },
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
        }
    },
}
</script>

<style scoped>
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