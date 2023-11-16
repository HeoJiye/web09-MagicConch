interface ButtonProps {
  color?: 'active' | 'cancel' | 'disabled' | 'dark' | 'transparent';
  size?: 's' | 'm' | 'l';
  disabled?: boolean;
  children?: React.ReactNode;
  handleButtonClicked?: () => void;
}

const colorMap: Record<string, string> = {
  active: 'surface-point-alt text-white',
  cancel: 'surface-disabled text-white',
  disabled: 'surface-box text-weak',
  dark: 'surface-alt text-white',
  transparent: 'bg-transparent',
};

const sizeMap: Record<string, string> = {
  s: 'h-40 display-bold14 leading-18 p-8 min-h-0',
  m: 'h-50 display-bold16 leading-20 p-16',
  l: 'h-60 display-bold16 leading-30 p-16',
};

function CustomButton({ color = 'active', size = 'm', disabled = false, children, handleButtonClicked }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`btn rounded-full border-transparent ${colorMap[color]} ${sizeMap[size]}`}
      onClick={handleButtonClicked}
    >
      {children}
    </button>
  );
}

export default CustomButton;
