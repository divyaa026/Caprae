# 🚀 SaaSQuatch AI - Lead Intelligence Dashboard

> **AI-Powered Sales Intelligence Platform** that transforms how sales teams identify, prioritize, and convert high-value prospects using advanced relationship mapping, temporal signals, and competitive intelligence.

![Lead Intelligence Dashboard](https://img.shields.io/badge/React-18.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.3+-green) ![Vite](https://img.shields.io/badge/Vite-4.4+-purple)

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚡ Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🎯 Key Components](#-key-components)
- [🔧 Configuration](#-configuration)
- [📱 Usage Guide](#-usage-guide)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

## 🌟 Features

### 🧠 AI-Powered Intelligence
- **Smart Lead Scoring** - AI confidence ratings (45-96%) for every prospect
- **Temporal Signal Detection** - Funding events, leadership changes, growth indicators
- **Relationship Mapping** - Alumni networks, employment history, investor connections
- **Competitive Context** - Migration opportunities, expansion signals, dissatisfaction indicators

### 🎛️ Advanced Filtering & Search
- **Real-time Search** - Instant filtering by company, industry, location
- **Multi-dimensional Filters** - Priority tiers, signal types, relationship warmth
- **AI Suggestions** - One-click filters for "most likely to convert" and "urgent opportunities"

### 📊 Professional Dashboard
- **Executive Metrics** - Hot leads, relationship opportunities, funding alerts
- **Interactive Tables** - Sortable, filterable lead intelligence grid
- **Detailed Modals** - Comprehensive lead profiles with action recommendations
- **Navigation System** - Multi-page application with Dashboard, Analytics, Settings

### ⚡ Modern UX/UI
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Hover effects, transitions, loading states
- **Professional Styling** - Clean, investor-grade interface design
- **Accessibility** - WCAG compliant, keyboard navigation support

## 🛠️ Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Frontend** | React | 18.2.0 | UI Framework |
| **Language** | TypeScript | 5.0+ | Type Safety |
| **Styling** | Tailwind CSS | 3.3+ | Utility-first CSS |
| **Build Tool** | Vite | 4.4+ | Fast Development |
| **Routing** | React Router | 6.0+ | Navigation |
| **Icons** | Lucide React | 0.462+ | Icon Library |
| **UI Components** | Radix UI | Latest | Accessible Components |
| **State Management** | React Hooks | Built-in | Local State |
| **Data Fetching** | TanStack Query | 5.83+ | Server State |

## ⚡ Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0 or higher)
- **npm** (v8.0 or higher)
- **Git** (latest version)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/divyaa026/goldenleadgrid.git
cd goldenleadgrid
```

2. **Navigate to frontend directory**
```bash
cd frontend
```

3. **Install dependencies**
```bash
npm install
```

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:5173
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── placeholder.svg     # Default images
│   └── robots.txt         # SEO configuration
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── dashboard/     # Dashboard-specific components
│   │   │   ├── Header.tsx              # Navigation header
│   │   │   ├── MetricCards.tsx         # Overview metrics
│   │   │   ├── IntelligenceTable.tsx   # Main lead table
│   │   │   ├── FilterPanel.tsx         # Advanced filters
│   │   │   └── LeadDetailModal.tsx     # Lead detail popup
│   │   └── ui/            # Shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Application pages
│   │   ├── Index.tsx      # Main lead intelligence page
│   │   ├── Dashboard.tsx  # Overview dashboard
│   │   ├── Analytics.tsx  # AI insights page
│   │   ├── Settings.tsx   # Configuration page
│   │   └── NotFound.tsx   # 404 error page
│   ├── types/             # TypeScript definitions
│   │   └── lead.ts        # Lead data types
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🎯 Key Components

### 1. IntelligenceTable
The core component displaying AI-powered lead insights:
- **Company Information** - Logo, name, industry, size
- **Priority Badges** - Hot 🔥, Warm ☀️, Cold 💨 indicators
- **Temporal Signals** - 💰 Funding, 👑 Leadership, 📈 Growth, 🎯 Events
- **Relationship Assets** - 🎓 Alumni, 💼 Employment, 🤝 Investor, 🔗 Tech
- **Competitive Context** - 🔄 Migration, 🚀 Expansion, 💔 Dissatisfaction
- **AI Confidence** - Visual progress bars with percentage scores

### 2. FilterPanel
Advanced filtering system with AI suggestions:
- **Priority Filters** - Multi-select checkboxes
- **Signal Filters** - Temporal event types
- **Relationship Filters** - Connection categories
- **AI Suggestions** - Smart preset filters

### 3. LeadDetailModal
Comprehensive lead profiles with actionable insights:
- **Temporal Relevance** - Timeline of important events
- **Relationship Mapping** - Network visualization
- **Competitive Landscape** - Market positioning
- **Action Plan** - AI-generated recommendations

### 4. Header
Navigation and search functionality:
- **Brand Logo** - Clickable home link
- **Navigation Menu** - Active page highlighting
- **Search Bar** - Real-time filtering
- **User Actions** - Add lead, user profile

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3001
VITE_API_KEY=your_api_key_here

# AI Service Configuration
VITE_OPENAI_API_KEY=your_openai_key
VITE_AI_CONFIDENCE_THRESHOLD=75

# Feature Flags
VITE_ENABLE_REAL_TIME_UPDATES=true
VITE_ENABLE_EXPORT_FEATURES=true
```

### Tailwind Customization

Modify `tailwind.config.ts` to customize the design system:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
        }
      }
    },
  },
}
```

## 📱 Usage Guide

### 1. Lead Intelligence Overview
- **View Metrics** - See hot leads, relationship opportunities, funding alerts
- **Search Leads** - Type in search bar for instant filtering
- **Apply Filters** - Use checkboxes and AI suggestions
- **View Details** - Click "View Insights" for comprehensive lead profiles

### 2. Navigation
- **Dashboard** - Overview metrics and quick actions
- **Leads** - Main intelligence table (default page)
- **Analytics** - AI insights and performance data
- **Settings** - Configure AI thresholds and preferences

### 3. Lead Actions
- **View Insights** - Opens detailed modal with full lead profile
- **Contact Now** - Initiates contact workflow
- **Schedule Meeting** - Calendar integration
- **Save for Later** - Add to saved leads list

### 4. Filtering & Search
- **Text Search** - Filter by company name, industry, location
- **Priority Filter** - Show only hot, warm, or cold leads
- **Signal Filter** - Filter by funding, leadership, growth, events
- **Relationship Filter** - Filter by alumni, employment, investor, tech connections
- **AI Suggestions** - One-click smart filters

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
```bash
npm i -g vercel
vercel login
vercel
```

2. **Configure Build Settings**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
- Drag and drop the `dist` folder to Netlify
- Or connect your GitHub repository

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**
4. **Commit with descriptive messages**
```bash
git commit -m "Add amazing feature"
```

5. **Push to your branch**
```bash
git push origin feature/amazing-feature
```

6. **Open a Pull Request**

### Code Style

- Use **TypeScript** for all new files
- Follow **ESLint** and **Prettier** configurations
- Write **descriptive commit messages**
- Add **JSDoc comments** for complex functions
- Ensure **responsive design** for all components

### Testing

```bash
# Run linting
npm run lint

# Type checking
npm run type-check

# Build test
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Radix UI** - For accessible component primitives
- **Tailwind CSS** - For utility-first styling
- **Lucide React** - For beautiful, consistent icons
- **Vite** - For lightning-fast development experience

---

**Built with ❤️ for modern sales teams**

For questions or support, please open an issue on GitHub or contact the development team.