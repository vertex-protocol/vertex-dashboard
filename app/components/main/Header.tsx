interface HeaderComponent {
  text: string;
}

export default function Header({ text }: HeaderComponent) {
  return (
    <div className="text-white font-medium text-2xl py-8">
      <p>{text}</p>
    </div>
  );
}
