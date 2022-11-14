export default function handler(request, response) {
    // api/[name].js -> /api/lee
    // req.query.name -> "lee"
    const { name } = request.query;
    return response.end(`Hello ${name}!`);
  }