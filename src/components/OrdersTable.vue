<template lang="pug">
  .orders-table
        sz-table(
            :fields="fields"
            :rows="ordersData"
        )
        .orders-table__pagination
            SzTablePagination
</template>

<script>
import { mapActions, mapState } from 'vuex'

import SzTable from './SzTable/SzTable.vue'
import SzTablePagination from './SzTable/SzTablePagination.vue'

/** TODO: в утилиты */
const normalizeDateFragment = value => (value <= 9 ? `0${value}` : value)

/** TODO: в шаблоны форматирования в качестве стандартных */
/**
 * Форматирования даты
 */
function dateCellFormatter({ value }) {
    if (typeof value === 'string') {
        const date = new Date(value)
        return [
            normalizeDateFragment(date.getDate()),
            normalizeDateFragment(date.getMonth()),
            date.getFullYear(),
        ].join('.')
    }
    return value
}

/** TODO: в шаблоны форматирования в качестве стандартных */
/**
 * Форматирование денег
 */
function moneyCellFormatter({ value }) {
    return `$${value}`
}

/**
 * Форматирование статуса
 */
function statusCellFormatter({ row }) {
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
/**
 * Рендер шаблона для булевых
 */
function itemsCellRenderer({ value }) {
    return `
    <a href="javascript:void 0" class="decoration-none">+ ${value.length} товара</a>
`
}

export default {
    name: 'OrdersTable',

    components: { SzTable, SzTablePagination },

    data() {
        return {
            pagination: {
                limit: 10,
                offset: 0,
                page: 0,
                totalPages: 0,
            },
            fields: [
                { key: 'order_id', label: 'id', width: '140' },
                {
                    cellTemplateRenderer: itemsCellRenderer,
                    key: 'items',
                    label: 'Товары',
                },
                {
                    cellFormatter: dateCellFormatter,
                    align: 'center',
                    key: 'create_date',
                    label: 'Дата заказа',
                },
                {
                    cellFormatter: statusCellFormatter,
                    align: 'center',
                    key: 'status',
                    label: 'Статус',
                },
                {
                    cellTemplateRenderer: boolCellRenderer,
                    align: 'center',
                    key: 'is_paid',
                    label: 'Оплачено',
                },
                {
                    cellTemplateRenderer: boolCellRenderer,
                    align: 'center',
                    key: 'is_shipped',
                    label: 'Отправлено',
                },
                {
                    key: 'buyer',
                    label: 'Покупатель',
                },
                {
                    cellFormatter: moneyCellFormatter,
                    key: 'total_price',
                    align: 'right',
                    label: 'Стоимость',
                },
            ],
        }
    },

    computed: {
        ...mapState({
            ordersPagination: ({ orders }) => orders.pagination,
            ordersData: ({ orders }) => orders.orders,
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
