import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";

const PI_API =
  "https://api.minepi.com/v2";

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

  try {
    const { paymentId } =
      req.body ?? {};

    if (
      typeof paymentId !== "string" ||
      paymentId.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Pi payment ID is required.",
      });
    }

    const apiKey =
      process.env.PI_API_KEY;

    if (!apiKey) {
      console.error(
        "PI_API_KEY is not configured."
      );

      return res.status(500).json({
        success: false,
        error:
          "Pi API key is not configured.",
      });
    }

    const response = await fetch(
      `${PI_API}/payments/${encodeURIComponent(
        paymentId
      )}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${apiKey}`,
          "Content-Type":
            "application/json",
          Accept: "application/json",
        },
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      console.error(
        "Pi payment approval failed:",
        response.status,
        data
      );

      return res.status(
        response.status
      ).json({
        success: false,
        error:
          data?.error ||
          "Pi payment approval failed.",
      });
    }

    return res.status(200).json({
      success: true,
      payment: data,
    });
  } catch (error) {
    console.error(
      "Pi approval server error:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        "Unable to approve Pi payment.",
    });
  }
}
