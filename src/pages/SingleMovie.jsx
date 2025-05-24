"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAxios } from "../hook/useAxios"
import { API_KEY, IMG_URL } from "../hook/useEnv"
import { Box, Typography, Chip, IconButton, Container, Grid, Paper } from "@mui/material"
import { ArrowBack, Star, CalendarToday, AttachMoney } from "@mui/icons-material"
import YouTube from "react-youtube"

const SingleMovie = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movieInfo, setMovieInfo] = useState({})
  const [actors, setActors] = useState([])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      useAxios().get(`/${id}?api_key=${API_KEY}`),
      useAxios().get(`/${id}/credits?api_key=${API_KEY}`),
      useAxios().get(`/${id}/videos?api_key=${API_KEY}`),
    ]).then(([movieRes, creditsRes, videosRes]) => {
      setMovieInfo(movieRes.data)
      setActors(creditsRes.data.cast.slice(0, 10))
      setVideos(videosRes.data.results.slice(0, 3))
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Typography variant="h5" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          Loading movie details...
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60vh",
          backgroundImage: `url(${IMG_URL}/${movieInfo.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(15,15,35,0.8) 70%, rgba(15,15,35,1) 100%)",
          },
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, pt: 4 }}>
        {/* Back Button */}
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            mb: 4,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            color: "white",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.2)",
              transform: "translateX(-4px)",
            },
          }}
        >
          <ArrowBack />
        </IconButton>

        <Grid container spacing={4} sx={{ mt: 20 }}>
          {/* Movie Poster */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                overflow: "hidden",
                p: 2,
              }}
            >
              <img
                src={`${IMG_URL}/${movieInfo.poster_path}`}
                alt={movieInfo.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                }}
              />
            </Paper>
          </Grid>

          {/* Movie Details */}
          <Grid item xs={12} md={8}>
            <Box sx={{ color: "white" }}>
              <Typography variant="h3" className="gradient-text font-bold mb-4">
                {movieInfo.title}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
                <Chip
                  icon={<Star sx={{ fontSize: 16 }} />}
                  label={`${movieInfo.vote_average?.toFixed(1)} / 10`}
                  sx={{
                    background: "rgba(255, 193, 7, 0.2)",
                    color: "#ffc107",
                    border: "1px solid rgba(255, 193, 7, 0.3)",
                  }}
                />
                <Chip
                  icon={<CalendarToday sx={{ fontSize: 16 }} />}
                  label={new Date(movieInfo.release_date).getFullYear()}
                  sx={{
                    background: "rgba(102, 126, 234, 0.2)",
                    color: "#667eea",
                    border: "1px solid rgba(102, 126, 234, 0.3)",
                  }}
                />
                <Chip
                  icon={<AttachMoney sx={{ fontSize: 16 }} />}
                  label={`$${movieInfo.budget?.toLocaleString()}`}
                  sx={{
                    background: "rgba(76, 175, 80, 0.2)",
                    color: "#4caf50",
                    border: "1px solid rgba(76, 175, 80, 0.3)",
                  }}
                />
              </Box>

              <Typography variant="h6" sx={{ mb: 2, color: "rgba(255, 255, 255, 0.9)" }}>
                Overview
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7, color: "rgba(255, 255, 255, 0.8)" }}>
                {movieInfo.overview}
              </Typography>

              <Typography variant="h6" sx={{ mb: 2, color: "rgba(255, 255, 255, 0.9)" }}>
                Genres
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
                {movieInfo.genres?.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    sx={{
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "white",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Cast Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" className="gradient-text font-bold mb-4">
            Cast
          </Typography>
          <Grid container spacing={3}>
            {actors.map((actor) => (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={actor.id}>
                <Paper
                  elevation={0}
                  sx={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <img
                    src={`${IMG_URL}/${actor.profile_path}`}
                    alt={actor.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: "white", fontWeight: 600, mb: 0.5 }}>
                      {actor.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      {actor.character}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Videos Section */}
        {videos.length > 0 && (
          <Box sx={{ mt: 8, mb: 8 }}>
            <Typography variant="h4" className="gradient-text font-bold mb-4">
              Trailers & Videos
            </Typography>
            <Grid container spacing={3}>
              {videos.map((video) => (
                <Grid item xs={12} md={6} lg={4} key={video.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "16px",
                      overflow: "hidden",
                      p: 2,
                    }}
                  >
                    <YouTube
                      videoId={video.key}
                      opts={{
                        width: "100%",
                        height: "200",
                        playerVars: {
                          autoplay: 0,
                        },
                      }}
                    />
                    <Typography variant="subtitle2" sx={{ color: "white", mt: 1 }}>
                      {video.name}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default SingleMovie