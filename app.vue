<template>
  <div>
    <Head>
      <Title>Kisi Mosaic</Title>
    </Head>

    <h3>Index</h3>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '[title]',
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
    // {
    //   rel: 'icon',
    //   type: 'image/png',
    //   href: '/favicon.png'
    // }
  ]
})
</script>
