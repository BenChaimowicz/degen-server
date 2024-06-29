import { RouteHandler } from 'fastify';
import { createDegens } from './degen-ai.js';
import { saveDegens, getRandom } from './db/crud.js';
import type { TTheme } from './types.ts';

export const CreateCustomDegensHandler: RouteHandler = async (req, res) => {
    const { count, themes } = req.body as { count: number, themes: TTheme[] };
    const modelResponse = await createDegens(count, themes);
    if (modelResponse.length) {
        await saveDegens(...modelResponse);
    }
    return { message: modelResponse };
}

export const GetRandomDegensHandler: RouteHandler = async (req, res) => {
    const { limit } = req.query as { limit: number };
    const degen = await getRandom();
    return degen;
}