// lib/affinda/parseWithAffinda.ts
import axios from "axios";

export async function parseResumeWithAffinda(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    "https://api.affinda.com/v2/resumes",
    formData,
    {
      headers: {
        Authorization: `Bearer ${process.env.AFFINDA_API_KEY}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  const { data } = response;
  const parsedData = data.data;

  if (!parsedData) throw new Error("No parsed data returned by Affinda");

  return parsedData;
}
