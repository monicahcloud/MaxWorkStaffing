// // app/api/jobs/route.ts
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const url = new URL(request.url);
//   const query = url.searchParams.get("query") || "developer";
//   const location = url.searchParams.get("location") || "London";

//   const API_KEY = process.env.ADZUNA_API_KEY;
//   const API_URL = "https://api.adzuna.com/v1/api/jobs/gb/search/1";

//   try {
//     const response = await fetch(
//       `${API_URL}?app_key=${API_KEY}&what=${query}&where=${location}`
//     );
//     const data = await response.json();

//     if (data.error) {
//       return NextResponse.json(
//         { error: "Failed to fetch jobs from Adzuna" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(data.results);
//   } catch {
//     return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
//   }
// }
// app/api/jobs/route.ts (Next.js 13/14 App Router)
// app/api/jobs/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.jobspikr.com/v2/jobsearch?country=USA",
      {
        headers: {
          client_id: process.env.NEXT_PUBLIC_PIKR_CLIENT_ID!,
          auth_key: process.env.NEXT_PUBLIC_PIKR_CLIENT_AUTH_KEY!,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("JobsPikr API error:", errorData);
      return NextResponse.json(
        { error: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    );
  }
}
