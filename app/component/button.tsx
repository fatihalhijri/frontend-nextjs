interface ButtonsProps {
    title :string;
    isDisabled:boolean;

}
const Button :React.FC<ButtonsProps> = ({title, isDisabled}) => {
    return (
        <button disabled={isDisabled} className="w-16 h-8 rounded border bg-red-400">
            {title}
        </button>
    )
}

export default Button;