import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { createContext, useContext, useEffect, useState } from 'react';
import { CANCIONES } from '../constants/canciones';

const ReproductorContext = createContext(null);

export function ReproductorProvider({ children }) {
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);

  const [cola, setCola] = useState(CANCIONES);
  const [indice, setIndice] = useState(0);
  const [aleatorio, setAleatorio] = useState(false);
  const [repetir, setRepetir] = useState('off'); // 'off' | 'all' | 'one'
  const [hayCancion, setHayCancion] = useState(false);

  const cancionActual = cola[indice];

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true, shouldPlayInBackground: true });
  }, []);

  const cargarYSonar = (lista, i) => {
    setCola(lista);
    setIndice(i);
    player.replace({ uri: lista[i].audio });
    player.play();
    setHayCancion(true);
  };

  // Se llama desde una tarjeta: reproducir(cancion, listaDondeEstaba)
  const reproducir = (cancion, lista = CANCIONES) => {
    const i = lista.findIndex((c) => c.id === cancion.id);
    if (i >= 0) cargarYSonar(lista, i);
  };

  const alternarReproduccion = () => {
    if (!hayCancion) return cargarYSonar(cola, indice);
    status.playing ? player.pause() : player.play();
  };

  const siguiente = () => {
    let i;
    if (aleatorio && cola.length > 1) {
      do {
        i = Math.floor(Math.random() * cola.length);
      } while (i === indice);
    } else {
      i = indice + 1;
      if (i >= cola.length) {
        if (repetir === 'all') i = 0;
        else return player.pause();
      }
    }
    cargarYSonar(cola, i);
  };

  const anterior = () => {
    if (status.currentTime > 3) return player.seekTo(0); // como Spotify
    cargarYSonar(cola, (indice - 1 + cola.length) % cola.length);
  };

  // Al terminar una canción
  useEffect(() => {
    if (!status.didJustFinish) return;
    if (repetir === 'one') {
      player.seekTo(0);
      player.play();
    } else {
      siguiente();
    }
  }, [status.didJustFinish]);

  const ciclarRepetir = () =>
    setRepetir((r) => (r === 'off' ? 'all' : r === 'all' ? 'one' : 'off'));

  return (
    <ReproductorContext.Provider
      value={{
        cancionActual,
        estaSonando: status.playing,
        posicion: status.currentTime,
        duracion: status.duration,
        aleatorio,
        repetir,
        hayCancion,
        reproducir,
        alternarReproduccion,
        siguiente,
        anterior,
        buscar: (seg) => player.seekTo(seg),
        alternarAleatorio: () => setAleatorio((a) => !a),
        ciclarRepetir,
      }}
    >
      {children}
    </ReproductorContext.Provider>
  );
}

export function useReproductor() {
  const ctx = useContext(ReproductorContext);
  if (!ctx) throw new Error('useReproductor debe usarse dentro de un ReproductorProvider');
  return ctx;
}