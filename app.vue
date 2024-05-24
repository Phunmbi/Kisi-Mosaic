<template>
  <div class="masonry-with-columns">
    <main class="hero-text">
      <h4>Mosaic blog, <span> Connecting spaces  </span></h4>
    </main>
    <div
      v-for="(article, idx) in articlesData.articles"
      :key="`${article.title}-${idx}`"
      :style="{ backgroundImage: `url(${url}${article.img})`}"
      @mouseenter="(event) => showDescription(event)"
      @mouseleave="(event) => removeDescription(event)"
    >
      <h3 class="title">
        {{ article.title }}
      </h3>
      <p :key="idx" class="description inactive">
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

interface IArticle {
      title: string,
      description: string,
      img: string
}

const showDescription = (event: Record<string, any>) => {
  const target = event?.target
  target?.children[1].classList.remove('inactive')
  target?.children[1].classList.add('active')
}

const removeDescription = (event: Record<string, any>) => {
  const target = event?.target
  target?.children[1].classList.remove('active')
  target?.children[1].classList.add('inactive')
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
  ogImage: '/favicon.jpg',
  twitterTitle: 'Kisi Mosaic',
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
