<template lang="pug">
  .orders-table
        .orders-table__header.m-y-3
            .flex.space-between
                h1 Таблица заказов
                .flex
                    sz-button(disabled="true" color="black" size="md").m-x-1 Отправления
                    sz-button(disabled="true" size="md") Экспортировать
        .orders-table__control.flex.m-y-2
            sz-button(color="dark" size="xl" width="95px") фильтр
            sz-input(@input="searchInputHandler" :value="pagination.search" placeholder="поиск" width="100%").m-x3
        sz-table(
            :fields="fields"
            :rows="orders_data"
            :loading="orders_loading"
            checkbox
        )
            template(#cell-order_id="{ data }")
                router-link(:to="`#orders/${data.order_id}`" class="decoration-none") {{ data.order_id }}
            template(#cell-items="{ data, toggleNested }")
                a(
                    class="decoration-none"
                    href="javascript: void 0"
                    @click="toggleNested"
                )
                    | + {{ formatDeclOfProductsCount(data.items.length) }}

            template(#nested-for-items="{row}")
                order-products-table(:data="row.items" :header-spacer="false")
        .orders-table__pagination
            sz-table-pagination(
                :count="pagination.count"
                :total_pages="pagination.total_pages"
                :page="pagination.page"
                :limit="pagination.limit"
                @change="changePage"
            )
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { formatDeclOfProductsCount } from '@/helpers/format'
import debounce from '@/helpers/debounce'
import { SEARCH_DELAY } from '@/config'
import SzTable from './SzTable/SzTable.vue'
import SzTablePagination from './SzTable/SzTablePagination.vue'
import OrderProductsTable from './OrderProductsTable.vue'

/**
 * Форматирование статуса
 */
function statuscell_formatter({ row }) {
    if (row.is_refunded) return 'возврат'
    if (row.is_completed) return 'завершен'
    if (row.is_open) return 'открыт'
    return 'не определен'
}

/**
 * Рендер шаблона для булевых
 */
function boolCellRenderer({ value }) {
    return `
    <div class="icon icon--w20 icon--${
        value ? 'checked-circle-green' : 'empty-circle'
    }"></div>
`
}

const resetPagination = () => ({
    limit: 10,
    offset: 0,
    page: 0,
    total_pages: 0,
})

export default {
    name: 'OrdersTable',

    components: { SzTable, SzTablePagination, OrderProductsTable },

    data() {
        return {
            search: null,
            saved_pagination: null,
            pagination: resetPagination(),

            fields: [
                { key: 'order_id', label: 'id', width: '140' },
                {
                    key: 'items',
                    label: 'Товары',
                },
                {
                    cell_formatter: 'datecell_formatter',
                    align: 'center',
                    key: 'create_date',
                    label: 'Дата заказа',
                },
                {
                    cell_formatter: statuscell_formatter,
                    align: 'center',
                    key: 'status',
                    label: 'Статус',
                },
                {
                    cell_template_renderer: boolCellRenderer,
                    align: 'center',
                    key: 'is_paid',
                    label: 'Оплачено',
                },
                {
                    cell_template_renderer: boolCellRenderer,
                    align: 'center',
                    key: 'is_shipped',
                    label: 'Отправлено',
                },
                {
                    key: 'buyer',
                    label: 'Покупатель',
                },
                {
                    cell_formatter: 'moneycell_formatter',
                    key: 'total_price',
                    align: 'right',
                    label: 'Стоимость',
                },
            ],
        }
    },

    computed: {
        ...mapState({
            orders_pagination: ({ orders }) => orders.pagination,
            orders_data: ({ orders }) => orders.orders,
        }),
        ...mapGetters({
            orders_loading: 'orders/loading',
        }),
    },

    watch: {
        $route: {
            immediate: true,
            handler: 'getOrders',
        },

        orders_pagination(pagination) {
            this.pagination = { ...pagination }
        },
    },

    methods: {
        formatDeclOfProductsCount,

        ...mapActions({
            ordersGetAll: 'orders/getAll',
        }),

        searchInputHandler: debounce(function search(query) {
            if (!this.saved_pagination) {
                this.saved_pagination = { ...this.pagination }
            }

            if (query) {
                const pagination = resetPagination()
                pagination.search = query
                this.pagination = pagination
                this.getOrders()
            } else {
                this.pagination = { ...this.saved_pagination }
                this.saved_pagination = null
            }
        }, SEARCH_DELAY),

        getOrders() {
            this.ordersGetAll(this.pagination)
        },

        changePage(page) {
            this.pagination.page = page
            this.getOrders()
        },
    },
}
</script>

<style lang="sass">
.orders-table
    &__pagination
        float: right
        margin-top: 20px
</style>
