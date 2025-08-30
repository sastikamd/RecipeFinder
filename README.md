# Recipe Finder App

A dynamic React application that allows users to browse, search, and filter recipes using TheMealDB API.

## Features

- 🍽️ **Recipe Browsing**: View recipes in a responsive grid layout
- 🔍 **Search Functionality**: Search recipes by name with real-time results
- 🏷️ **Advanced Filtering**: Filter by categories and ingredients
- ❤️ **Favorites System**: Save favorite recipes with localStorage persistence
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop
- 🎥 **Recipe Details**: Full recipe information with video tutorials
- 🎨 **Modern UI**: Clean design using TailwindCSS

## Tech Stack

- **React 18**: Modern React with hooks
- **TailwindCSS**: Utility-first CSS framework
- **TheMealDB API**: Public recipe API
- **Local Storage**: Favorites persistence

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Extract the project files**
   ```bash
   # Extract the zip file to your desired location
   cd recipe-finder-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates a `build` folder with production-ready files.

## Project Structure

```
recipe-finder-app/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── SearchBar.js
│   │   ├── FilterBar.js
│   │   ├── RecipeGrid.js
│   │   ├── RecipeCard.js
│   │   ├── RecipeModal.js
│   │   ├── HeartIcon.js
│   │   └── LoadingSkeleton.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   ├── favorites.js
│   │   └── helpers.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Key Components

### App.js
Main application component handling state management and API integration.

### SearchBar
Real-time search with debouncing for optimal performance.

### FilterBar
Category and ingredient filtering with dropdown selectors.

### RecipeGrid
Responsive grid layout for recipe cards with loading states.

### RecipeModal
Full-screen modal displaying complete recipe details.

### Favorites System
LocalStorage-based favorites with persistent storage.

## API Integration

The app uses TheMealDB API endpoints:

- **Search**: `/search.php?s={query}`
- **Categories**: `/categories.php`
- **Filter by Category**: `/filter.php?c={category}`
- **Filter by Ingredient**: `/filter.php?i={ingredient}`
- **Recipe Details**: `/lookup.php?i={id}`
- **Random Recipes**: `/random.php`

## Deployment

### Netlify

1. Build the project: `npm run build`
2. Create a GitHub repository with your code
3. Connect your repository to Netlify
4. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
5. Deploy!

### Other Platforms

The app can be deployed to any static hosting service:
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Features In Detail

### Search & Filter
- Debounced search for better performance
- Category filtering from API data
- Popular ingredient filtering
- Combined search and filter functionality
- Clear filters option

### Recipe Management
- Recipe cards with hover effects
- Favorites toggle with heart icon
- Recipe details modal with full information
- YouTube video integration
- External recipe source links

### User Experience
- Loading skeletons during data fetch
- Error handling with user-friendly messages
- Responsive design for all screen sizes
- Keyboard navigation support
- Smooth animations and transitions

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository.

---

**Note**: This app uses a free public API. Some features may be limited based on API constraints.
