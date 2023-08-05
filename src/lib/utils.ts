import slugify from "slugify";
import type { Chapter } from "./types";

export function slugit(text: string) {
  return slugify(text.replace(/\./g, "-"), { lower: true, strict: true });
}

export function parseTOC(toc: string): Chapter[] {
  const chapters: Chapter[] = [];
  for (const chapterText of toc.trim().split("\n\n")) {
    const lines = chapterText.trim().split("\n");
    const chapter = {
      title: lines[0],
      slug: slugit(lines[0]),
      sections: [] as { title: string; slug: string }[]
    };
    chapters.push(chapter);
    for (const sectionText of lines.slice(1)) {
      const section = {
        title: sectionText,
        slug: slugit(sectionText)
      };
      chapter.sections.push(section);
    }
  }
  return chapters;
}
