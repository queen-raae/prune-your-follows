import "../domains/api/fetch-polyfill";
import createError from "http-errors";
import Joi from "joi";

import { getMeta, postMeta, wrapper } from "../domains/api";

export default async function handler(req, res) {
  await wrapper(req, res, {
    GET: async ({ userId }) => {
      res.send(await getMeta({ userId: userId }));
    },
    POST: async ({ userId }) => {
      const schema = Joi.object({
        email: Joi.string().email().required(),
      });

      const { value, error: validationError } = schema.validate(req.body);

      if (validationError) {
        throw createError.UnprocessableEntity(validationError.message);
      }

      res.send(await postMeta({ ...value, userId: userId }));
    },
  });
}
