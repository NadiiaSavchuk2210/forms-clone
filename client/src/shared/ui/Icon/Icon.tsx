interface IconProps {
  name: string;
  className?: string;
  label?: string;
  width?: number;
  height?: number;
}

const Icon = ({ name, className, label, width, height }: IconProps) => {
  return (
    <svg
      className={className}
      aria-hidden={!label}
      aria-label={label}
      role={label ? 'img' : 'presentation'}
      width={width}
      height={height}
    >
      <use href={`/icons/icons.svg#${name}`} />
    </svg>
  );
};

export default Icon;
