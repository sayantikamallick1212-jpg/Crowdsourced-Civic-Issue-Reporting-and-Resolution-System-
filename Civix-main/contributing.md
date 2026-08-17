# 🤝 Contributing to Civix

Thank you for your interest in contributing to **Civix**!  
Our mission is to **foster civic engagement and strengthen community collaboration**, and we’re excited to have contributors from all backgrounds help make that vision a reality.

## 💡 Ways You Can Contribute

There are many ways to get involved — no contribution is too small!

- 🐞 **Report Bugs or Issues**  
  Help us improve by reporting bugs, errors, or unexpected behavior.

- 💭 **Suggest Features or Improvements**  
  Have an idea that could make Civix better? Share your suggestions for new features, enhancements, or workflow improvements.

- 💻 **Submit Code Contributions**  
  Fix bugs, implement new features, or improve existing functionality. We welcome pull requests that help Civix grow and evolve.

- 📘 **Improve Documentation**  
  Clear and accessible documentation helps everyone. You can fix typos, add examples, or expand explanations.

- 🎨 **Contribute to UI/UX Design**  
  Share design feedback, propose layout improvements, or enhance accessibility and usability across the app.


## 🛠 Setting up for development

1. **Fork the repository**
 
2. **Clone the repository:**

  ```bash
git clone https://github.com/HarshS16/Civix.git
cd Civix
```
git clone https://github.com/Harshs16/civix.git

3. **Set up the project**.

## Contributing Guidelines

### ⚙️ Project Setup Instructions

#### Prerequisites
Before you start, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18.x or later)  
- [npm](https://www.npmjs.com/) (v8.x or later)  
- [PostgreSQL](https://www.postgresql.org/) (v13.x or later)

---

### Installation
1. **Clone the repository:**
2. **Install dependencies:**
   ```bash
       npm install
   ```
3. **Database Setup:** 
Create a new database for Civix:

```bash
createdb civix
```

Edit your configuration (typically a .env) to connect to your Postgres database:
```bash
DB_NAME=civix
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_pass
```
4. **Running the Application:**
Start the application in development:
```bash
npm start
```
### Branching Strategy

* Always branch out from `main`:

```bash
git checkout -b feat/your-feature-name
```

* Use these prefixes for your branches:

| Type    | Prefix   |
| ------- | -------- |
| Feature | `feat/`  |
| Fix     | `fix/`   |
| Docs    | `docs/`  |
| Chore   | `chore/` |

### 📝 Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for all commit messages.  
This ensures a consistent and meaningful commit history that’s easy to read and automate.

Example:
```bash
git commit -m "feat(component): add navbar component"
```

### 🔄 Pull Request Process

* Ensure your PR includes a **clear title and description**.  
* Link to any **relevant issues**.  
* Add **screenshots or demos** if applicable.  
* PRs should:
  - ✅ **Pass lint and formatting checks**  
  - 👀 **Be reviewed by at least one maintainer**  
  - 🔧 **Be rebased or merged cleanly with `main`**

Maintainers will review your PR and may request changes before approval. Once approved, your PR will be merged into the main branch.

---

## 🐛 How to File a Bug

If you’ve found a bug or unexpected behavior, please help us by reporting it:

1. Open a new [issue](https://github.com/HarshS16/Civix/issues/new/choose).  
2. Select the **Bug Report** template.  
3. Include the following details:
   - 🔁 **Steps to reproduce**  
   - ⚙️ **Expected vs. actual behavior**  
   - 🖼️ **Screenshots or logs**, if applicable  

Providing detailed and clear reports helps us resolve issues faster and more accurately.

---

## ✨ How to Request a Feature

We welcome new ideas that can make **Civix** better for everyone. To request a feature:

1. Open a new [issue](https://github.com/HarshS16/Civix/issues/new/choose).  
2. Select the **Feature Request** template.  
3. Clearly describe the following:
   - 🧩 **The problem you're solving**  
   - 💡 **Why it's important**  
   - 🚀 **Your proposed solution**

Providing as much context as possible helps us understand your idea and evaluate how it fits into Civix’s goals.

---


## ✅ Pull Request Checklist

Before submitting your pull request, please ensure the following:

* [ ] **Clear title and description** that explain what the PR does  
* [ ] **Follows the branching strategy** (`feat/`, `fix/`, etc.) and **uses Conventional Commits**  
* [ ] Code is **well-formatted**  
* [ ] Includes **tests** or **relevant usage examples**, if applicable  
* [ ] All **new/updated components are documented**  
* [ ] Screenshots/demos included (for UI changes)  
* [ ] Linked to a related **issue** (if one exists)  
* [ ] PR is up-to-date with the `main` branch (`git pull origin main` before pushing)  
* [ ] Ready for review: tagged with appropriate labels (e.g., `enhancement`, `bug`, `docs`)  
* [ ] Reviewed and approved by at least one maintainer  

---


## 🧭 Useful Resources

- [Node.js](https://nodejs.org/en)  
- [Conventional Commits Guide](https://www.conventionalcommits.org/en/v1.0.0/)  
- [Open Source Guide](https://opensource.guide/how-to-contribute/)

---

## 📜 Code of Conduct

We follow the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md).  
Please be **respectful, inclusive, and collaborative** in all contributions.

---

## 🚀 Let’s Build Something Great Together!

Thank you for helping make Civix a thriving, community-driven project.
Your contributions — big or small — make a real difference.
