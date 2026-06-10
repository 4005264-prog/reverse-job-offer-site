const googleFormUrl = "https://forms.gle/REPLACE_WITH_YOUR_GOOGLE_FORM";

const deliverables = [
  "今の仕事・収入・家族・不安の整理",
  "これまでの経験の言い換え",
  "次に増やす選択肢の候補",
  "最初の7日間にできる小さな行動"
];

const steps = [
  ["1", "Googleフォームに記入", "今の状況や不安、増やしたい選択肢を送ってください。"],
  ["2", "内容を読んで整理", "転職を急がせず、今の生活を残したまま考えられる形に整えます。"],
  ["3", "PDFで受け取り", "あとから見返せる1枚のMapとしてお返しします。"]
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
        <h1 className="map-title">次に増やす選択肢を、1枚に整理します。</h1>
        <p className="map-lead">
          求人票で見えた不安や希望を、仕事・収入・家族・スキル・時間に分けて整理します。
          <br />
          今の会社に残るとしても、ほかの選択肢を持てるようにするための個別PDFです。
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
          <h2>これは、転職サービスではありません。</h2>
          <p>
            求人紹介や転職のあっせんではありません。今すぐ会社を辞めるためのものでもありません。
            まずは、今の自分に何があり、次に何を増やせるのかを落ち着いて見るための整理です。
          </p>
        </section>

        <a href={googleFormUrl} target="_blank" rel="noreferrer" className="cta-link">
          Googleフォームで申し込む
        </a>
        <p className="small-note">現在はテスト版です。申込はGoogleフォームで受け付けています。</p>
        <a href="/" className="back-home-link">
          求人票作成へ戻る
        </a>
      </section>
    </main>
  );
}
