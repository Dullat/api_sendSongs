const List = ({ songs, currentSong }) => {
  console.log(songs)
  function handleClick(id) {
    console.log(id)
    currentSong(id)
  }
  return (
    <div>
      <ul className="w-10/12 flex flex-col gap-2 m-auto mt-4 mb-4">
        {songs.map((song) => (
          <li
            key={song.id}
            onClick={() => handleClick(song.id)}
            className=" cursor-pointer border-b-2 border-gray-800 bg-lime-800 text-white h-10 flex items-center"
          >
            {song.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
