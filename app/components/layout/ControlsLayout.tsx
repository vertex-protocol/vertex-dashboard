import classNames from 'classnames';

export default function ControlsLayout({
  children,
  justify,
}: {
  children: React.ReactNode;
  justify: 'between' | 'end'; // Assuming you have a prop named 'justify' of type string with these two possible values
}) {
  const containerClasses = classNames('flex', {
    'justify-between': justify === 'between',
    'justify-end': justify === 'end',
  });

  return <section className={containerClasses}>{children}</section>;
}
