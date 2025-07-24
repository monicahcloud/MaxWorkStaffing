// // lib/affinda/parseWithAffinda.ts
// import axios from "axios";

// export async function parseResumeWithAffinda(file: File) {
//   const formData = new FormData();
//   formData.append("file", file);

//   const response = await axios.post(
//     "https://api.affinda.com/v2/resumes",
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.AFFINDA_API_KEY}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   const { data } = response;
//   const parsedData = data.data;

//   if (!parsedData) throw new Error("No parsed data returned by Affinda");

//   return parsedData;
// }
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
    throw new Error("No document identifier returned from Affinda");
  }

  console.log(`📄 Affinda document uploaded. ID: ${documentId}`);
  console.log("Affinda key:", process.env.AFFINDA_API_KEY?.slice(0, 10));

  // Step 2: Poll until status is "ready"
  let parsedData;
  let responseData: any; // 👈 Fix here
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

    responseData = docResponse.data;
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
      parsedData = docResponse.data.data; // ✅ FIX HERE
      console.log("✅ Affinda parsing complete.");
      console.dir(parsedData, { depth: null });
      break;
    }
    console.log(
      "🧾 Full Affinda document response:",
      JSON.stringify(docResponse.data, null, 2)
    );

    if (!parsedData) {
      console.error("⏰ Affinda parsing timed out.");
      throw new Error("Affinda parsing timed out.");
    }

    return parsedData; // ✅ make sure this is here
  }
  attempts++;
  await delay(3000); // wait 3s
}
