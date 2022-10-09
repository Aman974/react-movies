import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress'
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { styled, alpha } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import "./SingleMovie.css"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const SingleMovie = () => {
  const [res, setRes] = useState([])
  const [loading, setLoading] = useState(false)
  console.log('res:', res)
  const { id } = useParams()
  console.log('id:', id)



  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          p: 1,
          m: 1,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
  }

  Item.propTypes = {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
      ),
      PropTypes.func,
      PropTypes.object,
    ]),
  };




  const fetchData = async () => {
    const url = `https://movie-task.vercel.app/api/movie?movieId=${id}`

    const data = await fetch(url)
    const res = await data.json()
    setRes(res.data)
    setLoading(true)
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (



    <div> {
      loading ? (<>  <h2 style={{ textAlign: "center", borderRadius: "5px", width: "30%", margin: "auto", backgroundColor: "lightgrey", marginBottom: "10px", marginTop: "10px", color: "#404042" }}>{res.original_title}</h2>
        <div className="cont">
          <Box component="img"
            sx={{
              height: 650,
              width: 550,
              // maxHeight: { xs: 433, md: 167 },
              // maxWidth: { xs: 550, md: 250 },
            }}

            src={"https://image.tmdb.org/t/p/original" + res.poster_path} />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column'

          }}>

            <Box sx={{ ml: 7, mt: 2, height: 200, }}> <b style={{ fontWeight: 600, fontSize: "1.5rem", color: "grey" }}>Description: </b> {res.overview}</Box>
            <Box sx={{ ml: 7, fontWeight: 500, fontSize: "1.2rem" }}> <b style={{ fontWeight: 600, fontSize: "1.5rem", color: "grey" }}>Rating:  </b>{res.vote_average.toFixed(1)} </Box>


          </Box>

        </div>
      </>

      ) : (<Box sx={{ ml: "40%", mt: "20%" }}>  <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
        <CircularProgress color="secondary" />
        <CircularProgress color="success" />
        <CircularProgress color="inherit" />
      </Stack>   </Box>)
    }

    </div>


  )
}

export default SingleMovie