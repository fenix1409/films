import React, { useEffect, useState } from 'react'
import { useAxios } from '../hook/useAxios'
import MovieCard from './MovieCard'
import { Pagination } from '@mui/material'

function MoviePage({URL}) {
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState(10)
  const [page, setPage] = useState(1)
  useEffect(() => {
    useAxios().get(`${URL}?language=en-US&page=${page}`).then(res => {
      setTotalPage(res.data.total_pages)
      setData(res.data.results.map(item => {
        item.isLiked = false
        item.isSaved = false
        return item
      }))
    })
  }, [page])
  console.log(data);

  function handlePaginationChange(e, count) {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 250);
    setPage(count)
  }
  return (
    <div className="p-5">
      <div className='flex items-start flex-wrap gap-[33px]'>
        {data.map(item => <MovieCard item={item} key={item.id} />)}
      </div>
      <div className="flex justify-center mt-10">
        <Pagination onChange={handlePaginationChange} count={totalPage} />
      </div>
    </div>
  )
}

export default MoviePage