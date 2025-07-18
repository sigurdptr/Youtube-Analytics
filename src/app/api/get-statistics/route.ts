import { NextRequest, NextResponse } from "next/server";
const {google} = require('googleapis');
const youtube = google.youtube('v3');

type APIResponse = {
  result?: null | object,
  error?: null | string
}

export async function GET(req: NextRequest): Promise<NextResponse<APIResponse>> {
  try {
    const channel_id = req.nextUrl.searchParams.get("id");

    if (channel_id === null) {
      return NextResponse.json({error: "No handle provided"})
    }

    const res = await youtube.channels.list({
      auth: process.env.API_KEY,
      part: "brandingSettings,contentDetails,contentOwnerDetails,id,localizations,snippet,statistics,status,topicDetails",
      id: channel_id
    });

    return NextResponse.json({result: res.data.items[0]})
  }
  catch (err) {
    console.error(err)
    return NextResponse.json({ 
      error: "Error occurred fetching data"
    })
  }
}