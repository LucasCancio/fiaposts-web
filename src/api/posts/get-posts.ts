import { api } from "@/lib/axios";
import { TCategory } from "../categories/get-categories";

export type IPostSortBy = "title" | "content" | "createdAt" | "updatedAt";

export interface IGetOrdersQuery {
  page?: number | null;
  sortBy?: IPostSortBy | null;
  order?: "asc" | "desc" | null;
  title?: string | null;
  content?: string | null;
}

/* 
{
    "id": 4,
    "authorId": 2,
    "content": "#Teste post 4",
    "title": "teste 4",
    "slug": "teste-4",
    "imageUrl": "https://placehold.co/600x400",
    "categories": [
        {
            "id": 2,
            "name": "Categoria 1",
            "createdAt": "2024-07-10T00:51:52.063Z",
            "updatedAt": "2024-07-10T00:51:52.063Z"
        }
    ],
    "createdAt": "2024-07-14T14:28:22.314Z",
    "updatedAt": "2024-07-14T14:28:22.314Z"
}
*/
export type TPost = {
  id: number;
  authorId: number;
  content: string;
  title: string;
  slug: string | null;
  imageUrl: string | null;
  categories: TCategory[];
  createdAt: string;
  updatedAt: string;
};

export type TMetaOrder = {
  page: number;
  perPage: number;
  totalCount: number;
};

/* export interface IGetOrdersResponse {
  posts: TPost[];
  meta: TMetaOrder;
} */

export async function getPosts({
  page,
  title,
  content,
  order,
  sortBy,
}: IGetOrdersQuery): Promise<TPost[]> {
  const response = await api.get<TPost[]>("/posts/search", {
    params: {
      page,
      title,
      content,
      order,
      sortBy,
    },
  });

  return response.data;
}
