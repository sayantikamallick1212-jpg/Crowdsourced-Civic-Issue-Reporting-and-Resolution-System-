# 🚧 Civix – Local Civic Issue Reporting App  

**Domain**: Governance / Public Welfare  
**Tagline**: Empowering citizens, enabling better governance.  

![Issues](https://img.shields.io/github/issues/Harshs16/civix)
![Forks](https://img.shields.io/github/forks/Harshs16/civix)
![Stars](https://img.shields.io/github/stars/Harshs16/civix)

## 🧠 Overview
  
**Civix** is a full-stack web application designed to streamline the process of reporting, tracking, and resolving local civic issues such as potholes, broken streetlights, and uncollected garbage. It provides a bridge between citizens and municipal authorities, bringing accountability and transparency to local issue resolution. 

![Image](https://github.com/user-attachments/assets/a5c04052-c62e-4885-ad14-9084a63272f2)
*Caption: Citizen view showing issue reporting interface*

## 🚨 Problem Addressed  
Local civic issues often go unnoticed or unresolved due to:  
- Lack of structured, user-friendly reporting systems  
- No transparent status tracking  
- Difficulty in community prioritization  

## ✨ Features  

![Image](https://github.com/user-attachments/assets/b7f86a3e-3f51-4098-a5e7-eb14b134b111)
*Caption: Step-by-step issue reporting process*

### 🧍 Citizens  
- 📍 **Report Issues**: Submit problems with description, live location (via map), and image  
- 🔁 **Track Status**: View transitions from *Open → In Progress → Resolved*  
- 👍 **Upvote Issues**: Support others' reports to highlight common concerns  

### 🧑‍💼 Admins (City Workers)  
- 📊 **Dashboard**: View, filter, and manage all reported issues  
- 🔧 **Status Management**: Update progress and mark resolutions  
- 🔒 **Role-Based Access**: Secure login for Citizens and Admins  

### 📘 Civic Education & Rights  

Civix now includes a fully frontend civic learning module to educate users—especially students and first-time voters—about their rights and responsibilities.

**Route**: `/civic-education`  
**File**: `src/Pages/CivicEducation.jsx`

#### ✨ Highlights  
- 🧠 Interactive Quiz System with progress tracking and localStorage-based scores  
- 🏆 Gamified XP system, achievements, and level-ups  
- 🗂️ Tabbed layout for Overview, Learn, Quiz, and Resources  
- 🔖 Bookmark favorite sections and save them locally  
- 📊 Reading Progress Bar and Civic Journey visualization  
- 💡 Animated “Did You Know?” facts carousel  
- 📥 Downloadable PDFs and curated civic resources  
- 🎉 Celebration animations on milestone completions  

### 🧭 Civic Simulator

Civix now includes a standalone interactive simulator that allows users to step into civic leadership roles. Through animated dilemmas and slider-based decisions, users make trade-offs and explore the consequences of their choices—all within a frontend-only experience.

**Route**: `/civic-simulator`  
**File**: `src/Pages/CivicSimulator.jsx`

#### ✨ Highlights  
- 🎮 **Scenario Cards** – Solve dilemmas like budget allocation or policy conflicts using sliders and toggles  
- 🧠 **Outcome Feedback** – Dynamic responses based on user choices (public satisfaction, resource balance)  
- 📊 **Civic Style Profiling** – Discover civic personas like “Planner” or “Advocate” based on decisions  
- 🔁 **Replayable Challenges** – Rerun scenarios to improve your score and try alternate outcomes  
- 🏅 **XP & Badges** – Earn experience points and unlock achievement badges locally  
- 💡 **Frontend-Only Logic** – Built entirely in React with `localStorage` persistence for decision history and XP tracking

##📂 Project Structure

```
Civix/
├── .github/              # GitHub Actions workflows and issue/PR templates
├── backend/              # The entire Node.js/Express.js backend API
│   ├── config/           # Database (MongoDB), Swagger, and other configs
│   ├── controllers/      # Business logic for API routes (e.g., auth, issues)
│   ├── middlewares/      # Custom middleware (e.g., auth, error handling, file uploads)
│   ├── models/           # Mongoose schemas for the database (e.g., User, Issue)
│   ├── routes/           # API endpoint definitions (e.g., auth.js, profileRoutes.js)
│   ├── __tests__/        # Backend tests (Jest)
│   ├── utils/            # Utility functions (e.g., email, token, file upload)
│   ├── .env.example      # Environment variable template for the backend
│   └── server.js         # Main backend server entry point
│
├── cypress/              # End-to-end (E2E) tests
│
├── public/               # Static assets for the frontend
│   ├── gtfs/             # Static data files (CSV, JSON) for app features
│   ├── index.html        # The main HTML template for the React app
│   └── *.png, *.svg      # Public images, logos, and favicons
│
├── src/                  # The main React frontend application source code
│   ├── Pages/            # All top-level page components (e.g., Home, About, ReportIssue)
│   ├── components/       # Reusable UI components (e.g., Navbar, Footer, Chatbot)
│   ├── assets/           # Images and logos imported into React components
│   ├── hooks/            # Custom React hooks (e.g., useProfileStatus)
│   ├── utils/            # Frontend utility functions
│   ├── App.jsx           # Main React app component (routing)
│   └── index.jsx         # React app entry point
│
├── .gitignore            # Files and folders to be ignored by Git
├── LICENSE               # Project's open-source license
├── README.md             # This file
├── package.json          # Frontend dependencies and scripts (React)
└── tailwind.config.js    # Tailwind CSS configuration
```

## 🛠️ Tech Stack  
### Frontend  
- React.js  
- Tailwind CSS – Modern responsive UI  
- Leaflet.js – Interactive maps for location tagging  

### Backend  
- Node.js + Express.js  
- PostgreSQL – Relational DB for reports and user data  
- JWT Authentication – Secure role-based access
- Multer – File upload handling
- Swagger – API documentation
- Helmet.js – Security middleware
- Express Rate Limit – API protection

### Integrations  
- Cloudinary – Image uploads and hosting  
- JWT Authentication – Secure role-based access

## 🔧 Backend API Features

### 🔐 Authentication System
- **JWT-based authentication** with role management
- **Admin/User role separation** for different access levels
- **Secure password hashing** using bcrypt
- **Token expiration** and refresh handling

### 📡 RESTful API Endpoints
- **GET /api/issues** - Retrieve all civic issues
- **POST /api/issues** - Create new issue with file upload
- **PATCH /api/issues/:id/status** - Update issue status (Admin only)
- **POST /api/auth/signup** - User registration
- **POST /api/auth/login** - User authentication

### 🛡️ Security Features
- **Rate limiting** (100 requests per 15 minutes)
- **Input validation** using express-validator
- **XSS protection** and security headers
- **CORS configuration** for frontend integration
- **File upload security** with type validation

### 📊 API Documentation
- **Interactive Swagger UI** at `/api-docs`
- **Complete endpoint documentation** with examples
- **Schema definitions** for request/response objects
- **Authentication testing** directly in browser

### 🗄️ Database Integration
- **PostgreSQL** for reliable data storage
- **Optimized queries** with proper indexing
- **User management** with secure credential storage
- **Issue tracking** with status management

### 📁 File Management
- **Image upload** support for issue reporting
- **File validation** and security checks
- **Organized storage** in uploads directory
- **Efficient file handling** with Multer middleware  


## 🌗 Dark Mode Toggle  
**Implementation**:  
- `darkMode: 'class'` in `tailwind.config.js`  
- User preference saved via `localStorage`  
- Toggle switch: `src/ThemeToggle.jsx` (used in `Home.jsx`)  

**How to Use**:  
1. Locate the toggle button (🌙/☀️) in the header  
2. Click to switch between:  
   - **Light Mode**: White/light gray backgrounds (`bg-slate-50`) with dark text (`text-gray-900`)  
   - **Dark Mode**: Dark gray backgrounds (`dark:bg-gray-800`) with light text (`dark:text-gray-100`)  

## 🚀 Getting Started  

![Image](https://github.com/user-attachments/assets/2cd2d4e6-f9b4-4322-aad2-5475277ce2ff)
*Caption: Admin dashboard with issue management tools*

### Prerequisites  
- Node.js 16+  
- npm 8+  
- PostgreSQL 14+  
- Cloudinary account (for image uploads)

## 📡 API Usage Examples

### Authentication
```bash
# Register new user
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","email":"john@example.com","password":"password123"}'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Issue Management
```bash
# Get all issues
curl -X GET http://localhost:5000/api/issues
```
# Create new issue with image
curl -X POST http://localhost:5000/api/issues \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Pothole on Main Street" \
  -F "description=Large pothole causing traffic issues" \
  -F "location=Main Street & 5th Ave" \
  -F "category=road" \
  -F "file=@/path/to/image.jpg"

# Update issue status (Admin only)
curl -X PATCH http://localhost:5000/api/issues/1/status \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"in-progress"}'


### API Documentation
- **Swagger UI**: `http://localhost:5000/api-docs`
- **Interactive testing** of all endpoints
- **Complete schema documentation**
- **Authentication examples**  




### Testing
*   **Backend Testing:** Jest, Supertest, MongoDB Memory Server
*   **Frontend Unit/Component Testing:** Vitest, React Testing Library
*   **Frontend E2E Testing:** Cypress

---


## ✅ Running Tests

We have a comprehensive testing suite to ensure code quality and stability.

### Backend Tests (Jest & Supertest)

These tests cover the API endpoints. They run against an in-memory MongoDB database to ensure a clean, isolated environment for each test run, preventing any impact on your development database.

To run all backend tests, navigate to the `/backend` directory and run:
```sh
npm test
```

### Frontend Unit & Component Tests (Vitest)

These tests verify that individual React components render and behave correctly in isolation. We use Vitest and React Testing Library for this.

To run all frontend unit tests, navigate to the `/frontend` directory and run:
```sh
npm test
```

### Frontend End-to-End (E2E) Tests (Cypress)

E2E tests simulate real user workflows in a browser from start to finish. This helps catch bugs in critical user journeys like logging in, creating a post, or navigating the application.

To open the Cypress Test Runner, navigate to the `/frontend` directory and run:
```sh
npm run cypress:open
```
### 📥 Installation  
📦 1.**Clone the repository**:  
   ```bash
   git clone https://github.com/Harshs16/civix.git
   cd Civix
```
  
📦 2. **Install Dependencies**

Make sure you have **Node.js** and **npm** installed.  
Then, install the project dependencies:

```bash

npm install

```



### 🌱 3. **Create a New Branch**
Use a meaningful branch name:
```bash

git checkout -b your-feature-name

```

Example:
```bash

git checkout -b improve-readme

```


 🛠️ 4. **Make Your Changes**
- Improve the code, fix bugs, or update docs.
- If you're running the project:
  ```bash

  npm start

  ```



 ✅ 5. **Stage and Commit**
```bash

git add .
git commit -m "feat: your clear and concise commit message"

```

🚀 6. **Push Your Branch**
```bash

git push origin your-feature-name

```

---

🔁 7. **Create a Pull Request**
- Go to your forked repo on GitHub
- Click **“Compare & pull request”**
- Add a helpful description of what you changed and why

---



## 📌 Roadmap / Future Enhancements  

- 🔔 Push notifications for issue updates  
- 📈 Analytics for civic issue trends  
- 🌐 Multilingual support  
- 📱 Mobile app (React Native) 

--- 

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.

--- 

## 🌟 Our Awesome Contributors

<a href="https://github.com/Harshs16/civix/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Harshs16/civix" />
</a>

--- 

## 📄 License
MIT License. See LICENSE file for more details.

<p align="center">
  <a href="#top" style="font-size: 18px; padding: 8px 16px; display: inline-block; border: 1px solid #ccc; border-radius: 6px; text-decoration: none;">
    ⬆️ Back to Top
  </a>
</p>

