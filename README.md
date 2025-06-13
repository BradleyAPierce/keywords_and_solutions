# keywords_and_solutions

This is an interactive experience that helps sales reps navigate through key words and solutions.

# Key Words and Solutions Finder

A web application that allows users to explore healthcare solutions and related keywords. The application provides a search interface with filtering capabilities to help users find relevant information.

## Features

- Search for keywords across multiple fields
- Filter by solution categories
- View detailed information about keywords and solutions
- Responsive design for desktop and mobile devices
- Interactive UI with sorting and filtering capabilities

## Files

- `index.html` - The main HTML file that includes the React application
- `keywordsdetails.csv` - CSV file containing keyword data
- `solutions_base_template_csv.csv` - CSV file containing solution data

## Deployment Instructions

### Option 1: Deploy to Render

1. Create a free account on [Render](https://render.com/)
2. Create a new Static Site
3. Connect your GitHub repository or upload the files directly
4. Set the following:
   - Build Command: Leave blank (no build required)
   - Publish Directory: `.` (root directory)
5. Click "Create Static Site"

### Option 2: Deploy to GitHub Pages

1. Create a new GitHub repository
2. Upload all the files to your repository
3. Go to Settings > Pages
4. Select the main branch as the source
5. Click Save

### Option 3: Deploy to Netlify

1. Create a free account on [Netlify](https://www.netlify.com/)
2. Drag and drop your project folder to the Netlify dashboard
3. Your site will be deployed automatically

### Option 4: Local Development

If you want to test the application locally:

1. Install a simple HTTP server like [http-server](https://www.npmjs.com/package/http-server)
   ```
   npm install -g http-server
   ```
2. Navigate to your project directory
3. Run the server
   ```
   http-server
   ```
4. Open your browser and go to `http://localhost:8080`

## File Structure

Make sure to keep all files in the same directory with these exact filenames:

```
/
├── index.html
├── csv-files/keywordsdetails.csv
└── csv-files/solutions_base_template_csv.csv
```

## CSV Data Format

### Keywords CSV (keywordsdetails.csv)

The keywords CSV file should have the following columns:

- Key Word
- Solution
- Industry Trends
- Key Words / Key Phrases
- Qualifying/Discovery Questions

### Solutions CSV (solutions_base_template_csv.csv)

The solutions CSV file should have the following columns:

- Solution Title
- Long-Description
- Short-Description
- Trends
- Business Pain Points Addressed
- Vertical-Specific Relevance
- Key Words
- Qualifying Questions
- Handling Objections

## Application Structure

The application consists of three main views:

1. **Keywords List View**: Shows all keywords that match the search criteria
2. **Keyword Detail View**: Shows detailed information about a selected keyword
3. **Solutions View**: Shows information about the selected solutions

The sidebar allows filtering by solution categories, and the search bar at the top enables searching across all keyword fields.

## Customization

You can customize the application by modifying the following:

- Colors: Update the Tailwind CSS classes in the HTML
- Layout: Adjust the grid and flex containers
- Data: Update the CSV files with your own data

## Browser Compatibility

The application works in all modern browsers:

- Chrome
- Firefox
- Safari
- Edge

## Support

If you encounter any issues or have questions, please feel free to reach out.

## License

This project is licensed under Bradley Pierce.
