const audio = (n) => `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`;

export const CANCIONES = [
  {
    id: '1',
    titulo: 'Starboy Remix',
    artista: 'The Weeknd',
    album: 'Starboy',
    genero: 'Hip Hop',
    portada: 'https://picsum.photos/400/400?random=1',
    audio: audio(1),
  },
  {
    id: '2',
    titulo: 'Blinding Lights',
    artista: 'The Weeknd',
    album: 'After Hours',
    genero: 'Pop',
    portada: 'https://picsum.photos/400/400?random=2',
    audio: audio(2),
  },
  {
    id: '3',
    titulo: 'As It Was',
    artista: 'Harry Styles',
    album: "Harry's House",
    genero: 'Pop',
    portada: 'https://picsum.photos/400/400?random=3',
    audio: audio(3),
  },
  {
    id: '4',
    titulo: 'Gasolina',
    artista: 'Daddy Yankee',
    album: 'Barrio Fino',
    genero: 'Fiesta',
    portada: 'https://picsum.photos/400/400?random=4',
    audio: audio(4),
  },
];