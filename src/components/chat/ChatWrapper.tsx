"use client";

import {
    ChevronLeft,
    ChevronLeftCircle,
    ChevronRightCircle,
    Loader2,
    XCircle,
} from "lucide-react";

import ChatInput from "./ChatInput";
import { trpc } from "@/app/_trpc/client";
import Messages from "./Messages";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { ChatContextProvider } from "./ChatContext";
import { PLANS } from "@/config/stripe";

interface ChatWrapperProps {
    fileId: string;
    isSubscribed: boolean;
}

const ChatWrapper = ({ fileId, isSubscribed }: ChatWrapperProps) => {
    const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
        {
            fileId,
        },
        {
            refetchInterval: (data) =>
                data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
        }
    );

    if (isLoading)
        return (
            <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
                <div className="flex-1 flex justify-center items-center flex-col mb-28">
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                        <h3 className="font-semibold text-xl">Loading...</h3>
                        <p className="text-zinc-500 text-sm">
                            We&apos;re preparing your PDF.
                        </p>
                    </div>
                </div>

                <ChatInput isDisabled />
            </div>
        );

    if (data?.status === "PROCESSING")
        return (
            <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
                <div className="flex-1 flex justify-center items-center flex-col mb-28">
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                        <h3 className="font-semibold text-xl">Processing PDF...</h3>
                        <p className="text-zinc-500 text-sm">This won&apos;t take long.</p>
                    </div>
                </div>

                <ChatInput isDisabled />
            </div>
        );

    if (data?.status === "FAILED")
        return (
            <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
                <div className="flex-1 flex justify-center items-center flex-col mb-28">
                    <div className="flex flex-col items-center gap-2">
                        <XCircle className="h-8 w-8 text-red-500" />
                        <h3 className="font-semibold text-xl">Too many pages in PDF</h3>
                        <p className='text-zinc-500 text-sm'>
                            Your{' '}
                            <span className='font-medium'>
                                {isSubscribed ? 'Pro' : 'Free'}
                            </span>{' '}
                            plan supports up to{' '}
                            {isSubscribed ? "16" : "4"} MB and {' '}
                            {isSubscribed
                                ? PLANS.find((p) => p.name === 'Pro')
                                    ?.pagesPerPdf
                                : PLANS.find((p) => p.name === 'Free')
                                    ?.pagesPerPdf}{' '}
                            pages per PDF.
                        </p>
                        <div className="flex">
                            <Link
                                href="/dashboard"
                                className={`
                                    ${buttonVariants({
                                    variant: "secondary",
                                    className: "mt-4 mr-4",
                                })}
                                hover:text-red-600
                            `}
                            >
                                <ChevronLeftCircle className="h-3 w-3 mr-1.5" />
                                Back
                            </Link>
                            <Link
                                href="/pricing"
                                className={`
                                ${buttonVariants({
                                    variant: "secondary",
                                    className: "mt-4",
                                })}
                                text-green-500 hover:text-green-600
                            `}
                            >
                                Check our Plan
                                <ChevronRightCircle className="h-3 w-3 ml-1.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <ChatInput isDisabled />
            </div>
        );

    return (
        <ChatContextProvider fileId={fileId}>
            <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
                <div className="flex-1 justify-between flex flex-col mb-28">
                    <Messages fileId={fileId} />
                </div>

                <ChatInput />
            </div>
        </ChatContextProvider>
    );
};
export default ChatWrapper;
