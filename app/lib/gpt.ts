"use server";
import OpenAI from "openai";

const API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: API_KEY });

const ASSISTANT_ID = "asst_UtR7kgT7I5BH7kwvJfSGbflg";
const assistant = await openai.beta.assistants.retrieve(ASSISTANT_ID);
const thread = await openai.beta.threads.create();

export async function gpt(prompt: string) {
  try {
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: prompt,
    });

    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistant.id,
    });

    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      const firstMessage = messages.data[0];
      const firstContent = firstMessage.content[0];

      if (firstContent && "text" in firstContent && firstContent.text) {
        const result = firstContent.text.value;

        const filtered_result = result
          .replace(/【.*?】/g, "") // Matches any text within 【 and 】
          .trim();

        return filtered_result;
      }
    } else {
      console.log(run.status);
    }
  } catch (error) {
    console.error("Error communicating with custom assistant:", error);
    return "An error occurred while processing your request.";
  }
}
