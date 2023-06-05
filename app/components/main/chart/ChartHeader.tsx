interface ChartHeaderComponent {
  title: string;
}

export default function ChartHeader({ title }: ChartHeaderComponent) {
  return (
    <div className=" text-white px-3 pb-4">
      <p className="font-medium">{title}</p>
      <p className="text-gray-1 text-sm mt-1">
        The daily vs cumulative trading volume on Vertex.
      </p>
    </div>
  );
}
