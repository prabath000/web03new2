# Push to GitHub - Step by Step

## 1. Create GitHub Repository

1. Go to https://github.com/new
2. Enter repository name: `web03-portfolio` (or your choice)
3. Make it **Public** or **Private**
4. Do NOT check "Add a README file"
5. Click "Create repository"

## 2. Push Your Code

Run these commands in your project folder:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit with a message
git commit -m "Initial commit - portfolio website"

# Add GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/web03-portfolio.git

# Push to GitHub
git push -u origin main
```

## 3. For Future Updates

```bash
git add .
git commit -m "Your commit message"
git push
```

## 4. Deploy to Vercel (Free Hosting)

1. Go to https://vercel.com and sign up with GitHub
2. Click "Add New Project"
3. Select your `web03-portfolio` repository
4. Add environment variable:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string
5. Click "Deploy"

Your site will be live at `https://web03-portfolio.vercel.app` (or similar)
