import { Dispatch, SetStateAction } from "react";
import Button from "./button";

interface TambahProps {
  count: number;
  setCount: Dispatch<SetStateAction<any>>;
}

const Tambah: React.FC<TambahProps> = ({ count, setCount }) => {
  return (
    <section className="border shadow-lg">
      <h1>{count}</h1>
      <Button
        title="Tambah"
        colorSchema="blue"
        variant="solid"
        onClick={() => {
          setCount((c: number) => c + 1);
        }}
      />
    </section>
  );
};

export default Tambah;
