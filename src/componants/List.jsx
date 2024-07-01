const List = ({ songs, currentSong }) => {
  console.log(songs)
  return (
    <div>
      <ul>
        {songs.map((song) => (
          <li key={song.id} onClick={() => currentSong(song.id)}>
            {song.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
