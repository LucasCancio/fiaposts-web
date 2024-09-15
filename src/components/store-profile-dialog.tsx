import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { TTeacher } from "@/api/auth/get-profile";
import { updateTeacher } from "@/api/teacher/update-teacher";

const storeProfileSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  email: z.string().email("E-mail inválido."),
  password: z
    .string()
    .refine((value) => value?.length === 0 || value.length >= 6, {
      message: "A senha deve ter no mínimo 6 caracteres.",
    })
    .optional(),
});

type TStoreProfileForm = z.infer<typeof storeProfileSchema>;

type Props = {
  profile: TTeacher;
};

export function StoreProfileDialog({ profile }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateTeacher,
    onMutate({ name, email }) {
      const { cached } = updateProfileCache({ name, email });

      return {
        previousProfile: cached,
      };
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateProfileCache(context.previousProfile);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TStoreProfileForm>({
    resolver: zodResolver(storeProfileSchema),
    defaultValues: {
      name: profile?.name ?? "",
      email: profile?.email ?? "",
    },
  });

  function updateProfileCache({ email, name }: TStoreProfileForm) {
    const cached = queryClient.getQueryData<TTeacher>(["profile"]);

    if (cached) {
      queryClient.setQueryData<TTeacher>(["profile"], {
        ...cached,
        name,
        email,
      });
    }

    return { cached };
  }

  async function handleUpdateProfile(data: TStoreProfileForm) {
    try {
      await updateProfileFn({
        id: profile.id,
        name: data.name,
        email: data.email,
        password: data.password?.length == 0 ? undefined : data.password,
      });

      toast.success("Perfil atualizado com sucesso");
    } catch (error) {
      console.error(error);

      toast.error("Falha ao atualizar o perfil, tente novamente!");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu perfil de professor(a).
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register("name")} />
            {errors.name && (
              <span className="text-red-700">{errors.name.message}</span>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="email">
              E-mail
            </Label>
            <Input
              className="col-span-3"
              id="email"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-700">{errors.email.message}</span>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="password">
              Senha (deixe em branco para não alterar)
            </Label>
            <Input
              className="col-span-3"
              id="password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-700">{errors.password.message}</span>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" disabled={isSubmitting}>
              Fechar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
