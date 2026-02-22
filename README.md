# MAVRIC Watches E-Commerce

This repo now includes:
- Laravel backend: `backend-laravel`
- Next.js user frontend: `frontend-user-next`
- Next.js admin frontend: `frontend-admin-next`

Legacy PHP/React apps are still present in:
- `backend`
- `mavric-user`
- `mavric-admin`

## New Stack
- Backend: Laravel 12 + MySQL
- Frontend user: Next.js (App Router)
- Frontend admin: Next.js (App Router)
- Auth: JWT (compatible with previous payload/headers)
- API contract: keeps `.php` endpoint paths for compatibility

## Run Backend (Laravel)
1. Start MySQL in XAMPP.
2. Configure `backend-laravel/.env` if needed.
3. Run:

```bash
cd backend-laravel
C:\xampp\php\php.exe artisan migrate --seed
C:\xampp\php\php.exe artisan serve
```

Default admin:
- Username: `admin`
- Password: `admin123`

API base:
- `http://localhost:8000/api`

Compatibility endpoints include:
- `GET /api/products.php`
- `GET /api/brands.php`
- `GET /api/sliders.php`
- `POST /api/orders.php`
- `POST /api/admin/login.php`
- `GET|POST|PUT|DELETE /api/admin/products.php`
- `GET|PUT|DELETE /api/admin/orders.php`
- `GET|POST|PUT|DELETE /api/admin/brands.php`
- `GET|POST|PUT|DELETE /api/admin/sliders.php`
- `GET /api/admin/dashboard.php`
- `POST /api/admin/upload.php`

## Run Next Frontends
User app:

```bash
cd frontend-user-next
npm run dev
```

Admin app:

```bash
cd frontend-admin-next
npm run dev -- --port 3001
```

If your API host differs, set `NEXT_PUBLIC_API_BASE_URL` in each frontend app.

Default configured value in both frontends:
- `http://127.0.0.1:8000/api`
