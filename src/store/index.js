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
    //重複して登録させると重量入力時同じものも変化するので、名前で判定する
    var isFoodExit = false
    var index = 0
    for(index in state.SelectFoods){
      if(state.SelectFoods[index].name == payload.name){
        isFoodExit = true;
        break;
      }
    }
      if(isFoodExit){
        //重複時はいまのところ何もしない
      }else{
        //重複しない時は重量のプロパティを付与してpushする
        Vue.set(payload,'weight',100)
        state.SelectFoods.push(payload);
      }
    },
    deleteSelectFood(state,index) {
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
      if (payload.TargetCalorie == undefined){
        return state.TargetCalorie = 1200;
      }
      state.ProteinCalorie = payload.ProteinCalorie
      state.FatCalorie = payload.FatCalorie
      state.CarbonateCalorie =payload.CarbonateCalorie
      state.BodyWeight = payload.BodyWeight
      if (payload.BodyWeight == undefined){
        return state.BodyWeight = 50;
      }
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
