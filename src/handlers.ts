import { RouteHandler } from 'fastify';
import { createDegens } from './degen-ai.js';
import { saveDegens, getRandom, getDegen } from './db/crud.js';
import type { TGetDegenRequest, TObjectWithId, TTheme } from './types.ts';
import { isEmptyObject } from './utils.js';

export const CreateCustomDegensHandler: RouteHandler = async (req, res) => {
    const { count, themes } = req.body as { count: number, themes: TTheme[] };
    if (themes.length > count) return { message: 'More themes than count' };
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

export const GetDegenHandler: RouteHandler = async (req, res) => {
    const { id } = isEmptyObject(req.params as object) ? req.query as TObjectWithId : req.params as TObjectWithId;
    console.log("🚀 ~ constGetDegenHandler:RouteHandler= ~ id :", id)
    const { theme } = req.query as TGetDegenRequest;
    if (id) return await getDegen(id);
    if (theme) return await getRandom(theme);
    return await getRandom();
}