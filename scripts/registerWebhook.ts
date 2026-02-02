// scripts/registerWebhook.ts
import axios from "axios";
import "dotenv/config"; // 👈 Load env variables

async function registerAffindaWebhook() {
  try {
    const res = await axios.post(
      "https://api.affinda.com/v2/webhooks",
      {
        event: "document.parsed",
        targetUrl: "https://maxresumebuilder/api/affinda/webhook",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AFFINDA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Webhook registered:", res.data);
  } catch (err) {
    console.error("❌ Failed to register webhook:", err);
  }
}

registerAffindaWebhook();
