// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const romanfield = document.getElementById('roman');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typecount = document.getElementById('typecount')

// 複数のテキストを格納する配列
const textLists = [
['アイウエオ','aiueo'],
['カキクケコ','kakikukeko'],
['サシスセソ','sasisuseso'],
['タチツテト','tatituteto'],
['ナニヌネノ','naninuneno'],
['ハヒフヘホ','hahifuheho'],
['マミムメモ','mamimumemo'],
['ヤユヨ','yayuyo'],
['ラリルレロ',"rarirurero"],
['ワヲン','wawo n']
]

//「タイピングカウンター」を非表示にする
typecount.style.display = 'none';

// ランダムなテキストを表示
const createText = () => {

// 正タイプした文字列をクリア
typed = '';
typedfield.textContent = typed;

//配列のインデックス数からランダムな数値を生成する
let random = Math.floor(Math.random() * textLists.length);
console.log(random);
// 配列からランダムにテキストを取得し画面に表示する
untyped = textLists[random][1];
untypedfield.textContent = untyped;
roman = textLists[random][0];
romanfield.textContent = roman;
};

// キー入力の判定（イベントオブジェクトは"e"や
//eventという引数が使われる。
const keyPress = e => {
// 誤タイプの場合
if(e.key !== untyped.substring(0, 1)) {
  wrap.classList.add('mistyped'); 
  // 100ms後に背景色を元に戻す
  setTimeout(() => {
    wrap.classList.remove('mistyped');
  }, 100);
  return;
}

// 正タイプの場合
// スコアのインクリメント
score++;
typecount.innerHTML = score ;
wrap.classList.remove('mistyped');
typed += untyped.substring(0, 1);
untyped = untyped.substring(1);
typedfield.textContent = typed;
untypedfield.textContent = untyped;

// テキストがなくなったら新しいテキストを表示
  if(untyped === '') {createText();}
};

// タイピングスキルのランクを判定
const rankCheck = score => {
// テキストを格納する変数を作る
let text = ''; 
// スコアに応じて異なるメッセージを変数textに格納する
if(score < 100) {
  text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
} else if(score < 200) {
  text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
} else if(score < 300) {
  text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
} else if(score >= 300) {
  text = `あなたのランクはSです。\nおめでとうございます!`;    
}
// 生成したメッセージと一緒に文字列を返す
return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
clearInterval(id);

// タイムアップと表示してから確認ダイアログを表示する
setTimeout(() => {
  typedfield.style.display = 'none';
  untypedfield.textContent = 'タイムアップ！';

 // 確認ダイアログをさらにその後に表示
setTimeout(() => {  
const result = confirm(rankCheck(score));

// OKボタンをクリックされたらリロードする
if(result == true) {
    window.location.reload();
      }
    }, 500); // 0.5秒後にダイアログを表示
  }, 10); // 0.01秒後にタイムアップを表示
};

// カウントダウンタイマー
const timer = () => {
// タイマー部分のHTML要素（p要素）を取得する
let time = count.textContent;
const id = setInterval(() => {
// カウントダウンする
time--;
count.textContent = time;

// カウントが0になったらタイマーを停止する
if (time <= 0) {
  gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {

// カウントダウンタイマーを開始する  
timer();

// ランダムなテキストを表示する
createText();

// 「スタート」ボタンを非表示にする
start.style.display = 'none';

// 「タイピングカウンター」を表示する
typecount.style.display = "block";

// キーボードのイベント処理
document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';