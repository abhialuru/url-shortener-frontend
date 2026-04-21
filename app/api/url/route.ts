import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { originalUrl } = await req.json();

    const backendRes = await fetch(`${process.env.BACKEND_URL}/api/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl }),
    });

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: "Failed to shorten URL" },
        { status: backendRes.status },
      );
    }

    const data = await backendRes.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
