<template lang="pug">
    .sz-table__pagination
        span(v-if="can_prev_page" @click="prevPage").pagination__prev-button.icon.icon--arrow-left
        span.pagination__value {{ range }} из {{ count }}
        span(v-if="can_next_page" @click="nextPage").pagination__next-button.icon.icon--arrow-right
</template>

<script>
export default {
    name: 'SzTablePagination',

    props: {
        count: Number,
        total_pages: Number,
        page: Number,
        limit: Number,
    },

    computed: {
        range() {
            const from = this.page * this.limit
            const total =
                from + this.limit > this.count ? this.count : from + this.limit
            return `${from}-${total}`
        },

        can_prev_page() {
            return this.page > 0
        },

        can_next_page() {
            return this.page <= this.total_pages
        },
    },

    methods: {
        change(page) {
            this.$emit('change', page)
        },

        prevPage() {
            if (this.can_prev_page) this.change(this.page - 1)
        },

        nextPage() {
            if (this.can_next_page) this.change(this.page + 1)
        },
    },
}
</script>

<style lang="sass">
.pagination
    opacity: .5
    &__value
        margin: 0 10px
    &__value,
    &__prev-button,
    &__next-button
        display: inline-block
        vertical-align: middle
    &__prev-button,
    &__next-button
        cursor: pointer
</style>
