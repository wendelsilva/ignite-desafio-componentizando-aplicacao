import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { useEffect, useState } from "react";

import './styles/global.scss';

import { api } from './services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  const [movies, setMovies] = useState<MovieProps[]>([]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    // Trazer os filmes do gênero selecionado
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
    .then(response => {
      setMovies(response.data);
    });

    // Trazer o gênero selecionado
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`)
    .then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]); 

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar onClickInGenreButton={handleClickButton} selectedGenreId={selectedGenreId}/>
      <Content selectedGenre={selectedGenre} movies={movies}/>
    </div>
  )
}