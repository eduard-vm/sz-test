<template lang="pug">
    .sz-table__pagination
        span(v-if="canPrevPage" @click="prevPage").pagination__prev-button.icon.icon--arrow-left
        span.pagination__value {{ range }} из {{ count }}
        span(v-if="canNextPage" @click="nextPage").pagination__next-button.icon.icon--arrow-right
</template>

<script>
export default {
    name: 'SzTablePagination',

    props: {
        count: Number,
        totalPages: Number,
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

        canPrevPage() {
            return this.page > 0
        },

        canNextPage() {
            return this.page <= this.totalPages
        },
    },

    methods: {
        change(page) {
            this.$emit('change', page)
        },

        prevPage() {
            if (this.canPrevPage) this.change(this.page - 1)
        },

        nextPage() {
            if (this.canNextPage) this.change(this.page + 1)
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
