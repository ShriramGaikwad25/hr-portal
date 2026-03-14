# Deploy HR Portal to Vercel

## Option 1: Deploy with Vercel CLI (quickest)

1. **Install Vercel CLI** (if needed):
   ```bash
   npm i -g vercel
   ```

2. **From the project root, deploy**:
   ```bash
   cd c:\Users\Admin\hr-portal
   vercel
   ```

3. When prompted:
   - Log in to Vercel (browser opens if first time).
   - **Set up and deploy?** → Yes.
   - **Which scope?** → Your account or team.
   - **Link to existing project?** → No (creates a new project).
   - **Project name** → `hr-portal` (or any name).
   - **Directory** → `./` (current directory).

4. Vercel will build and deploy. The first run creates the project; later you can run `vercel --prod` to deploy to production.

---

## Option 2: Deploy via GitHub + Vercel Dashboard (recommended)

### Step 1: Create the repo on GitHub

1. Go to **https://github.com/new**
2. **Repository name:** `hr-portal` (or any name you like)
3. Leave it **empty** (no README, .gitignore, or license).
4. Click **Create repository**.

### Step 2: Push your code to GitHub

In a terminal, from your project folder, run (replace `YOUR_USERNAME` with your GitHub username and `hr-portal` if you used a different repo name):

```bash
cd c:\Users\Admin\hr-portal
git remote add origin https://github.com/YOUR_USERNAME/hr-portal.git
git branch -M main
git push -u origin main
```

If GitHub asks for login, use a **Personal Access Token** as the password (Settings → Developer settings → Personal access tokens).

### Step 3: Import and deploy on Vercel

1. Go to **https://vercel.com** and sign in (use **Continue with GitHub**).
2. Click **Add New…** → **Project**.
3. Under **Import Git Repository**, select **hr-portal** (or your repo name).
4. Leave **Framework Preset** as Next.js and **Root Directory** as `.`
5. Click **Deploy**.

### Step 4: Done

When the build finishes, Vercel shows your live URL. Every push to `main` will deploy automatically.

---

## Build and env

- **Build command:** `next build` (Vercel default for Next.js)
- **Output:** Next.js standalone / default (no extra config needed)
- No environment variables are required for the current app; add any in **Project → Settings → Environment Variables** if you add an API or secrets later.
