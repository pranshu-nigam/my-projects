# ZenPose Frontend

A modern yoga and wellness platform built with vanilla JavaScript and Vite.

## Features

- **User Authentication**: Login and registration system
- **AI Pose Detection**: Real-time yoga pose analysis using machine learning
- **Interactive Dashboard**: Personalized user experience
- **Progress Tracking**: Monitor your yoga journey
- **Responsive Design**: Works on all devices

## Tech Stack

- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **JavaScript**: ES6+ modules
- **Fonts**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend/
├── index.html              # Main HTML file
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── src/
│   ├── app.js             # Main application entry point
│   ├── components/        # React-like components
│   │   ├── AIPose.js      # AI pose detection component
│   │   ├── Dashboard.js   # Main dashboard
│   │   ├── LoginPage.js   # Login form
│   │   ├── SignupPage.js  # Registration form
│   │   └── ...           # Other components
│   └── styles/
│       ├── main.css       # Main stylesheet
│       └── ...           # Component-specific styles
└── public/
    └── assets/           # Static assets (videos, images)
```

## API Integration

The frontend communicates with the ZenPose API backend for:
- User authentication
- AI pose detection
- User data management

Make sure the backend server is running on `http://localhost:3000` for full functionality.

## Development

- The app uses ES6 modules for clean code organization
- Components are structured similar to React components for familiarity
- Tailwind CSS provides utility-first styling
- Vite provides fast development and building

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details






