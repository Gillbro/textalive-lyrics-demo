const { Player } = TextAliveApp;

// プレイヤー初期化
const player = new Player({
  app: { token: "DBpm9URW5K9ED1vL" }, // トークンは公式サイトで取得
  mediaElement: document.createElement("audio"),
  mediaBannerPosition: "bottom right"
});

// 歌詞表示エリア
const lyricsContainer = document.getElementById("lyrics");
let activeChars = [];

// 曲読み込み完了時
player.addListener({
  onAppReady: () => {
    // テスト用楽曲（TextAlive公式提供曲）
    if (!player.video) {
      player.createFromSongUrl("https://piapro.jp/t/RoPB/20220122172830"
      });
    }
  },

  // 歌詞データ読み込み時
  onVideoReady: () => {
    console.log("Video data ready");
  },

  // 再生位置が変わったとき
  onTimeUpdate: (position) => {
    const char = player.video && player.video.findChar(position);
    if (char && !activeChars.includes(char)) {
      activeChars.push(char);
      showChar(char);
    }
  }
});

// 文字アニメーション
function showChar(char) {
  const span = document.createElement("span");
  span.textContent = char.text;
  span.className = "char";
  lyricsContainer.appendChild(span);

  // GSAPでフェード＋バウンス
  gsap.to(span, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "bounce.out"
  });

  // 行末で改行
  if (char.next && char.next.startTime - char.endTime > 200) {
    lyricsContainer.appendChild(document.createElement("br"));
  }
}

