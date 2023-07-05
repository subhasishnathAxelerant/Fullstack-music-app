// all of the helpers that we use for authentication.
import jwt from "jsonwebtoken";
import prisma from "./prisma";
import { NextApiRequest, NextApiResponse } from "next";

// a HOC for protecting our API route.
export const validateRoute = (handler) => {
  // we will check whether the token, the user is valid.
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // extracting our token
    const { SUBHASISH_ACCESS_TOKEN: token } = req.cookies;
    // if he token is there
    if (token) {
      let user;
      try {
        // jwt.verify() verifies the token's signature
        // and extracting the id from there.
        const { id, email } = jwt.verify(token, "hello");
        // Now, we'e trying to find the user from db.
        user = await prisma.user.findUnique({
          where: {
            id,
          },
        });
        // if no user found in db.
        if (!user) {
          throw new Error("Not real user");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorizied" });
        return;
      }
      // finally returning the handler with req, res and the user.
      return handler(req, res, user);
    }
    // If you don't have a token to begin with
    res.status(401);
    res.json({ error: "Not Authorizied" });
  };
};
