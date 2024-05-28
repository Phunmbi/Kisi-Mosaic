<template>
  <div class="masonry-with-columns">
    <section class="hero-text">
      <h4>Mosaïqué</h4>
      <p>A blog template.</p>
      <p> Try it out, upload an image.</p>
    </section>
    <div
      v-for="(article, idx) in articlesData.articles"
      :key="`${article.title}-${idx}`"
      :style="{ backgroundImage: `url(${url}${article.img})`}"
    >
      <h3 class="title">
        {{ article.title }}
      </h3>
      <p :key="idx" class="description">
        {{ article.description }}
      </p>
    </div>

    <section>
      <input
        name="upload"
        type="file"
        accept=".png, .jpg, .jpeg"
        title="Upload"
        class="button"
        @change="onChangeFile"
      >
    </section>
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const url = runtimeConfig.public.serverUrl
const acceptedImageTypes = ['image/png', 'image/jpeg', 'image/jpg']

interface IArticle {
      title: string,
      description: string,
      img: string
}

const { data, refresh, error: getImageError } = await useFetch(`${url}/api/images`)

if (getImageError.value) {
  throw createError({
    statusCode: 400,
    statusMessage: getImageError.toString()
  })
}

interface IData {
  articles: IArticle[]
}

const articlesData = (data as Ref<IData>)

const onChangeFile = async (event: Event) => {
  const file = ref<File | null>(null)
  const [_file] = (event.target as HTMLInputElement).files as FileList

  file.value = _file
  if (!file || !acceptedImageTypes.includes(file.value.type)) { return };
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
  title: 'Mosaique',
  description: 'A blog with mosaic layout',
  ogTitle: 'Mosaique',
  ogDescription: 'A blog with mosaic layout',
  ogImage: '/favicon.jpg',
  twitterTitle: 'Mosaique',
  twitterDescription: 'A blog with mosaic layout',
  twitterImage: '/favicon.jpg',
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
      href: '/favicon.jpg'
    }
  ]
})
</script>

<style lang="scss">
@use "~/assets/index.scss";
</style>
