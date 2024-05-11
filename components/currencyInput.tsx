import clsx from "clsx";
import CurrencyInput from "react-currency-input-field";

interface InputProps {
  isError?: boolean;
  messageError?: string;
  id: string | number;
  name: string;
  value: string | number | undefined;
}

const CurrencyInputText: React.FC<
  InputProps 
> = ({
  messageError = "wajib  donk",
  isError = false,
  id,
  name,
  value,
  ...props
}) => {
  return (
    <section>
      {/* <input
        value={value}
        id={id}
        name={name}
        className={clsx(`w-full h-10 border rounded px-2`, {
          "border-red-500 border-2": isError,
          "border-gray-700": !isError,
        })}
        {...props}
      /> */}
      <CurrencyInput
        // value={value}
        id={`${id}`}
        name={name}
        
        placeholder="Rp. 0"
        decimalsLimit={2}
        prefix="Rp. "
        decimalSeparator=","
        groupSeparator="."
        className={clsx(`w-full h-10 border rounded px-2`, {
          "border-red-500 border-2": isError,
          "border-gray-700": !isError,
        })}
        {...props}
        />
      
      {isError ? (
        <p className="text-red-500 font-bold">{messageError}</p>
      ) : (
        <></>
      )}
    </section>
  );
};

export default CurrencyInputText;
