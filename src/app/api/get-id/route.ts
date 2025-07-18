import { NextRequest, NextResponse } from "next/server";
const {google} = require('googleapis');
const youtube = google.youtube('v3');

type APIResponse = {
  result?: null | string[],
  error?: null | string
}

export async function GET(req: NextRequest): Promise<NextResponse<APIResponse>> {
  try {
    
    const handle = req.nextUrl.searchParams.get("handle");

    if (handle === null) {
      return NextResponse.json({error: "No handle provided"})
    }

    const res = await youtube.channels.list({
      auth: process.env.API_KEY,
      part: "id",
      forHandle: handle
    });

    const id_results = [];
    for (let item of res.data.items) {
      id_results.push(item.id);
    }

    return NextResponse.json({result: id_results})
  }
  catch (err) {
    console.error(err)
    return NextResponse.json({ 
      error: "Error occurred fetching data"
    })
  }
}