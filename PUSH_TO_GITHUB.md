# Push to a new GitHub project

## 1. Create the new repo on GitHub

- Open: **https://github.com/new**
- **Repository name:** `hr-portal` (or any name)
- Leave **empty** (no README, .gitignore, license)
- Click **Create repository**

## 2. Run these in your terminal

Replace `YOUR_GITHUB_USERNAME` with your GitHub username. If your repo name is not `hr-portal`, change it in the URL too.

```bash
cd c:\Users\Admin\hr-portal
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/hr-portal.git
git push -u origin main
```

If Git asks for a password, use a **Personal Access Token** (GitHub → Settings → Developer settings → Personal access tokens → Generate new token).

Done. Your code will be on GitHub.
