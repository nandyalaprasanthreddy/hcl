
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    className:string
  }
  
  const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
    return (
      <button {...props}>
        {label}
      </button>
    );
  };
  
  export default Button;