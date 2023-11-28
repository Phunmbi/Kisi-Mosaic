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

const { data, refresh } = await useFetch(`${url}/api/images`)

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
    const { data: res } = await useFetch(`${url}/api/images`, {
      method: 'POST',
      body
    })

    if (res.value) {
      await refresh()
    }
  } catch (error) {
    alert('Error uploading image')
  }
}

useSeoMeta({
  title: 'Kisi Mosaic',
  description: 'A blog with mosaic layout',
  ogTitle: '[og:title]',
  ogDescription: '[og:description]',
  ogImage: '[og:image]',
  // ogUrl: '[og:url]',
  twitterTitle: '[twitter:title]',
  twitterDescription: '[twitter:description]',
  twitterImage: '[twitter:image]'
  // twitterCard: 'summary'
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
