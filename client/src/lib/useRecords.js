// useRecords: custom hook that loads a list from the backend and keeps it in state.
// Returns the records, a loading flag, an error message and setRecords to update the list
// right after a delete (so the page changes without reloading).
import { useEffect, useState } from 'react'

export default function useRecords(listFunction, token) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true // ignores the answer if the page was closed before it arrived

    const load = async () => {
      try {
        const data = await listFunction(token)
        if (active) {
          setRecords(data)
          setError('')
        }
      } catch (err) {
        if (active) setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [listFunction, token])

  return { records, setRecords, loading, error, setError }
}
