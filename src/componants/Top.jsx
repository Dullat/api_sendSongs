import { useEffect, useState } from "react"

const Top = ({ song }) => {
  const [image, setImage] = useState()

  useEffect(() => {
    const getImage = async function () {
      try {
        const res = await fetch(`http://localhost:3000/api/song/img/${song.id}`)
        const arrayBuffer = await res.arrayBuffer()

        const blob = new Blob([arrayBuffer], { type: "image/png" })
        const url = URL.createObjectURL(blob)
        setImage(url)
      } catch (error) {
        console.error(error)
      }
    }

    getImage()
  }, [song])
  return (
    <header className="text-center">
      <div className="ml-4 mt-5">
        <h3 className="text-lg font-semibold">{song.title}</h3>
        <p className="text-sm text-gray-400">{song.artist}</p>
      </div>
      <div
        className="w-10/12 aspect-[3/3] m-auto mt-5 bg-slate-800 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </header>
  )
}

export default Top
