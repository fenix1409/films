"use client"

import * as React from "react"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import FavoriteIcon from "@mui/icons-material/Favorite"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import StarIcon from "@mui/icons-material/Star"
import { IMG_URL } from "../hook/useEnv"
import { Context } from "../context/useContext"
import { useNavigate } from "react-router-dom"
import { Box, Chip } from "@mui/material"

export default function MovieCard({ item }) {
  const { likedList, setLikedList } = React.useContext(Context)
  const { savedList, setSavedList } = React.useContext(Context)
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = React.useState(false)

  const isLiked = likedList.some((movie) => movie.id === item.id)
  const isSaved = savedList.some((movie) => movie.id === item.id)

  function handleLikeBtn() {
    const likeData = likedList.findIndex((value) => value.id == item.id)
    if (likeData == -1) {
      setLikedList([...likedList, item])
    } else {
      likedList.splice(likeData, 1)
      setLikedList([...likedList])
    }
  }

  function handleSaveBtn() {
    const saveData = savedList.findIndex((value) => value.id == item.id)
    if (saveData == -1) {
      setSavedList([...savedList, item])
    } else {
      savedList.splice(saveData, 1)
      setSavedList([...savedList])
    }
  }

  return (
    <Card
      className="card-hover glass-effect"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        maxWidth: 345,
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              width: 50,
              height: 50,
            }}
          >
            <CardMedia
              className="w-full h-full object-cover"
              component="img"
              image={`${IMG_URL}/${item.backdrop_path}`}
              alt={item.title}
            />
          </Avatar>
        }
        title={
          <Typography variant="h6" className="text-white font-semibold line-clamp-1" sx={{ fontSize: "1.1rem" }}>
            {item.title}
          </Typography>
        }
        subheader={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              {new Date(item.release_date).getFullYear()}
            </Typography>
            <Chip
              icon={<StarIcon sx={{ fontSize: 16 }} />}
              label={item.vote_average?.toFixed(1)}
              size="small"
              sx={{
                background: "rgba(255, 193, 7, 0.2)",
                color: "#ffc107",
                border: "1px solid rgba(255, 193, 7, 0.3)",
              }}
            />
          </Box>
        }
        sx={{ pb: 1 }}
      />

      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          className="h-[400px] object-cover transition-transform duration-300"
          image={`${IMG_URL}/${item.poster_path}`}
          alt={item.title}
          sx={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/movie/${item.id}`)}
        />

        {isHovered && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/movie/${item.id}`)}
          >
            <IconButton
              sx={{
                background: "rgba(102, 126, 234, 0.9)",
                color: "white",
                width: 60,
                height: 60,
                "&:hover": {
                  background: "rgba(102, 126, 234, 1)",
                  transform: "scale(1.1)",
                },
              }}
            >
              <PlayArrowIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        )}
      </Box>

      <CardContent sx={{ pb: 1 }}>
        <Typography
          className="line-clamp-3 text-gray-300"
          variant="body2"
          sx={{
            lineHeight: 1.5,
            fontSize: "0.9rem",
          }}
        >
          {item.overview}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <IconButton
          onClick={handleLikeBtn}
          sx={{
            background: isLiked ? "rgba(255, 107, 107, 0.2)" : "rgba(255, 255, 255, 0.1)",
            color: isLiked ? "#ff6b6b" : "rgba(255, 255, 255, 0.7)",
            border: `1px solid ${isLiked ? "#ff6b6b" : "rgba(255, 255, 255, 0.2)"}`,
            "&:hover": {
              background: "rgba(255, 107, 107, 0.3)",
              transform: "scale(1.1)",
            },
          }}
        >
          <FavoriteIcon />
        </IconButton>

        <IconButton
          onClick={handleSaveBtn}
          sx={{
            background: isSaved ? "rgba(78, 205, 196, 0.2)" : "rgba(255, 255, 255, 0.1)",
            color: isSaved ? "#4ecdc4" : "rgba(255, 255, 255, 0.7)",
            border: `1px solid ${isSaved ? "#4ecdc4" : "rgba(255, 255, 255, 0.2)"}`,
            "&:hover": {
              background: "rgba(78, 205, 196, 0.3)",
              transform: "scale(1.1)",
            },
          }}
        >
          <BookmarkIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}