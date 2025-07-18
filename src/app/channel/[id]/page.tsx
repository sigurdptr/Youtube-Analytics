'use client'

import FadeIn from "@/components/misc/fade-in";
import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import { Loader2Icon, OctagonAlert } from "lucide-react";

export default function ChannelDashboard({ params }: {params: Promise<{ id: string }> }) {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadPage = async () => {
      const channelId = (await params).id;

      const res = await fetch(`/api/get-statistics?id=${channelId}`);
      const res_data = await res.json();
      
      if (res_data.result === undefined) {
        console.error(res_data.error);
        setError(true);
        return;
      }

      setData(res_data.result);
    }

    loadPage();
  }, [])

  function formatNumber(number: number): string {
    const formatter = Intl.NumberFormat(
      "en",
      { notation: "compact" }
    );
    
    return formatter.format(number);
  }

  return (
      <main className="font-mono grid items-center justify-items-center h-screen">
        {(data === null) ?
          <Card className="min-w-26 min-h-26 flex flex-col justify-center">
            {(error) ?
              <div className="flex flex-row mx-6">
                <OctagonAlert
                  className="my-auto w-8 h-8"
                  color="red"
                />
                <h1 className="text-xl my-auto ml-4">Error fetching data</h1>
              </div>
              :
              <Loader2Icon className="mx-auto animate-spin w-10 h-10" />
            }
          </Card>
          :
          <FadeIn>
            <Card className="max-w-288 flex flex-col px-8">
              <div className="w-full flex flex-row justify-between">
                <div className="flex my-auto w-[35%]">
                  <Separator className="my-auto pt-1"/>
                  <Separator orientation="vertical" className="pr-1 py-4"/>
                </div>
                <h1 className="my-auto">{data.snippet.title}</h1>
                <div className="flex my-auto w-[35%]">
                  <Separator orientation="vertical" className="pl-1 py-4"/>
                  <Separator className="my-auto pt-1"/>
                </div>
              </div>
              {
                (data.brandingSettings?.image?.bannerExternalUrl !== undefined) ?
                  <img
                    className="rounded-xl"
                    src={`${data.brandingSettings.image.bannerExternalUrl}=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
                  />
                  :
                  <></>
              }
              <div className="grid grid-flow-col gap-4">
                <Card className="px-8 w-64 h-32">
                  <CardTitle>Total subscribers</CardTitle>
                  <CardContent className="px-0">
                    <h1 className="font-bold text-3xl">
                      {
                        (data.statistics.hiddenSubscriberCount) ? "Hidden"
                        : formatNumber(data.statistics.subscriberCount)
                      }
                    </h1>
                  </CardContent>
                </Card>
                <Card className="px-8 w-64 h-32">
                  <CardTitle>Total views</CardTitle>
                  <CardContent className="px-0">
                    <h1 className="font-bold text-3xl">
                      {formatNumber(data.statistics.viewCount)}
                    </h1>
                  </CardContent>
                </Card>
                <Card className="px-8 w-64 h-32">
                  <CardTitle>Total Videos</CardTitle>
                  <CardContent className="px-0">
                    <h1 className="font-bold text-3xl">
                      {formatNumber(data.statistics.videoCount)}
                    </h1>
                  </CardContent>
                </Card>
                <Card className="px-8 w-64 h-32">
                  <CardTitle>Total subscribers</CardTitle>
                  <CardContent className="px-0">
                    <h1 className="font-bold text-3xl">
                      {formatNumber(data.statistics.subscriberCount)}
                    </h1>
                  </CardContent>
                </Card>
              </div>
            </Card>
          </FadeIn>
        }
    </main>
  );
}
