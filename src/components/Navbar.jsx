"use client"

import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { NavLink } from "react-router-dom"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import { Badge } from "@mui/material"
import { PATH } from "../hook/usePath"
import { Context } from "../context/useContext"
import MovieIcon from "@mui/icons-material/Movie"

const navItems = [
  {
    id: 1,
    title: "Now Playing",
    to: PATH.home,
  },
  {
    id: 2,
    title: "Popular",
    to: PATH.popular,
  },
  {
    id: 3,
    title: "Top Rated",
    to: PATH.topRated,
  },
  {
    id: 4,
    title: "Upcoming",
    to: PATH.upcoming,
  },
]

function Navbar() {
  const { likedList } = React.useContext(Context)
  const { savedList } = React.useContext(Context)
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        className="glass-effect"
        sx={{
          background: "rgba(15, 15, 35, 0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Toolbar className="px-8">
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <MovieIcon sx={{ fontSize: 32, marginRight: 2, color: "#667eea" }} />
            <Typography
              variant="h5"
              component="div"
              className="gradient-text font-bold"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              CineVault
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                sx={{
                  color: "#fff",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(102, 126, 234, 0.2)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <NavLink
                  to={item.to}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#667eea" : "inherit",
                    fontWeight: isActive ? "600" : "400",
                  })}
                >
                  {item.title}
                </NavLink>
              </Button>
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: "16px", marginLeft: "32px" }}>
            <Button
              className="glass-effect"
              sx={{
                borderRadius: "16px",
                padding: "12px",
                minWidth: "auto",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  background: "rgba(255, 255, 255, 0.15)",
                },
              }}
            >
              <Badge showZero badgeContent={likedList.length} color="error">
                <ThumbUpIcon sx={{ color: "#ff6b6b" }} />
              </Badge>
            </Button>
            <Button
              className="glass-effect"
              sx={{
                borderRadius: "16px",
                padding: "12px",
                minWidth: "auto",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  background: "rgba(255, 255, 255, 0.15)",
                },
              }}
            >
              <Badge showZero badgeContent={savedList.length} color="primary">
                <BookmarkIcon sx={{ color: "#4ecdc4" }} />
              </Badge>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar