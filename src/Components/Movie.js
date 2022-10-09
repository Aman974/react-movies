import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination'
import { Link } from "react-router-dom"
import  {Select}  from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { flexbox } from '@mui/system';
import "./Movie.css"

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 5, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(5)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "25ch",
            "&:focus": {
                width: "40ch",
            },
        },
    },
}));


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Movie = () => {
    const [res, setRes] = useState([])
    const [temp, setTemp] = useState()
    console.log('temp:', temp)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const[page, setPage] = useState("1")
    const [year, setYear] = useState("")
    console.log('year:', year)


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
        const url = (`https://movie-task.vercel.app/api/popular?page=${page}`)
        // const url = (`https://movie-task.vercel.app/api/popular?page=20`)

        const data = await fetch(url)
        const res = await data.json()
        setRes(res.data.results)
        setLoading(true);
        console.log('res:', res)
        console.log(res.data.results);

    }

    useEffect(() => {
        fetchData()
    }, [page])



    const searchFunc = async (e) => {
        const val = e.target.value
        setSearch(val)


        const url = `https://movie-task.vercel.app/api/search?page=1&query=${search}`

        const data = await fetch(url)
        const res = await data.json()
        setRes(res.data.results)
        console.log('resIndiviaual:', res)


    }

    // let word = e.target.value
    // console.log('word:', word)

    // if (word === "2020") {
    //   const filteredd = res.filter(item => item.year === "2020")
    //   setState(filteredd)
    //   setFilteredd(filteredd)
    //   // setRes(filteredd)
    // } else if (word === "2021") {
    //   const filteredd = res.filter(item => item.year === "2021")
    //   setState(filteredd)
    //   setFilteredd(filteredd)
    //   // setRes(filteredd)
    // } else if (word === "2022") {
    //   const filteredd = res.filter(item => item.year === "2022")
      
    //   setState(filteredd)
    //   setFilteredd(filteredd)
    //   // setRes(filteredd)
    // }


    const handleTypes = async (e) => {
     let val = e.target.value
     console.log('val:', val)
     setYear(val)

     



    }

    useEffect(() => {

    }, [])


    return (
        <>
            <Box >
 
                <AppBar position="static">
                 
                    <Toolbar>

                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{
                                flexGrow: 1,
                                ml: "40%",
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            Movie App
                        </Typography>

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}
                                sx={{}}
                                value={search}
                                onChange={searchFunc}

                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>

           <div > 
           <FormControl sx ={ {width: 140, position: 'absolute'}} >
        {/* <InputLabel id="demo-simple-select-label">Select Year</InputLabel> */}
        {/* <select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="Age"
          onChange={handleYear}
        >
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <MenuItem value={2020}>2020</MenuItem>
          <MenuItem value={2019}>2019</MenuItem>
          <MenuItem value={2018}>2018</MenuItem>
          <MenuItem value={2017}>2017</MenuItem>
          <MenuItem value={2016}>2016</MenuItem>
          <MenuItem value={2015}>2015</MenuItem>
          <MenuItem value={2014}>2014</MenuItem>
          <MenuItem value={2013}>2013</MenuItem>
          <MenuItem value={2012}>2012</MenuItem>
          <MenuItem value={2011}>2011</MenuItem>
          <MenuItem value={2010}>2010</MenuItem>
        </select> */}
        {/* <select onChange={handleTypes} value={year} style={{ width: "150px", padding: "5px 10px 5px 10px", margin: "0px 0px 0px 27%" }}>
                    <option >Select Year</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                  </select>   */}

      </FormControl>
            <div className="mainDiv"> {
                loading ? (<Box>  
                    
                    
                    <Box sx={{
                    // display: 'inline-flex',
                    // flexDirection: 'row',
                    // flexWrap: 'wrap',
                    // pl: 5,
                    // ml: 5,
                    // gap: 5,
                    // bgcolor: 'background.paper',
                    // maxWidth: 300,
                    // borderRadius: 1,
                }}>

                    {
                        res.map((e) => {
                            return (
                                <>

                                    <Item key={e.id} className="Itemm" sx={{
                                        display: 'inline-flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        pl: 7,
                                        ml: 2,
                                        // gap: 5,
                                        bgcolor: 'background.paper',
                                        maxWidth: 200,
                                        borderRadius: 1,
                                    }}>

                                        <Link key={e.id} to={`/singlemovie/${e.id}`}>
                                            <CardMedia
                                            
                                                component="img"
                                                width="300"
                                                height="260"
                                                image={"https://image.tmdb.org/t/p/original" + e.poster_path}
                                            // alt="green iguana"
                                            />
                                        </Link>

                                        <Box  sx={{
                                                display: 'inline-flex',
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                maxWidth: 180,
                                                // border: "1px solid red"
                                            }}>  
                                        <Typography
                                            variant="h6"
                                            noWrap
                                            component="div"
                                           
                                        >
                                            {e.title}
                                        </Typography> 

                                        <Typography
                                            variant="h6"
                                            noWrap
                                            component="div"
                                            sx={{
                                                flexGrow: 1,
                                            }}
                                        >
                                            Year: {e.release_date}
                                        </Typography>
                                        </Box>
                                    </Item>

                                </>
                            )
                        })
                    }
                </Box>
                    <Pagination  onChange={(event,value) => setPage(value)} sx={{ml: 50}}  count={20} color="primary"   />

                </Box>

                ) : (<Box sx={{ ml: "40%", mt: "20%" }}>  <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress color="secondary" />
                    <CircularProgress color="success" />
                    <CircularProgress color="inherit" />
                </Stack>   </Box>)
            }

            </div>
            </div>
        </>
    );
};

export default Movie;

