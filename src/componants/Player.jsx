import React, { useState, useEffect, useRef } from "react"
import ReactAudioPlayer from "react-audio-player"
import "../css/audioPlayer.css"

const Player = ({ id, songData, play }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const audioRef = useRef(null)
  const [songUrl, setSongUrl] = useState(null)

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/songs/${id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const arrayBuffer = await response.arrayBuffer()
        const blob = new Blob([arrayBuffer], { type: "audio/mpeg" })
        const url = URL.createObjectURL(blob)
        setSongUrl(url)
      } catch (error) {
        console.error("Error fetching song:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSong()
  }, [id])

  const togglePlay = () => {
    if (!audioRef.current || !audioRef.current.audioEl.current) return

    if (audioRef.current.audioEl.current.paused) {
      audioRef.current.audioEl.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.audioEl.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-white mt-4 w-10/12 m-auto">
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
            onClick={togglePlay}
            disabled={!songUrl} // Disable play button if songUrl is not set
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{songData.title}</h3>{" "}
            <p className="text-sm text-gray-400">{songData.artist}</p>{" "}
          </div>
        </div>
      </div>

      <ReactAudioPlayer
        ref={audioRef}
        src={songUrl}
        autoPlay={true}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="custom-audio-player"
      />
    </div>
  )
}

export default Player
