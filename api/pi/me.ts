import type { VercelRequest, VercelResponse } from "@vercel/node";

const PI_ME_ENDPOINT = "https://api.minepi.com/v2/me";

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
    const { accessToken } = req.body ?? {};

    if (
      typeof accessToken !== "string" ||
      accessToken.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        error: "Pi access token is required.",
      });
    }

    const response = await fetch(PI_ME_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Pi identity verification failed:",
        response.status,
        data
      );

      return res.status(response.status).json({
        success: false,
        error: "Pi authentication could not be verified.",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        uid: data.uid,
        username: data.username,
      },
    });
  } catch (error) {
    console.error(
      "Pi verification server error:",
      error
    );

    return res.status(500).json({
      success: false,
      error: "Unable to verify Pi authentication.",
    });
  }
}
