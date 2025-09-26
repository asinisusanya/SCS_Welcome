import { useState, useEffect } from 'react'
import {
  fetchScheduleData,
  fetchNoticesData,
  fetchImagesData,
  fetchStatisticsData,
  fetchHallsData
} from '../services/googleSheets'

export function useDigitalSignageData() {
  const [data, setData] = useState({
    images: [],
    statistics: { activeStudents: 0, coursesRunning: 0, projectsActive: 0 },
    schedule: [],
    halls: [],
    notices: [],
    loading: true,
    error: null
  })

  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchAllData = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }))

      const [images, statistics, schedule, halls, notices] = await Promise.all([
        fetchImagesData(),
        fetchStatisticsData(),
        fetchScheduleData(),
        fetchHallsData(),
        fetchNoticesData()
      ])

      setData({
        images,
        statistics,
        schedule,
        halls,
        notices,
        loading: false,
        error: null
      })

      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching digital signage data:', error)
      setData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }))
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchAllData()
  }, [])

  // Refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchAllData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return {
    ...data,
    lastUpdated,
    refreshData: fetchAllData
  }
}
