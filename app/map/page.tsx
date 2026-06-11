import MapApplicationForm from "./MapApplicationForm";

const steps = [
  ["1", "申込フォームを送る", "ニックネームとメールアドレス、整理したいことを送ります。"],
  ["2", "メールで確認する", "内容を見て、必要な確認があればメールで連絡します。"],
  ["3", "個別PDFを受け取る", "明日から何を残すか、1枚のMapにしてお返しします。"]
];

export default function MapPage() {
  return (
    <main className="app">
      <div className="soft-cloud cloud-a" />
      <div className="soft-cloud cloud-b" />

      <section className="map-screen">
        <div className="office-slip">
          <p className="office-kicker">未来の受付窓口</p>
          <p className="office-number">個別Map案内</p>
        </div>

        <p className="section-label map-label">One More Option Map</p>
        <h1 className="map-title">やめたい生き方のあとに、何を残すか。</h1>
        <p className="map-lead">
          One More Option Mapは、あなたの「退職したい生き方」と「本当は残したいもの」を整理する個別PDFです。
          <br />
          大きな決断を急がせるものではありません。明日から少し軽くなるための、1枚の地図を作ります。
        </p>

        <section className="map-section plain">
          <h2>このPDFで整理すること</h2>
          <ul className="map-simple-list">
            <li>いま退職したい生き方</li>
            <li>手放していい思考や習慣</li>
            <li>時間・お金・人間関係で見直すこと</li>
            <li>明日から7日間でできる小さな行動</li>
          </ul>
        </section>

        <section className="pdf-sample" aria-labelledby="pdf-sample-title">
          <div className="pdf-sample-copy">
            <p className="section-label">PDFサンプル</p>
            <h2 id="pdf-sample-title">こんな形で届きます。</h2>
            <p>
              長い診断レポートではなく、あとから見返しやすい1枚です。読むだけで、次にやることが一つ見えるように整えます。
            </p>
          </div>

          <div className="sample-sheet" aria-label="PDFサンプルのプレビュー">
            <p className="sample-kicker">One More Option Map</p>
            <h3>退職後に残すもの</h3>
            <div className="sample-row">
              <span>退職する生き方</span>
              <p>SNSを見て、自分にダメ出しする時間</p>
            </div>
            <div className="sample-row">
              <span>残すもの</span>
              <p>眠れる夜。自分のペース。大切な人との時間。</p>
            </div>
            <div className="sample-row">
              <span>最初の7日間</span>
              <p>寝る前にスマホを置く日を、まず1日だけ作る。</p>
            </div>
          </div>
        </section>

        <section className="map-section">
          <h2>申込から受け取りまで</h2>
          <div className="map-steps">
            {steps.map(([number, title, text]) => (
              <div key={number} className="map-step">
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <MapApplicationForm />

        <a href="/" className="back-home-link">
          退職届の作成へ戻る
        </a>
      </section>
    </main>
  );
}
