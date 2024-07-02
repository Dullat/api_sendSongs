import { useState, useEffect } from "react"

import Top from "../componants/Top.jsx"
import List from "../componants/List.jsx"
import Player from "../componants/Player.jsx"

const HomePage = () => {
  const [song, setSong] = useState(1)
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFristTime, setIsFristTime] = useState(true)

  useEffect(() => {
    const getSongs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/songs")
        const data = await res.json()

        setSongs(data)
      } catch (error) {
        console.log("idk" + error.status)
      } finally {
        setLoading(false)
      }
    }

    getSongs()
  }, [])

  function currentSong(id) {
    const value = songs.find((song) => song.id === id)
    setSong(value)
  }

  if (isFristTime === true && !loading) {
    currentSong(1)
    setIsFristTime(false)
  }

  return (
    <div className="w-full max-w-96 bg-lime-900 flex flex-col">
      {loading ? (
        ""
      ) : (
        <>
          <Top song={song} />
          <Player id={song.id} songs={songs} currentSong={currentSong} />
          <List songs={songs} currentSong={currentSong}></List>
        </>
      )}
    </div>
  )
}

export default HomePage
