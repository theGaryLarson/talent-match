"use client";

import "@/app/ui/components/carousel.css";
import { Children, ReactNode, useState } from "react";
import { Radio } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Carousel({ children }: { children: ReactNode }) {
  const { push } = useRouter();
  // TODO: maybe get the initial value from the URL hash if available... though that assumes only one carousel per page...
  const [selectedValue, setSelectedValue] = useState(1);

  return (
    <div className="slider">
      <div className="slides">
        {Children.map(children, (child, index) => (
          <div
            id={"slide-" + (index + 1)}
            key={index}
            onClick={() => {
              setSelectedValue(index + 1);
              push("#slide-" + (index + 1));
            }}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-4">
        {Children.map(children, (child, index) => (
          <Radio
            value={index + 1}
            name={"carousel-radios"}
            onChange={(event) => {
              setSelectedValue(index + 1);
              push("#slide-" + (index + 1));
            }}
            checked={selectedValue === index + 1}
          />
        ))}
      </div>
    </div>
  );
}
