const Top = ({ song }) => {
  console.log(song)
  return (
    <header className="text-center">
      <p className="font-semibold text-2xl">Playing Now</p>
      <h1>
        <span>{song.title}</span>
      </h1>
      <small>{song.artist}</small>
    </header>
  )
}

export default Top
