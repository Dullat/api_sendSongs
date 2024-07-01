import { useState, useEffect } from "react"

const Player = ({ id }) => {
  const [song, setSong] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSongs = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/songs/${id}`)
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`)
        }

        const arrayBuffer = await res.arrayBuffer()
        const blob = new Blob([arrayBuffer], { type: "audio/mpeg" })

        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        setSong(url)
      } catch (error) {
        console.error("Error fetching or playing song:", error)
      } finally {
        setLoading(false)
      }
    }

    getSongs()
  }, [id])
  return (
    <div>
      <audio id="audioPlayer" controls src={song}></audio>
      <button
        onClick={() => {
          song.play()
        }}
      >
        hihi
      </button>
    </div>
  )
}

export default Player
