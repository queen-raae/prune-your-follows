import "../domains/api/fetch-polyfill";
import createError from "http-errors";
import Joi from "joi";

import { getAccounts, postAccounts, wrapper } from "../domains/api";

export default async function handler(req, res) {
  await wrapper(req, res, {
    GET: async ({ userId }) => {
      const schema = Joi.object({
        filter: Joi.string(),
        search: Joi.string(),
        offset: Joi.number().default(0),
        size: Joi.number().default(24),
      })
        .or("filter", "search")
        .required();

      const { value, error: validationError } = schema.validate(req.query);

      if (validationError) {
        throw createError.UnprocessableEntity(validationError);
      }

      res.send(await getAccounts({ ...value, userId: userId }));
    },
    POST: async ({ userId, twitterAccessToken }) => {
      const schema = Joi.object({
        accountId: Joi.string().required(),
        action: Joi.string()
          .valid("hide", "unhide", "unfollow", "follow")
          .required(),
      });

      const { value, error: validationError } = schema.validate(req.body);

      if (validationError) {
        throw createError.UnprocessableEntity(validationError);
      }

      res.send(
        await postAccounts({
          ...value,
          twitterAccessToken: twitterAccessToken,
          userId: userId,
        })
      );
    },
  });
}
