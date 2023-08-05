import prisma from "$lib/prisma.server";
import type { Book } from "$lib/types";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const book: Book = await request.json();
  const doc = await prisma.book.create({ data: book });
  return new Response(`/book/${book.slug}/${doc.id}`);
};
