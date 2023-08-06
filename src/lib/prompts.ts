export const TABLE_OF_CONTENTS = (title: string, instructions: string) => `
I want you to act as a book writer.
The title of the book is: ${title}.
Generate Table of Contents for the book.
${instructions}.
It should contain at least 11 top level chapters, each with 5 to 10 sections.
It should contain only top level chapters with sections, no subsections should be included.
Do not include any extra text or notes before or after the desired output.

Do not include Glossary.
Do not include Key Terms and Definitions.
Do not incude References.
Do not include Acknowledgments.
Do not include About the Author.
Do not include Appendices.

Output in the following format,
with each chapter and section title going on a new line,
prefixed with the chapter or section number,
and the chapters are separated by a blank line
(replace the placeholders in double curely braces with the actual values):

1 {{chapter title}}
1.1 {{section title}}
1.2 {{section title}}
1.3 {{section title}}
1.4 {{section title}}
1.5 {{section title}}
1.6 {{section title}}

2 {{chapter title}}
2.1 {{section title}}
2.2 {{section title}}
2.3 {{section title}}
2.4 {{section title}}
2.5 {{section title}}
2.6 {{section title}}

3 {{chapter title}}
3.1 {{section title}}
3.2 {{section title}}
3.3 {{section title}}
3.4 {{section title}}
3.5 {{section title}}
3.6 {{section title}}
3.7 {{section title}}
3.8 {{section title}3

{{ rest of chapters with sections in the same format}}
`;

export const SUMMARY = `
Generate one plain text paragraph summarizing the book.
`;

export const CHAPTER = (bookTitle: string, tocText: string, chapterTitle: string) => `
I want you to act as book writer.

You are writing a book with title ${bookTitle}.

The book has the following table of contents:

${tocText}

You are writing an introduction to chapter "${chapterTitle}".

Generate a short introduction to this chapter in markdown format.

Here is the introduction of this chapter:

# ${chapterTitle}
`;

export const SECTION = (
  bookTitle: string,
  tocText: string,
  chapterTitle: string,
  sectionTitle: string
) => `
I want you to act as book writer.

You are writing a book with title ${bookTitle}.

The book has the following table of contents:

${tocText}

You are writing a section with title "${sectionTitle}" in the chapter "${chapterTitle}".

Generate the content text of this section in markdown format.

Here is the content of this section:

# ${chapterTitle}

## ${sectionTitle}
`;

export const CATEGORIES = `
Philosophy
Psychology
Religion
Social Sciences
Mathematics
Physical Sciences
Biological Sciences
Computer Science
Applied Sciences
Technology
Arts & Recreation
Literature
History
Geography
Law
Education
Political Science
Business
Economics
Cultural Studies & Area Studies
Environmental Studies
Gender & Sexuality Studies
Indigenous Studies
Media & Communication Studies
`.trim();

export const CATEGORY = `
The list of acceptable categories is:
${CATEGORIES.split("\n")
  .map((category) => `- ${category}`)
  .join("\n")}

Classify the book to the one of the above categories.
Output the name of the category from the above list and nothing else.
Do not include any extra text or notes before or after the desired output.
Only use the provided categories!
`;
