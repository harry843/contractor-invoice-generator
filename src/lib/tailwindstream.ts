type Size =
  | "LETTER"
  | "LEGAL"
  | "TABLOID"
  | "LEDGER"
  | "A0"
  | "A1"
  | "A2"
  | "A3"
  | "A4"
  | "A5"
  | "A6"
  | "Letter"
  | "Legal"
  | "Tabloid"
  | "Ledger";

export type PayloadInput = {
  html: string;
  output?: "pdf" | "png" | "jpeg" | "webp";
  size?: Size | string; // e.g., "12x10in"
  scale?: number; // 1 - 6
  engine?: "handlebars" | "ejs";
  data?: Record<string, any>; // Required if engine is provided
  style?: string;
  scripts?: { src: string }[];
  links?: { href: string }[];
};

const apiUrl = `https://api.tailwindstream.io`;

/**
 * Utility to trigger a download in the browser from a Blob.
 */
export function downloadToBrowser(blob: Blob, invoiceNumber: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Invoice_${invoiceNumber}.${blob.type.split("/")[1]}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/**
 * Sends a POST request to initiate a download.
 */
export async function requestDownload(payload: PayloadInput) {
  const response = await fetch(`${apiUrl}/request`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  return (await response.json()) as { requestId?: string; error?: string };
}

interface DownloadResult {
  blob?: Blob;
  error?: string;
}

/**
 * Handles document download attempts with retries.
 */
export async function downloadDocument(
  requestId: string,
  { attempts = 10, interval = 2000 } = {}
): Promise<DownloadResult> {
  let attempt = 0;

  const downloadAttempt = async (): Promise<DownloadResult> => {
    try {
      const response = await fetch(`${apiUrl}/request/${requestId}/download`);
      if (response.ok) {
        const blob = await response.blob();
        console.log(await response.body)
        return { blob };
      } else if (attempt < attempts) {
        console.error("Download failed, retrying...");
        attempt++;
        await new Promise((resolve) => setTimeout(resolve, interval));
        return await downloadAttempt();
      } else {
        throw new Error("Maximum download attempts exceeded. Try again later.");
      }
    } catch (error) {
      return { error: error instanceof Error ? error.message : String(error) };
    }
  };

  return downloadAttempt();
}