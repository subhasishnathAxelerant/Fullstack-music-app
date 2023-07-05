import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  // we're searching for the already existing unique email id in the DB.
  // and finding the user that matches.
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  // If the user exists and the password maches from the database
  if (user && bcrypt.compareSync(password, user.password)) {
    // creating jwt token
    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      "hello",
      { expiresIn: "8h" }
    );
    // Now we will set the token in the header.
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("SUBHASISH_ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );
    res.json(user)
  } else { // if no email matches
    res.status(401);
    res.json({ error: 'Email or Password is wrong.' });
    return
  }
};
