<template lang="pug">
    .layout
        .topbar
            sz-topbar
        .sidebar
            sz-sidebar
        .viewport
            router-view
</template>

<script>
import SzTopbar from '@/components/SzTopbar'
import SzSidebar from '@/components/SzSidebar'

export default {
    components: { SzTopbar, SzSidebar },
}
</script>

<style lang="sass">
.layout
    display: grid
    grid-template-areas: "sidebar topbar" "sidebar viewport"
    grid-template-columns: 220px 1fr
    grid-template-rows: 60px 1fr
    min-height: 100vh
    background: #F6F9FC
.sidebar
    grid-area: sidebar
    background-color: #132739

.topbar,
.viewport
    width: 100%
.topbar
    grid-area: topbar
    background: #fff
    height: 60px

.viewport
    grid-area: viewport
    height: calc(100vh - 60px)
</style>
