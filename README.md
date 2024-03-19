# Shortlinks API (Encurtador de links)

## Dependencies

- Node.js
- Fastify
- Postgres
- Redis (in production)
- Zod

## Development

1. Clone the repository
2. Install the dependencies with `npm install`
3. Install and run Docker with `docker-compose up -d`
4. Run the development server with `npm run dev`

## Endpoints

### GET /api

List all shortlinks

### POST /api

Example:

```
{
  "code": "instagram",
  "url": "https://www.instagram.com/"
}
```

Create a shortlink

### GET /:code

Example:

```
GET /instagram
```

Redirect to the original URL

## Author

- [@wellingtongmota](https://github.com/wellingtongmota)

## License

[MIT](LICENSE)
