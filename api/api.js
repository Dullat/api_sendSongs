import express from "express"
import cors from "cors"
import path from "path"
import fs from "fs"

const app = express()
const PORT = 3000

// Enable CORS
app.use(cors())

// Define your songs array (metadata only)
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

// Endpoint to get metadata of all songs
app.get("/api/songs", (req, res) => {
  res.json(songs)
})

// Endpoint to stream audio file based on ID
app.get("/api/songs/:id", (req, res) => {
  const { id } = req.params
  const song = songs.find((song) => song.id === parseInt(id))

  if (!song) {
    return res.status(404).json({ error: "Song not found" })
  }

  const filePath = path.join(__dirname, song.src)

  // Stream the file to the client
  const stat = fs.statSync(filePath)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

    const chunksize = end - start + 1
    const file = fs.createReadStream(filePath, { start, end })
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "audio/mpeg",
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "audio/mpeg",
    }
    res.writeHead(200, head)
    fs.createReadStream(filePath).pipe(res)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
