import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const query = body.query;

  // Simple AI simulation (we will upgrade later)
  const result = {
    originalQuery: query,
    extracted: {
      product: "unknown",
      location: "unknown",
    },
    matches: [
      {
        name: "Sample Buyer 1",
        location: "Nairobi",
        product: "General Goods",
      },
      {
        name: "Sample Buyer 2",
        location: "Kisumu",
        product: "Agricultural Products",
      },
    ],
  };

  return NextResponse.json(result);
}
