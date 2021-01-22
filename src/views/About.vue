<template>
  <div class="component">
    <ul class="list caution">
      <li>食事制限は辛くない範囲で行いましょう</li>
      <li>簡易計算摂取カロリーは体重*24kcalとしています</li>
      <li>栄養素が不足する場合はサプリメントで補いましょう(プロテイン、MCTオイル、マルチビタミン等)</li>
      <li>体重ではなく鏡に写った姿を評価しましょう</li>
      <li>ケトジェニックダイエットは以下の適正がない人は厳しいです</li>
    </ul>

    <h2>雑なケトジェニックダイエット適正チェック</h2>
    <ul class="list keto">
      <li>調味料込みで炭水化物20g以下の生活を1ヶ月続けられる</li>
      <li>体脂肪率が15%以上</li>
      <li>お肉大好き</li>
      <li>同じ様な食事が1ヶ月続いても大丈夫</li>
      <li>自炊できる</li>
      <li>食費が約2倍になっても大丈夫</li>
    </ul>

     <h2>飽きる前に対応したいリスト</h2>
    <ul class="list do">
      <li>サプリ(ビタミン剤、イヌリン、デキストリン)の追加</li>
      <li>ユーザー側でのPFCのみのアイテム追加。(Vue.setで行けるはず)</li>
      <li>長い名前の食品の処理(2行になるので一定文字数はフォントサイズを変える)</li>
    </ul>

    <h3>作ってて思ったこと</h3>
    <ul class="list think">
      <li>DBっぽい処理は他に手法ある気がした</li>
      <li>Excelってすごいね</li>
      <li>Vue-Router活用してないね</li>
    </ul>

    <div>
      <ul class="list date">
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