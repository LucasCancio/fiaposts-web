import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { getPosts } from "@/api/posts/get-posts";
import { PostFilters } from "./post-filters";

export function Posts() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = z.coerce.number().parse(searchParams.get("page") ?? "1");
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");
  const title = searchParams.get("title");
  const content = searchParams.get("content");

  const { data: result, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["posts", page, sortBy, order, title, content],
    queryFn: () =>
      getPosts({
        page,
        title,
        content,
      }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());

      return state;
    });
  }

  return (
    <>
      <Helmet title="Posts" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Posts</h1>

        <div className="space-y-2.5">
          <PostFilters />

          <div className="rounded-md border flex flex-col gap-2">
            {result?.map((post) => (
              <a
                className="hover:border-primary border-2"
                href={`/post/${post.id}/${post.slug}`}
                key={post.id}
              >
                {post.content}
              </a>
            ))}
          </div>

          {/*  {result && (
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={result.meta.page - 1}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
            />
          )} */}
        </div>
      </div>
    </>
  );
}
