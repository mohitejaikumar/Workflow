"use client";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { useToast } from "../../../components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DualRing from "../../../../public/DualRing";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const res: any = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (res.error) {
      toast({
        title: (
          <div className=" flex gap-2 items-center font-bold">
            <CircleX color="#ff1f1f" />
            Error
          </div>
        ) as any,
        description: res.error,
      });
    } else {
      router.replace("/dashboard/home");
    }
  }

  return (
    <>
      <div className=" text-black text-4xl font-semibold py-4">
        Welcome to <span className="text-[#4B44DE]">Workflo</span>!
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className=" bg-[#edecf5fa] text-[#908f97fa] font-medium text-lg "
                    placeholder="Your Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    className="bg-[#edecf5fa] text-[#908f97fa] font-medium text-lg"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className=" w-full bg-custom-blue-gradient p-3 text-lg font-medium"
            type="submit"
          >
            {form.formState.isSubmitting ? (
              <div className="flex justify-center items-center gap-2">
                <DualRing />
                Logging in
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
      <div className=" text-gray-400 flex gap-2 font-normal">
        Don&apos;t have an account?
        <button
          type="button"
          onClick={() => router.push("/auth/signup")}
          className=" text-cyan-400 font-semibold cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default Page;