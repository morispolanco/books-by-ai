import prisma from "$lib/prisma.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const books = await prisma.book.findMany({ orderBy: { createdAt: "desc" } });

  return {
    books: books.map((book) => ({
      id: book.id,
      title: book.title,
      slug: book.slug,
      category: book.category
    }))
  };
};
