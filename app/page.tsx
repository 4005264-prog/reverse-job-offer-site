"use client";

import { useMemo, useState } from "react";

type Step = "intro" | "form" | "result";

type Answers = {
  concern: string;
  dependence: string;
  protect: string[];
  quitPattern: string;
  options: string[];
  strengths: string;
  halfYear: string;
};

type Question =
  | {
      id: keyof Answers;
      label: string;
      type: "textarea";
      placeholder: string;
    }
  | {
      id: keyof Answers;
      label: string;
      type: "select";
      options: string[];
    }
  | {
      id: keyof Answers;
      label: string;
      type: "checkbox";
      options: string[];
    };

const googleFormUrl = "https://forms.gle/REPLACE_WITH_YOUR_GOOGLE_FORM";

const initialAnswers: Answers = {
  concern: "",
  dependence: "",
  protect: [],
  quitPattern: "",
  options: [],
  strengths: "",
  halfYear: ""
};

const questions: Question[] = [
  {
    id: "concern",
    label: "今の仕事や生活で、いちばん不安に感じていることは何ですか？",
    type: "textarea",
    placeholder: "例：このまま今の会社だけで生きていけるのか不安"
  },
  {
    id: "dependence",
    label: "今の会社や環境に、どれくらい依存していると感じますか？",
    type: "select",
    options: ["かなり依存している", "少し依存している", "あまり依存していない", "分からない"]
  },
  {
    id: "protect",
    label: "あなたが守りたいものは何ですか？",
    type: "checkbox",
    options: ["家族", "収入", "時間", "健康", "自分の可能性", "今の仕事", "安心感", "その他"]
  },
  {
    id: "quitPattern",
    label: "もう続けたくない生き方は何ですか？",
    type: "textarea",
    placeholder: "例：会社の評価だけで自分の価値を決める生き方"
  },
  {
    id: "options",
    label: "これから増やしたい選択肢は何ですか？",
    type: "checkbox",
    options: [
      "会社以外の収入源",
      "他社でも通用するスキル",
      "家族と話せる未来",
      "副業",
      "転職の準備",
      "学習習慣",
      "発信",
      "時間の余裕",
      "分からない"
    ]
  },
  {
    id: "strengths",
    label: "これまでの経験で、他でも使えそうなものは何ですか？",
    type: "textarea",
    placeholder: "例：接客、教える力、継続力、ITの知識、現場経験"
  },
  {
    id: "halfYear",
    label: "半年後、どんな状態になっていたいですか？",
    type: "textarea",
    placeholder: "例：今の会社に残るとしても、会社以外の選択肢を1つ持っていたい"
  }
];

const shareText =
  "未来の自分から、\n求人票が届きました。\n\n会社を辞めたいわけじゃない。\nでも、今の会社だけに未来を預けたくない。\n\n#人生の逆求人票";

function hasAny(value: string, words: string[]) {
  return words.some((word) => value.includes(word));
}

function chooseJobTitle(answers: Answers) {
  const text = `${answers.concern} ${answers.quitPattern} ${answers.strengths} ${answers.halfYear}`;

  if (answers.options.includes("会社以外の収入源") || answers.options.includes("副業") || answers.protect.includes("収入")) {
    return "収入源を一つにしない人";
  }

  if (answers.protect.includes("家族") || answers.options.includes("家族と話せる未来")) {
    return "家族を守るために逃げ道を作る人";
  }

  if (hasAny(text, ["評価", "価値", "肩書き"])) {
    return "自分の価値を会社だけに預けない人";
  }

  if (hasAny(text, ["我慢", "無理", "耐える", "つらい"])) {
    return "我慢を仕事にしない人";
  }

  if (hasAny(text, ["後回し", "自分の人生", "自分のため"])) {
    return "自分の人生を後回しにしない人";
  }

  if (answers.options.includes("転職の準備") || answers.dependence === "かなり依存している") {
    return "今の仕事を続けながら外を見る人";
  }

  if (answers.dependence === "分からない" || answers.options.includes("分からない")) {
    return "情報不足を能力不足だと思わない人";
  }

  if (answers.options.includes("他社でも通用するスキル") || answers.options.includes("学習習慣")) {
    return "会社に残っても選べる人";
  }

  if (hasAny(text, ["知らない", "外", "世界"])) {
    return "見たことのない世界を見に行く人";
  }

  return "会社以外にも選択肢を持つ会社員";
}

function sentence(value: string, fallback: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.replace(/[。.\s]+$/g, "") : fallback;
}

function listOrFallback(values: string[], fallback: string) {
  return values.length > 0 ? values.join("、") : fallback;
}

function buildOffer(answers: Answers) {
  const title = chooseJobTitle(answers);
  const concern = sentence(answers.concern, "今の会社だけに未来を預ける不安");
  const quitPattern = sentence(answers.quitPattern, "会社の評価だけで自分の価値を決める生き方");
  const options = listOrFallback(answers.options, "会社以外の選択肢");
  const protect = listOrFallback(answers.protect, "安心感");
  const strengths = sentence(answers.strengths, "これまで積み重ねてきた経験");
  const halfYear = sentence(answers.halfYear, "会社に残るとしても、会社以外の選択肢を1つ持っている状態");

  return [
    "求人票",
    "",
    "募集職種：",
    title,
    "",
    "募集元：",
    "半年後のあなた",
    "",
    "仕事内容：",
    "今の仕事を続けながら、外の世界を少しずつ見ること。",
    `${quitPattern}から距離を取ること。`,
    `${protect}を守るために、${options}を増やすこと。`,
    "",
    "必須条件：",
    "今すぐ辞めようとしないこと。",
    "でも、外を見ることを後回しにしないこと。",
    `${concern}をごまかさず、言葉にすること。`,
    "",
    "歓迎条件：",
    `${strengths}を、今の場所だけで終わらせないこと。`,
    "小さく試すことを怖がりすぎないこと。",
    "",
    "勤務地：",
    "今の会社。",
    "自宅。",
    "まだ見たことのない世界。",
    "",
    "報酬：",
    "少し増えた安心感。",
    "家族や自分に話せる未来。",
    "会社に残るとしても、選べる自分。",
    "",
    "試用期間：",
    "今日から7日間。",
    "",
    "最初の仕事：",
    `${halfYear}に近づくために、今週中に会社以外の選択肢を1つだけ調べること。`
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
    <button type="button" onClick={copyText} className="copy-button">
      {copied ? "コピーしました" : children}
    </button>
  );
}

export default function Home() {
  const [step, setStep] = useState<Step>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const offer = useMemo(() => buildOffer(answers), [answers]);
  const question = questions[current];
  const progress = Math.round(((current + 1) / questions.length) * 100);

  function updateText(id: keyof Answers, value: string) {
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

  function next() {
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
      {step === "intro" && (
        <section className="screen intro">
          <p className="eyebrow">人生の逆求人票</p>
          <h1 className="hero-title">
            会社を辞めたい
            <br />
            わけじゃない。
            <span>
              でも、
              <br />
              今の会社だけに
              <br />
              未来を預けたくない。
            </span>
          </h1>
          <p className="lead">
            {
              "人生の逆求人票は、\n未来の自分があなたに出している求人票を作る無料ジェネレーターです。\n\n今すぐ辞めるためではなく、\nもう一つの選択肢を考えるための小さな診断です。"
            }
          </p>
          <div className="stats">
            <span className="stat">7問</span>
            <span className="stat">無料</span>
            <span className="stat">保存なし</span>
          </div>
          <button type="button" onClick={() => setStep("form")} className="primary-button">
            求人票を作る
          </button>
        </section>
      )}

      {step === "form" && (
        <section className="screen form-screen">
          <header>
            <div className="topbar">
              <button type="button" onClick={back} className="back-button">
                ← 戻る
              </button>
              <div className="progress-copy">
                <p className="question-count">
                  Question {current + 1} / {questions.length}
                </p>
                <p className="progress-number">{progress}% complete</p>
              </div>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </header>

          <div className="question-area">
            <div>
              <p className="section-label">future job brief</p>
              <h2 className="question-title">{question.label}</h2>
              <div className="input-zone">
                {question.type === "textarea" && (
                  <textarea
                    value={answers[question.id] as string}
                    onChange={(event) => updateText(question.id, event.target.value)}
                    placeholder={question.placeholder}
                    rows={6}
                    className="textarea"
                  />
                )}

                {question.type === "select" && (
                  <div className="option-grid">
                    {question.options.map((option) => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => updateText(question.id, option)}
                        className={`option-button ${answers.dependence === option ? "selected" : ""}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {question.type === "checkbox" && (
                  <div className="option-grid two">
                    {question.options.map((option) => {
                      const values = answers[question.id];
                      const selected = Array.isArray(values) && values.includes(option);
                      return (
                        <button
                          type="button"
                          key={option}
                          onClick={() => toggleValue(question.id, option)}
                          className={`option-button ${selected ? "selected" : ""}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button type="button" onClick={next} className="primary-button">
            {current === questions.length - 1 ? "求人票を生成する" : "次へ"} →
          </button>
        </section>
      )}

      {step === "result" && (
        <section className="result">
          <p className="eyebrow">人生の逆求人票</p>
          <h1 className="result-title">求人票が届きました。</h1>
          <p className="note">
            これは実在する求人ではありません。
            <br />
            未来の選択肢を考えるための診断コンテンツです。
          </p>

          <article className="card">
            <div className="card-head">
              <p className="eyebrow">fictional job posting</p>
              <p className="card-sub">from your future self</p>
            </div>
            <pre className="offer">{offer}</pre>
          </article>

          <div className="actions">
            <CopyButton text={offer}>コピーする</CopyButton>
            <CopyButton text={shareText}>Xでシェア文をコピー</CopyButton>
            <button type="button" onClick={restart} className="ghost-button">
              もう一度作る
            </button>
          </div>

          <section className="cta">
            <p className="eyebrow">One More Option Map</p>
            <h2>求人票を作ったあなたへ。</h2>
            <p className="cta-text">
              {
                "求人票は、きっかけです。\nでも、本当に必要なのは、次に何を増やすかを決めることです。\n\n仕事・収入・家族・スキル・不安を整理して、\n次に増やすべき選択肢を1枚のPDFにする\nOne More Option Mapを準備しています。"
              }
            </p>
            <a href={googleFormUrl} target="_blank" rel="noreferrer" className="cta-link">
              個別Mapを申し込む
            </a>
            <p className="small-note">現在はテスト版です。申込はGoogleフォームで受け付けています。</p>
          </section>
        </section>
      )}
    </main>
  );
}
