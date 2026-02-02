/* app/(dashboard)/jobsearch/types.ts */
export interface Job {
  id: string | number;
  title: string;
  company: string; // 🆕
  location: string;
  type: string;
  salaryMin?: number; // 🆕 raw numbers
  salaryMax?: number; // 🆕
  salaryDisplay: string; // nicely formatted range / “N/A”
  posted: string;
  description: string;
  requirements: string[];
  category: string;
  url: string; // 🆕 redirect_url
}

export interface Filters {
  keyword?: string;
  state?: string;
  city?: string;
  category?: string;
}
