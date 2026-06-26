export async function onRequestPost(context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  try {
    const { request, env } = context;
    const formData = await request.formData();

    const name = formData.get("name") || "";
    const company = formData.get("company") || "";
    const email = formData.get("email") || "";
    const projectType = formData.get("projectType") || "";
    const exhaustPower = formData.get("exhaustPower") || "";
    const freshPower = formData.get("freshPower") || "";
    const message = formData.get("message") || "";

    const content = `New Website Inquiry
Name:${name}
Company:${company}
Client Email:${email}
Project:${projectType}
Exhaust Power:${exhaustPower}kW
Fresh Air Power:${freshPower}kW
Message:${message}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "form@aicooks-dckv.com",
        to: ["jimmy@hedy.com.cn"],
        subject: "New Inquiry from Website",
        text: content
      })
    });

    const result = await res.json();
    if (result.id) {
      return new Response(JSON.stringify({ success: true }), { headers });
    } else {
      return new Response(JSON.stringify({ success: false }), { headers });
    }
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { headers });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS"
    }
  });
}
