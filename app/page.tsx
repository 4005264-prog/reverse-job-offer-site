"use client";

import { useMemo, useState } from "react";

type Step = "intro" | "form" | "result";

type Answers = {
  target: string;
  drains: string[];
  feeling: string;
  relationships: string[];
  escape: string;
  keep: string[];
  tomorrow: string;
};

type Question = {
  id: keyof Answers;
  label: string;
  sub?: string;
  type: "single" | "multi";
  options: string[];
};

const initialAnswers: Answers = {
  target: "",
  drains: [],
  feeling: "",
  relationships: [],
  escape: "",
  keep: [],
  tomorrow: ""
};

const questions: Question[] = [
  {
    id: "target",
    label: "いま、いちばん退職したい生き方はどれですか？",
    sub: "まずは一つだけ選んでください。",
    type: "single",
    options: [
      "SNSを見て、他人の人生と比べ続ける生き方",
      "コンビニや通販で、疲れをお金でごまかす生き方",
      "元恋人や過去の失敗を、何度も頭の中で再生する生き方",
      "仕事や学校の評価で、自分の価値を決める生き方",
      "家族・恋人・友人の機嫌を、先回りして背負う生き方",
      "ちゃんと休まず、平気なふりを続ける生き方",
      "子育てや家事を一人で抱え込み、助けを求めない生き方"
    ]
  },
  {
    id: "drains",
    label: "最近、あなたの時間や心を削っているものは？",
    sub: "近いものをいくつでも選べます。",
    type: "multi",
    options: [
      "寝る前のSNS",
      "目的のない動画やショート動画",
      "なんとなく買うコンビニ・カフェ・通販",
      "既読・未読・返信のこと",
      "将来のお金やキャリアの不安",
      "夫婦・恋人との小さなすれ違い",
      "育児・家事・仕事の終わらなさ"
    ]
  },
  {
    id: "feeling",
    label: "その生き方を続けていると、どんな気持ちになりますか？",
    type: "single",
    options: [
      "自分だけ置いていかれている感じ",
      "何もしていないのに疲れている感じ",
      "お金も時間も少しずつ漏れていく感じ",
      "誰かに怒られそうで落ち着かない感じ",
      "本音を言う前に飲み込んでしまう感じ",
      "いい親・いいパートナーでいなきゃと思う感じ"
    ]
  },
  {
    id: "relationships",
    label: "人との関係で、もうやめたいことは？",
    sub: "恋愛、家族、夫婦、友人、職場のどれでも大丈夫です。",
    type: "multi",
    options: [
      "嫌われないために、すぐ謝ること",
      "相手の反応を見て、自分の予定を変えること",
      "元恋人の近況を見に行ってしまうこと",
      "夫婦や恋人なのに、一人で我慢すること",
      "親や家族の期待を、自分の予定より優先すること",
      "子どものためと言いながら、自分を消すこと"
    ]
  },
  {
    id: "escape",
    label: "しんどい時、ついやってしまう逃げ方は？",
    type: "single",
    options: [
      "SNSや動画を見続ける",
      "甘いもの、酒、コンビニで気分を変える",
      "眠れないまま考え続ける",
      "予定を詰めて、感じないようにする",
      "誰にも言わずに一人で処理する",
      "大丈夫なふりをして笑う"
    ]
  },
  {
    id: "keep",
    label: "退職したあとも、残したいものは何ですか？",
    type: "multi",
    options: [
      "自分のペース",
      "大切な人との時間",
      "お金の安心",
      "眠れる夜",
      "好きなものを楽しむ気持ち",
      "仕事や学びへの前向きさ",
      "子どもや家族に向けるやさしさ"
    ]
  },
  {
    id: "tomorrow",
    label: "明日から、どんな自分に戻りたいですか？",
    type: "single",
    options: [
      "少しだけスマホから離れられる自分",
      "小さな出費の前に、一度立ち止まれる自分",
      "過去より今日の予定を見られる自分",
      "相手の機嫌より、自分の本音を確認できる自分",
      "全部を一人で抱えず、助けを一つ頼める自分",
      "ちゃんと休むことに罪悪感を持たない自分"
    ]
  }
];

const shareText =
  "人生の退職代行に、\nやめたい生き方の退職をお願いしました。\n\nもう、全部を背負わなくていい。\n明日から少しだけ、自分に戻る。\n\n#人生の退職代行";

const targetProfiles: Record<string, { title: string; retired: string; reason: string; firstTask: string }> = {
  "SNSを見て、他人の人生と比べ続ける生き方": {
    title: "比較残業から退勤する人",
    retired: "他人の投稿を、自分の遅れの証拠にする勤務",
    reason: "見なくてもいい人生まで見すぎて、あなたの今日が薄くなっていたため",
    firstTask: "寝る前のSNSを15分だけ短くし、代わりに明日の予定を一つだけ見ること。"
  },
  "コンビニや通販で、疲れをお金でごまかす生き方": {
    title: "小さな浪費に休職届を出せる人",
    retired: "疲れを全部、レジとカートに預ける勤務",
    reason: "本当にほしかったのは物ではなく、少し休める時間だったため",
    firstTask: "今日買う前に一度だけ立ち止まり、『これは休みの代わり？』と聞いてみること。"
  },
  "元恋人や過去の失敗を、何度も頭の中で再生する生き方": {
    title: "過去の再放送を終了できる人",
    retired: "終わった場面を、毎晩もう一度見に行く勤務",
    reason: "反省は終わっていて、これ以上あなたを責める必要がないため",
    firstTask: "思い出しそうになったら、今日やる小さな予定を一つだけ声に出すこと。"
  },
  "仕事や学校の評価で、自分の価値を決める生き方": {
    title: "評価表の外へ帰る人",
    retired: "点数、肩書き、反応だけで自分を査定する勤務",
    reason: "評価は一部の情報であって、あなたそのものではないため",
    firstTask: "今日できたことを、誰かの評価抜きで一つだけメモすること。"
  },
  "家族・恋人・友人の機嫌を、先回りして背負う生き方": {
    title: "機嫌の係を辞める人",
    retired: "相手の顔色を見て、自分の予定を後ろに下げる勤務",
    reason: "やさしさと自己犠牲を、同じものにしなくていいため",
    firstTask: "一つだけ、自分の予定を変えずに残すこと。"
  },
  "ちゃんと休まず、平気なふりを続ける生き方": {
    title: "平気なふりを退職する人",
    retired: "限界を感じても、まだ大丈夫と言い続ける勤務",
    reason: "休むことは甘えではなく、明日を守る手続きだから",
    firstTask: "今日は10分だけ、何もしない時間を予定として置くこと。"
  },
  "子育てや家事を一人で抱え込み、助けを求めない生き方": {
    title: "全部ひとり係を降りる人",
    retired: "家庭のことを、黙って一人で回し続ける勤務",
    reason: "家族を大切にすることと、自分を消すことは別だから",
    firstTask: "一つだけ、具体的な家事や育児を誰かに頼むこと。"
  }
};

function selectedList(values: string[], fallback: string) {
  return values.length > 0 ? values.join("、") : fallback;
}

function answerValue(answers: Answers, id: keyof Answers) {
  const value = answers[id];
  if (Array.isArray(value)) return value.length > 0 ? value.join("、") : "";
  return value;
}

function isSelected(answers: Answers, question: Question, option: string) {
  const value = answers[question.id];
  return Array.isArray(value) ? value.includes(option) : value === option;
}

function chooseProfile(answers: Answers) {
  return targetProfiles[answers.target] ?? targetProfiles[questions[0].options[0]];
}

function buildReason(answers: Answers) {
  const profile = chooseProfile(answers);
  const drains = selectedList(answers.drains, "毎日の小さな疲れ");
  const relationships = selectedList(answers.relationships, "言葉にしづらい人間関係の負担");
  return [
    profile.reason,
    `あわせて、「${drains}」と「${relationships}」が、静かに心の余白を減らしていたため。`
  ].join("\n");
}

function buildRetirementNotice(answers: Answers) {
  const profile = chooseProfile(answers);
  const drains = selectedList(answers.drains, "毎日の小さな疲れ");
  const relationships = selectedList(answers.relationships, "言葉にしづらい人間関係の負担");
  const keep = selectedList(answers.keep, "自分のペース");
  const feeling = answers.feeling || "何もしていないのに疲れている感じ";
  const escape = answers.escape || "大丈夫なふりをして笑う";
  const tomorrow = answers.tomorrow || "ちゃんと休むことに罪悪感を持たない自分";

  return [
    "退職受理通知",
    "",
    "退職者：",
    "今日までがんばってきたあなた",
    "",
    "退職対象：",
    profile.retired,
    "",
    "退職理由：",
    buildReason(answers),
    "",
    "本日付で終了する業務：",
    `・「${feeling}」を、あなたの性格のせいにすること。`,
    `・「${escape}」だけで、しんどさを処理しようとすること。`,
    `・「${drains}」に、今日の残り時間を全部渡すこと。`,
    "",
    "引き継がなくていいもの：",
    "・他人の人生の進み具合。",
    "・返事が遅い理由の深読み。",
    "・昔の自分への終わらないダメ出し。",
    "・家庭や関係を守るために、自分だけが消える役目。",
    "",
    "残していくもの：",
    `・${keep}。`,
    `・「${tomorrow}」に戻りたいという、小さくて本当の希望。`,
    "・ちゃんと疲れたと言っていい権利。",
    "",
    "退職後の最初の手続き：",
    profile.firstTask,
    "",
    "受付窓口：",
    "未来の受付窓口",
    "",
    "備考：",
    "これは現実の退職代行ではありません。",
    "でも、やめたい生き方に名前をつけるための小さな手続きです。"
  ].join("\n");
}

function CopyButton({ text, children }: { text: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  async function copyText() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button type="button" onClick={copyText} className="paper-button secondary">
      {copied ? "コピーしました" : children}
    </button>
  );
}

export default function Home() {
  const [step, setStep] = useState<Step>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const notice = useMemo(() => buildRetirementNotice(answers), [answers]);
  const question = questions[current];
  const profile = chooseProfile(answers);
  const progress = Math.round(((current + 1) / questions.length) * 100);

  function choose(id: keyof Answers, value: string) {
    setAnswers((currentAnswers) => ({ ...currentAnswers, [id]: value }));
  }

  function toggleValue(id: keyof Answers, value: string) {
    setAnswers((currentAnswers) => {
      const values = currentAnswers[id];
      if (!Array.isArray(values)) return currentAnswers;
      return {
        ...currentAnswers,
        [id]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
      };
    });
  }

  function answer(questionToAnswer: Question, option: string) {
    if (questionToAnswer.type === "multi") {
      toggleValue(questionToAnswer.id, option);
      return;
    }

    choose(questionToAnswer.id, option);
  }

  function canGoNext() {
    return answerValue(answers, question.id).length > 0;
  }

  function next() {
    if (!canGoNext()) return;

    if (current === questions.length - 1) {
      setStep("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrent((value) => value + 1);
  }

  function back() {
    if (current === 0) {
      setStep("intro");
      return;
    }

    setCurrent((value) => value - 1);
  }

  function restart() {
    setAnswers(initialAnswers);
    setCurrent(0);
    setStep("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="app">
      <div className="soft-cloud cloud-a" />
      <div className="soft-cloud cloud-b" />

      {step === "intro" && (
        <section className="screen intro">
          <div className="office-slip">
            <p className="office-kicker">未来の受付窓口</p>
            <p className="office-number">退職受付 0007</p>
          </div>

          <h1 className="hero-title">
            人生の
            <br />
            退職代行。
            <span>
              もう、
              <br />
              やめたい生き方に
              <br />
              辞表を出す。
            </span>
          </h1>

          <p className="lead">
            {
              "SNSを見すぎること。\n小さな無駄遣いで疲れをごまかすこと。\n過去の恋や、家族や、仕事のことで自分を責め続けること。\n\nあなたがやめたい生き方の退職を、未来の受付窓口がそっと承ります。"
            }
          </p>

          <button type="button" onClick={() => setStep("form")} className="paper-button primary">
            退職を依頼する
          </button>
        </section>
      )}

      {step === "form" && (
        <section className="screen form-screen">
          <header className="form-header">
            <div className="topbar">
              <button type="button" onClick={back} className="back-button">
                ← 戻る
              </button>
              <div className="progress-copy">
                <p className="question-count">
                  受付 {current + 1} / {questions.length}
                </p>
                <p className="progress-number">{progress}% 確認済み</p>
              </div>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </header>

          <div className="question-paper">
            <p className="section-label">退職届の確認</p>
            <h2 className="question-title">{question.label}</h2>
            {question.sub && <p className="question-sub">{question.sub}</p>}

            <div className="input-zone">
              <div className="option-grid">
                {question.options.map((option) => {
                  const selected = isSelected(answers, question, option);
                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() => answer(question, option)}
                      className={`option-button ${selected ? "selected" : ""}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button type="button" onClick={next} disabled={!canGoNext()} className="paper-button primary">
            {current === questions.length - 1 ? "退職を受理してもらう" : "次の質問へ"} →
          </button>
        </section>
      )}

      {step === "result" && (
        <section className="result">
          <div className="office-slip">
            <p className="office-kicker">未来の受付窓口</p>
            <p className="office-number">受理済</p>
          </div>

          <h1 className="result-title">退職を承りました。</h1>
          <p className="note">
            これは現実の退職代行ではありません。
            <br />
            あなたがもう続けなくていい生き方に、名前をつけるための診断です。
          </p>

          <article className="result-card">
            <div className="stamp">受理</div>
            <div className="card-head">
              <p className="section-label">{profile.title}</p>
              <p className="card-sub">life resignation notice</p>
            </div>
            <pre className="offer">{notice}</pre>
          </article>

          <div className="actions">
            <CopyButton text={notice}>コピーする</CopyButton>
            <CopyButton text={shareText}>Xでシェア文をコピー</CopyButton>
            <button type="button" onClick={restart} className="paper-button secondary">
              もう一度依頼する
            </button>
          </div>

          <section className="cta">
            <p className="section-label">次の手続き</p>
            <h2>退職届を出したあなたへ。</h2>
            <p className="cta-text">
              {
                "やめたい生き方が見えたら、次は何を残して、何を増やすかを決める番です。\n\n時間・お金・人間関係・家族・休み方を整理して、明日からの小さな選択肢を1枚にまとめる One More Option Map を準備しています。"
              }
            </p>
            <a href="/map" className="cta-link">
              個別Mapの案内を見る
            </a>
            <p className="small-note">現在はテスト版です。申込はGoogleフォームで受け付けています。</p>
          </section>
        </section>
      )}
    </main>
  );
}
