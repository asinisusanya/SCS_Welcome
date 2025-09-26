// Google Sheets integration service
// This service fetches data from Google Sheets to replace the mock data

import { GOOGLE_SHEETS_CONFIG } from '../config/googleSheets'

let SHEET_ID = GOOGLE_SHEETS_CONFIG.SHEET_ID
let API_KEY = GOOGLE_SHEETS_CONFIG.API_KEY

// Helper function to fetch data from Google Sheets
async function fetchSheetData(range) {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    return data.values || []
  } catch (error) {
    console.error('Error fetching sheet data:', error)
    return []
  }
}

// Parse schedule data from Google Sheets
function parseScheduleData(rawData) {
  if (!rawData || rawData.length < 2) return []
  
  const headers = rawData[0]
  const rows = rawData.slice(1)
  
  return rows.map(row => ({
    venue: row[0] || '',
    time: row[1] || '',
    code: row[2] || '',
    name: row[3] || '',
    instructor: row[4] || '',
    students: parseInt(row[5]) || 0
  }))
}

// Parse notices data from Google Sheets
function parseNoticesData(rawData) {
  if (!rawData || rawData.length < 2) return []
  
  const headers = rawData[0]
  const rows = rawData.slice(1)
  
  return rows.map(row => ({
    title: row[0] || '',
    description: row[1] || '',
    date: row[2] || ''
  }))
}

// Parse images data from Google Sheets
function parseImagesData(rawData) {
  if (!rawData || rawData.length < 2) return []
  
  const headers = rawData[0]
  const rows = rawData.slice(1)
  
  return rows.map(row => ({
    title: row[0] || '',
    url: row[1] || '/api/placeholder/800/400'
  }))
}

// Main data fetching functions
export async function fetchScheduleData() {
  try {
    const rawData = await fetchSheetData(GOOGLE_SHEETS_CONFIG.RANGES.SCHEDULE)
    return parseScheduleData(rawData)
  } catch (error) {
    console.error('Error fetching schedule data:', error)
    // Return mock data as fallback
    return [
      {
        venue: "SCTR",
        time: "10:00-11:00",
        code: "CSC3073",
        name: "Computer Graphics",
        instructor: "Prof. Saluka Kodithuwakku",
        students: 35
      }
    ]
  }
}

export async function fetchNoticesData() {
  try {
    const rawData = await fetchSheetData(GOOGLE_SHEETS_CONFIG.RANGES.NOTICES)
    return parseNoticesData(rawData)
  } catch (error) {
    console.error('Error fetching notices data:', error)
    // Return mock data as fallback
    return [
      {
        title: "National Programming Championship",
        description: "First place in inter-university competition",
        date: "2 days ago"
      }
    ]
  }
}

export async function fetchImagesData() {
  try {
    const rawData = await fetchSheetData(GOOGLE_SHEETS_CONFIG.RANGES.IMAGES)
    return parseImagesData(rawData)
  } catch (error) {
    console.error('Error fetching images data:', error)
    // Return mock data as fallback
    return [
      { title: "Advanced statistical analysis facility", url: "/api/placeholder/800/400" },
      { title: "Department research lab", url: "/api/placeholder/800/400" },
      { title: "Student collaboration space", url: "/api/placeholder/800/400" }
    ]
  }
}

export async function fetchStatisticsData() {
  try {
    const rawData = await fetchSheetData(GOOGLE_SHEETS_CONFIG.RANGES.STATISTICS)
    const stats = {}
    
    rawData.forEach(row => {
      if (row[0] && row[1]) {
        const key = row[0].toLowerCase().replace(/\s+/g, '')
        stats[key] = parseInt(row[1]) || 0
      }
    })
    
    return {
      activeStudents: stats.activestudents || 450,
      coursesRunning: stats.coursesrunning || 12,
      projectsActive: stats.projectsactive || 28
    }
  } catch (error) {
    console.error('Error fetching statistics data:', error)
    // Return mock data as fallback
    return {
      activeStudents: 450,
      coursesRunning: 12,
      projectsActive: 28
    }
  }
}

export async function fetchHallsData() {
  try {
    const rawData = await fetchSheetData(GOOGLE_SHEETS_CONFIG.RANGES.HALLS)
    if (!rawData || rawData.length < 2) throw new Error('No halls data')
    
    const headers = rawData[0]
    const rows = rawData.slice(1)
    
    return rows.map(row => ({
      name: row[0] || '',
      status: row[1] || 'available',
      utilization: parseInt(row[2]) || 0,
      classes: parseInt(row[3]) || 0
    }))
  } catch (error) {
    console.error('Error fetching halls data:', error)
    // Return mock data as fallback
    return [
      { name: "SCLT1", status: "occupied", utilization: 40, classes: 4 },
      { name: "SCLT2", status: "occupied", utilization: 30, classes: 3 },
      { name: "SCTR", status: "available", utilization: 0, classes: 1 },
      { name: "Lab A", status: "occupied", utilization: 75, classes: 2 }
    ]
  }
}

// Configuration function to set up Google Sheets credentials
export function configureGoogleSheets(sheetId, apiKey) {
  SHEET_ID = sheetId
  API_KEY = apiKey
}
