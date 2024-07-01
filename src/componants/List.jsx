const List = ({ songs, currentSong }) => {
  console.log(songs)
  return (
    <div>
      <ul className="w-10/12 flex flex-col gap-1 m-auto mt-4 mb-4">
        {songs.map((song) => (
          <li
            key={song.id}
            onClick={() => currentSong(song.id)}
            className=" cursor-pointer border-b-2 border-gray-800"
          >
            {song.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
