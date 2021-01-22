# PFC Calclator
* 減量時の推奨カロリー、三大栄養素(PFC)の推奨摂取量を計算できます
* 三大栄養素の範囲を指定し、適した食品を検索できます
* 検索結果をピックアップし、合計の栄養素を計算できます
## 追加したい機能
+ ローカルストレージでの保存
+ ユーザー側で食料リストへの追加
+ 各種サプリの追加
----

## Vue.js
### コンポーネントの関係
```
App.vue ─ viwes/About.vue
        └ views/FoodsCalcate.vue
            ├ components/FoodsCalc/FoodsCalc.vue
            ├ components/FoodsCalc/PFCChartCal.vue
            ├ components/FoodsCalc/PFCChartWeight.vue
            ├ components/FoodsCalc/NutrientsChart.vue
            ├ components/FoodsCalc/VitaminsChart.vue
            ├ components/FoodShearch/FoodShearch.vue
            ├ components/FoodShearch/FoodShearch.vue
            └ components/TargetCalorieCalc/TargetCalorieCalc.vue
                └ components/TargetCalorieCalc/PFCBlanceChart.vue
```
｢PFCBlanceChart.vue｣だけ分けたのは最初に作って修正がめんどくさくなったから。  
親-子を超えたmethodsの呼び出しがめんどくさい事を理解していればこうはしなかった。  
次回作では修正が容易に出来る形で作成するよう心がける。

----



### 更新記録
+ 210122 公開