export async function compressImage(file: File): Promise<File> {

  const img = document.createElement("img")
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")!

  const reader = new FileReader()

  return new Promise((resolve) => {
    reader.onload = (event) => {
      img.src = event.target?.result as string
    }

    img.onload = () => {

      const MAX_WIDTH = 300
      const scale = MAX_WIDTH / img.width

      canvas.width = MAX_WIDTH
      canvas.height = img.height * scale

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(
        (blob) => {
          if (!blob) return

          const compressedFile = new File(
            [blob],
            file.name,
            { type: "image/jpeg" }
          )

          resolve(compressedFile)
        },
        "image/jpeg",
        0.7 // 🔥 calidad (0.0 - 1.0)
      )
    }

    reader.readAsDataURL(file)
  })
}