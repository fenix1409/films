import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { PATH } from '../hook/usePath'
import NowPlaying from '../pages/NowPlaying'
import Popular from '../pages/Popular'
import TopRated from '../pages/TopRated'
import Upcoming from '../pages/Upcoming'
import SingleMovie from '../pages/SingleMovie'

function CustomRoutes() {
  return (
    <Routes>
        <Route path={PATH.home} element={<NowPlaying/>}/>
        <Route path={PATH.popular} element={<Popular/>}/>
        <Route path={PATH.topRated} element={<TopRated/>}/>
        <Route path={PATH.upcoming} element={<Upcoming/>}/>
        <Route path={PATH.singleMovie} element={<SingleMovie/>}/>
    </Routes>
  )
}

export default CustomRoutes