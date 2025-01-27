"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function DeleteJobPostingButton(params: { id: string }) {
  const router = useRouter();
  const save = async () => {
    try {
      const response = await fetch(`/api/joblistings/delete/${params.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      router.refresh();
      const data = await response.json();
      console.log("Job post DELETED successfully:", data);
      return data;
    } catch (error) {
      console.error("Error saving job post:", error);
    }
  };
  return (
    <button
      className="px-3 rounded-full hover:bg-slate-200 text-xs flex flex-col justify-center items-center"
      onClick={save}
    >
      <TrashIcon width={20} /> Delete
    </button>
  );
}
