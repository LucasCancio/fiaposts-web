import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import { getPostById } from "@/api/posts/get-post-by-id";

export function Post() {
  const { id } = useParams();

  const { data: post, isLoading: isLoadingPost } = useQuery({
    queryKey: ["post", id],
    queryFn: () =>
      getPostById({
        id: Number(id),
      }),
  });

  return (
    <>
      <Helmet title={post?.title ?? "Post"} />

      {isLoadingPost ? (
        <Skeleton className="h-[500px]" />
      ) : (
        <div className="mt-4">
          <h1 className="text-2xl font-bold tracking-tighter">{post?.title}</h1>

          <div className="flex gap-2">
            {post?.categories.map((category) => (
              <span key={category.id} className="text-sm text-gray-500">
                {category.name}
              </span>
            ))}
          </div>
          <img
            src={post?.imageUrl ?? ""}
            alt={post?.title}
            className="w-full h-96 object-cover"
          />
          <Markdown>{post?.content}</Markdown>
        </div>
      )}
    </>
  );
}
