<template>
   <div>
      <div v-for="article in articlesData.articles">
        <div class="image" :style="{ backgroundImage: `url(${article.img})` }" v-if="article.img">
            <h4>{{ article.title }}</h4>
            <p>{{ article.description }}</p>
          </div>
        </div>

      <input name="upload" type="file" accept=".png, .jpg, .jpeg" title="Upload" @change="onChangeFile">
  </div>
</template>

<script setup lang="ts">
const { data, refresh } = await useFetch('http://localhost:4000/api/images')

interface IArticle {
      title: string,
      description: string,
      img?: string
}

interface IData {
  articles: IArticle[]
}

const articlesData = (data as Ref<IData>);

const onChangeFile = async (event: Event) => {
  const file = ref<File | null>(null);
  const [_file] = (event.target as HTMLInputElement).files as FileList;

  file.value = _file
  if (!file) return
  try {
    const body = new FormData();
    body.append('file', file.value, file.value.name)
    const {data: res} = await useFetch('http://localhost:4000/api/images', {
      method: "POST",
      body
    })

    if (res.value) {
      await refresh()
    }
  } catch (error) {
    alert("error")
    console.log(error)
  }
}

useSeoMeta({
  title: 'Kisi Mosaic',
  // description: '[description]',
  // ogTitle: '[og:title]',
  // ogDescription: '[og:description]',
  // ogImage: '[og:image]',
  // ogUrl: '[og:url]',
  // twitterTitle: '[twitter:title]',
  // twitterDescription: '[twitter:description]',
  // twitterImage: '[twitter:image]',
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

function useAsset(path: string): string {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  })

  return assets['/assets/' + path] as string
}
</script>

<style>
.image{
  background-size: cover;
  height: 400px;
  width: 600px;
}
</style>
