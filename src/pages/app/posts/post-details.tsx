import { updateOrRegisterPost } from "@/api/posts/update-or-register-post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/hooks/useCategories";
import { useProfile } from "@/hooks/useProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import Markdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";

const postForm = z.object({
  title: z.string().min(5, "O titulo deve conter no mínimo 5 caracteres."),
  content: z
    .string()
    .min(10, "O conteúdo deve conter no mínimo 10 caracteres."),
  imageUrl: z.string().url("A url da imagem deve ser válida.").optional(),
  categoriesIds: z
    .array(z.coerce.number(), {
      required_error: "É preciso informar pelo menos 1 categoria.",
    })
    .nonempty("É preciso informar pelo menos 1 categoria."),
});

type TPostForm = z.infer<typeof postForm>;

export function PostDetails() {
  const { id: idParam } = useParams();
  const postId = z.coerce.number().optional().parse(idParam);
  const isEdditing = Boolean(postId);

  const navigate = useNavigate();

  const pageTitle = isEdditing ? "Editando Post" : "Novo Post";

  const { data: profile, isLoading: isLoadingProfile } = useProfile();

  useEffect(() => {
    if (!isLoadingProfile && !profile) {
      toast.error("Você precisa estar logado para acessar essa página.");
      navigate("/");
    }
  }, [profile, isLoadingProfile]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<TPostForm>({
    resolver: zodResolver(postForm),
  });

  const content = watch("content");
  const title = watch("title");
  const imageUrl = watch("imageUrl");

  const { mutateAsync: updateOrRegisterPostFn } = useMutation({
    mutationFn: updateOrRegisterPost,
  });

  async function handleSavePost(data: TPostForm) {
    try {
      await updateOrRegisterPostFn({
        postId,
        categoriesIds: data.categoriesIds,
        content: data.content,
        slug: data.title.replace(/\s+/g, "-").toLowerCase(),
        title: data.title,
        imageUrl: data.imageUrl,
      });

      toast.success(
        isEdditing ? "Post salvo com sucesso!" : "Post cadastrado com sucesso!"
      );
      navigate("/");
    } catch (error) {
      toast.error(
        "Erro ao realizar essa operação, tente novamente mais tarde!"
      );
    }
  }

  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  return (
    <>
      <Helmet title={pageTitle} />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">{pageTitle}</h1>

        {isLoadingProfile ? (
          <p>Carregando...</p>
        ) : (
          <form onSubmit={handleSubmit(handleSavePost)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Título</Label>
              <Input id="title" {...register("title")} maxLength={60} />
              {errors.title && (
                <span className="text-red-700">{errors.title.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="restaurantName">Imagem (url)</Label>
              <Input id="imageUrl" type="url" {...register("imageUrl")} />
              {errors.imageUrl && (
                <span className="text-red-700">{errors.imageUrl.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="restaurantName">Conteúdo</Label>
              <Textarea id="content" {...register("content")} />
              {errors.content && (
                <span className="text-red-700">{errors.content.message}</span>
              )}
            </div>

            {/* <Controller
              name="categoriesIds"
              control={control}
              render={({ field: { name, onChange, value, disabled } }) => (
                
              )}
            /> */}

            {isLoadingCategories ? (
              <Skeleton className="h-8 w-40" />
            ) : (
              <Select
                defaultValue="all"
                name="category"
                onValueChange={(value) => {
                  setValue("categoriesIds", [Number(value)]);
                }}
              >
                <SelectTrigger className="h-8 w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {errors.categoriesIds && (
              <span className="text-red-700">
                {errors.categoriesIds.message}
              </span>
            )}

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isEdditing ? "Salvar" : "Cadastrar"}
            </Button>
          </form>
        )}
      </div>

      <div className="mt-4">
        <h1 className="text-2xl font-bold tracking-tighter">
          Pré visualização
        </h1>
        <hr className="border-t my-4 border-gray-300" />

        <h2 className="text-2xl font-bold tracking-tighter">{title}</h2>
        <img src={imageUrl} alt={title} className="w-full h-96 object-cover" />
        <Markdown>{content}</Markdown>
      </div>
    </>
  );
}
