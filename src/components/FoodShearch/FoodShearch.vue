<template>
    <div>
        <div>
            <table class="table">
                <thead>
                    <tr class="trSearch">
                        <th></th>
                        <th>蛋白質(g/100g)</th>
                        <th>脂質(g/100g)</th>
                        <th>炭水化物(g/100g)</th>
                    </tr>
                </thead>
                    <tr>
                        <th>最大値</th>
                        <th><input v-model.number="maxProtein" type="number" min="0" max="100"></th>
                        <th><input v-model.number="maxFat" type="number" min="0" max="100"> </th>
                        <th><input v-model.number="maxCarbonate" type="number" min="0" max="100"></th>
                    </tr>
                    <tr>
                        <th>最小値</th>
                        <th><input v-model.number="minProtein" type="number" min="0" max="100"></th>
                        <th><input v-model.number="minFat" type="number" min="0" max="100"></th>
                        <th><input v-model.number="minCarbonate" type="number" min="0" max="100"></th>
                    </tr>
            </table>
        <div>
            <input v-model.number="showLimit" type="number"> 件を表示
            <input v-model="searchName" class="textbox"> を含むものを抽出
        </div>
        </div>
        <div>
        {{ sortList.length }} 件中 {{ limited.length }} 件を表示中 <br>
        項目クリックでソート可能
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th @click="sortBy('name')" :class="sortedClass('name')" class="thName">名前</th>
                    <th @click="sortBy('Protein')" :class="sortedClass('Protein')" class="thPFC">蛋白質</th>
                    <th @click="sortBy('Fat')" :class="sortedClass('Fat')" class="thPFC">脂質</th>
                    <th @click="sortBy('Carbo')" :class="sortedClass('Carbo')" class="thPFC">炭水化物</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <th><input ref="addName" type="text" class="textbox"  placeholder="自分で登録"></th>
                    <th><input ref="addProtein" type="number" min="0" max="100" value="0"></th>
                    <th><input ref="addFat" type="number" min="0" max="100" value="0"></th>
                    <th><input ref="addCarbo" type="number" min="0" max="100" value="0"></th>
                    <th><button @click="addFoods()">Add</button></th>
                </tr>
                <tr v-for="item in limited" v-bind:key="item.id">
                    <th class="itemName">{{ item.name }}</th>
                    <th>{{Number(item.Protein)}}</th>
                    <th>{{Number(item.Fat)}}</th>
                    <th>{{Number(item.Carbo)}}</th>
                    <th><button @click="saveFoods(item)">Add</button></th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data: function() {
        return{
            //値は仮の値
            showLimit:10,
            minFat:0,
            minProtein:0,
            minCarbonate:0,
            maxFat:100,
            maxProtein:100,
            maxCarbonate:100,
            list:[],
            sort:{
                key:"",//Sort Key
                isAsc:false //昇順ならtrue,降順ならfalse
            },
            searchName:""
        }
    },
    //読み込み時にリストを読み込む
    created:function () {
        this.list = require("./Foods.json")
        this.$store.dispatch("setFoodList",this.list)
        console.log("read Food List")
    },
    computed:{
        //リストから抽出
        matched: function(){
            return this.list.filter(function(el){
                return  (this.minFat <= el.Fat && el.Fat <= this.maxFat) && (this.minProtein <= el.Protein && el.Protein <= this.maxProtein) && (this.minCarbonate <= el.Carbo && el.Carbo <= this.maxCarbonate)
            },this)
        },
        //表示件数調整
        limited: function(){
            return this.sortList.slice(0,this.showLimit)
        },
        //ソート機能
        //https://qiita.com/HagaSpa/items/7f9440e7d5d73a2896a3
        sortList:function(){
            let list = this.matched.slice()

            //昇順、降順
            if(this.sort.key){
                list.sort((a,b)=>{
                    a = a[this.sort.key];
                    b = b[this.sort.key];
                    return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1);
                });
            }

            //名前抽出
            if(this.searchName){
                list = list.filter(element =>{
                    return Object.keys(element).some(key =>{
                        if(key === "name") {
                            return element[key].indexOf(this.searchName) > -1
                        }
                    });
                });
            }

        return list;

        }
    },
    methods: {
        // sort用キーをセットし、昇順・降順を入れ替える
        sortBy: function(key) {
            this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
            this.sort.key = key;
        },
        sortedClass: function(key) {
            return this.sort.key === key ? `sorted ${this.sort.isAsc ? 'asc' : 'desc' }` : '';
        },
        saveFoods(item){
            console.log(item.id)
            this.$store.dispatch("doFoodUpdata",item)
            this.$emit("chartUpdata")
        },
        addFoods(){
            //console.log("do addFoods")
            var addProtein = this.$refs.addProtein
            var addFat = this.$refs.addFat
            var addCarbo = this.$refs.addCarbo
            var addName = this.$refs.addName
            var item ={weight: 100,Protein: parseFloat(addProtein.value),Fat:parseFloat(addFat.value),Carbo:parseFloat(addCarbo.value),name: addName.value}
            this.$store.dispatch("addOriginfood",item)
            //初期化
            addProtein.value = 0
            addFat.value = 0
            addCarbo.value = 0
            addName.value = ""
        }
    }
}
</script>

<style scoped>
.table{
    margin-left: auto;
    margin-right: auto;
    border: 1px solid  gray;
    border-collapse: collapse;
    border-spacing: 0;
}
td{
    border: 1px solid  gray;
}
th{
    border: 1px solid  gray;
}
.thPFC{
    width: 100px;
}
.thName{
    width: 600px;
}
.trSearch th{
    width: 150px;
}
input{
  width: 50px;
}
.textbox{
    width: 200px;
}
.itemName{
    font-size: 15px;
    font-weight:normal;
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