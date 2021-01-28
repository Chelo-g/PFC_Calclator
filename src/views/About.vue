<template>
  <div class="component">
    <ul class="list caution">
      <li>食事制限は辛くない範囲で行いましょう</li>
      <li>簡易計算摂取カロリーは体重*24kcalとしています</li>
      <li>栄養素が不足する場合はサプリメントで補いましょう(プロテイン、MCTオイル、マルチビタミン等)</li>
      <li>体重ではなく鏡に写った姿を評価しましょう</li>
      <li>ケトジェニックダイエットは以下の適正がない人は厳しいです</li>
    </ul>

    <h2>ケトジェニックダイエット適正チェックリスト</h2>
    <ul class="list keto">
      <li>調味料込みで炭水化物20g以下の生活を1ヶ月続けられる</li>
      <li>体脂肪率が15%以上</li>
      <li>お肉大好き</li>
      <li>同じ様な食事が1ヶ月続いても大丈夫</li>
      <li>自炊できる</li>
      <li>食費が約2倍になっても大丈夫</li>
    </ul>

    <div>
      <ul class="list date">
        <li>210128 <a href="https://element.eleme.io/">Element-UI</a> Version 追加</li>
        <li>210125 ローカルストレージ絡みのエラー対策を兼ね、食品リストリセットボタン設置</li>
        <li>210124 レシピの保存数増加</li>
        <li>210123 データの記録、食品追加機能等実装</li>
        <li>210121 作成</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.component{
  display:inline-block;
}

.list {
  padding: 0.5em 0.5em 0.5em 2em;/*ボックス内の余白*/
  border-top: solid 3px gray;
  border-bottom: solid 3px gray;
  line-height: 1.5; /*文の行高*/
  padding: 0.5em 0; /*前後の文との余白*/
  text-align: left;
    display:inline-block;

}
.keto{
  list-style-type: "\1F356";
}
.do{
  list-style-type: "\2615";
}
.caution{
  list-style-type: "\1F525";
}
.think{
  list-style-type: "\1F914";
}
.date{
  list-style-type: "\2712";

}
</style>