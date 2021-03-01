<template lang="pug">
    table(border="0" :class="tableClass" rules="none" cellspacing="0" cellpadding="0").sz-table
        thead
            tr
                sz-table-checkbox-cell(
                    v-if="checkbox"
                    tag="th"
                    @change="selectAll"
                    :selected="hasSelected"
                )
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
                    :selected="isSelected(rowIndex)"
                    :checkbox="checkbox"
                    :rowIndex="rowIndex"
                    :fields="fields"
                    :data="row"
                    :key="row.id"
                    @select="selectRow(rowIndex)"
                )
                    template(
                        v-if="hasCellSlotKeys"
                        v-for="slotKey of cellSlotKeys"
                        v-slot:[slotKey]="{propKey, cellIndex}"
                    )
                        slot(
                            :name="slotKey"
                            :rowIndex="rowIndex"
                            :colIndex="cellIndex"
                            :data="row"
                        )
</template>

<script>
import SzTableRow from './SzTableRow.vue'
import SzTableCheckboxCell from './SzTableCheckboxCell.vue'

import SzTableMixin from './SzTableMixin'

export default {
    name: 'SzTable',

    mixins: [SzTableMixin],

    components: {
        SzTableRow,
        SzTableCheckboxCell,
    },

    props: {
        checkbox: Boolean,
        fields: Array,
        rows: Array,
        loading: Boolean,
    },

    watch: {
        rows: 'resetTable',
    },

    data() {
        return {
            selected: [],
        }
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

        hasSelected() {
            return Boolean(this.selected.length)
        },

        cellSlotKeys() {
            return Object.keys(this.$scopedSlots).filter(k => /cell-.*/.test(k))
        },

        hasCellSlotKeys() {
            return Boolean(this.cellSlotKeys.length)
        },
    },

    methods: {
        selectAll() {
            this.selected = this.hasSelected
                ? []
                : Array.from(Array(this.rows.length)).map((_, i) => i)
        },

        isSelected(index) {
            return this.selected.includes(index)
        },

        selectRow(index) {
            if (this.isSelected(index)) {
                this.selected = this.selected.filter(i => i !== index)
            } else {
                this.selected.push(index)
            }
        },

        resetTable() {
            this.selected = []
        },
    },
}
</script>
