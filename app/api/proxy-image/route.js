// app/api/proxy-image/route.js

import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "Image URL parameter is required" },
      { status: 400 },
    );
  }

  try {
    // For development, disable SSL verification
    const fetchOptions = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
      },
    };

    // In development, bypass SSL issues
    if (process.env.NODE_ENV === "development") {
      process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    }

    console.log(`Fetching image: ${imageUrl}`);
    const response = await fetch(imageUrl, fetchOptions);

    if (!response.ok) {
      console.error(
        `Failed to fetch image: ${response.status} ${response.statusText}`,
      );
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status}` },
        { status: response.status },
      );
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    console.log(
      `Successfully fetched image: ${imageUrl}, size: ${imageBuffer.byteLength} bytes`,
    );

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Proxy image error:", error.message);
    return NextResponse.json(
      { error: `Proxy error: ${error.message}` },
      { status: 500 },
    );
  }
}
