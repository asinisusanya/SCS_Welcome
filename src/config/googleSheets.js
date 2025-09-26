// Google Sheets Configuration
// Replace these values with your actual Google Sheets details

export const GOOGLE_SHEETS_CONFIG = {
  // Your Google Sheets ID (found in the URL of your Google Sheet)
  // Example: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
  SHEET_ID: 'your-google-sheet-id-here',
  
  // Your Google API Key (get from Google Cloud Console)
  // Make sure to enable Google Sheets API for your project
  API_KEY: 'your-google-api-key-here',
  
  // Sheet names and ranges for different data types
  RANGES: {
    SCHEDULE: 'Schedule!A:F',    // Columns: Venue, Time, Code, Name, Instructor, Students
    NOTICES: 'Notices!A:C',     // Columns: Title, Description, Date
    IMAGES: 'Images!A:B',       // Columns: Title, URL
    STATISTICS: 'Statistics!A:B', // Columns: Metric, Value
    HALLS: 'Halls!A:D'          // Columns: Name, Status, Utilization, Classes
  }
}

// Expected Google Sheets structure:

/* 
SCHEDULE SHEET (Schedule!A:F):
| Venue | Time      | Code    | Name              | Instructor           | Students |
|-------|-----------|---------|-------------------|---------------------|----------|
| SCTR  | 10:00-11:00| CSC3073 | Computer Graphics | Prof. Saluka K.     | 35       |
| SCLT1 | 09:00-10:00| STA4023 | Data Mining       | Dr. Roshan D.       | 40       |

NOTICES SHEET (Notices!A:C):
| Title                          | Description                           | Date      |
|--------------------------------|---------------------------------------|-----------|
| National Programming Championship| First place in inter-university comp | 2 days ago|
| New Lab Equipment             | Advanced statistical analysis tools   | 1 week ago|

IMAGES SHEET (Images!A:B):
| Title                           | URL                                   |
|---------------------------------|---------------------------------------|
| Advanced statistical analysis   | https://example.com/image1.jpg        |
| Department research lab         | https://example.com/image2.jpg        |

STATISTICS SHEET (Statistics!A:B):
| Metric          | Value |
|-----------------|-------|
| Active Students | 450   |
| Courses Running | 12    |
| Projects Active | 28    |

HALLS SHEET (Halls!A:D):
| Name  | Status    | Utilization | Classes |
|-------|-----------|-------------|---------|
| SCLT1 | occupied  | 40          | 4       |
| SCLT2 | occupied  | 30          | 3       |
| SCTR  | available | 0           | 1       |
| Lab A | occupied  | 75          | 2       |
*/
