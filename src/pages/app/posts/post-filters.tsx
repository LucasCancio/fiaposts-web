import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IPostSortBy } from "@/api/posts/get-posts";

const orderFiltersSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  /* sortBy: z.ZodType<IPostSortBy>().optional(), */
});

type TOrderFiltersSchema = z.infer<typeof orderFiltersSchema>;

export function PostFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const title = searchParams.get("title") || "";
  const content = searchParams.get("content") || "";

  const order = searchParams.get("order") || "";
  const sortBy = searchParams.get("sortBy") || "";

  const { register, handleSubmit, control, reset } =
    useForm<TOrderFiltersSchema>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        //order: order ?? undefined,
        title: title ?? "",
        content: content ?? "",
      },
    });

  function handleFilter({ content, title, order }: TOrderFiltersSchema) {
    setSearchParams((state) => {
      if (content) state.set("content", content);
      else state.delete("content");

      if (title) state.set("title", title);
      else state.delete("title");

      if (order) state.set("order", order);
      else state.delete("order");

      state.set("page", "1");

      return state;
    });
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete("content");
      state.delete("title");
      state.delete("order");
      state.set("page", "1");

      return state;
    });

    reset({
      title: "",
      content: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="Título"
        className="h-8 w-[320px]"
        {...register("title")}
      />
      <Input
        placeholder="Conteúdo"
        className="h-8 w-[320px]"
        {...register("content")}
      />
      {/*  <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => (
          <Select
            defaultValue="all"
            name={name}
            onValueChange={onChange}
            value={value}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      /> */}

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar Resultados
      </Button>

      <Button
        type="button"
        onClick={handleClearFilters}
        variant="outline"
        size="xs"
      >
        <X className="mr-2 h-4 w-4" />
        Remover Filtros
      </Button>
    </form>
  );
}
