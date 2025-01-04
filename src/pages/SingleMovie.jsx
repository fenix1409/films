import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAxios } from '../hook/useAxios'
import { API_KEY, IMG_URL } from '../hook/useEnv'
import { Button } from 'antd'
import YouTube from 'react-youtube'

const SingleMovie = () => {
    const { id } = useParams()
    const [movieInfo, setMovieInfo] = useState({})
    const [changeImg, setChangeImg] = useState(false)
    const [actors, setActors] = useState([])
    const [vidoes, setVideos] = useState([])


    useEffect(() => {
        useAxios().get(`/${id}?api_key=${API_KEY}`).then(res => {
            setMovieInfo(res.data);

        })
    }, [])

    useEffect(() => {
        useAxios().get(`/${id}/credits?api_key=${API_KEY}`).then(res => {
            setActors(res.data.cast);            
        })
    }, [])
    
    
    
    useEffect(() => {
        useAxios().get(`/${id}/videos?api_key=${API_KEY}`).then(res => {
            setVideos(res.data.results.splice(0,5));
        })
    }, [])
    return (
        <div className='flex justify-between'>
            <div className="w-[20%] rounded-xl border-[2px] border-black p-5 h-[90vh] overflow-y-auto space-y-5">
                {actors.map(item => (
                    <div className="bg-black p-3 rounded-md" key={item.id}>
                        <img className='h-[400px] rounded-md w-full object-cover' src={`${IMG_URL}/${item.profile_path}`} alt="img" />
                        <h2 className='text-center text-5 font-bold text-white mt-2'>{item.character}</h2>
                        <p className='text-center text-[18px] font-bold text-white mt-2'>{item.name}</p>
                    </div>
                ))}
            </div>
            <div className="w-[54%] rounded-xl border-[2px] border-black p-5 h-[90vh] space-y-8 text-center overflow-y-auto">
                <h2 className='text-[20px] font-bold'>{movieInfo?.title}</h2>
                <div onMouseLeave={() => setChangeImg(false)} onMouseEnter={() => setChangeImg(true)} className="h-[800px] rounded-md relative overflow-hidden">
                    <img className={`h-full w-full object-cover absolute duration-300 rounded-md ${changeImg ? "left-[-120%]" : "left-0"}`} src={`${IMG_URL}/${movieInfo.poster_path}`} alt="img" height={300}/>
                    <img className={`h-full w-full object-cover absolute duration-300 rounded-md ${changeImg ? "right-0" : "right-[-120%]"}`} src={`${IMG_URL}/${movieInfo.backdrop_path}`} alt="img" height={300}/>
                </div>
                <p className='text-5 font-semibold'>{movieInfo.overview}</p>
                <p className='text-5'>Budget: {movieInfo.budget}$</p>
                <div className="flex space-x-5">
                    {movieInfo?.genres?.map(item => <Button size='large' key={item.id} variant='contained'>{item.name}</Button>)}
                </div>
            </div>
            <div className="w-[25%] rounded-xl border-[2px] border-black p-5 h-[90vh] overflow-y-auto space-y-5">
                {vidoes.map(item => <YouTube className='w-full flex' videoId={item.key} key={item.id}/>)}
            </div>
        </div>
    )
}

export default SingleMovie