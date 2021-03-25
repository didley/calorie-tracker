import { rest } from "msw";
import foods from "./data/foods.seed.json";
import diary from "./data/diary.seed.json";

export const handlers = [
  rest.post("/api/user/login", (req, res, ctx) => {
    sessionStorage.setItem("is-authenticated", true);

    return res(
      ctx.status(200),
      ctx.json({
        user: { name: "admin mocked", role: "admin", country: "AUS" },
        msg: "Welcome admin mocked",
      })
    );
  }),

  rest.get("/api/user", (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        user: { name: "admin mocked", role: "admin", country: "AUS" },
      })
    );
  }),

  rest.get("/api/foods", (req, res, ctx) => {
    return res(ctx.json({ data: foods }));
  }),

  rest.get("/api/foods/my-foods", (req, res, ctx) => {
    return res(ctx.json({ data: foods }));
  }),

  rest.get("/api/diary/:date", (req, res, ctx) => {
    return res(ctx.json(diary));
  }),
];
