import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IMG_URL } from '../hook/useEnv';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Context } from '../context/useContext';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ item }) {
    const { likedList, setLikedList } = React.useContext(Context)
    const { savedList, setSavedList } = React.useContext(Context)
    const navigate = useNavigate()

    function handleLikeBtn() {
        const likeData = likedList.findIndex(value => value.id == item.id)
        if (likeData == -1) {
            setLikedList([...likedList, item])
        }
        else {
            likedList.splice(likeData, 1)
            setLikedList([...likedList])
        }
    }
    function handleSaveBtn() {
        const saveData = savedList.findIndex(value => value.id == item.id)
        if (saveData == -1) {
            setSavedList([...savedList, item])
        }
        else {
            savedList.splice(saveData, 1)
            setSavedList([...savedList])
        }
    }


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        <CardMedia
                            className='!w-[50px] h-[50px]'
                            component="img"
                            image={`${IMG_URL}/${item.backdrop_path}`}
                            alt={item.title}
                        />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={item.title}
                subheader={item.release_date} />
            <CardMedia
                onClick={() => navigate(`/movie/${item.id}`)}
                component="img"
                className='h-[350px]'
                height="15"
                image={`${IMG_URL}/${item.poster_path}`}
                alt="Paella dish"
            />
            <CardContent>
                <Typography className='line-clamp-3' variant="body2" sx={{ color: 'text.secondary' }}>{item.overview}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton onClick={handleLikeBtn} aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton onClick={handleSaveBtn} aria-label="share">
                    <BookmarkIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
