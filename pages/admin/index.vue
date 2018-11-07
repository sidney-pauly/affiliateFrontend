<template>
    <div>
        <nuxt-link  to="/admin/categories">Kategorien managen</nuxt-link>
        <br>
        <nuxt-link  to="/admin/blogPosts">Blog Posts</nuxt-link>
        <br>
        <nuxt-link  to="/admin/products">Produkte managen</nuxt-link>
        <br>
        <nuxt-link  to="/admin/website">Generelle Einstellungen</nuxt-link>

    </div>
</template>

<script>
export default {
    middleware: 'authenticate'
}
</script>
