import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import { TPost } from "@/api/posts/get-posts";
import { deletePost } from "@/api/posts/delete-post";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export interface IPostTableRowProps {
  post: TPost;
}

export function PostTableRow({ post }: IPostTableRowProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: deletePostFn, isPending: isDeletingPost } = useMutation({
    mutationFn: deletePost,
  });

  async function handleDeletePost() {
    try {
      deletePostFn({ postId: post.id });
      toast.success("Post excluído com sucesso");

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    } catch (error) {
      toast.error("Erro ao excluir post");
    }
  }

  return (
    <TableRow>
      <TableCell className="font-mono text-xs font-medium">
        {post.title}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(post.updatedAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {format(post.createdAt, "dd/MM/yyyy", { locale: ptBR })}
      </TableCell>
      <TableCell className="flex gap-2">
        <Button
          onClick={() => navigate(`/post-details/${post.id}`)}
          className="bg-blue-700"
          size="xs"
          title="Editar"
        >
          <Pencil className="size-4" />
        </Button>
        <Button
          disabled={isDeletingPost}
          onClick={handleDeletePost}
          variant="destructive"
          size="xs"
          title="Excluir"
        >
          <Trash className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
