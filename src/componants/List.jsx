const List = ({ songs }) => {
  return (
    <div>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default List
