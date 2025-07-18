'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import FadeIn from "@/components/misc/fade-in";

export default function Channel({ params }: {params: Promise<{ id: string }> }) {
  const [loading, setLoading] = useState<boolean>(true);

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const loadPage = async () => {
      setId((await params).id);

      // ...

      setLoading(false);
    }

    loadPage();
  }, [])

  return (
      <main className="font-mono grid items-center justify-items-center h-screen">
        {(loading !== null) ?
          <FadeIn>
            <Card className="px-12 py-12 w-128">
              <Image
                className="mx-auto"
                width="100"
                height="100"
                src="/statistics.png"
                alt="statistics"
              />
              <div className="w-full">
                <h1 className="w-full text-center text-3xl font-bold">
                  {id}
                </h1>
              </div>
            </Card>
          </FadeIn>
          :
          <></>
        }
    </main>
  );
}
