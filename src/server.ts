import fastify from "fastify";

const app = fastify();

app.post("/", async (req, res) => {
  const { code, url } = req.body;

  return { message: "Hello, world!" };
});

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
