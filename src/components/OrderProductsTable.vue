<template lang="pug">
    sz-table(
        :fields="fields"
        :rows="data"
    )
</template>

<script>
import SzTable from './SzTable/SzTable.vue'
/**
 * Рендер шаблона для булевых
 */
function titleSkuCellRenderer({ row }) {
    console.log(row)
    return `
    hello
`
}
export default {
    name: 'OrderProductsTable',

    components: { SzTable },

    props: {
        data: Array,
    },

    data() {
        return {
            fields: [
                // { key: 'id', label: 'id' },
                {
                    key: 'sku',
                    label: 'Название/SKU',
                    cellTemplateRenderer: titleSkuCellRenderer,
                },
                // { key: 'title', label: '' },
                {
                    key: 'quantity',
                    label: 'Заказанное количество',
                    align: 'center',
                },
                // Отправленное количество - хз?
                {
                    key: 'price',
                    label: 'Цена',
                    cellFormatter: 'moneyCellFormatter',
                },
                // { key: 'currency', label: '' },
                {
                    key: 'total_price',
                    label: 'Стоимость',
                    cellFormatter: 'moneyCellFormatter',
                },
                // { key: 'main_image', label: '' },
            ],
        }
    },

    watch: {
        data(data) {
            console.log(data)
        },
    },
}
</script>
