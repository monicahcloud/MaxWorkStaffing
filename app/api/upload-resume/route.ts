// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { put } from "@vercel/blob";
// import prisma from "@/lib/prisma";
// import pdfParse from "pdf-parse";
// import mammoth from "mammoth";
// import { parseResumeWithAffinda } from "@/lib/parseWithAffinda";

// import {
//   parseResumeWithAI,
//   saveParsedResumeData,
// } from "@/app/(dashboard)/editor/forms/action";
// import { mapAffindaToResumeValues } from "@/lib/utils";

// async function bufferFromFile(file: File) {
//   return Buffer.from(await file.arrayBuffer());
// }

// async function extractText(file: File): Promise<string> {
//   const buffer = await bufferFromFile(file);
//   const ext = file.name.split(".").pop()?.toLowerCase();

//   switch (ext) {
//     case "pdf": {
//       const { text } = await pdfParse(buffer);
//       return text;
//     }
//     case "doc":
//     case "docx": {
//       const { value } = await mammoth.extractRawText({ buffer });
//       return value;
//     }
//     case "txt":
//       return buffer.toString("utf-8");
//     default:
//       // ❗️Throwing an error instead of returning dummy string
//       throw new Error("Unsupported file type");
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = await auth();
//     if (!userId)
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const formData = await req.formData();
//     const file = formData.get("file") as File;

//     if (!file)
//       return NextResponse.json({ error: "No file provided" }, { status: 400 });

//     // ✅ 5MB File Size Limit
//     const MAX_SIZE = 5 * 1024 * 1024;
//     if (file.size > MAX_SIZE) {
//       return NextResponse.json(
//         { error: "File too large. Maximum size is 5MB." },
//         { status: 400 }
//       );
//     }
//     let parsedText: string;

//     try {
//       parsedText = await extractText(file);
//     } catch (extractErr) {
//       console.error("❌ Error extracting text:", extractErr);
//       return NextResponse.json(
//         { error: "Unsupported file type or failed to extract content." },
//         { status: 415 }
//       );
//     }
//     // ✅ Upload the original file to Vercel Blob Storage
//     const blob = await put(
//       `uploaded_resumes/${Date.now()}-${file.name}`,
//       file,
//       {
//         access: "public",
//       }
//     );

//     // ✅ Create resume record in the DB
//     const resume = await prisma.resume.create({
//       data: {
//         userId,
//         user: { connect: { clerkId: userId } },
//         resumeTitle: file.name,
//         uploadedFileUrl: blob.url,
//         isUploaded: true,
//         rawTextContent: parsedText,
//         parsedWith: "",
//       },
//     });
//     let parserUsed = "";
//     try {
//       const documentTypeId = process.env.AFFINDA_DOCUMENT_TYPE_ID; // or get from config/env
//       const affindaParsed = await parseResumeWithAffinda(file, documentTypeId);
//       parserUsed = "Affinda";
//       const resumeTypeIsFederal =
//   formData.get("template") === "Federal Resume"; // or however you flag it

// const mapped = mapAffindaToResumeValues(
//   affindaParsed,
//   resumeTypeIsFederal ? "federal" : "standard"
// );

// await saveParsedResumeData(resume.id, mapped);

//   //     const mapped = {
//   //       personalInfo: {
//   //         firstName: affindaParsed.name?.first ?? "",
//   //         lastName: affindaParsed.name?.last ?? "",
//   //         jobTitle: affindaParsed.profession ?? "",
//   //         email: affindaParsed.emails?.[0] ?? "",
//   //         phone: affindaParsed.phoneNumbers?.[0] ?? "",
//   //         address: affindaParsed.location?.text ?? "",
//   //         website: affindaParsed.websites?.[0] ?? "",
//   //         linkedin: affindaParsed.linkedin ?? "",
//   //         gitHub: "",
//   //       },
//   //       summary: affindaParsed.summary ?? "",
//   //       skills: (affindaParsed.skills ?? [])
//   //         .map((s: any) => s.name)
//   //         .filter((s: any) => !!s),

//   //       education:
//   //         affindaParsed.education?.map((e: any) => ({
//   //           degree: e.accreditation ?? e.degree?.name ?? e.major ?? "",
//   //           school: e.organization,
//   //           location: e.location?.text,
//   //           startDate: e.dates?.startDate,
//   //           endDate: e.dates?.endDate,
//   //           description: e.summary,
//   //         })) ?? [],
//   //       workExperience:
//   //         affindaParsed.workExperience?.map((w: any) => ({
//   //           position: w.jobTitle,
//   //           company: w.organization,
//   //           location: w.location?.text,
//   //           startDate: w.dates?.startDate,
//   //           endDate: w.dates?.endDate,
//   //           description: w.jobDescription,
//   //           status: "",
//   //           clearance: "",
//   //           duties: "",
//   //           responsibilities: "",
//   //           grade: "",
//   //           hours: "",
//   //         })) ?? [],
//   //       interests: affindaParsed.interests ?? [],
//   //     };

//   //     await saveParsedResumeData(resume.id, mapped);
//   //   } catch (affindaErr: any) {
//   //     console.error(
//   //       "❌ Affinda parsing failed:",
//   //       affindaErr?.response?.data || affindaErr?.message || affindaErr
//   //     );

//   //     const openaiParsed = await parseResumeWithAI(parsedText);
//   //     parserUsed = "OpenAI";

//   //     await saveParsedResumeData(resume.id, openaiParsed);
//   //   }
//   //   // ✅ Optionally update resume record with parser tag
//   //   console.log("Updating resume with:", {
//   //     id: resume.id,
//   //     parsedWith: parserUsed,
//   //   });
//   //   const checkResume = await prisma.resume.findUnique({
//   //     where: { id: resume.id },
//   //   });
//   //   console.log("Resume exists?", checkResume);
//   //   await prisma.resume.update({
//   //     where: { id: resume.id },
//   //     data: { parsedWith: parserUsed },
//   //   });
//   //   return NextResponse.json({
//   //     success: true,
//   //     url: blob.url,
//   //     resumeId: resume.id,
//   //     resumeType: "Uploaded",
//   //     resumeTitle: file.name,
//   //   });
//   // } catch (err) {
//   //   console.error("🔥 Error uploading resume:", err);
//   //   return NextResponse.json(
//   //     { error: "Internal Server Error" },
//   //     { status: 500 }
//     );
//  }
// }

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import prisma from "@/lib/prisma";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

import { parseResumeWithAffinda } from "@/lib/parseWithAffinda";
import { mapAffindaToResumeValues } from "@/lib/utils";
import {
  parseResumeWithAI,
  saveParsedResumeData,
} from "@/app/(dashboard)/editor/forms/action";

/* ---------- helpers ------------------------------------------------------ */

const bufferFromFile = async (file: File) =>
  Buffer.from(await file.arrayBuffer());

async function extractText(file: File): Promise<string> {
  const buffer = await bufferFromFile(file);
  const ext = file.name.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "pdf": {
      const { text } = await pdfParse(buffer);
      return text;
    }
    case "doc":
    case "docx": {
      const { value } = await mammoth.extractRawText({ buffer });
      return value;
    }
    case "txt":
      return buffer.toString("utf-8");
    default:
      throw new Error("Unsupported file type");
  }
}

/* ---------- route handler ------------------------------------------------ */

export async function POST(req: NextRequest) {
  try {
    /* 1. Auth guard -------------------------------------------------------- */
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* 2. Parse multipart form -------------------------------------------- */
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    /* 3. File-size gate ---------------------------------------------------- */
    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5 MB." },
        { status: 400 }
      );
    }

    /* 4. Extract raw text (needed for AI fallback) ------------------------ */
    let parsedText = "";
    try {
      parsedText = await extractText(file);
    } catch (err) {
      console.error("❌ extractText:", err);
      return NextResponse.json(
        { error: "Unsupported file type or failed to extract content." },
        { status: 415 }
      );
    }

    /* 5. Store original file in Vercel Blob ------------------------------ */
    const blob = await put(
      `uploaded_resumes/${Date.now()}-${file.name}`,
      file,
      {
        access: "public",
      }
    );

    /* 6. Create DB row (empty for now) ----------------------------------- */
    const resume = await prisma.resume.create({
      data: {
        userId,
        user: { connect: { clerkId: userId } },
        resumeTitle: file.name,
        uploadedFileUrl: blob.url,
        isUploaded: true,
        rawTextContent: parsedText,
        parsedWith: "", // set later
      },
    });

    // 7. Parse with Affinda ---------------------------------------------------
    let parserUsed = "Affinda";
    let mappedValues;

    try {
      /* 🔑 Choose doc-type ID based on template ----------------------------- */
      const resumeTemplate = (
        formData.get("template") as string | ""
      )?.toLowerCase();

      const standardId = process.env.AFFINDA_RESUME_DOC_TYPE_ID;
      const federalId = process.env.AFFINDA_FEDERAL_RESUME_ID;

      const documentTypeId =
        resumeTemplate === "federal resume"
          ? federalId || standardId
          : standardId;

      /* If neither env var is set, pass undefined so Affinda auto-detects */
      const affindaParsed = await parseResumeWithAffinda(file, documentTypeId);
      console.log("📦 Affinda parsed:", JSON.stringify(affindaParsed, null, 2));

      const mappedTemplate =
        resumeTemplate === "federal resume" ? "federal" : "standard";
      mappedValues = mapAffindaToResumeValues(affindaParsed, mappedTemplate);
    } catch (affindaErr) {
      /* 8. Fallback to OpenAI if Affinda fails ----------------------------- */
      console.error("❌ Affinda failed:", affindaErr);
      parserUsed = "OpenAI";
      mappedValues = await parseResumeWithAI(parsedText);
    }

    /* 9. Save structured data & tag parser ------------------------------- */
    await saveParsedResumeData(resume.id, mappedValues);
    await prisma.resume.update({
      where: { id: resume.id },
      data: { parsedWith: parserUsed },
    });

    /* 10. Respond to client ---------------------------------------------- */
    return NextResponse.json({
      success: true,
      url: blob.url,
      resumeId: resume.id,
      resumeType: "Uploaded",
      resumeTitle: file.name,
    });
  } catch (err) {
    console.error("🔥 POST /resume upload:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
