import axios from '../api/axios';
import React, {useEffect, useState} from 'react'
import "./Row.css"
import MovieModal from "./MovieModal"

// <Row />에 들어있는 props(속성)를 가져옴
// 영화정보 가져올 함수 실행 fetchMovieData()
export default function Row({ isLargeRow, title, id, fetchUrl}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({})

  // fetchUrl이 변할때만 실행
  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl])
  
  const fetchMovieData = async () => {
    // axios.get(url주소) -> baseURL과 결합된다.
    const request = await axios.get(fetchUrl);
    // console.log('request',request);

    // request로 보낸 data.results 정보를 가져옴
    setMovies(request.data.results)
  }
  
  const handleClick = (movie) => {
    setModalOpen(true)
    setMovieSelected(movie);
    console.log('movie',movie)
  }

  return (
    <section className='row'>
      <h2>{title}</h2>

      {/* 슬라이더 */}
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span className='arrow'>{"<"}</span>
        </div>

        <div id={id} className='row__posters'>
          {/* 영화나열하기 정보는 movies에 들어있음*/}
          {movies.map((movie) => (
            <img 
              key={movie.id}
              onClick={()=> handleClick(movie)} // 클릭시 모달함수실행
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              // isLargeRow가 적용되어 있으면 poster_path(큰거)아니면 backdrop_path(작은거)
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              loading="lazy"
              alt={movie.name}
              />
          ))}
        </div>

        <div className='slider__arrow-right'>
          <span className='arrow'>{">"}</span>
        </div>


      </div>

      {/* 모달열기 */}
      {modalOpen && 
        (<MovieModal 
          movieId={movieSelected.id} 
          {...movieSelected} 
          setModalOpen={setModalOpen}/>)}

    </section>
  )
}
