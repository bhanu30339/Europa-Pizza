# Pizza Paradise - Complete Pizza Ordering System

A full-stack pizza ordering application built with **Next.js**, **Supabase**, and **Node.js**. This system supports takeaway orders, real-time admin notifications, email alerts, and OTP-based order verification.

## Features

### Customer Features
- Browse available pizzas with real-time stock status
- Detailed pizza pages with customizable toppings
- Shopping cart with localStorage persistence
- Checkout with customer information and pickup time selection
- Order confirmation with 4-digit OTP
- Email confirmation with order details and OTP

### Admin Features
- Secure JWT-based authentication
- Real-time order notifications with browser alerts and sound
- Email notifications for new orders
- Dashboard with order statistics (today, week, month, year)
- Order management workflow: Pending → Accepted → Ready → Picked Up
- OTP verification for order pickup
- Menu management (Add/Edit/Delete pizzas, manage stock)
- Order filtering and history

### Technical Features
- Modular, component-based architecture
- Responsive design with Tailwind CSS
- Supabase PostgreSQL database with Row Level Security
- JWT authentication for admin access
- Email notifications via Gmail SMTP
- Browser notifications with sound alerts
- Frontend polling for real-time updates (every 15 seconds)
- Mock payment simulation
- Centralized reusable styles

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript
- **Backend**: Next.js API Routes (Node.js/Express equivalent)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT tokens with bcrypt
- **Email**: Nodemailer with Gmail SMTP
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **State Management**: React Context API

## Prerequisites

- Node.js 16+ and npm
- Supabase account (already configured)
- Gmail account with App Password for email notifications

## Environment Variables

The `.env` file should contain:

```env
# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# JWT Secret (change in production)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-minimum-32-characters

# Gmail SMTP (configure for email notifications)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password

# Admin Email
ADMIN_EMAIL=admin@pizzaparadise.com

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Setting Up Gmail SMTP

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to Security → 2-Step Verification (enable it if not already)
3. Go to Security → App Passwords
4. Generate a new App Password for "Mail"
5. Copy the 16-character password
6. Update `GMAIL_USER` and `GMAIL_APP_PASSWORD` in `.env`

## Installation & Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Setup admin user**:
```bash
npm run setup-admin
```

This creates an admin user with:
- Email: `admin@test.com`
- Password: `admin123`

3. **Run development server**:
```bash
npm run dev
```

Visit `http://localhost:3000`

4. **Build for production**:
```bash
npm run build
npm start
```

## Database Schema

The application uses the following Supabase tables:

### Tables:
- **admins**: Admin user accounts
- **pizzas**: Pizza menu items with ingredients and pricing
- **toppings**: Available pizza toppings
- **orders**: Customer orders with status tracking
- **order_items**: Individual items within orders

All tables have Row Level Security (RLS) enabled with appropriate policies.

## Project Structure

```
/app
  /api                        # API routes (Node.js/Express equivalent)
    /admin                    # Admin APIs (JWT protected)
      /login                  # Admin authentication
      /menu                   # Pizza CRUD operations
      /orders                 # Order management
        /[id]                 # Update order status
        /verify-otp           # OTP verification
    /menu                     # Public menu API
      /[id]                   # Pizza details with toppings
    /orders                   # Order creation and retrieval
  /admin                      # Admin pages
    /dashboard                # Order management dashboard
    /login                    # Admin login
  /cart                       # Shopping cart
  /checkout                   # Checkout page
  /menu                       # Menu pages
    /[id]                     # Pizza details page
  /order-confirmation         # Order confirmation page
  globals.css                 # Global styles with custom utilities
  layout.tsx                  # Root layout with CartProvider
  page.tsx                    # Home page

/components                   # Reusable components
  /ui                         # shadcn/ui components
  Footer.tsx                  # Footer component
  Navbar.tsx                  # Navigation with cart indicator
  PizzaCard.tsx               # Pizza card component

/lib                          # Utilities and configurations
  auth.ts                     # JWT and password utilities
  cart-context.tsx            # Shopping cart context
  email.ts                    # Email notification utilities
  supabase.ts                 # Supabase client and types
  utils.ts                    # Utility functions

/scripts
  setup-admin.js              # Admin user setup script

/public
  bell.mp3                    # Notification sound (placeholder)
```

## API Routes

### Public APIs
- `GET /api/menu` - Fetch all pizzas
- `GET /api/menu/:id` - Fetch pizza details with toppings
- `POST /api/orders` - Create new order
- `GET /api/orders?id=:id` - Get order details

### Admin APIs (JWT Protected)
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/orders?filter=:filter` - Fetch orders with filters
- `GET /api/admin/orders?new=true` - Check for new unacknowledged orders
- `PUT /api/admin/orders/:id` - Update order status
- `POST /api/admin/orders/verify-otp` - Verify OTP for pickup
- `GET /api/admin/menu` - Fetch all pizzas (admin view)
- `POST /api/admin/menu` - Add new pizza
- `PUT /api/admin/menu/:id` - Update pizza
- `DELETE /api/admin/menu/:id` - Delete pizza

## Features Breakdown

### Customer Flow

1. **Browse Menu** (`/menu`)
   - View all available pizzas
   - Out-of-stock pizzas are clearly marked and disabled

2. **Pizza Details** (`/menu/[id]`)
   - View pizza description and base ingredients
   - Select extra toppings (with price updates)
   - Adjust quantity
   - Add to cart

3. **Shopping Cart** (`/cart`)
   - View cart items with customizations
   - Update quantities
   - Remove items
   - See total price
   - Proceed to checkout

4. **Checkout** (`/checkout`)
   - Enter customer information (name, email, phone)
   - Select pickup time (minimum 30 minutes from now)
   - Review order summary
   - Simulate payment

5. **Order Confirmation** (`/order-confirmation`)
   - View order number and 4-digit OTP
   - See order details and total
   - Receive email confirmation

### Admin Flow

1. **Login** (`/admin/login`)
   - Secure JWT-based authentication
   - Demo credentials provided

2. **Dashboard** (`/admin/dashboard`)
   - **Statistics Cards**: Today's orders, pending orders, revenue
   - **Real-time Notifications**:
     - Frontend polls every 15 seconds for new orders
     - Browser notification with sound alert
     - Visual bell indicator for unacknowledged orders
     - Email notification sent to admin
   - **Order Management**:
     - View orders filtered by time period
     - Acknowledge new orders
     - Accept pending orders
     - Mark orders as ready
     - Verify OTP for pickup
     - Cancel orders
   - **Order Status Workflow**:
     - Pending → Accepted → Ready → Picked Up

## Notification System

### Email Notifications (Gmail SMTP)

**Customer Emails**:
- Order confirmation with order number
- 4-digit OTP for pickup
- Order summary with items and total
- Pickup time information

**Admin Emails**:
- New order notification
- Customer contact information
- Order details and total

### Browser Notifications

**How it works**:
1. Admin dashboard polls `/api/admin/orders?new=true` every 15 seconds
2. When new unacknowledged orders are detected:
   - Plays `bell.mp3` sound
   - Shows browser notification (if permitted)
   - Displays toast message
   - Visual bell icon on order card
3. Admin can acknowledge orders to stop alerts

**Setup**:
- Browser will request notification permission on first visit
- Place an actual `bell.mp3` file in `/public/` directory
- The app automatically handles notification permissions

## Custom Styles

The application uses centralized Tailwind utility classes defined in `globals.css`:

- `.container-custom` - Responsive container
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.btn-outline` - Outline button style
- `.card-custom` - Card component style
- `.input-custom` - Input field style
- `.badge-status` - Status badge base
- `.badge-pending` - Pending status badge
- `.badge-accepted` - Accepted status badge
- `.badge-ready` - Ready status badge
- `.badge-picked-up` - Picked up status badge
- `.badge-cancelled` - Cancelled status badge
- `.pizza-grid` - Pizza grid layout
- `.section-title` - Section title style
- `.page-header` - Page header gradient

## Data Flow

### Order Creation Flow

```
Customer → Checkout Form → POST /api/orders
                               ↓
                    Create order in Supabase
                               ↓
                    Generate OTP and order number
                               ↓
            Send email to customer (order confirmation)
                               ↓
            Send email to admin (new order notification)
                               ↓
                Return order details to customer
                               ↓
            Redirect to order confirmation page
```

### Admin Notification Flow

```
Admin Dashboard → Poll /api/admin/orders?new=true (every 15s)
                               ↓
                    Check for unacknowledged orders
                               ↓
                If new orders found:
                    - Play bell sound
                    - Show browser notification
                    - Display toast message
                    - Show visual indicator
```

### OTP Verification Flow

```
Customer arrives for pickup → Shows OTP to admin
                               ↓
Admin enters OTP → POST /api/admin/orders/verify-otp
                               ↓
                    Verify OTP matches order
                               ↓
                If valid:
                    - Update order status to "picked_up"
                    - Return success
                If invalid:
                    - Return error
```

## Security Features

- **JWT Authentication**: Admin routes protected with JWT tokens
- **Password Hashing**: bcrypt with salt rounds for password security
- **Row Level Security**: Supabase RLS policies on all tables
- **Environment Variables**: Sensitive data stored in `.env`
- **OTP Verification**: 4-digit OTP for secure order pickup
- **HTTPS Ready**: Designed for production HTTPS deployment

## Troubleshooting

### Email not sending
- Verify Gmail credentials in `.env`
- Ensure App Password is correct (not regular password)
- Check Gmail 2-Step Verification is enabled
- Check console logs for error messages

### Browser notifications not working
- Click "Allow" when prompted for notification permission
- Check browser notification settings
- Ensure browser supports Notification API

### Bell sound not playing
- Place an actual `bell.mp3` file in `/public/` directory
- Check browser audio permissions
- Ensure file is a valid MP3 format

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (16+ required)
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

### Admin can't login
- Run `npm run setup-admin` to create admin user
- Check credentials: `admin@test.com` / `admin123`
- Verify Supabase connection in `.env`

## Production Deployment

Before deploying to production:

1. **Update Environment Variables**:
   - Change `JWT_SECRET` to a strong random string
   - Update `NEXT_PUBLIC_APP_URL` to production URL
   - Configure Gmail SMTP credentials

2. **Add Bell Sound**:
   - Replace placeholder with actual `bell.mp3` file in `/public/`

3. **Security**:
   - Enable HTTPS
   - Review RLS policies
   - Change admin password after first login

4. **Build**:
```bash
npm run build
npm start
```

## License

This project is for educational and demonstration purposes.

## Support

For issues or questions about this pizza ordering system, please refer to the documentation or check the code comments for detailed explanations.
