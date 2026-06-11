import MapApplicationForm from "./MapApplicationForm";

const deliverables = [
  "やめたい生き方と、残したいものの整理",
  "時間・お金・人間関係の小さな見直し",
  "明日から増やせる選択肢の候補",
  "最初の7日間にできる小さな手続き"
];

const steps = [
  ["1", "このページで申込", "いま退職したい生き方と、残したいものを送ってください。"],
  ["2", "受付窓口に届く", "内容はメールで通知され、あとから落ち着いて読める形で届きます。"],
  ["3", "PDFで受け取り", "大きな決断を急がせず、明日から少し軽くなる1枚のMapとしてお返しします。"]
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
        <h1 className="map-title">退職したあとに残すものを、1枚に整理します。</h1>
        <p className="map-lead">
          退職届で見えた不安や希望を、時間・お金・人間関係・家族・休み方に分けて整理します。
          <br />
          やめたい生き方を手放したあと、明日から何を残すかを決めるための個別PDFです。
        </p>

        <section className="map-section">
          <h2>お渡しするもの</h2>
          <div className="map-list">
            {deliverables.map((item) => (
              <div key={item} className="map-list-item">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="map-section">
          <h2>進み方</h2>
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

        <section className="map-section quiet">
          <h2>これは、現実の退職代行ではありません。</h2>
          <p>
            会社や学校を辞める手続きを代行するものではありません。
            まずは、続けたくない思考や習慣に名前をつけて、次に何を増やせるのかを落ち着いて見るための整理です。
          </p>
        </section>

        <MapApplicationForm />

        <a href="/" className="back-home-link">
          退職届の作成へ戻る
        </a>
      </section>
    </main>
  );
}
