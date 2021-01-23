import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //これを参照にグラフを描写する
    TargetCalorie:1200,
    BodyWeight:0,
    ProteinCalorie:0,
    FatCalorie:0,
    CarbonateCalorie:0,
    //PFC計算用
    FoodList:[],
    SelectFoods:[],
  },
  getters:{
    TargetCalorie: state => state.TargetCalorie,
    BodyWeight: state => state.BodyWeight,
    ProteinCalorie: state => state.ProteinCalorie,
    FatCalorie: state => state.FatCalorie,
    CarbonateCalorie: state => state.CarbonateCalorie,
    ProteinWeight: state => state.ProteinCalorie / 4,
    FatWeight: state => state.FatCalorie / 9,
    CarbonateWeight:state => state.CarbonateCalorie / 4,
    //PFC計算用
    FoodList: state => state.FoodList,
    SelectFoods: state => state.SelectFoods,
    getsumParam:(state,getters) => param =>{
      return Math.round((getters.SelectFoods.reduce((sum,i) => sum + i[param] * i["weight"]/100,0)*10))/10;
    },
  },
  mutations: {
    setTargetCalorie(state,payload){
      state.TargetCalorie = payload.TargetCalorie
    },
    setBodyWeight(state,payload){
      state.BodyWeight = payload.BodyWeight
    },
    setProteinCalorie(state,payload){
      state.ProteinCalorie = payload.ProteinCalorie
    },
    setFatCalorie(state,payload){
      state.FatCalorie = payload.FatCalorie
    },
    setCarbonateCalorie(state,payload){
      state.CarbonateCalorie = payload.CarbonateCalorie
    },
    //食べ物計算用
    setFoodList(state,FoodList){
      state.FoodList = FoodList
     // console.log("set Food List")
    },
    //食品リストからの追加
    setSelectFoods(state,payload){
    //重複するとバグるので、重複禁止にする方向に変更
//    var item = payload
//    var selectId = state.SelectFoods.reduce((a,b)=>{return a > b.selectId ? a : b.selectId +1},0)
//    Vue.set(item,'selectId',selectId)
//    Vue.set(item,'weight',100)
//    state.SelectFoods.push(item)
//    weightプロパティの有無で追加を判断
    if (payload.weight === undefined){
      Vue.set(payload,'weight',100)
      state.SelectFoods.push(payload);
    }
    },
    deleteSelectFood(state,index) {
      //Weightプロパティ消さないと再度追加不能になるので、プロパティを消す処理を挟む
      Vue.delete(state.SelectFoods[index],'weight')
      state.SelectFoods.splice(index,1)
    },
    //セルフ食品登録用
    addOriginfood(state,payload){
      state.SelectFoods.push(payload)
    },
    //ストレージから読み込み用
    //カロリー
    setCalfromStroage(state,payload){
      state.TargetCalorie = payload.TargetCalorie
      state.ProteinCalorie = payload.ProteinCalorie
      state.FatCalorie = payload.FatCalorie
      state.CarbonateCalorie =payload.CarbonateCalorie
      state.BodyWeight = payload.BodyWeight
    },
    //食品
    setSelectFoodfromStroage(state,payload){
      state.SelectFoods = payload
    },
  },
  actions: {
    doTargetUpdata({commit},TargetCalorie){
      commit('setTargetCalorie',{TargetCalorie})
    },
    doWeightUpdata({commit},BodyWeight){
      commit('setBodyWeight',{BodyWeight})
    },
    doProteinUpdata({commit},ProteinCalorie){
      commit('setProteinCalorie',{ProteinCalorie})
    },
    doFatUpdata({commit},FatCalorie){
      commit('setFatCalorie',{FatCalorie})
    },
    doCarbonateUpdata({commit},CarbonateCalorie){
      commit('setCarbonateCalorie',{CarbonateCalorie})
    },
    //食べ物計算用
    doFoodUpdata({commit},SelectFoods){
      commit('setSelectFoods',SelectFoods)
    },
    doFoodDel({commit},SelectFoods){
      commit('deleteSelectFood',SelectFoods)
    },
    setFoodList({commit},FoodList){
      commit('setFoodList',FoodList)
    },
    addOriginfood({commit},originfood){
      commit('addOriginfood',originfood)
    },
    //ストレージ読み込み
    setCalfromStroage({commit},storageCal){
      commit('setCalfromStroage',storageCal)
    },
    setSelectFoodfromStroage({commit},storageFood){
      commit('setSelectFoodfromStroage',storageFood)
    },
  },
  modules: {
  }
})
