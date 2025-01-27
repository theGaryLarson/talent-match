"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BrowseByCategory() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch only the base path
    router.prefetch("/page");
  }, [router]);

  return (
    <div>
      <h3 className="font-bold text-lg">Browse by Category</h3>
      <div className="grid grid-cols-2 gap-5 py-5 tablet:grid-cols-4">
        <Link
          className="text-red-500"
          prefetch={false}
          href={"/services/talent-search?search=Cloud+Computing"}
        >
          Cloud Computing
        </Link>
        <Link
          className="text-red-500"
          prefetch={false}
          href={"/services/talent-search?search=Cyber+Security"}
        >
          Cyber Security
        </Link>
        <Link
          className="text-red-500"
          prefetch={false}
          href={"/services/talent-search?search=Data+Analytics"}
        >
          Data Analyst
        </Link>
        <Link
          className="text-red-500"
          prefetch={false}
          href={"/services/talent-search?search=IT+Support"}
        >
          IT Support
        </Link>
        <Link
          className="text-red-500"
          prefetch={false}
          href={"/services/talent-search?search=Project+Management"}
        >
          Project Manag.
        </Link>
        <Link
          className="text-red-500"
          prefetch={false}
          href={"/services/talent-search?search=Software+Development"}
        >
          Software Dev
        </Link>
        <Link
          className="text-red-500"
          prefetch={false}
          href={"/services/talent-search?search=AI+Analytics"}
        >
          AI Analyst
        </Link>
        <Link
          className="text-red-500"
          prefetch={false}
          href={"/services/talent-search?search=UX+Research"}
        >
          UX Researcher
        </Link>
        <Link
          className="text-red-500"
          prefetch={false}
          href={"/services/talent-search?search=Machine+Learning"}
        >
          Machine Learning
        </Link>
        <Link
          className="text-red-500"
          prefetch={false}
          href={"/services/talent-search?search=UX+Designer"}
        >
          UX Designer
        </Link>
        <Link
          className="text-red-500"
          prefetch={true}
          href={"/underconstruction"}
        >
          Lorem Ipsum
        </Link>
        {/** change the prefetch to false if href is changed to a propper url */}
        <Link
          className="text-red-500"
          prefetch={true}
          href={"/underconstruction"}
        >
          Lorem Ipsum
        </Link>
        {/** change the prefetch to false if href is changed to a propper url */}
      </div>
    </div>
  );
}
