import prisma from "$lib/prisma.server";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { parseTOC } from "$lib/utils";

export const load: PageServerLoad = async ({ params }) => {
  const book = await prisma.book.findUnique({ where: { id: params.book_id } });
  if (!book) throw error(404, "Not found");
  const toc = parseTOC(book.toc);

  const chapter = toc.find((chapter) => chapter.slug === params.chapter_slug);
  if (!chapter) throw error(404, "Not found");

  return {
    id: book.id,
    title: book.title,
    slug: book.slug,
    summary: book.summary,
    category: book.category,
    tocText: book.toc,
    toc,
    chapter
  };
};
