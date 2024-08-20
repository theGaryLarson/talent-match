import type { CustomFlowbiteTheme } from "flowbite-react";
import { Progress } from "flowbite-react";

interface Props {
  progress: number,
  [key: string]: any,
}

const customTheme: CustomFlowbiteTheme["progress"] = {
  base: "bg-gray-200 rounded-none",
  bar: "rounded-none",
};

export default function ProgressBarFlat({
  progress,
  ...rest
}: Props){
  return (
    <Progress theme={customTheme} progress={progress} {...rest} />
  );
}