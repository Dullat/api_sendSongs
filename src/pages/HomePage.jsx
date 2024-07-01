import { useState, useEffect } from "react"

import Header from "../componants/Header.jsx"
import List from "../componants/List.jsx"
import Player from "../componants/Player.jsx"

const HomePage = () => {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)

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
  return (
    <div className="w-full max-w-96 bg-lime-900 flex flex-col">
      {loading ? (
        ""
      ) : (
        <>
          <Header />
          <Player songs={songs} />
          <List songs={songs}></List>
        </>
      )}
    </div>
  )
}

export default HomePage
