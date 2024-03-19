import fastify from "fastify"
import { z } from "zod"
import { sql } from "./lib/postgres"

const app = fastify()

app.post("/api/shorten", async (req, res) => {
  const { code, url } = z
    .object({
      code: z.string(),
      url: z.string().url()
    })
    .parse(req.body)

  const result =
    await sql`INSERT INTO shortlinks (code, original_url) VALUES (${code}, ${url}) RETURNING id`

  return res.status(201).send({
    result: result[0].id,
    code: code,
    url: url
  })
})

app.get("/:code", async (req, res) => {
  const { code } = z
    .object({
      code: z.string().min(3)
    })
    .parse(req.params)

  const result =
    await sql`SELECT original_url FROM shortlinks WHERE code = ${code}`

  return res.redirect(result[0].original_url)
})

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333")
})
