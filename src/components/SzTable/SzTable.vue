<template lang="pug">
    table(border="0" :class="tableClass" rules="none" cellspacing="0" cellpadding="0").sz-table
        thead
            tr
                th(v-for="(field, key) of fields"
                    :width="field.width"
                    :key="key" :align="getCellAlign(field)")
                    .sz-table__cell.sz-table__cell--header
                        .label {{ field.label }}
            tr
                th(:colspan="colsTotal")
        transition-group(tag="tbody" appear name="list")
            template(v-for="(row, rowIndex) of rows")
                sz-table-row(
                    :rowIndex="rowIndex"
                    :fields="fields"
                    :data="row"
                    :key="row.id"
                )
</template>

<script>
import SzTableRow from './SzTableRow.vue'
import SzTableMixin from './SzTableMixin'

export default {
    name: 'SzTable',

    mixins: [SzTableMixin],

    components: {
        SzTableRow,
    },

    props: {
        fields: Array,
        rows: Array,
        loading: Boolean,
    },

    computed: {
        colsTotal() {
            return this.fields.length
        },

        tableClass() {
            return {
                'sz-table--loading': this.loading,
            }
        },
    },
}
</script>
