# Tech Store

A complete full-stack e-commerce application built with React.js, Node.js, and Express.js. This project features a modern, responsive design with comprehensive functionality including product management, user authentication, shopping cart, and admin panel.

## 🚀 Features

### Frontend (React.js + Tailwind CSS)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Product Catalog**: Browse products with search and filter functionality
- **Product Details**: Detailed product pages with image galleries
- **Shopping Cart**: Add/remove items with persistent storage
- **User Authentication**: Secure login/register with JWT
- **User Profile**: Manage account settings and view order history
- **Admin Panel**: Complete product and user management
- **Loading States**: Smooth loading animations and error handling

### Backend (Node.js + Express.js)
- **RESTful API**: Well-structured API endpoints
- **JWT Authentication**: Secure user authentication with bcrypt password hashing
- **In-Memory Storage**: No external database required (perfect for demos)
- **Product Management**: CRUD operations for products
- **User Management**: User registration, login, and profile management
- **Cart Management**: Persistent shopping cart functionality
- **Order Processing**: Complete order management system
- **Admin Routes**: Protected admin-only endpoints
- **CORS Configuration**: Ready for frontend deployment

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Input validation
- **Multer** - File upload handling

## 📁 Project Structure

```
Ecomm/
├── backend/                 # Node.js + Express.js backend
│   ├── data/               # In-memory data storage
│   │   └── storage.js      # Data management class
│   ├── middleware/         # Express middleware
│   │   ├── auth.js         # JWT authentication
│   │   ├── errorHandler.js # Error handling
│   │   └── validation.js   # Input validation
│   ├── routes/             # API routes
│   │   ├── auth.js         # Authentication routes
│   │   ├── products.js     # Product management
│   │   ├── cart.js         # Shopping cart
│   │   └── users.js        # User management
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── render.yaml         # Render deployment config
├── frontend/               # React.js frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── auth/       # Authentication components
│   │   │   └── layout/     # Layout components
│   │   ├── contexts/       # React contexts
│   │   │   ├── AuthContext.js    # Authentication state
│   │   │   └── CartContext.js    # Shopping cart state
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   │   └── api.js      # API client
│   │   ├── App.js          # Main app component
│   │   └── index.js        # App entry point
│   ├── package.json        # Frontend dependencies
│   └── vercel.json         # Vercel deployment config
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ecomm
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:5000
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   # App runs on http://localhost:3000
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 🔐 Demo Credentials

The application comes with pre-configured demo accounts:

### Admin Account
- **Email**: admin@kumaravel.com
- **Password**: password
- **Access**: Full admin panel with product and user management

### User Account
- **Email**: user@kumaravel.com
- **Password**: password
- **Access**: Standard user features (shopping, profile, orders)

## 📱 Features Overview

### For Users
- **Browse Products**: Search and filter products by category and price
- **Product Details**: View detailed product information with images
- **Shopping Cart**: Add items to cart with quantity management
- **User Account**: Register, login, and manage profile
- **Order History**: View past orders and their status
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop

### For Admins
- **Dashboard**: Overview of sales, users, and products
- **Product Management**: Add, edit, and delete products
- **User Management**: View all users and their information
- **Order Management**: View and manage all orders
- **Analytics**: Basic sales and user statistics

## 🚀 Deployment

### Backend Deployment (Render)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Render**
   - Go to [Render.com](https://render.com)
   - Connect your GitHub repository
   - Select the backend folder
   - Use the provided `render.yaml` configuration
   - Set environment variables:
     - `NODE_ENV=production`
     - `JWT_SECRET=your-secret-key`
     - `FRONTEND_URL=https://your-frontend-domain.vercel.app`

### Frontend Deployment (Vercel)

1. **Update API URL**
   ```bash
   # In frontend/.env
   REACT_APP_API_URL=https://your-backend-domain.onrender.com/api
   ```

2. **Deploy on Vercel**
   - Go to [Vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Select the frontend folder
   - Deploy with default settings

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
JWT_SECRET=your_super_secret_jwt_key_here
```

#### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-domain.onrender.com/api
REACT_APP_NAME=TechStore
REACT_APP_VERSION=1.0.0
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/verify-token` - Verify JWT token

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get all categories
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart
- `POST /api/cart/checkout` - Checkout cart

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/change-password` - Change password
- `GET /api/users/orders` - Get user orders
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/orders/all` - Get all orders (Admin)

## 🎨 Design Features

- **Modern UI**: Clean, professional design with Tailwind CSS
- **Responsive**: Mobile-first design that works on all devices
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: User-friendly error messages and fallbacks
- **Toast Notifications**: Beautiful success/error notifications
- **Dark Mode Ready**: CSS variables for easy theme switching

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Properly configured CORS for production
- **Protected Routes**: Admin-only routes with role-based access
- **Error Handling**: Secure error messages without sensitive data

## 📊 Data Storage

This application uses **in-memory storage** for simplicity and demo purposes:

- **Products**: Stored in memory with sample data
- **Users**: Stored in memory with demo accounts
- **Orders**: Stored in memory for order history
- **Carts**: Stored in memory per user session

**Note**: Data will be lost when the server restarts. For production use, consider implementing:
- MongoDB with Mongoose
- PostgreSQL with Sequelize
- Redis for session storage
- File-based persistence with JSON files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kumaravel**
- Designed and developed this complete e-commerce solution
- Original design and functionality that goes beyond existing apps
- Modern, responsive UI with exceptional user experience

## 🙏 Acknowledgments

- React.js community for excellent documentation
- Tailwind CSS for the utility-first CSS framework
- Express.js for the robust web framework
- All open-source contributors who made this project possible

---

**Built with ❤️ by Kumaravel**

*This is a complete, production-ready e-commerce application that demonstrates modern web development practices and can serve as a foundation for real-world projects.*
