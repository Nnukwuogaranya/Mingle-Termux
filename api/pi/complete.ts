import type { VercelRequest, VercelResponse } from "@vercel/node";

const PI_API_BASE = "https://api.minepi.com/v2";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  const apiKey = process.env.PI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: "PI_API_KEY is not configured.",
    });
  }

  try {
    const { paymentId, txid } = req.body ?? {};

    if (
      typeof paymentId !== "string" ||
      paymentId.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        error: "paymentId is required.",
      });
    }

    if (
      typeof txid !== "string" ||
      txid.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        error: "txid is required.",
      });
    }

    const response = await fetch(
      `${PI_API_BASE}/payments/${encodeURIComponent(paymentId)}/complete`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${apiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          txid,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Pi payment completion failed:",
        response.status,
        data
      );

      return res.status(response.status).json({
        success: false,
        error: data?.error || "Pi payment completion failed.",
        details: data,
      });
    }

    return res.status(200).json({
      success: true,
      payment: data,
    });
  } catch (error) {
    console.error(
      "Pi payment completion server error:",
      error
    );

    return res.status(500).json({
      success: false,
      error: "Unable to complete Pi payment.",
    });
  }
}
