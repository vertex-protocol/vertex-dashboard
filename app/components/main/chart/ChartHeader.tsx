interface ChartHeaderComponent {
  text: string;
}

export default function ChartHeader({ text }: ChartHeaderComponent) {
  return (
    <div className="flex text-gray-1 px-3 py-2">
      <p>{text}</p>
    </div>
  );
}
