import { Button } from "./Button";
import { useState, useEffect } from "react";

import '../styles/sidebar.scss';

import { api } from "../services/api";

interface SideBarProps {
  onClickInGenreButton: (id: number) => void;
  selectedGenreId: number;
}
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar(props: SideBarProps) {
  // Complete aqui
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    // Trazer todos os generos
    api.get<GenreResponseProps[]>('genres')
    .then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => props.onClickInGenreButton(genre.id)}
              selected={props.selectedGenreId === genre.id}
            />
          ))}
        </div>
    </nav>
  )
}