# PFC Calclator
* 減量時の推奨カロリー、三大栄養素(PFC)の推奨摂取量を計算できます
* 三大栄養素の範囲を指定し、適した食品を検索できます
* 検索結果をピックアップし、合計の栄養素を計算できます

----

### 更新記録
<dl>
<dt>210125
<dd>食品リスト初期化ボタンの実装
<dd>エラー時アラートが出るように修正
<dt>210124
<dd>レシピの保存数追加
<dt>210123
<dd>ローカルストレージへの自動保存機能実装
<dd>ユーザー側での食品追加機能実装
<dd>選択食品リストのソート機能実装
<dt>210122<dt>
<dd>公開<dd>
</dl>

### 対応予定
* CSSの書式が酷すぎるので修正

----
### このアプリケーションについて
Vue CLI + Vuex + Vue Routerを使用して作成しています。

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
                                            └ PFCBlanceChart.vue
```

