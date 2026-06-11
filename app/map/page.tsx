import MapApplicationForm from "./MapApplicationForm";

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
          いま手放したいことと、本当は残したいものを整理して、1枚のPDFにしてお送りします。
          <br />
          入力は数分で終わります。大きな決断の前に、まず頭の中を軽くするための受付です。
        </p>

        <section className="pdf-sample" aria-labelledby="pdf-sample-title">
          <div className="pdf-sample-copy">
            <p className="section-label">PDFサンプル</p>
            <h2 id="pdf-sample-title">こんな形で届きます。</h2>
            <p>
              長いレポートではなく、あとから見返しやすい1枚です。
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

        <MapApplicationForm />

        <a href="/" className="back-home-link">
          退職届の作成へ戻る
        </a>
      </section>
    </main>
  );
}
