# Business Profile Comparator

A full-stack web application that helps restaurant owners and local businesses improve their online visibility by comparing their business profiles against competitors and providing AI-powered recommendations.

## What I Built

### 🏗️ Core Architecture
- **Frontend**: React with TypeScript, Tailwind CSS, and Zustand for state management
- **Backend**: Node.js with Express and TypeScript
- **AI Integration**: OpenAI GPT-4o-mini with Gemini AI fallback
- **External APIs**: Serper.dev for Google Places data

### ✨ Key Features Implemented

#### 1. Business Search & Profile Display
- Real-time business search using Google Places API via Serper.dev
- Comprehensive business profile display with ratings, reviews, hours, amenities
- Clean, responsive UI with proper loading states and error handling

#### 2. Competitor Discovery
- Geographic-based competitor search using lat/lng coordinates
- Competitor selection interface with multi-select capability
- Real-time competitor data fetching and display

#### 3. AI-Powered Analysis
- **Single Business Analysis**: AI recommendations for profile improvements
- **Competitor Comparison**: Side-by-side analysis with strategic insights
- Intelligent fallback system (OpenAI → Gemini if rate limited)
- Markdown-formatted responses with proper rendering

#### 4. Dual Comparison Modes
- **Analysis Mode**: Focus on single business optimization
- **Comparison Mode**: Direct competitor benchmarking
- Tabbed interface for clean UX separation

### 🎯 Technical Highlights
- **Singleton Pattern**: Centralized AI service with fallback logic
- **Type Safety**: Comprehensive TypeScript interfaces across frontend/backend
- **Error Handling**: Graceful degradation and user-friendly error messages
- **State Management**: Clean separation of concerns with Zustand
- **API Design**: RESTful endpoints with proper validation

## What I Skipped and Why

### 🚫 Intentionally Skipped Features

#### 1. **Profile Scoring/Ranking System**
- **Why**: Would require complex weighting algorithms and industry benchmarks
- **Time Impact**: 4-6 hours for meaningful implementation
- **Priority**: Lower than core comparison functionality

#### 2. **Visual Charts and Graphs**
- **Why**: Focused on AI-powered insights over visual analytics
- **Alternative**: Used clean, readable text-based comparisons
- **Trade-off**: Faster development for better AI integration

#### 3. **User Authentication & Persistence**
- **Why**: Prototype focused on core functionality over user management
- **Scope**: Outside MVP requirements
- **Future**: Easy to add with JWT/session management

#### 4. **Advanced Filtering & Search**
- **Why**: Basic search met core requirements
- **Examples**: Category filters, price range, distance radius
- **Priority**: Enhancement rather than core feature

#### 5. **Review Response Analysis**
- **Why**: Would require review text scraping and sentiment analysis
- **Complexity**: Significant additional API integration
- **Focus**: Kept scope manageable for 1-2 day timeline

## How to Run the Project

### 📋 Prerequisites
- Node.js 16+ and npm
- API Keys for:
  - OpenAI (required)
  - Google API (optional - has mock data fallback)
  - Serper.dev (optional - has mock data fallback)

### 🚀 Quick Start

#### 1. Clone and Install
```bash
git clone https://github.com/vvduth/competitor-insights.git
cd competitor-insights
npm install
```

#### 2. Environment Setup
```bash
# Server environment
cd server
cp .env.example .env
# Edit .env with your API keys:
# OPENAI_API_KEY=your_openai_key
# GOOGLE_API_KEY=your_google_key (optional)
# SERPER_API_KEY=your_serper_key (optional)
```

#### 3. Start Backend
```bash
cd server
npm install
npm run dev  # Runs on http://localhost:5000
```

#### 4. Start Frontend
```bash
cd client
npm install
npm start    # Runs on http://localhost:3000
```

### 🔑 API Keys Setup
1. **OpenAI**: Get from https://platform.openai.com/api-keys
2. **Google Places**: Get from https://console.cloud.google.com/
3. **Serper**: Get from https://serper.dev/ (free tier available)

### 📱 Usage
1. Search for your business in the "Business Analysis" tab
2. View AI recommendations for profile improvements
3. Switch to "Competitor Comparison" to compare with specific competitors
4. Use "Find Competitors" to discover nearby businesses automatically

## What I'd Improve with More Time

### 🚀 High Priority (1-2 additional days)

#### 1. **Enhanced Data Quality**
- **Business Hours Parsing**: Better handling of complex hour formats
- **Photo Analysis**: Count and quality assessment of business photos
- **Review Sentiment**: Analysis of recent reviews and response rates
- **Menu Integration**: Direct menu parsing and analysis

#### 2. **Advanced AI Features**
- **Contextual Prompts**: Industry-specific recommendations (restaurant vs retail)
- **Seasonal Insights**: Time-based optimization suggestions
- **Actionable Steps**: Step-by-step improvement guides with priorities
- **Success Metrics**: Predicted impact of each recommendation
- **Funtion Call with LLM**: That sounds really cool

#### 3. **Better UX/UI**
- **Loading Skeletons**: More polished loading states
- **Progressive Enhancement**: Show partial data while loading
- **Mobile Optimization**: Better responsive design for mobile users
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### 🎯 Medium Priority (3-5 additional days)

#### 4. **Visual Analytics**
- **Comparison Charts**: Bar/radar charts for key metrics
- **Trend Analysis**: Historical performance tracking
- **Benchmark Scoring**: Industry-standard scoring system
- **Export Features**: PDF reports for business owners

#### 5. **Advanced Search & Filtering**
- **Radius Control**: Adjustable search distance
- **Category Filtering**: Filter by business type, price range
- **Smart Suggestions**: Auto-complete and business suggestions
- **Saved Searches**: Bookmark and revisit comparisons

#### 6. **Data Persistence**
- **Local Storage**: Save searches and comparisons
- **User Accounts**: Personal dashboards and history
- **Favorites**: Bookmark competitors and analyses
- **Sharing**: Share comparison reports via links

### 🔮 Future Enhancements (1+ weeks)

#### 7. **Machine Learning Integration**
- **Predictive Analytics**: Forecast business performance improvements
- **Pattern Recognition**: Identify successful optimization patterns
- **Recommendation Engine**: Personalized suggestions based on business type
- **A/B Testing**: Test different improvement strategies

#### 8. **Enterprise Features**
- **Multi-location Support**: Manage multiple business locations
- **Team Collaboration**: Share insights across team members
- **API Integration**: Connect with POS systems, review platforms
- **White-label Solution**: Customizable branding for agencies

#### 9. **Real-time Features**
- **Live Data Sync**: Real-time updates from Google/Yelp
- **Competitor Monitoring**: Alerts when competitors change
- **Review Monitoring**: Notifications for new reviews
- **Performance Tracking**: Monitor improvement progress over time

---

## 🛠️ Technical Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| Frontend | React + TypeScript | Component-based UI with type safety |
| Styling | Tailwind CSS | Rapid, responsive styling |
| State | Zustand | Lightweight state management |
| Backend | Node.js + Express | RESTful API server |
| AI | OpenAI + Gemini | Intelligent analysis and recommendations |
| APIs | Serper.dev | Google Places data integration |
| Development | TypeScript | Type safety across full stack |

---

**Total Development Time**: ~1.5 days  
**API Endpoints**: 6 RESTful endpoints  
**React Components**: 8 reusable components  