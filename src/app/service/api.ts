"use server";

export type RequestSwitchData = {
  x_mm: number;
  y_mm: number;
  rotation_deg: number;
  ref: string;
  size: number;
};

export type GeneratedZip = {
  filename: string;
  base64: string;
  contentType: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "http://localhost:8080";

export const generateData = async (
  switches: RequestSwitchData[]
): Promise<GeneratedZip> => {
  const payload = { switches, units: "mm" };
  const res = await fetch(`${API_BASE}/api/v1/pcb/generate-design-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/zip,application/octet-stream",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status} ${text}`);
  }
  const contentType = res.headers.get("Content-Type") || "application/zip";

  const arrayBuf = await res.arrayBuffer();
  const base64 = Buffer.from(arrayBuf).toString("base64");

  // Force fixed filename
  const filename = "design-data.zip";
  return { filename, base64, contentType };
};
