# Weather Dashboard

A professional full-stack weather dashboard built with React and Express. The app supports live location search, browser geolocation, current conditions, 5-day forecast, air quality, local history persistence, multi-format export, and integrated location imagery.

## Tech Stack

Frontend:
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide icons

Backend:
- Node.js
- Express
- Axios
- dotenv
- cors
- morgan
- express-validator
- json2csv
- pdfkit

External services:
- Open-Meteo weather and air quality APIs
- OpenStreetMap Nominatim for geocoding
- Google Maps links for location reference
- Unsplash Source for location imagery

## Project Structure

```text
frontend/
  src/
    components/
    hooks/
    pages/
    services/
backend/
  data/
  src/
    controllers/
    middleware/
    routes/
    services/
    utils/
```

## Key Features

- Free-form location search: city, ZIP/postal code, GPS coordinates, or landmarks
- Current weather conditions with temperature, humidity, wind, and description
- 5-day forecast and air quality summary
- Browser geolocation for current location weather
- Local search history with read, update, and delete support
- JSON persistence in `backend/data/weather-requests.json`
- Export saved data as JSON, CSV, PDF, or Markdown
- Responsive dashboard optimized for desktop and mobile
- Clean error handling and input validation

## Setup

Prerequisites:
- Node.js 20 or newer

1. Install dependencies:

```bash
npm install
npm run install:all
```

2. Configure the backend environment:

```bash
cp backend/.env.example backend/.env
```

Update `backend/.env`:

```env
PORT=5000
FRONTEND_URL="http://localhost:5173"
APP_NAME="Weather Dashboard"
YOUTUBE_API_KEY=""
```

3. Configure the frontend environment:

```bash
cp frontend/.env.example frontend/.env
```

Update `frontend/.env`:

```env
VITE_API_BASE_URL="http://localhost:5000/api"
VITE_DEVELOPER_NAME="Your Name"
```

4. Start the app:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:5000/api/health`

Saved searches are stored in:

```text
backend/data/weather-requests.json
```

## Scripts

```bash
npm run install:all
npm run dev
npm run build
npm --prefix backend run dev
npm --prefix frontend run dev
npm --prefix frontend run build
```

## API Endpoints

```text
GET    /api/health
POST   /api/weather/search
GET    /api/weather-requests
GET    /api/weather-requests/:id
PUT    /api/weather-requests/:id
DELETE /api/weather-requests/:id
GET    /api/export/json
GET    /api/export/csv
GET    /api/export/pdf
GET    /api/export/markdown
```

Example request body:

```json
{
  "query": "Cairo",
  "startDate": "2026-06-22",
  "endDate": "2026-06-26",
  "notes": "Demo request"
}
```

## Notes

- The app uses environment variables to customize the backend application name and frontend developer name.
- The frontend `About` page shows the developer name from `VITE_DEVELOPER_NAME`.
- The project is designed to work with free geocoding and weather APIs.
