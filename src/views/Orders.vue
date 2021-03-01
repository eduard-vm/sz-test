<template lang="pug">
    #home
        div {{ pagination }}
        div
            a(href="javascript: void 0" @click="prevPage" v-if="canPrevPage") Назад
            br
            a(href="javascript: void 0" @click="nextPage") Дальше

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Home',

    data() {
        return {
            pagination: {
                limit: 10,
                offset: 0,
                page: 0,
                totalPages: 0,
            },
        }
    },

    computed: {
        ...mapState({
            ordersPagination: ({ orders }) => orders.pagination,
        }),

        canPrevPage() {
            return this.pagination.page > 0
        },

        canNextPage() {
            return this.pagination.page <= this.pagination.totalPages
        },
    },

    watch: {
        $route: {
            immediate: true,
            handler: 'getOrders',
        },

        ordersPagination(pagination) {
            this.pagination = { ...pagination }
        },
    },

    methods: {
        ...mapActions({
            ordersGetAll: 'orders/getAll',
        }),

        getOrders() {
            this.ordersGetAll(this.pagination)
        },

        prevPage() {
            if (this.canPrevPage) {
                this.pagination.page -= 1
                this.getOrders()
            }
        },

        nextPage() {
            if (this.canNextPage) {
                this.pagination.page += 1
                this.getOrders()
            }
        },
    },
}
</script>
