import clsx from "clsx";


interface InputProps {
    isError?: boolean;
    messageError?: string;
    value : number | string;
  }
  
  const InputText: React.FC<
    InputProps & React.InputHTMLAttributes<HTMLInputElement>
    > = ({ messageError = 'wajib di isi', isError = false, value, ...props }) => {
    return (
      <section>
        <input
        value={value}
          className={clsx (`w-full h-8 border ${isError ? 'border-red-700' : 'border-gray-700'} rounded px-2`, {
            'border-gray-700': isError === false,
            'border-red-700 ': isError ===true,
          })}
          {...props}
        />
        {isError === true ? (
          <p className="text-red-500 font-bold text-sm">{messageError}</p>
        ) : (
          <></>
        )}
      </section>
    );
  };
  
  export default InputText;
  