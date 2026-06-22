# Installation Requirements

## System Requirements
- **Node.js**: v16 or higher
- **npm**: v7 or higher (comes with Node.js)
- **Operating System**: Windows, macOS, or Linux

---

## Backend Requirements

**Location**: `backend/`

### Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.21.2 | Web framework for Node.js |
| cors | ^2.8.5 | Enable Cross-Origin Resource Sharing |
| morgan | ^1.10.0 | HTTP request logger middleware |
| dotenv | ^16.4.7 | Load environment variables from .env |
| axios | ^1.7.9 | HTTP client for API requests |
| express-validator | ^7.2.1 | Middleware for request validation |
| json2csv | ^6.0.0-alpha.2 | Convert JSON to CSV format |
| pdfkit | ^0.15.1 | PDF document generation |

### Installation
```bash
cd backend
npm install
```

---

## Frontend Requirements

**Location**: `frontend/`

### Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.1 | UI library |
| react-dom | ^18.3.1 | React DOM rendering |
| react-router-dom | ^7.1.1 | Client-side routing |
| axios | ^1.7.9 | HTTP client for API requests |
| lucide-react | ^0.468.0 | Icon library |
| @vitejs/plugin-react | ^4.3.4 | Vite React plugin |

### Dev Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^6.0.7 | Build tool and dev server |
| tailwindcss | ^3.4.17 | Utility-first CSS framework |
| postcss | ^8.4.49 | CSS transformation tool |
| autoprefixer | ^10.4.20 | Add vendor prefixes to CSS |

### Installation
```bash
cd frontend
npm install
```

---

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `backend/` directory:
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_DEVELOPER_NAME=Your Name
```

### 4. Start Development Servers

**Backend** (Terminal 1):
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

**Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

---

## Root Level Package.json

**Location**: `./package.json`

This file typically contains workspace-level scripts if using npm workspaces.

---

## Notes
- All packages use semantic versioning (e.g., `^4.21.2` allows updates that don't break the API)
- Run `npm update` in each directory to get latest compatible versions
- Delete `node_modules` folder and run `npm install` again if dependencies conflict
- Use `npm audit` to check for security vulnerabilities
