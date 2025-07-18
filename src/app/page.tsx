'use client'

import Image from "next/image";
import FadeIn from "@/components/misc/fade-in";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { toast } from "sonner"
import { redirect, RedirectType } from "next/navigation";

const FormSchema = z.object({
  handle: z.string(),
})

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      handle: "",
    },
  })
 
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetch(`/api/get-id?handle=${data.handle}`);

    const res_data = await res.json();
    const channels = res_data.result;

    if (channels === undefined) {
      toast.error(
        "No channels found",
        { style: { color: "red" } }
      );
      return;
    }

    if (channels.length == 1) {
      alert(channels)
      redirect(
        `/channel/${channels[0]}`,
        RedirectType.push
      );
    }
  }

  return (
    <main className="font-mono grid items-center justify-items-center h-screen">
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
              Youtube Analytics
            </h1>
            <h4 className="w-full text-center mt-4 mb-2">
              copy the handle of any youtube channel to display recent statistics
            </h4>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="handle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="w-full flex gap-4 items-center">
                        <Input className="w-full" placeholder="Youtube handle" {...field}></Input>
                        <Button className="cursor-pointer" type="submit">
                          <Search/>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </Card>
      </FadeIn>
    </main>
  );
}
