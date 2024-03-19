# Shortlinks API (Encurtador de links)

## Dependencies

- Node.js
- Fastify
- Postgres
- Redis
- Zod

## Development

1. Clone the repository
2. Install the dependencies with `npm install`
3. Install and run Docker with `docker-compose up -d`
4. Run the development server with `npm run dev`

## Endpoints

### GET /:code

```
GET /instagram
```

Redirect to the original URL

### GET /api/links

```
GET /api/links
```

List all shortlinks

### POST /api/metrics

```
POST /api/metrics
```

Return the metrics of the shortlink by clicks

### POST /api

Example:

```
POST /api

body: {
  "code": "instagram",
  "url": "https://www.instagram.com/"
}
```

Create a shortlink

## Author

[@wellingtongmota](https://github.com/wellingtongmota)

## License

[MIT](LICENSE)
