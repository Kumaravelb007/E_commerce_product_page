# E-Commerce Frontend

A modern, responsive React.js frontend for the Kumaravel E-Commerce Store. Built with React 18, Tailwind CSS, and modern web development practices.

## 🚀 Features

- **Modern React**: Built with React 18 and functional components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Product Catalog**: Advanced search and filtering capabilities
- **Shopping Cart**: Persistent cart with localStorage integration
- **User Authentication**: Secure login/register with JWT
- **User Profile**: Complete profile management
- **Admin Panel**: Full admin dashboard for store management
- **Loading States**: Smooth animations and skeleton screens
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Beautiful success/error notifications

## 🛠️ Tech Stack

- **React.js 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library
- **Context API** - State management for auth and cart

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML template
│   ├── manifest.json       # PWA manifest
│   └── favicon.ico         # App favicon
├── src/
│   ├── components/         # Reusable components
│   │   ├── auth/          # Authentication components
│   │   │   └── ProtectedRoute.js
│   │   └── layout/        # Layout components
│   │       ├── Navbar.js
│   │       └── Footer.js
│   ├── contexts/          # React contexts
│   │   ├── AuthContext.js # Authentication state
│   │   └── CartContext.js # Shopping cart state
│   ├── pages/             # Page components
│   │   ├── HomePage.js
│   │   ├── ProductPage.js
│   │   ├── ProductDetailPage.js
│   │   ├── CartPage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── ProfilePage.js
│   │   ├── OrdersPage.js
│   │   ├── AdminPage.js
│   │   └── NotFoundPage.js
│   ├── services/          # API services
│   │   └── api.js         # API client configuration
│   ├── App.js             # Main app component
│   ├── index.js           # App entry point
│   └── index.css          # Global styles and Tailwind
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── vercel.json            # Vercel deployment config
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
   # Edit .env with your API URL
   ```

3. **Start the development server**
   ```bash
   npm start
   # App runs on http://localhost:3000
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Environment Variables

Create a `.env` file in the frontend directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# App Configuration
REACT_APP_NAME=TechStore
REACT_APP_VERSION=1.0.0
```

## 📱 Pages Overview

### Public Pages
- **HomePage**: Landing page with featured products
- **ProductPage**: Product catalog with search and filters
- **ProductDetailPage**: Individual product details
- **LoginPage**: User authentication
- **RegisterPage**: User registration

### Protected Pages
- **CartPage**: Shopping cart management
- **ProfilePage**: User profile and settings
- **OrdersPage**: Order history
- **AdminPage**: Admin dashboard (admin only)

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#0ea5e9 to #0369a1)
- **Secondary**: Gray scale (#f8fafc to #0f172a)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Warning**: Yellow (#f59e0b)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400)
- **Small Text**: Medium weight (500)

### Components
- **Buttons**: Primary, secondary, and outline variants
- **Cards**: Consistent shadow and border radius
- **Forms**: Styled inputs with validation states
- **Modals**: Overlay modals with backdrop
- **Loading**: Skeleton screens and spinners

## 🔐 Authentication Flow

### Context Management
The app uses React Context for state management:

#### AuthContext
- User authentication state
- Login/logout functionality
- Token management
- Protected route handling

#### CartContext
- Shopping cart state
- Cart operations (add, remove, update)
- localStorage persistence
- Server synchronization

### Protected Routes
```jsx
<ProtectedRoute>
  <CartPage />
</ProtectedRoute>

<ProtectedRoute requireAdmin>
  <AdminPage />
</ProtectedRoute>
```

## 🛒 Shopping Cart Features

### Cart Functionality
- **Add to Cart**: From product pages and listings
- **Quantity Management**: Increase/decrease quantities
- **Remove Items**: Individual item removal
- **Clear Cart**: Remove all items
- **Persistent Storage**: localStorage integration
- **Server Sync**: Authenticated user cart sync

### Cart State
```javascript
{
  items: [
    {
      productId: "id",
      quantity: 2,
      product: { /* product details */ }
    }
  ],
  totalItems: 5,
  totalPrice: 299.98,
  isLoading: false
}
```

## 🔍 Search and Filter

### Product Search
- **Text Search**: Name and description search
- **Category Filter**: Filter by product category
- **Price Range**: Min/max price filtering
- **Sorting**: Multiple sort options
- **Pagination**: Efficient data loading

### Filter Options
- **Categories**: Electronics, Clothing, Accessories
- **Price Range**: Dynamic min/max based on products
- **Sort By**: Name, price, rating, date
- **Sort Order**: Ascending/descending

## 👤 User Management

### Authentication
- **Registration**: Full form validation
- **Login**: Email/password authentication
- **Profile Management**: Update name, email
- **Password Change**: Secure password updates
- **Order History**: View past orders

### User Roles
- **User**: Standard shopping features
- **Admin**: Full admin panel access

## 🛠️ Admin Panel

### Dashboard
- **Statistics**: Revenue, orders, users, products
- **Recent Orders**: Latest order overview
- **Quick Actions**: Common admin tasks

### Product Management
- **Add Products**: Create new products
- **Edit Products**: Update existing products
- **Delete Products**: Remove products
- **Product List**: Table view with actions

### User Management
- **User List**: View all users
- **User Details**: Individual user information
- **Role Management**: Admin/user role assignment

### Order Management
- **Order List**: All orders overview
- **Order Details**: Individual order information
- **Status Updates**: Order status management

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- **Touch-Friendly**: Large touch targets
- **Swipe Gestures**: Natural mobile interactions
- **Responsive Images**: Optimized for all screen sizes
- **Mobile Navigation**: Collapsible navigation menu

## 🎭 Loading States

### Skeleton Screens
- **Product Cards**: Animated placeholders
- **Product Details**: Content placeholders
- **User Profile**: Form placeholders

### Loading Indicators
- **Spinners**: For API calls
- **Progress Bars**: For file uploads
- **Skeleton Text**: For content loading

## 🔔 Notifications

### Toast Messages
- **Success**: Green toast for successful actions
- **Error**: Red toast for errors
- **Info**: Blue toast for information
- **Warning**: Yellow toast for warnings

### Toast Configuration
```javascript
<Toaster
  position="top-right"
  toastOptions={{
    duration: 4000,
    style: {
      background: '#363636',
      color: '#fff',
    }
  }}
/>
```

## 🚀 Deployment

### Vercel Deployment

1. **Update API URL**
   ```bash
   # In .env
   REACT_APP_API_URL=https://your-backend-domain.onrender.com/api
   ```

2. **Deploy to Vercel**
   - Connect GitHub repository
   - Select frontend folder
   - Deploy with default settings

### Build Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ]
}
```

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App
npm run eject
```

### Code Structure

#### Component Structure
```jsx
// Functional component with hooks
const ComponentName = () => {
  // State management
  const [state, setState] = useState(initialValue);
  
  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = () => {
    // Event logic
  };
  
  // Render
  return (
    <div className="tailwind-classes">
      {/* JSX content */}
    </div>
  );
};
```

#### Context Usage
```jsx
// Using contexts
const { user, login, logout } = useAuth();
const { items, addToCart, removeFromCart } = useCart();
```

## 🎨 Styling Guidelines

### Tailwind CSS Classes
- **Layout**: `flex`, `grid`, `container`
- **Spacing**: `p-4`, `m-2`, `space-x-4`
- **Colors**: `bg-primary-600`, `text-gray-900`
- **Typography**: `text-lg`, `font-semibold`
- **Responsive**: `sm:`, `md:`, `lg:` prefixes

### Custom CSS Classes
```css
.btn-primary {
  @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200;
}

.card {
  @apply bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden;
}
```

## 🔧 API Integration

### API Client
```javascript
// Axios instance with interceptors
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API Services
```javascript
// Organized API calls
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
};
```

## 📊 Performance Optimization

### Code Splitting
- **Route-based**: Lazy loading of pages
- **Component-based**: Dynamic imports for heavy components

### Image Optimization
- **Lazy Loading**: Images load as needed
- **Responsive Images**: Different sizes for different screens
- **Placeholder Images**: Fallback for missing images

### State Management
- **Context Optimization**: Minimal re-renders
- **Local Storage**: Persistent cart data
- **Memoization**: React.memo for expensive components

## 🧪 Testing

### Testing Setup
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### Test Examples
```javascript
// Component testing
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

test('renders product name', () => {
  render(<ProductCard product={mockProduct} />);
  expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
});
```

## 📝 Notes

- **Modern React**: Uses latest React patterns and hooks
- **Accessibility**: ARIA labels and keyboard navigation
- **SEO Ready**: Meta tags and structured data
- **PWA Ready**: Service worker and manifest configured
- **Performance**: Optimized bundle size and loading

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

*This frontend provides a modern, responsive, and user-friendly interface for the e-commerce application.*
