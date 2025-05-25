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
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { Drawer, List, ListItem, ListItemText, IconButton, Divider } from "@mui/material"

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

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

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
          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
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

          {/* Mobile Menu Button */}
          <IconButton
            sx={{
              display: { xs: "block", md: "none" },
              color: "white",
              marginRight: 2,
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Like/Save Buttons */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "16px", marginLeft: "32px" }}>
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

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            background: "rgba(15, 15, 35, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" className="gradient-text font-bold">
              CineVault
            </Typography>
            <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItem key={item.id} sx={{ px: 0, mb: 1 }}>
                <NavLink
                  to={item.to}
                  onClick={handleDrawerToggle}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: isActive ? "rgba(102, 126, 234, 0.2)" : "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "all 0.3s ease",
                  })}
                >
                  <ListItemText
                    primary={item.title}
                    sx={{
                      "& .MuiListItemText-primary": {
                        color: "white",
                        fontWeight: 500,
                      },
                    }}
                  />
                </NavLink>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.1)" }} />

          {/* Mobile Like/Save Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
            <Button
              className="glass-effect"
              sx={{
                borderRadius: "16px",
                padding: "16px",
                minWidth: "auto",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.15)",
                },
              }}
            >
              <Badge showZero badgeContent={likedList.length} color="error">
                <ThumbUpIcon sx={{ color: "#ff6b6b" }} />
              </Badge>
              <Typography variant="caption" sx={{ color: "white", fontSize: "0.7rem" }}>
                Liked
              </Typography>
            </Button>
            <Button
              className="glass-effect"
              sx={{
                borderRadius: "16px",
                padding: "16px",
                minWidth: "auto",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.15)",
                },
              }}
            >
              <Badge showZero badgeContent={savedList.length} color="primary">
                <BookmarkIcon sx={{ color: "#4ecdc4" }} />
              </Badge>
              <Typography variant="caption" sx={{ color: "white", fontSize: "0.7rem" }}>
                Saved
              </Typography>
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

export default Navbar