interface ChartHeaderComponent {
  title: string;
  text?: string;
}

export default function ChartHeader({ title, text }: ChartHeaderComponent) {
  return (
    <div className=" text-white px-3 h-16">
      <p className="font-medium">{title}</p>
      <p className="text-gray-1 text-sm mt-1">{text}</p>
    </div>
  );
}
