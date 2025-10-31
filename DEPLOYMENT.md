# Deployment Guide

This guide will walk you through deploying the E-Commerce Store to production using Vercel (frontend) and Render (backend).

## 🚀 Quick Start

1. **Backend**: Deploy to Render
2. **Frontend**: Deploy to Vercel
3. **Configure**: Update environment variables
4. **Test**: Verify everything works

## 📋 Prerequisites

- GitHub account
- Render account (free tier available)
- Vercel account (free tier available)
- Git installed locally

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Backend

1. **Push to GitHub**
   ```bash
   cd backend
   git add .
   git commit -m "Deploy backend to Render"
   git push origin main
   ```

2. **Verify Files**
   - ✅ `package.json` with start script
   - ✅ `render.yaml` configuration
   - ✅ `server.js` entry point

### Step 2: Deploy on Render

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign up/Login with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   ```
   Name: kumaravel-ecommerce-backend
   Environment: Node
   Region: Oregon (US West)
   Branch: main
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

4. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your_super_secret_jwt_key_here
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note the service URL (e.g., `https://kumaravel-ecommerce-backend.onrender.com`)

### Step 3: Test Backend

1. **Health Check**
   ```bash
   curl https://your-backend-url.onrender.com/api/health
   ```

2. **Expected Response**
   ```json
   {
     "status": "OK",
     "message": "E-Commerce API is running",
     "timestamp": "2024-01-01T00:00:00.000Z"
   }
   ```

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. **Update API URL**
   ```bash
   cd frontend
   # Create .env file
   echo "REACT_APP_API_URL=https://your-backend-url.onrender.com/api" > .env
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy frontend to Vercel"
   git push origin main
   ```

### Step 2: Deploy on Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project**
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

4. **Set Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   REACT_APP_NAME=TechStore
   REACT_APP_VERSION=1.0.0
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-5 minutes)
   - Note the deployment URL (e.g., `https://kumaravel-store.vercel.app`)

### Step 3: Update Backend CORS

1. **Update Backend Environment**
   - Go to Render dashboard
   - Edit your web service
   - Update `FRONTEND_URL` to your Vercel URL
   - Redeploy the service

## 🔄 Complete Setup

### Step 1: Update Frontend API URL

1. **In Vercel Dashboard**
   - Go to your project settings
   - Environment Variables
   - Update `REACT_APP_API_URL` with your Render backend URL

2. **Redeploy Frontend**
   - Trigger a new deployment
   - Or push a new commit

### Step 2: Test Complete Application

1. **Visit Frontend URL**
   - Open your Vercel deployment URL
   - Test user registration/login
   - Test product browsing
   - Test cart functionality

2. **Test Admin Features**
   - Login with admin credentials
   - Access admin panel
   - Test product management

## 🔧 Environment Variables Reference

### Backend (Render)
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://your-backend-domain.onrender.com/api
REACT_APP_NAME=TechStore
REACT_APP_VERSION=1.0.0
```

## 🚨 Common Issues & Solutions

### Backend Issues

#### 1. Build Fails
**Problem**: npm install fails
**Solution**: 
- Check `package.json` has all dependencies
- Ensure Node.js version compatibility
- Check for any missing files

#### 2. Service Won't Start
**Problem**: Application crashes on startup
**Solution**:
- Check server logs in Render dashboard
- Verify `start` script in `package.json`
- Ensure `server.js` is the entry point

#### 3. CORS Errors
**Problem**: Frontend can't connect to backend
**Solution**:
- Update `FRONTEND_URL` in backend environment
- Check CORS configuration in `server.js`
- Redeploy backend after changes

### Frontend Issues

#### 1. Build Fails
**Problem**: npm run build fails
**Solution**:
- Check for TypeScript errors
- Verify all imports are correct
- Check for missing dependencies

#### 2. API Connection Fails
**Problem**: Frontend can't reach backend
**Solution**:
- Verify `REACT_APP_API_URL` is correct
- Check backend is running and accessible
- Test API endpoints directly

#### 3. Environment Variables Not Working
**Problem**: Environment variables not loaded
**Solution**:
- Ensure variables start with `REACT_APP_`
- Redeploy after adding variables
- Check variable names are correct

## 🔍 Testing Deployment

### 1. Backend API Tests
```bash
# Health check
curl https://your-backend-url.onrender.com/api/health

# Test products endpoint
curl https://your-backend-url.onrender.com/api/products

# Test authentication
curl -X POST https://your-backend-url.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@kumaravel.com","password":"password"}'
```

### 2. Frontend Tests
- ✅ Homepage loads
- ✅ Product listing works
- ✅ Search and filters work
- ✅ User registration works
- ✅ User login works
- ✅ Cart functionality works
- ✅ Admin panel accessible (with admin account)

### 3. Integration Tests
- ✅ Frontend can communicate with backend
- ✅ Authentication flow works end-to-end
- ✅ Cart persists across page refreshes
- ✅ Orders can be placed successfully

## 📊 Performance Optimization

### Backend Optimization
- **Enable Gzip**: Add compression middleware
- **Caching**: Implement response caching
- **Database**: Consider upgrading to persistent storage

### Frontend Optimization
- **Code Splitting**: Implement lazy loading
- **Image Optimization**: Use WebP format
- **CDN**: Consider using a CDN for static assets

## 🔒 Security Considerations

### Production Security
- **JWT Secret**: Use a strong, random secret
- **HTTPS**: Both services use HTTPS by default
- **CORS**: Properly configured for your domain
- **Environment Variables**: Never commit secrets to Git

### Additional Security
- **Rate Limiting**: Implement API rate limiting
- **Input Validation**: All inputs are validated
- **Error Handling**: Secure error messages

## 📈 Monitoring & Analytics

### Render Monitoring
- **Logs**: View application logs in dashboard
- **Metrics**: Monitor CPU, memory usage
- **Uptime**: Check service availability

### Vercel Analytics
- **Performance**: Monitor page load times
- **Usage**: Track visitor statistics
- **Errors**: Monitor JavaScript errors

## 🔄 Updates & Maintenance

### Updating Backend
1. Make changes locally
2. Test thoroughly
3. Push to GitHub
4. Render auto-deploys

### Updating Frontend
1. Make changes locally
2. Test thoroughly
3. Push to GitHub
4. Vercel auto-deploys

### Database Migration (Future)
When moving to persistent storage:
1. Set up MongoDB/PostgreSQL
2. Update backend configuration
3. Migrate data from in-memory storage
4. Update environment variables

## 📞 Support

### Render Support
- Documentation: [render.com/docs](https://render.com/docs)
- Community: [community.render.com](https://community.render.com)

### Vercel Support
- Documentation: [vercel.com/docs](https://vercel.com/docs)
- Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

## 🎉 Success Checklist

- ✅ Backend deployed to Render
- ✅ Frontend deployed to Vercel
- ✅ Environment variables configured
- ✅ CORS properly set up
- ✅ Authentication working
- ✅ Cart functionality working
- ✅ Admin panel accessible
- ✅ Mobile responsive
- ✅ Performance optimized
- ✅ Security measures in place

---

**Congratulations!** 🎉 Your Kumaravel E-Commerce Store is now live and ready for customers!

**Live URLs:**
- Frontend: `https://your-frontend-domain.vercel.app`
- Backend: `https://your-backend-domain.onrender.com/api`

**Demo Accounts:**
- Admin: `admin@kumaravel.com` / `password`
- User: `user@kumaravel.com` / `password`
