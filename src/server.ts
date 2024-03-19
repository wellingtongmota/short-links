import fastify from "fastify"
import { z } from "zod"
import { sql } from "./lib/postgres"

const app = fastify()

app.get("/api", async (request, replay) => {
  const result =
    await sql`SELECT code, original_url FROM shortlinks ORDER BY created_at DESC`
  return replay.send(result)
})

app.post("/api", async (request, replay) => {
  const { code, url } = z
    .object({
      code: z.string(),
      url: z.string().url()
    })
    .parse(request.body)

  const result =
    await sql`INSERT INTO shortlinks (code, original_url) VALUES (${code}, ${url}) RETURNING id`

  return replay.status(201).send({
    result: result[0].id,
    code: code,
    url: url
  })
})

app.get("/:code", async (request, replay) => {
  const { code } = z
    .object({
      code: z.string().min(3)
    })
    .parse(request.params)

  const result =
    await sql`SELECT original_url FROM shortlinks WHERE code = ${code}`

  return replay.redirect(result[0].original_url)
})

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333")
})
