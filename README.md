# Digital Signage - SCS Department (Redesigned)

A modern, responsive digital signage application for the Department of Statistics and Computer Science at the University of Peradeniya. This redesigned version features a clean, minimalist layout while maintaining all original functionality and Google Sheets integration.

## 🎯 Features

### ✅ **Redesigned Layout**
- **Clean Header Design**: Streamlined header with department name and real-time clock
- **Horizontal Statistics Cards**: Three-card layout matching the target design
- **Progress Indicators**: Bottom progress bar showing current screen (X of 4)
- **Simplified Class Schedule**: Single venue focus with timeline visualization
- **Responsive Design**: Adapts to different screen sizes

### ✅ **Preserved Functionality**
- **Screen Rotation**: Automatic 10-second rotation between 4 screens
- **Google Sheets Integration**: Real-time data fetching with fallback support
- **Live Time Display**: Real-time clock updates
- **Image Carousel**: 5-second rotation through department images
- **Data Refresh**: Automatic data refresh every 5 minutes

### ✅ **Color Scheme Maintained**
- Blue gradient background: `from-[#1e3a8a] via-[#1e40af] to-[#3b82f6]`
- Orange accent colors for highlights and icons
- White text on dark blue background
- Consistent visual styling

## 🖥️ Screen Layout

### 1. Welcome Screen (1 of 4)
- Large image carousel with overlay text
- Three statistics cards: Active Students, Courses Running, Projects Active
- Department header with live time

### 2. Class Schedule (2 of 4)
- Daily timeline visualization (8:00 AM - 6:00 PM)
- Single venue focus with detailed class information
- Course codes, instructors, and enrollment numbers

### 3. Available Halls (3 of 4)
- Grid layout of hall status cards
- Utilization percentages and availability status
- Real-time occupancy information

### 4. Department Notices (4 of 4)
- Clean notice cards with titles and descriptions
- Date stamps for announcements
- Scrollable content area

## 🔧 Technical Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Source**: Google Sheets API
- **Deployment**: Static site generation

## 📊 Google Sheets Integration

### Required Sheet Structure

The application expects a Google Sheets document with the following tabs:

#### **Schedule Sheet** (`Schedule!A:F`)
| Venue | Time        | Code    | Name              | Instructor           | Students |
|-------|-------------|---------|-------------------|---------------------|----------|
| SCTR  | 10:00-11:00 | CSC3073 | Computer Graphics | Prof. Saluka K.     | 35       |
| SCLT1 | 09:00-10:00 | STA4023 | Data Mining       | Dr. Roshan D.       | 40       |

#### **Statistics Sheet** (`Statistics!A:B`)
| Metric          | Value |
|-----------------|-------|
| Active Students | 450   |
| Courses Running | 12    |
| Projects Active | 28    |

#### **Images Sheet** (`Images!A:B`)
| Title                           | URL                                   |
|---------------------------------|---------------------------------------|
| Advanced statistical analysis   | https://example.com/image1.jpg        |
| Department research lab         | https://example.com/image2.jpg        |

#### **Halls Sheet** (`Halls!A:D`)
| Name  | Status    | Utilization | Classes |
|-------|-----------|-------------|---------|
| SCLT1 | occupied  | 40          | 4       |
| SCLT2 | occupied  | 30          | 3       |
| SCTR  | available | 0           | 1       |

#### **Notices Sheet** (`Notices!A:C`)
| Title                          | Description                           | Date      |
|--------------------------------|---------------------------------------|-----------|
| National Programming Championship| First place in inter-university comp | 2 days ago|
| New Lab Equipment             | Advanced statistical analysis tools   | 1 week ago|

## ⚙️ Setup Instructions

### 1. Configure Google Sheets Integration

Edit `src/config/googleSheets.js`:

```javascript
export const GOOGLE_SHEETS_CONFIG = {
  SHEET_ID: 'your-actual-google-sheet-id',
  API_KEY: 'your-actual-google-api-key'
}
```

### 2. Google API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API
4. Create credentials (API Key)
5. Restrict the API key to Google Sheets API only
6. Make your Google Sheet publicly readable or share with service account

### 3. Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### Static Site Deployment

The application builds to a `dist/` folder containing static files that can be deployed to any static hosting service:

- **Manus Space**: Upload the `dist/` folder contents
- **Netlify**: Connect to repository or drag & drop `dist/` folder
- **Vercel**: Connect to repository for automatic deployments
- **GitHub Pages**: Upload `dist/` contents to `gh-pages` branch

### Environment Variables

For production deployment, you may want to use environment variables:

```bash
VITE_GOOGLE_SHEET_ID=your-sheet-id
VITE_GOOGLE_API_KEY=your-api-key
```

## 🔄 Data Flow

1. **Application Start**: Loads with fallback mock data
2. **Data Fetch**: Attempts to fetch from Google Sheets
3. **Fallback Handling**: Uses mock data if Google Sheets unavailable
4. **Auto Refresh**: Refreshes data every 5 minutes
5. **Screen Rotation**: Cycles through screens every 10 seconds
6. **Image Carousel**: Rotates images every 5 seconds

## 🎨 Customization

### Changing Colors

Edit the Tailwind classes in components:
- Background: `bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b82f6]`
- Accent colors: `text-orange-400`, `bg-orange-400`

### Adjusting Timing

- Screen rotation: Change interval in `App.jsx` (default: 10 seconds)
- Image carousel: Change interval in `WelcomeScreen` (default: 5 seconds)
- Data refresh: Change interval in `useDigitalSignageData.js` (default: 5 minutes)

### Adding New Screens

1. Create new screen component
2. Add to `screens` array in `App.jsx`
3. Update progress indicator total count

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**: Check image URLs in Google Sheets
2. **Data not updating**: Verify Google Sheets API key and permissions
3. **CORS errors**: Ensure Google Sheet is publicly readable
4. **Build errors**: Check all imports and dependencies

### Fallback Behavior

The application is designed to work even without Google Sheets:
- Mock data is used as fallback
- Error messages are logged to console
- Visual error indicator appears if data fetch fails

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔒 Security Considerations

- API keys should be restricted to specific APIs and domains
- Google Sheets should have appropriate sharing permissions
- Consider using environment variables for sensitive data
- Regular security updates for dependencies

## 📞 Support

For technical support or questions about the redesigned digital signage system, please refer to the original system documentation or contact the development team.
