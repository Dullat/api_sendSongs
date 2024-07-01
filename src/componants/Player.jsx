import { useState, useEffect, useRef } from "react"

const Player = ({ id, songData }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5)
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
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.error("Failed to play audio:", error)
          })
      }
    }

    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const formatTime = (time) => {
    if (!isNaN(time)) {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
      return `${minutes}:${formattedSeconds}`
    }
    return "0:00"
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setVolume(newVolume)
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
      <div className="w-full">
        <div className="flex justify-between items-center">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => {
              const newTime = parseFloat(e.target.value)
              setCurrentTime(newTime)
              if (audioRef.current) {
                audioRef.current.currentTime = newTime
              }
            }}
            className="w-full mx-2"
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs">Volume</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full mx-2"
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={songUrl}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  )
}

export default Player
