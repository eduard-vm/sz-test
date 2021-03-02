<template lang="pug">
    sz-table(
        :fields="fields"
        :rows="data"
    )
</template>

<script>
import SzTable from './SzTable/SzTable.vue'
/**
 * Рендер шаблона для
 */
function titleSkuCellRenderer({ row }) {
    return `
        <div class="flex">
            <img width="40" class="product__thumb" src="${row.main_image ||
                '/images/placeholder.jpg'}" />
            <div class="m-x1" style="padding: 6px 0">
                <h5>${row.title}</h5>
            </div>
        </div>
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
                    cell_template_renderer: titleSkuCellRenderer,
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
                    align: 'right',
                    cell_formatter: 'moneycell_formatter',
                },
                // { key: 'currency', label: '' },
                {
                    key: 'total_price',
                    label: 'Стоимость',
                    align: 'right',
                    cell_formatter: 'moneycell_formatter',
                },
                // { key: 'main_image', label: '' },
            ],
        }
    },
}
</script>

<style lang="sass">
.product
    &__thumb
        border-radius: 6px
</style>
