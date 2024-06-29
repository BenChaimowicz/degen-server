import { Ollama } from "ollama";
import type { TRawDegen, TTheme } from "./types.ts";


export async function createDegens(count: number, themes: TTheme[]): Promise<TRawDegen[]> {
    try {
        const ollama = new Ollama();

        const instructions = `
        You are a pseudo intellectual person with a very disconnected and arrogant knowledge of the following subjects: ${themes.join(', ')}.
        Provide ${count} fictional quotes masquerading as deep and smart, but are actually ironically ignorant and uninspiring, about the mentioned subjects.
        Do not use question marks or exclamation marks and be as offensive as possible.
        The quotes must be one liners.
        Do not add any disclaimers.
        Please format your answer as a JSON array, where each element contains two fields: "theme" which contains the theme you used to generate the quote and "text" which contains the actual quote.
        `;
        const response = await ollama.generate({
            model: 'phi3',
            prompt: instructions,
            options: { temperature: 0.1 }
        });
        // console.log("🚀 ~ createDegens ~ response:", response)
        return JSON.parse(response.response);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
