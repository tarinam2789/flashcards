'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Typography, Container, CircularProgress, Box } from "@mui/material"

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id') // Corrected this line

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
          if (!session_id) return
          try {
            const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
            const sessionData = await res.json()
            console.log(sessionData) // Debugging log
            if (res.ok) {
              setSession(sessionData)
            } else {
              setError(sessionData.error || 'Failed to retrieve the session.')
            }
          } catch (err) {
            console.error(err) // Log the error for debugging
            setError('An error occurred while retrieving the session.')
          } finally {
            setLoading(false)
          }
        }
        fetchCheckoutSession()
      }, [session_id]) // Dependency array includes session_id

    if (loading) {
        return (
          <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading...
            </Typography>
          </Container>
        )
      }

      if (error) {
        return (
          <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Container>
        )
      }

      return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
          {session?.payment_status === 'paid' ? (
            <>
              <Typography variant="h4">Thank you for your purchase!</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Session ID: {session_id}</Typography>
                <Typography variant="body1">
                  We have received your payment. You will receive an email with the
                  order details shortly.
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h4">Payment failed</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  Your payment was not successful. Please try again.
                </Typography>
              </Box>
            </>
          )}
        </Container>
      )
}

export default ResultPage