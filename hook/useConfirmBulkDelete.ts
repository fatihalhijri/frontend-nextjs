import Swal from "sweetalert2";
type SubmitFunction = (payload: number[]) => any;
export function useConfirmDeleteBulk({ onSubmit }: { onSubmit: SubmitFunction }) {
  const handleDeleteBulk = (payload: number[]) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Apakah Yakin?",
        text: "Data yang terhapus tidak bisa dikembalikan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "red",

        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await onSubmit(payload);
        }
      });
  };

  return handleDeleteBulk;
}