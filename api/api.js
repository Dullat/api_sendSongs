import { fileURLToPath } from "url"
import path, { dirname } from "path"
import express from "express"
import cors from "cors"
import fs from "fs"

const app = express()
const PORT = 3000

// alow cors
app.use(cors())

// sll the songs
const songs = [
  {
    id: 1,
    title: "My Ordinary Life",
    artist: "The Living Tombstone",
    img: "./images/ordinary.png",
    src: "./songs/The Living Tombstone - My Ordinary Life (Lyrics Vietsub).mp3",
  },
  {
    id: 2,
    title: "The Less I Know",
    artist: "Tame Impala",
    img: "./images/lessiknow.png",
    src: "./songs/The Less I Know The Better.m4a",
  },
  {
    id: 3,
    title: "Ecstacy",
    artist: "SUICIDAL-IDOL",
    img: "./images/esy.png",
    src: "./songs/Ecstacy.m4a",
  },
  {
    id: 4,
    title: "Let it Happen",
    artist: "Tame Impala",
    img: "./images/letithappen.png",
    src: "./songs/Let It Happen.m4a",
  },
]

// send info about all songs
app.get("/api/songs", (req, res) => {
  res.json(songs)
})

// send song based on ID
app.get("/api/songs/:id", (req, res) => {
  const { id } = req.params
  const song = songs.find((song) => song.id === parseInt(id))

  if (!song) {
    return res.status(404).json({ error: "SRY: song not found" })
  }

  const currentFilePath = fileURLToPath(import.meta.url)
  const currentDir = dirname(currentFilePath)
  const filePath = path.join(currentDir, song.src)

  try {
    // read song
    const fileData = fs.readFileSync(filePath)

    // set Headers
    const head = {
      "Content-Length": fileData.length,
      "Content-Type": "audio/mpeg",
    }

    // send entire song
    res.writeHead(200, head)
    res.end(fileData)
  } catch (err) {
    console.error("Error reading file:", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`)
})
