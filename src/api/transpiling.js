import cf from "cross-fetch";

export default async function handler(req, res) {
  const Res = cf.Response;
  console.log("RES", Res, typeof Res);

  res.send("ok");
}
