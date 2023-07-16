import prisma from "../../lib/prisma";
import { validateRoute } from "../../lib/auth";

// implementing validateRoute function.
export default validateRoute(async (req, res, user) => {
  // getting all of the playlist for a user.
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      name: "asc",
    },
  });
  //   res.json() sends a JSON response.
  res.json(playlists);
});
