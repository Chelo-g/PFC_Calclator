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
    FoodListNumber:1,
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
    FoodListNumber: state => state.FoodListNumber,
    getsumParam:(state,getters) => param =>{
      return Math.round((getters.filterSelectFoods.reduce((sum,i) => sum + i[param] * i["weight"]/100,0)*10))/10;
    },
    //ListでフィルターしたSelectFoods
    filterSelectFoods: state =>{
      var index = 0
      var filterList=[];
      for(index in state.SelectFoods){
        if(state.SelectFoods[index]["lists"].list == state.FoodListNumber){
          filterList.push(state.SelectFoods[index])
        }
      }
      return filterList
    }
  },
  mutations: {
    setTargetCalorie(state,payload){
      state.TargetCalorie = payload
    },
    setBodyWeight(state,payload){
      state.BodyWeight = payload
    },
    setProteinCalorie(state,payload){
      state.ProteinCalorie = payload
    },
    setFatCalorie(state,payload){
      state.FatCalorie = payload
    },
    setCarbonateCalorie(state,payload){
      state.CarbonateCalorie = payload
    },
    //食べ物計算用
    setFoodList(state,FoodList){
      state.FoodList = FoodList
     // console.log("set Food List")
    },
    changeSelectList(state,FoodListNumber){
      state.FoodListNumber = FoodListNumber
    },
    //食品リストからの追加
    setSelectFoods(state,payload){
    //重複して登録させると重量入力時同じものも変化するので、名前で判定する
    var isFoodExit = false
    var index = 0
    var filterList= [];
    for(index in state.SelectFoods){
      if(state.SelectFoods[index]["lists"].list == state.FoodListNumber){
        filterList.push(state.SelectFoods[index])
      }
    }
    for(index in filterList){
      if(filterList[index].name == payload.name){
        isFoodExit = true;
        break;
      }
    }
      if(isFoodExit){
        //重複時はいまのところ何もしない
      }else{
        //重複しない時は重量のプロパティを付与してpushする
        var item = payload
        //下の手法だと既存の食品のListsに上書きされる
        // Vue.set(item,'weight',100)
        // Vue.set(item,'lists',{list: state.FoodListNumber})
        item = Object.assign({}, item, { weight: 100, lists: {list:state.FoodListNumber} })
        state.SelectFoods.push(item);
      }
    },
    deleteSelectFood(state,name) {
      //品名、現在のリスト番号が合致した場合は削除しループをブレイク
      var index = 0;
      for(index in state.SelectFoods){
        if(state.SelectFoods[index].name == name && state.SelectFoods[index].lists.list==state.FoodListNumber)
          state.SelectFoods.splice(index,1)
          break;
      }
      // state.SelectFoods.splice(index,1)
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
      commit('setTargetCalorie',TargetCalorie)
    },
    doWeightUpdata({commit},BodyWeight){
      commit('setBodyWeight',BodyWeight)
    },
    doProteinUpdata({commit},ProteinCalorie){
      commit('setProteinCalorie',ProteinCalorie)
    },
    doFatUpdata({commit},FatCalorie){
      commit('setFatCalorie',FatCalorie)
    },
    doCarbonateUpdata({commit},CarbonateCalorie){
      commit('setCarbonateCalorie',CarbonateCalorie)
    },
    //食べ物計算用
    changeSelectList({commit},listNumber){
      commit('changeSelectList',listNumber)
    },
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
