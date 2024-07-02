import React, { useState, useEffect, useRef } from "react"
import "../css/audioPlayer.css"

import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"

const Player = ({ id, songs, currentSong }) => {
  const [currentID, setCurrentID] = useState(id)
  const [allSongIDs, setAllSongIDs] = useState([])
  const audioRef = useRef(null)
  const [songUrl, setSongUrl] = useState(null)

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/songs/${currentID}`
        )
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const arrayBuffer = await response.arrayBuffer()
        const blob = new Blob([arrayBuffer], { type: "audio/mpeg" })
        const url = URL.createObjectURL(blob)
        setSongUrl(url)
      } catch (error) {
        console.error("Error fetching song:", error)
      }
    }

    fetchSong()
  }, [currentID])

  useEffect(() => {
    const IDs = songs.map((song) => song.id)
    setAllSongIDs(IDs)
  }, [])

  const playNext = () => {
    if (currentID < allSongIDs.length) {
      setCurrentID(currentID + 1)
      currentSong(currentID + 1)
    }
  }

  const playPrev = () => {
    if (currentID > 1) {
      setCurrentID(currentID - 1)
      currentSong(currentID - 1)
    }
  }

  useEffect(() => {
    setCurrentID(id)
  }, [id])

  return (
    <div className="flex flex-col items-center justify-center text-white mt-4 w-10/12 m-auto">
      <AudioPlayer
        customAdditionalControls={[]}
        customVolumeControls={[]}
        ref={audioRef}
        src={songUrl}
        autoPlayAfterSrcChange={true}
        controls
        showSkipControls={true}
        onClickNext={playNext}
        onClickPrevious={playPrev}
        showJumpControls={false}
        className="custom-audio-player"
      />
    </div>
  )
}

export default Player
