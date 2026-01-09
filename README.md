# Portfolio Website

A portfolio website with a Node.js backend and MongoDB database.

## Deploy to GitHub

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

## Deploy to Vercel (Recommended for Full Stack)

Vercel can deploy both frontend and backend:

1. Push to GitHub first
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Add New Project" and select your repository
4. Add environment variable: `MONGODB_URI` = your MongoDB Atlas connection string
5. Click "Deploy"

**Note**: Vercel serverless functions have limits - for production, consider Render or Railway.

## Deploy Backend to Render

1. Push to GitHub
2. Create account at [render.com](https://render.com)
3. Create a new "Web Service":
   - Connect your GitHub repository
   - Build command: `npm install`
   - Start command: `cd server && npm start`
4. Add environment variable: `MONGODB_URI` = your MongoDB Atlas connection string
5. Create service

## Deploy Frontend to GitHub Pages (Static Only)

GitHub Pages only hosts static files (no Node.js backend):

1. Go to repository Settings > Pages
2. Select source: "main" branch
3. Save

**Note**: The "Add Project" button will only work in Demo Mode (localStorage) on GitHub Pages. For full functionality, use Vercel or Render.

## MongoDB Atlas Setup

1. Create free account at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Create database user with password
4. Add IP to allowlist (use `0.0.0.0/0` for any IP)
5. Get connection string and add to `server/.env`

## Local Development

```bash
# Install dependencies
npm install
cd server && npm install

# Start development server
npm run dev

# Or start production server
cd server && npm start
```

## API Endpoints

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `DELETE /api/projects/:id` - Delete a project

## Demo Mode

If the backend is not running, the site falls back to Demo Mode using browser's local storage.
