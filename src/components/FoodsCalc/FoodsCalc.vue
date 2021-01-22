<template>
    <div>
        <div>
            <table class="calcTable">
                <tr class="trCacl">
                    <th>名前</th>
                    <th>蛋白質(kcal)</th>
                    <th>脂質(kcal)</th>
                    <th>炭水化物(kcal)</th>
                </tr>
                <tr>
                    <th>目標値</th>
                    <th>{{(this.$store.getters.ProteinCalorie).toFixed(1)}}</th>
                    <th>{{(this.$store.getters.FatCalorie).toFixed(1)}}</th>
                    <th>{{(this.$store.getters.CarbonateCalorie).toFixed(1)}}</th>
                </tr>
                <tr>
                    <th>合計値</th>
                    <th>{{this.$store.getters.getsumParam("Protein").toFixed(1)}}</th>
                    <th>{{this.$store.getters.getsumParam("Fat").toFixed(1)}}</th>
                    <th>{{this.$store.getters.getsumParam("Carbo").toFixed(1)}}</th>
                </tr>
                <tr>
                    <th>目標-合計</th>
                    <th :class="judgeRedText(this.$store.getters.ProteinCalorie - this.$store.getters.getsumParam('Protein'))">{{(this.$store.getters.ProteinCalorie - this.$store.getters.getsumParam("Protein")).toFixed(1)}}</th>
                    <th :class="judgeRedText(this.$store.getters.FatCalorie - this.$store.getters.getsumParam('Fat'))">{{(this.$store.getters.FatCalorie - this.$store.getters.getsumParam("Fat")).toFixed(1)}}</th>
                    <th :class="judgeRedText(this.$store.getters.CarbonateCalorie - this.$store.getters.getsumParam('Carbo'))">{{(this.$store.getters.CarbonateCalorie - this.$store.getters.getsumParam("Carbo")).toFixed(1)}}</th>
                </tr>
            </table>
        </div>
        <div>
        <table class="listTable">
            <thead>
                <tr>
                    <th class="thName">名前</th>
                    <th class="thPFC">蛋白質(g)</th>
                    <th class="thPFC">脂質(g)</th>
                    <th class="thPFC">炭水化物(g)</th>
                    <th class="thAuto">量(g)</th>
                    <th class="thAuto">Del</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in this.$store.getters.SelectFoods" :key="index">
                    <th class="itemName">{{item.name}}</th>
                    <th>{{pointRound(item.Protein,item.weight)}}</th>
                    <th>{{pointRound(item.Fat,item.weight)}}</th>
                    <th>{{pointRound(item.Carbo,item.weight)}}</th>
                    <th><input type="number" v-model.number="item.weight" @change="doChartUpdate" step="10"></th>
                    <th><button @click="dellFood(index)">del</button></th>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        //indexの取得
        //https://yoshikiito.net/blog/archives/1028/
        dellFood(index){
            console.log(index)
            this.$store.dispatch("doFoodDel",index)
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
        }
    }

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
    width: 100px;
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
</style>