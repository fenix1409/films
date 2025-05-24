"use client"

import { useEffect, useState } from "react"
import { useAxios } from "../hook/useAxios"
import MovieCard from "./MovieCard"
import { Pagination, Box, Typography, Container } from "@mui/material"

function MoviePage({ URL }) {
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState(10)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    useAxios()
      .get(`${URL}?language=en-US&page=${page}`)
      .then((res) => {
        setTotalPage(res.data.total_pages)
        setData(
          res.data.results.map((item) => {
            item.isLiked = false
            item.isSaved = false
            return item
          }),
        )
        setLoading(false)
      })
  }, [page])

  function handlePaginationChange(e, count) {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 250)
    setPage(count)
  }

  const getPageTitle = () => {
    switch (URL) {
      case "/now_playing":
        return "Now Playing"
      case "/popular":
        return "Popular Movies"
      case "/top_rated":
        return "Top Rated"
      case "/upcoming":
        return "Coming Soon"
      default:
        return "Movies"
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" className="gradient-text font-bold mb-2" sx={{ mb: 2 }}>
          {getPageTitle()}
        </Typography>
        <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.7)", fontWeight: 300 }}>
          Discover amazing movies and add them to your collection
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Loading movies...
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(5, 1fr)",
              },
              gap: 4,
              mb: 6,
            }}
          >
            {data.map((item) => (
              <MovieCard item={item} key={item.id} />
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Pagination
              onChange={handlePaginationChange}
              count={Math.min(totalPage, 500)}
              page={page}
              size="large"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "white",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  "&:hover": {
                    background: "rgba(102, 126, 234, 0.2)",
                  },
                  "&.Mui-selected": {
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    },
                  },
                },
              }}
            />
          </Box>
        </>
      )}
    </Container>
  )
}

export default MoviePage