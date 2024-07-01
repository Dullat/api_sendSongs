const Player = ({ songs }) => {
  //   const song = songs[0].src
  console.log(songs[0].src)
  return (
    <div>
      <audio id="audioPlayer" controls src={`${songs[0].src}`}></audio>
    </div>
  )
}

export default Player
