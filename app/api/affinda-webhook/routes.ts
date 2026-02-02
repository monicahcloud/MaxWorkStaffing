// // app/api/affinda/webhook/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(req: NextRequest) {
//   try {
//     const payload = await req.json();

//     // ✅ Validate expected payload shape
//     const documentId = payload?.data?.identifier;
//     if (!documentId) {
//       console.error("❌ Invalid webhook payload: missing document ID");
//       return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
//     }

//     console.log("📩 Webhook received for document:", documentId);

//     // ✅ Re-fetch parsed data from Affinda
//     const affindaResponse = await axios.get(
//       `https://api.affinda.com/v2/documents/${documentId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.AFFINDA_API_KEY}`,
//         },
//       }
//     );

//     const parsedData = affindaResponse.data?.data;

//     if (!parsedData) {
//       console.error("❌ No parsed data found for document:", documentId);
//       return NextResponse.json({ error: "No parsed data" }, { status: 500 });
//     }

//     console.log("✅ Parsed data retrieved from Affinda:", parsedData);

//     // ✅ Update resume in your DB
//     const dbUpdateResponse = await fetch(
//       `${process.env.APP_URL}/api/resumes/update-from-affinda`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.INTERNAL_API_SECRET}`,
//         },
//         body: JSON.stringify({
//           documentId,
//           parsedData,
//         }),
//       }
//     );

//     if (!dbUpdateResponse.ok) {
//       throw new Error("Failed to update resume from webhook");
//     }

//     return NextResponse.json({ success: true });
//   } catch (err: any) {
//     console.error("❌ Webhook error:", err.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
