import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobAction } from "@/utils/actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function DeleteJobBtn({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast("there was an error");
        return;
      }
      toast("job removed");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      
    },
  });
  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}>
      {isPending ? "deleting..." : "delete"}
    </Button>
  );
}
export default DeleteJobBtn;

// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteJobAction } from "@/utils/actions";
// import { toast } from "sonner";
// import { Button } from "../ui/button";

// function DeleteJob({ id }: { id: string }) {
//   const queryClient = useQueryClient();

//   const { mutate, isPending } = useMutation({
//     mutationFn: deleteJobAction,
//     onSuccess: () => {
//       toast.success("Job deleted successfully!");
//       queryClient.invalidateQueries({ queryKey: ["jobs"] });
//       queryClient.invalidateQueries({ queryKey: ["stats"] });
//     },
//     onError: () => {
//       toast.error("Failed to delete job.");
//     },
//   });

//   return (
//     <Button
//       size="sm"
//       variant="destructive"
//       disabled={isPending}
//       onClick={() => mutate(id)}>
//       {isPending ? "Deleting..." : "Delete"}
//     </Button>
//   );
// }

// export default DeleteJob;
