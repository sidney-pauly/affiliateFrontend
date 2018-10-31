<template>
    <div>
        <nuxt-link  to="/admin/categories">Kategorien managen</nuxt-link>
        <br>
        <nuxt-link  to="/admin/blogPosts">Blog Posts</nuxt-link>
    </div>
</template>

<script>
export default {
    middleware: 'authenticate'
}
</script>
