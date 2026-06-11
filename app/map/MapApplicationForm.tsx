"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const focusOptions = [
  "時間の使い方",
  "お金の不安",
  "人間関係",
  "夫婦・恋人のこと",
  "家族・子育て",
  "仕事・学び",
  "休み方"
];

export default function MapApplicationForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function submitApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/map-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "送信できませんでした。少し時間をおいてもう一度お試しください。");
      }

      form.reset();
      setState("success");
      setMessage(result.message || "受付が完了しました。控えとして、入力いただいたメールアドレスにも届きます。");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "送信できませんでした。少し時間をおいてもう一度お試しください。");
    }
  }

  return (
    <section className="application-panel" aria-labelledby="application-title">
      <p className="section-label">申込受付</p>
      <h2 id="application-title">個別Mapを申し込む</h2>
      <p className="application-lead">
        必要なことだけ送ってください。受付後、確認のメールをお送りします。
      </p>

      <form onSubmit={submitApplication} className="application-form">
        <label className="form-field">
          <span>ニックネーム</span>
          <input name="name" type="text" autoComplete="name" placeholder="ニックネームでも大丈夫です" required />
        </label>

        <label className="form-field">
          <span>メールアドレス</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </label>

        <label className="form-field">
          <span>いちばん整理したいこと</span>
          <select name="focus" defaultValue="" required>
            <option value="" disabled>
              選択してください
            </option>
            {focusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>いまの状態に近いもの</span>
          <select name="pace" defaultValue="" required>
            <option value="" disabled>
              選択してください
            </option>
            <option value="まず話を整理したい">まず話を整理したい</option>
            <option value="何から始めるか決めたい">何から始めるか決めたい</option>
            <option value="自分だけでは考えがまとまらない">自分だけでは考えがまとまらない</option>
            <option value="少し急いでいる">少し急いでいる</option>
          </select>
        </label>

        <label className="form-field">
          <span>補足</span>
          <textarea
            name="note"
            rows={5}
            placeholder="退職したい生き方、残したいもの、気になっていることなど"
          />
        </label>

        <label className="form-field honeypot" aria-hidden="true">
          <span>会社名</span>
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>

        <button type="submit" disabled={state === "submitting"} className="paper-button primary application-submit">
          {state === "submitting" ? "受付中です" : "この内容で申し込む"}
        </button>
      </form>

      {message && (
        <p className={`form-message ${state === "success" ? "success" : "error"}`} role="status">
          {message}
        </p>
      )}

      <p className="small-note">
        現在はテスト版です。送信内容は個別Map作成の連絡にだけ使います。
      </p>
    </section>
  );
}
