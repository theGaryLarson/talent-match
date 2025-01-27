"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  className?: string;
}

export default function SignupFooter({ className = "" }: Props) {
  return (
    <footer
      className={
        "text-center py-4 bg-primary-50 w-full absolute bottom-0 " + className
      }
    >
      <p className="pb-4">Not ready to create an account?</p>
      <Link className="text-blue-500 underline" href="/">
        Learn how TWC works
      </Link>
    </footer>
  );
}
