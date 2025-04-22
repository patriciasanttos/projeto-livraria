import createApp from "./bootstrap";

async function start() {
  const app = await createApp();

  app.listen(process.env.PORT ?? 3000);
}

start().catch((error) => {
  console.error("Error starting app:", error);
  process.exit(1);
});
