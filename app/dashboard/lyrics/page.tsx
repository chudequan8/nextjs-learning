import { convertKanji } from '@/app/utils/kanji';

export default async function Page() {
  const result = await convertKanji(`
  黄昏（たそがれ）の街　君を見かけた
  あの日とまるで　変わらないその瞳（め）に
  記憶の隅（すみ）で　隠（かく）れてた想い
  時を超えて　呼び覚（さ）ますの

  「卒業（そつぎょう）してもかわらないから」
  いつもの君の　口癖（くちぐせ）だったけど
  移（うつ）ろう季節　流されるままに
  君の心を　見失った
  `);

  const result2 = await convertKanji(`
  黄昏の街　君を見かけた
  あの日とまるで　変わらないその瞳(め)に
  記憶の隅で　隠れてた想い
  時を超えて　呼び覚ますの
  「卒業してもかわらないから」
  いつもの君の　口癖だったけど
  移ろう季節　流されるままに
  君の心を　見失った
  教えて下さい　愛は刹那に咲いた夢なのですか？
  そう　ふたりの恋は　交わる事ない物語
  あの　夏の日に置き忘れた　祈りを解き放ちたい
  君から伸びる　細長い影
  踏まないように　ゆっくり追いかけた
  あの時ふたり　語り合ったのは
  今ここにあるはずの未来
  教えて下さい　面影残した日々は夢なのですか？
  そう　ふたりの恋は　胸から零れた砂時計
  あの　夏の日に言えなかった　言葉を取り戻したい
  何を信じたらいい？
  何も信じたくない
  逸れた心
  そう　ふたりの恋は　哀しみに染まる糸遊び
  あの　夏の日に帰れるなら　もう一度やり直したい
  黄昏の街　君を見かけた
  ほつれた糸は　二度と戻らないの…？
  `);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <pre dangerouslySetInnerHTML={{ __html: result }}></pre>
      </div>
      <div className="flex w-full items-center justify-between">
        <pre dangerouslySetInnerHTML={{ __html: result2 }}></pre>
      </div>
    </div>
  );
}
