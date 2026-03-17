# Stockr — Product Inventory Management System

A production-ready full-stack inventory management app built with React + Vite, Node.js/Express, and MongoDB Atlas.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Axios, react-hot-toast
- **Backend**: Node.js, Express, Mongoose, express-validator, Helmet, express-rate-limit
- **Database**: MongoDB Atlas

---

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier )

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env — add your MONGODB_URI and set CLIENT_ORIGIN=http://localhost:3000
npm install
npm run dev
# Runs on http://localhost:5000
```

### Frontend

```bash
cd frontend
cp .env.example .env
# Edit .env — set VITE_API_URL=http://localhost:5000
npm install
npm run dev
# Runs on http://localhost:3000
```

---

## Deployment

### MongoDB Atlas Setup
1. Create a free cluster at https://cloud.mongodb.com
2. Add a database user with read/write access
3. Under Network Access, add `0.0.0.0/0` (allow all IPs)
4. Copy the connection string and replace `<password>` with your user password

### Backend → Render or Railway

1. Push the `backend/` folder to a GitHub repo (or the full monorepo)
2. Create a new Web Service on Render / Railway pointing to the backend
3. Set the following environment variables:
   ```
   MONGODB_URI=mongodb+srv://...
   CLIENT_ORIGIN=https://your-frontend.vercel.app
   NODE_ENV=production
   PORT=5000
   ```
4. Start command: `npm start`

### Frontend → Vercel

1. Import the `frontend/` folder (or monorepo with root set to `frontend/`)
2. Set the environment variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
3. Build command: `npm run build`
4. Output directory: `dist`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List products (search, category, page, limit) |
| GET | `/api/products/stats` | Dashboard stats |
| GET | `/api/products/categories` | All distinct categories |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Query Parameters for GET /api/products
- `search` — regex search on product name
- `category` — filter by exact category
- `page` — page number (default: 1)
- `limit` — results per page (default: 20)

---

## Project Structure

```
stockr/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/productController.js
│   │   ├── middleware/errorHandler.js
│   │   ├── middleware/validate.js
│   │   ├── models/Product.js
│   │   ├── routes/products.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── modals/
    │   │   └── ui/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/api.js
    │   └── utils/format.js
    ├── .env.example
    └── package.json
```
