import { createServer } from 'http'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import formidable from 'formidable'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import data from './data/articles.json'

const app = express()
const port = process.env.PORT || 4000

createServer(app)
const webURL = process.env.WEB_URL

app.use(
  cors({
    origin: webURL
  })
)
app.use('/assets', express.static(path.join(__dirname, 'images')))

app.listen(port, () => {
  console.log(`Kisi API Server listening on ${port}`)
})

app.get('/api/images', async (_, res) => {
  try {
    const files = await readdir(path.join(__dirname, 'images'))
    const articles: {
      title: string,
      description: string,
      img?: string
    } [] = [...data]

    files.map((image, idx) => {
      articles[idx].img = `/assets/${image}`
      return articles
    })

    res.status(200).json({
      articles
    })
    return { articles }
  } catch (error) {
    res.status(400).json({
      message: 'error fetching images'
    })
  }
})

app.post('/api/images', async (req, res) => {
  const uploadFolder = path.join(__dirname, 'images')
  const files = await readdir(uploadFolder)

  try {
    const form = formidable({
      uploadDir: uploadFolder,
      maxFileSize: 5 * 1024 * 1024, // max image size upload is capped at 5MB
      filename: (_, __, part) => {
        const { mimetype } = part
        const ext = (mimetype as string).split('/')
        return `image${files.length}.${ext[1]}`
      }
    })
    await form.parse(req)

    res.status(200).json({
      message: 'upload successful'
    })
  } catch (error) {
    res.status(400).json({
      message: 'failed upload',
      error: error.toString()
    })
  }
})
