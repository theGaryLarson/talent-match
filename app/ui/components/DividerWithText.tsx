interface Props {
  children: React.ReactNode,
}

export default function DividerWithText({
  children,
}: Props){
  return (
    <div className="relative py-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-b border-gray-300"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-4 text-sm text-gray-500">{children}</span>
      </div>
    </div>
  );
}