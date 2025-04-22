import createApp from "../src/bootstrap";

let cachedApp: any;

export default async function handler(req: any, res: any) {
  try {
    if (!cachedApp) cachedApp = await createApp();

    return cachedApp(req, res);
  } catch (err) {
    console.error("API creased:", err);
    res.status(500).send("Internal server error");
  }
}
