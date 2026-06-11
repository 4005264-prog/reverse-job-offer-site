type ApplicationPayload = {
  name?: unknown;
  email?: unknown;
  focus?: unknown;
  pace?: unknown;
  note?: unknown;
  company?: unknown;
};

const maxLengths = {
  name: 80,
  email: 160,
  focus: 80,
  pace: 80,
  note: 1200
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function line(label: string, value: string) {
  return `${label}: ${value || "未記入"}`;
}

export async function POST(request: Request) {
  let payload: ApplicationPayload;

  try {
    payload = (await request.json()) as ApplicationPayload;
  } catch {
    return Response.json({ message: "送信内容を読み取れませんでした。" }, { status: 400 });
  }

  if (clean(payload.company, 120)) {
    return Response.json({ message: "受付が完了しました。" });
  }

  const name = clean(payload.name, maxLengths.name);
  const email = clean(payload.email, maxLengths.email);
  const focus = clean(payload.focus, maxLengths.focus);
  const pace = clean(payload.pace, maxLengths.pace);
  const note = clean(payload.note, maxLengths.note);

  if (!name || !email || !focus || !pace) {
    return Response.json({ message: "必須項目を入力してください。" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return Response.json({ message: "メールアドレスの形式を確認してください。" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.MAP_REQUEST_TO_EMAIL;
  const from = process.env.MAP_REQUEST_FROM_EMAIL || "未来の受付窓口 <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return Response.json(
      { message: "受付フォームは準備中です。メール送信設定が完了してからもう一度お試しください。" },
      { status: 503 }
    );
  }

  const submittedAt = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  const text = [
    "One More Option Map の申込が届きました。",
    "",
    line("受付日時", submittedAt),
    line("お名前", name),
    line("メールアドレス", email),
    line("整理したいこと", focus),
    line("いまの状態", pace),
    "",
    "補足:",
    note || "未記入"
  ].join("\n");

  const html = `
    <div style="font-family: sans-serif; line-height: 1.8; color: #35414b;">
      <h1 style="font-size: 20px;">One More Option Map の申込が届きました。</h1>
      <p>${escapeHtml(line("受付日時", submittedAt))}</p>
      <p>${escapeHtml(line("お名前", name))}</p>
      <p>${escapeHtml(line("メールアドレス", email))}</p>
      <p>${escapeHtml(line("整理したいこと", focus))}</p>
      <p>${escapeHtml(line("いまの状態", pace))}</p>
      <h2 style="font-size: 16px;">補足</h2>
      <p style="white-space: pre-wrap;">${escapeHtml(note || "未記入")}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `個別Map申込: ${name}さん`,
      text,
      html
    })
  });

  if (!response.ok) {
    return Response.json(
      { message: "メール送信に失敗しました。設定を確認してください。" },
      { status: 502 }
    );
  }

  return Response.json({ message: "受付が完了しました。入力いただいた内容を確認して、メールでご連絡します。" });
}
