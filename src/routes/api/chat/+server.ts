import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

import type { RequestHandler } from "./$types";
import { OPENAI_API_KEY } from "$env/static/private";

const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY }));

export const config = {
  runtime: "edge"
};

export const POST: RequestHandler = async ({ request }) => {
  const { messages } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 0,
    top_p: 0,
    messages
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
};
