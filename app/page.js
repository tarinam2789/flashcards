'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography, Box, Grid } from "@mui/material";
import Head from "next/head";
import { styled } from '@mui/material/styles';


const BackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(/)', // Reference the GIF with a relative path
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh', // Ensure the background covers the entire viewport height
  scrollBehavior: 'smooth', // Smooth scrolling
}));

const Section = styled(Box)(({ theme }) => ({
  minHeight: '50vh', // Full screen height for each section
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: 'gray',
}));

export default function Home() {

  const router = useRouter();

  const handleSubmitPro = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
      body: JSON.stringify({ subscriptionType: 'pro' }) 
    });
    const checkoutSessionJson = await checkoutSession.json();
  
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });
  
    if (error) {
      console.warn(error.message);
    }
  };

  const handleSubmitBasic = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
      body: JSON.stringify({ subscriptionType: 'basic' }) 
    });
    const checkoutSessionJson = await checkoutSession.json();
  
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });
  
    if (error) {
      console.warn(error.message);
    }
  };

  const handleGetStarted = () => {
    router.push(`/generate`);
  };

  return(
    <BackgroundContainer>
      <Head>
        <title>flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text"/>
      </Head>

      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              color: 'white',
              textShadow: '0 0 10px rgba(0, 255, 0, 0.8)', // Green glow effect
            }}
          >
            Flashcard
          </Typography>
          <SignedOut>
            <Button
              color="inherit"
              href="/sign-in"
              style={{
                color: 'lightblue',
                textShadow: '0 0 5px rgba(0, 255, 0, 0.8)', // Green glow effect
                '&:hover': {
                  textShadow: '0 0 10px rgba(0, 255, 0, 1)', // Stronger glow on hover
                },
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              href="/sign-up"
              style={{
                color: 'lightblue',
                textShadow: '0 0 5px rgba(0, 255, 0, 0.8)', // Green glow effect
                '&:hover': {
                  textShadow: '0 0 10px rgba(0, 255, 0, 1)', // Stronger glow on hover
                },
              }}
            >
              Sign up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Section>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom color='white'>
            Welcome to Flashcard 
          </Typography>
          <Typography variant="h5" gutterBottom color='white'>
            The easiest way to make flashcards from your text
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2, backgroundColor: 'black' }} onClick={handleGetStarted}>
            Get Started
          </Button>
        </Box>
      </Section>

      <Section>
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 10, color: 'white'}}>
            Features
          </Typography>
          <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 10,
                  backgroundColor: 'black',
                  textAlign: "center",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  height: 200, // Adjust the height to match the width for square shape
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  "&:hover": {
                    boxShadow: "0 15px 30px rgba(255, 255, 255, 0.8)",// Green glow effect with stronger shadow
                  },
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                  Easy Text Input 
                </Typography>
                <Typography sx={{ color: 'white' }}>
                  Simply input your text and let our software do the rest. 
                  Creating flashcards has never been easier.
                </Typography>
              </Box>
            </Grid>


            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 10,
                  backgroundColor: 'black',
                  textAlign: "center",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  height: 200, // Adjust the height to match the width for square shape
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  "&:hover": {
                    boxShadow: "0 15px 30px rgba(255, 255, 255, 0.8)", // Green glow effect with stronger shadow
                  },
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                  Smart Flashcards
                </Typography>
                <Typography sx={{ color: 'white' }}>
                  Our AI intelligently breaks down your text into concise flashcards,
                  perfect for studying.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
               sx={{
                p: 3,
                borderRadius: 10,
                backgroundColor: 'black',
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                height: 200, // Adjust the height to match the width for square shape
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                "&:hover": {
                  boxShadow: "0 15px 30px rgba(255, 255, 255, 0.8)", // Green glow effect with stronger shadow
                },
              }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                  Accessible Anywhere 
                </Typography>
                <Typography sx={{ color: 'white' }}>
                  Access your flashcards from any device, at any time.
                  Study on the go with ease.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Section>

      <Section>
  <Box sx={{ my: 6, textAlign: 'center' }}>
    <Typography variant="h4" gutterBottom sx={{ mb: 10, color: 'white' }}>
      Pricing
    </Typography>
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{
        maxWidth: 1200,
        mx: 'auto', // Centers the boxes and restricts width
        display: 'flex', // Make the Grid container a flexbox
        alignItems: 'stretch', // Ensure all children have the same height
      }}
    >
      <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
        <Box
          sx={{
            p: 3,
            width: '100%', // Adjust to ensure responsiveness
            maxWidth: 500, // Limits box width to 500px
            borderRadius: 9,
            textAlign: 'center',
            backgroundColor: 'white',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '&:hover': {
              transform: 'translateY(-10px)', // Lift up effect
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.8)', // Enhanced shadow
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Basic Plan - $5/month
          </Typography>
          <Typography>
            Get started with our basic plan, perfect for individuals.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSubmitBasic}
          >
            Choose Basic
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
        <Box
          sx={{
            p: 3,
            width: '100%', // Adjust to ensure responsiveness
            maxWidth: 500, // Limits box width to 500px
            borderRadius: 9,
            textAlign: 'center',
            backgroundColor: 'white',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '&:hover': {
              transform: 'translateY(-10px)', // Lift up effect
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.8)', // Enhanced shadow
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Pro Plan - $10/month
          </Typography>
          <Typography>
            Upgrade to Pro for more advanced features and unlimited access.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSubmitPro}
          >
            Choose Pro
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Box>
</Section>

    </BackgroundContainer>
  )
}