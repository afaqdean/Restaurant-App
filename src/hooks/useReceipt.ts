import { useMutation } from "@tanstack/react-query";

interface DownloadReceiptParams {
  orderId: string;
}

export function useReceipt() {
  const downloadReceipt = useMutation({
    mutationFn: async ({ orderId }: DownloadReceiptParams) => {
      console.log("Starting receipt download for order:", orderId);

      const response = await fetch(`/api/orders/${orderId}/receipt`);
      console.log("Receipt API response status:", response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error("Receipt API error:", error);
        throw new Error(error.error || "Failed to download receipt");
      }

      // Get the filename from the Content-Disposition header
      const contentDisposition = response.headers.get("Content-Disposition");
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]?.replace(/"/g, "")
        : `receipt-${orderId}.pdf`;

      console.log("Receipt filename:", filename);

      // Convert response to blob
      const blob = await response.blob();
      console.log("Receipt blob size:", blob.size, "bytes");

      if (blob.size === 0) {
        throw new Error("Received empty PDF file");
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("Receipt download initiated successfully");
    },
  });

  return {
    downloadReceipt: downloadReceipt.mutate,
    isDownloading: downloadReceipt.isPending,
    error: downloadReceipt.error,
  };
}
