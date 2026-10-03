import { createContext, useContext, useState } from 'react';

const BibliotecaContext = createContext(null);

export function BibliotecaProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]); // ids de canciones
  const [playlists, setPlaylists] = useState([]); // { id, nombre, canciones: [ids] }

  const esFavorito = (id) => favoritos.includes(id);

  const alternarFavorito = (id) =>
    setFavoritos((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const crearPlaylist = (nombre, ids) =>
    setPlaylists((p) => [...p, { id: String(Date.now()), nombre, canciones: ids }]);

  const eliminarPlaylist = (id) => setPlaylists((p) => p.filter((x) => x.id !== id));

  const agregarAPlaylist = (playlistId, cancionId) =>
    setPlaylists((p) =>
      p.map((pl) =>
        pl.id === playlistId && !pl.canciones.includes(cancionId)
          ? { ...pl, canciones: [...pl.canciones, cancionId] }
          : pl
      )
    );

  return (
    <BibliotecaContext.Provider
      value={{
        favoritos,
        playlists,
        esFavorito,
        alternarFavorito,
        crearPlaylist,
        eliminarPlaylist,
        agregarAPlaylist,
      }}
    >
      {children}
    </BibliotecaContext.Provider>
  );
}

export function useBiblioteca() {
  const ctx = useContext(BibliotecaContext);
  if (!ctx) throw new Error('useBiblioteca debe usarse dentro de un BibliotecaProvider');
  return ctx;
}