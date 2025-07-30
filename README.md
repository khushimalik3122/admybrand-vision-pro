# AdmyBrand Vision Pro Analytics Dashboard

<div align="center">
  <h3> Advanced Analytics Dashboard for Digital Marketing</h3>
  <p>A modern, responsive analytics platform built with React, TypeScript, and shadcn/ui</p>
</div>

##  Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Key Components](#key-components)
- [Data Management](#data-management)
- [Deployment](#deployment)
- [Contributing](#contributing)

##  Overview

AdmyBrand Vision Pro is a comprehensive analytics dashboard designed for digital marketing agencies and businesses. It provides real-time insights into campaign performance, audience analytics, and market data with an intuitive and modern interface.

**Live Demo**: [https://admybrand-vision-pro.vercel.app/](https://admybrand-vision-pro.vercel.app/)

##  Features

###  Analytics & Reporting
- **Real-time Dashboard**: Live metrics and KPI tracking
- **Campaign Analytics**: Detailed performance insights for marketing campaigns
- **Audience Insights**: Demographic and behavioral analysis
- **Performance Metrics**: ROI, conversion rates, and engagement tracking
- **Custom Reports**: Generate and export detailed analytics reports

###  User Experience
- **Modern UI/UX**: Clean, intuitive interface with glass morphism design
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Charts**: Dynamic data visualization with Chart.js
- **Real-time Updates**: Live data refresh every 5 seconds

###  Functionality
- **Profile Management**: Complete user profile editing with photo upload
- **Settings Panel**: Comprehensive configuration options
- **Notification System**: Real-time alerts and updates
- **Data Export**: CSV/Excel export functionality
- **Integration Management**: Connect with major advertising platforms

###  Security & Settings
- **Form Validation**: Robust validation using Zod schemas
- **File Upload**: Secure image upload with validation
- **API Management**: Generate and manage API keys
- **Integration Controls**: Platform connection management

## 🛠 Tech Stack

### Frontend Framework
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server


### UI & Styling
- **shadcn/ui** - Modern component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Radix UI** - Accessible component primitives

### Form & Validation
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### Data & State Management
- **React Router** - Client-side routing
- **Custom Hooks** - Reusable state logic
- **Context API** - Theme and global state management

### Charts & Visualization
- **Chart.js** - Flexible charting library
- **React Chart.js 2** - React wrapper for Chart.js

##  Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khushimalik3122/admybrand-vision-pro.git
   cd admybrand-vision-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

##  Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── theme-provider/  # Theme management
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and data
│   ├── data.ts         # Static data and mock data
│   ├── market-data.ts  # Real-time market data service
│   └── utils.ts        # Helper functions
├── pages/              # Page components
│   ├── Index.tsx       # Dashboard overview
│   ├── Analytics.tsx   # Analytics page
│   ├── Campaigns.tsx   # Campaign management
│   ├── Reports.tsx     # Reports page
│   ├── Audience.tsx    # Audience insights
│   ├── Performance.tsx # Performance metrics
│   ├── Settings.tsx    # User settings
│   └── Notifications.tsx # Notifications
└── styles/             # Global styles and CSS
```

##  Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

##  Key Components

### Dashboard Layout
- **DashboardLayout**: Main layout wrapper
- **DashboardSidebar**: Navigation sidebar with collapsible menu
- **DashboardHeader**: Top header with search, notifications, and user menu

### Analytics Components
- **MetricCard**: Reusable metric display cards
- **CampaignTable**: Data table with sorting and pagination
- **Charts**: Various chart components for data visualization

### Settings & Profile
- **ProfileForm**: User profile editing with validation
- **PasswordForm**: Secure password change functionality
- **NotificationSettings**: Notification preferences management
- **IntegrationSettings**: Platform integration controls

##  Data Management

### Real-time Data Service
The application includes a sophisticated real-time data service (`market-data.ts`) that:
- Simulates live market data updates
- Provides subscription-based architecture
- Updates every 5 seconds
- Includes stock market data, campaign metrics, and traffic sources

### Form Validation
Robust form validation using Zod schemas:
- Profile information validation
- Password strength requirements
- File upload validation (type, size limits)
- Email and phone number validation

##  Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
The application is optimized for deployment on modern hosting platforms:
- Static site generation ready
- Environment variable support
- Optimized build output

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  Development Guidelines

- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Implement proper error handling
- Write meaningful commit messages
- Test components thoroughly
- Maintain responsive design principles

##  Configuration

### Theme Configuration
The application supports dark/light themes with system preference detection. Theme settings are persisted in localStorage.

### Environment Variables
Create a `.env` file for environment-specific configurations:
```
VITE_API_URL=_api_url
VITE_APP_NAME=AdmyBrand Vision Pro
```

##  Support

For support, email khushimalik511263@gmail.com or create an issue in the GitHub repository.

---

<div align="center">
  <p>Built with ❤️ by khushimalik</p>
  <p>© 2024 AdmyBrand Vision Pro. All rights reserved.</p>
</div>
