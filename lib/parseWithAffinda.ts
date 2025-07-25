// lib/affinda/parseWithAffinda.ts
import axios from "axios";

export async function parseResumeWithAffinda(
  file: File,
  documentTypeId?: string
) {
  console.log("📤 Starting Affinda upload...");

  const formData = new FormData();
  formData.append("file", file);

  const url =
    "https://api.affinda.com/v2/documents" +
    (documentTypeId ? `?documentType=${documentTypeId}` : "");

  const uploadResponse = await axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${process.env.AFFINDA_API_KEY}`,
      "Content-Type": "multipart/form-data",
    },
  });

  const documentId = uploadResponse.data.identifier;
  if (!documentId) {
    console.error("❌ No document identifier returned from Affinda.");
    throw new Error("No document identifier returned from Affinda.");
  }

  console.log(`📄 Affinda document uploaded. ID: ${documentId}`);
  console.log("🔑 Affinda key:", process.env.AFFINDA_API_KEY?.slice(0, 10));

  // Step 2: Poll until status is "ready"
  let attempts = 0;
  const maxAttempts = 20;
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  while (attempts < maxAttempts) {
    console.log(`🔄 Polling Affinda... attempt ${attempts + 1}`);

    const docResponse = await axios.get(
      `https://api.affinda.com/v2/documents/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AFFINDA_API_KEY}`,
        },
      }
    );

    const responseData = docResponse.data;
    const isReady = responseData?.meta?.ready === true;
    const hasFailed = responseData?.meta?.failed === true;

    console.log("📡 Affinda meta:", responseData.meta);

    if (hasFailed) {
      console.error(
        "❌ Affinda failed:",
        JSON.stringify(responseData.meta, null, 2)
      );
      throw new Error("Affinda failed to parse the document.");
    }

    if (isReady) {
      const parsedData = responseData.data;
      if (!parsedData || typeof parsedData !== "object") {
        console.error("⚠️ Affinda returned 'ready' but no data.");
        throw new Error("Affinda returned no parsed data.");
      }

      console.log("✅ Affinda parsing complete.");
      console.log(
        "📦 Affinda raw response:",
        JSON.stringify(responseData, null, 2)
      );
      console.log(
        "📦 Affinda raw response:",
        JSON.stringify(responseData, null, 2)
      );

      console.dir(parsedData, { depth: null });

      return parsedData; // ✅ Proper placement inside loop
    }

    // optional: log full document body for debugging
    console.log(
      "🧾 Full Affinda response snapshot:",
      JSON.stringify(responseData, null, 2)
    );

    attempts++;
    await delay(3000); // Wait 3s before retrying
  }

  console.error("⏰ Affinda polling timed out after max attempts.");
  throw new Error("Affinda parsing timed out.");
}
