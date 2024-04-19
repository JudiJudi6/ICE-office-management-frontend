"use client";

import NavMobile from "@/components/features/nav/NavMobile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathName = usePathname();

  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 3;

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className=" flex justify-start items-start">
        {pathName !== "/view/creator" && (
          <div className="hidden lg:block pt-16 p-4 w-[250px] h-screen border-solid border-r border-r-slate-200">
            <NavMobile loginBtns={false} />
          </div>
        )}
        <div className="overflow-x-auto flex-grow h-screen">{children}</div>
      </div>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            zIndex: 1000,
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
          className:
            "text-dark",
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
