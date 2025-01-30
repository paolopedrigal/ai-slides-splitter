/** @jsxImportSource ai-jsx */
// The above line is important and enables the edge function to run AI.JSX code.

/**
 * This code is a Vercel Edge Function that runs a simple AI.JSX ChatCompletion and streams the result.
 * This prevents your OpenAI API key from being exposed to the client.
 * Note that the edge function must be deployed with the OPENAI_API_KEY environment variable set.
 */

import { toStreamResponse } from "ai-jsx/stream";
import {
  ChatCompletion,
  SystemMessage,
  UserMessage,
} from "ai-jsx/core/completion";

export const runtime = "edge";

export async function POST(req: Request) {
  const { document, target, delimiter } = await req.json();

  const systemMessage = `
    You are highly skilled text processor that analyzes markdown documents
    for slideshow presentations. The markdown document provided by the user
    will be delimited by triple quotes """. Don't add any conversational
    dialogue to the user.
  `;
  const userMessage = `
    Task:
    I am making a slideshow presentation, so please partition the entire document below into exactly ${target} slides, separating the slides by the delimiter "${delimiter}".
    
    Requirements:
    \t1. There should be exactly ${target} slides and ${target - 1} delimiters.
    \t2. Each partition, excluding the delimiters, can be joined back together to recreate the original document without any missing content or changes.
    \t3. Partitions must group content based on similarity, such as topics or themes, and should be logical and meaningful.
    \t4. No part of the original document should overlap or be omitted from the partitions. Sentences should not be cut off between slides.
    \t5. Do not modify or add content within the partitions; they should remain identical to the original document.
    
    Document:
    """${document}"""
  `;

  // toStreamResponse() converts the JSX to a stream of JSON responses that can be read
  // by the client, using `useAIStream()` from `ai-jsx/react`.
  return toStreamResponse(
    <ChatCompletion>
      <SystemMessage>{systemMessage}</SystemMessage>
      <UserMessage>{userMessage}</UserMessage>
    </ChatCompletion>
  );
}
