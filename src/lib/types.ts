export interface Book {
  title: string;
  slug: string;
  toc: string;
  summary: string;
  category: string;
}

export interface Chapter {
  title: string;
  slug: string;
  sections: Section[];
}

export interface Section {
  title: string;
  slug: string;
}
