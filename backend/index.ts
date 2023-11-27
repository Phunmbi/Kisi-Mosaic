import express from "express";
import { createServer } from "http";
import { readdir } from "node:fs/promises";
import formidable from "formidable";
import path from "node:path";
import cors from "cors";
import data from "./data/articles.json";

const app = express();
const port = 4000 || process.env.PORT;

createServer(app);

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
)
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.listen(port, () => {
  console.log(`Kisi API Server listening on ${port}`);
});

app.get('/api/images', async (req, res) => {
  try {
    const files  = await readdir( path.join(__dirname, "assets") );
    const articles: {
      title: string,
      description: string,
      img?: string
    } [] = [... data];
    
    files.map( async (image, idx) => { articles[idx].img = `http://localhost:4000/assets/${image}` })


    res.status(200).json({
      articles
    })
    return { articles }
  } catch (error) {
    console.error(error?.toString())
  }
})

app.post('/api/images' , async (req, res) => {
  const files  = await readdir( path.join(__dirname, "assets"));
  const uploadFolder = path.join(__dirname, "assets");

  const form = formidable({
    uploadDir: uploadFolder,
    maxFileSize: 5 * 1024 * 1024,
    filename: (_, __, part) => {
      const { mimetype }= part
      let ext = (mimetype as string).split('/');
      console.log(mimetype, ext[1])
      return `image${files.length}.${ext[1]}`
    }
  });

  try {
   await form.parse(req)

   res.status(200).json({
    message: "upload successful"
   })

  } catch (error) {
    res.status(400).json({
      message: "failed upload",
      error: error.toString()
    })
  }
})
