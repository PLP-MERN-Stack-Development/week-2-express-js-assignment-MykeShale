[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19705615&assignment_repo_type=AssignmentRepo)
# Express.js Product API

A RESTful API built with Express.js that implements CRUD operations for products, with features like authentication, logging, and error handling.

## 🚀 Features

- RESTful API endpoints for product management
- Authentication using API keys
- Request logging
- Error handling
- Product filtering and pagination
- Search functionality
- Product statistics

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (Node Package Manager)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
PORT=3000
API_KEY=your_api_key_here
```

## 🚀 Running the Server

Start the server:
```bash
npm start
```

The server will start on http://localhost:3000 (or the port specified in your .env file)

## 📚 API Documentation

### Authentication
All product endpoints require an API key to be sent in the request headers:
```
X-API-Key: your_api_key_here
```

### Endpoints

#### Products

- `GET /api/products` - Get all products
  - Query parameters:
    - `category`: Filter by category
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)
  - Example: `GET /api/products?category=electronics&page=1&limit=10`

- `GET /api/products/:id` - Get a specific product
  - Example: `GET /api/products/1`

- `POST /api/products` - Create a new product
  - Body:
    ```json
    {
      "name": "Product Name",
      "description": "Product Description",
      "price": 99.99,
      "category": "category",
      "inStock": true
    }
    ```

- `PUT /api/products/:id` - Update a product
  - Example: `PUT /api/products/1`
  - Body: Same as POST

- `DELETE /api/products/:id` - Delete a product
  - Example: `DELETE /api/products/1`

#### Search and Statistics

- `GET /api/products/search?q=query` - Search products by name
  - Example: `GET /api/products/search?q=laptop`

- `GET /api/products/stats/categories` - Get product count by category

## 🧪 Testing

You can test the API using tools like Postman, Insomnia, or curl. Here's an example using curl:

```bash
# Get all products
curl -H "X-API-Key: your_api_key_here" http://localhost:3000/api/products

# Create a new product
curl -X POST -H "Content-Type: application/json" -H "X-API-Key: your_api_key_here" \
  -d '{"name":"New Product","description":"Description","price":99.99,"category":"electronics","inStock":true}' \
  http://localhost:3000/api/products
```

## 📝 Error Handling

The API uses standard HTTP status codes and returns error messages in JSON format:

```json
{
  "error": "Error message here"
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 