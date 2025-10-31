# E-Commerce Backend API

A robust Node.js + Express.js backend API for the Kumaravel E-Commerce Store. This backend provides a complete REST API with authentication, product management, shopping cart functionality, and admin features.

## 🚀 Features

- **RESTful API**: Well-structured endpoints following REST conventions
- **JWT Authentication**: Secure user authentication with bcrypt password hashing
- **In-Memory Storage**: No external database required (perfect for demos)
- **Product Management**: Full CRUD operations for products
- **User Management**: Registration, login, and profile management
- **Shopping Cart**: Persistent cart functionality with checkout
- **Order Processing**: Complete order management system
- **Admin Panel**: Protected admin routes for management
- **Input Validation**: Comprehensive validation using express-validator
- **Error Handling**: Centralized error handling middleware
- **CORS Configuration**: Ready for frontend deployment

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Input validation
- **Multer** - File upload handling
- **UUID** - Unique identifier generation

## 📁 Project Structure

```
backend/
├── data/
│   └── storage.js          # In-memory data storage class
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   ├── errorHandler.js     # Global error handling
│   └── validation.js       # Input validation middleware
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── products.js         # Product management routes
│   ├── cart.js             # Shopping cart routes
│   └── users.js            # User management routes
├── server.js               # Main server file
├── package.json            # Dependencies and scripts
├── render.yaml             # Render deployment configuration
└── env.example             # Environment variables example
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # Server runs on http://localhost:5000
   ```

4. **Start the production server**
   ```bash
   npm start
   ```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# JWT Secret (change this in production)
JWT_SECRET=your_super_secret_jwt_key_here
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?search=keyword&category=Electronics&minPrice=10&maxPrice=100&page=1&limit=10&sortBy=price&sortOrder=asc
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Create Product (Admin)
```http
POST /api/products
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 50,
  "image": "https://example.com/image.jpg"
}
```

#### Update Product (Admin)
```http
PUT /api/products/:id
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 89.99
}
```

#### Delete Product (Admin)
```http
DELETE /api/products/:id
Authorization: Bearer <admin_jwt_token>
```

### Cart Endpoints

#### Get Cart
```http
GET /api/cart
Authorization: Bearer <jwt_token>
```

#### Add to Cart
```http
POST /api/cart/add
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "productId": "product_id",
  "quantity": 2
}
```

#### Update Cart Item
```http
PUT /api/cart/update
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "productId": "product_id",
  "quantity": 3
}
```

#### Remove from Cart
```http
DELETE /api/cart/remove/:productId
Authorization: Bearer <jwt_token>
```

#### Checkout
```http
POST /api/cart/checkout
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "shippingAddress": "123 Main St, City, State 12345",
  "paymentMethod": "credit_card"
}
```

### User Endpoints

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <jwt_token>
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

#### Change Password
```http
PUT /api/users/change-password
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "currentPassword": "oldPassword",
  "newPassword": "newSecurePassword123"
}
```

#### Get User Orders
```http
GET /api/users/orders
Authorization: Bearer <jwt_token>
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register/Login**: Get a JWT token
2. **Protected Routes**: Include token in Authorization header
3. **Token Format**: `Authorization: Bearer <jwt_token>`

### Demo Accounts

#### Admin Account
- **Email**: admin@kumaravel.com
- **Password**: password
- **Access**: All endpoints including admin routes

#### User Account
- **Email**: user@kumaravel.com
- **Password**: password
- **Access**: Standard user endpoints

## 🗄️ Data Storage

This backend uses **in-memory storage** for simplicity:

### Storage Class Features
- **Products**: CRUD operations with search and filtering
- **Users**: User management with password hashing
- **Orders**: Order processing and history
- **Carts**: Per-user cart management
- **Categories**: Dynamic category management

### Sample Data
The application comes with pre-loaded sample data:
- 6 sample products across different categories
- 2 demo user accounts (admin and user)
- Categories: Electronics, Clothing, Accessories

## 🚀 Deployment

### Render Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push origin main
   ```

2. **Deploy on Render**
   - Connect GitHub repository
   - Use the provided `render.yaml` configuration
   - Set environment variables in Render dashboard

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your_production_secret_key
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for specific origins
- **Error Handling**: Secure error messages
- **Rate Limiting**: Ready for implementation
- **Helmet**: Security headers (can be added)

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    // Validation errors (if any)
  ]
}
```

## 🧪 Testing

### Health Check
```http
GET /api/health
```

Response:
```json
{
  "status": "OK",
  "message": "E-Commerce API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔧 Development

### Available Scripts

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Install dependencies
npm install
```

### Adding New Features

1. **Create Route File**: Add new route file in `routes/` directory
2. **Add Middleware**: Create middleware in `middleware/` directory
3. **Update Storage**: Extend storage class for new data types
4. **Add Validation**: Create validation rules for new endpoints
5. **Update Server**: Register new routes in `server.js`

## 📝 Notes

- **In-Memory Storage**: Data is lost on server restart
- **Demo Purpose**: Perfect for demonstrations and prototypes
- **Production Ready**: Can be easily extended with real database
- **Scalable**: Architecture supports horizontal scaling
- **Maintainable**: Clean code structure with separation of concerns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ by Kumaravel**

*This backend provides a solid foundation for e-commerce applications and can be easily extended with additional features.*
