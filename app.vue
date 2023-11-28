<template>
  <div>
    <div v-for="(article, idx) in articlesData.articles" :key="idx">
      <div v-if="article.img" class="image" :style="{ backgroundImage: `url(${url}${article.img})` }">
        <h4>{{ article.title }}</h4>
        <p>{{ article.description }}</p>
      </div>
    </div>

    <input name="upload" type="file" accept=".png, .jpg, .jpeg" title="Upload" @change="onChangeFile">
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const url = runtimeConfig.public.serverUrl

const { data, refresh, error: getImageError } = await useFetch(`${url}/api/images`)

if (getImageError.value) {
  throw createError({
    statusCode: 400,
    statusMessage: getImageError.toString()
  })
}

interface IArticle {
      title: string,
      description: string,
      img?: string
}

interface IData {
  articles: IArticle[]
}

const articlesData = (data as Ref<IData>)

const onChangeFile = async (event: Event) => {
  const file = ref<File | null>(null)
  const [_file] = (event.target as HTMLInputElement).files as FileList

  file.value = _file
  if (!file) { return };
  try {
    const body = new FormData()
    body.append('file', file.value, file.value.name)

    const { data: res, error: postImageError } = await useFetch(`${url}/api/images`, {
      method: 'POST',
      body
    })

    if (postImageError.value) {
      throw createError({
        statusCode: 400,
        statusMessage: postImageError.toString()
      })
    }

    const { message } = res?.value as {message: string}
    if (message === 'upload successful') {
      await refresh()
    }
  } catch (error) {
    alert(`Error uploading image: ${error}`)
  }
}

useSeoMeta({
  title: 'Kisi Mosaic',
  description: 'A blog with mosaic layout',
  ogTitle: 'Kisi Mosaic',
  ogDescription: 'A blog with mosaic layout',
  ogImage: '/favicon.png',
  twitterTitle: 'Kisi Mosaic',
  twitterDescription: 'A blog with mosaic layout',
  twitterImage: '/favicon.png',
  twitterCard: 'summary'
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ]
})
</script>

<style>
.image{
  background-size: cover;
  height: 400px;
  width: 600px;
}
</style>
