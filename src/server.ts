import fastify from "fastify"
import { z } from "zod"
import { sql } from "./lib/postgres"
import { redis } from "./lib/redis"

const app = fastify()

app.get("/api/links", async (request, replay) => {
  const result =
    await sql/*sql */ `SELECT * FROM shortlinks ORDER BY created_at DESC`
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
    await sql/*sql */ `INSERT INTO shortlinks (code, original_url) VALUES (${code}, ${url}) RETURNING id`

  return replay.status(201).send({
    result: result[0].id,
    code: code,
    url: url
  })
})

app.get("/api/metrics", async (request, replay) => {
  const result = await redis.zRangeByScoreWithScores("metrics", 0, 50)

  const sort = result
    .sort((a, b) => b.score - a.score)
    .map((item) => ({
      shortLinkId: Number(item.value),
      clicks: item.score
    }))

  return replay.send(sort)
})

app.get("/:code", async (request, replay) => {
  const { code } = z
    .object({
      code: z.string().min(3)
    })
    .parse(request.params)

  const result =
    await sql/*sql */ `SELECT id, original_url FROM shortlinks WHERE code = ${code}`

  if (result.length === 0) {
    return replay.status(404).send("Not found")
  }

  await redis.zIncrBy("metrics", 1, String(result[0].id))

  return replay.redirect(301, result[0].original_url)
})

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333")
})
