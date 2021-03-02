<template lang="pug">
    table(border="0" :class="table_class" rules="none" cellspacing="0" cellpadding="0").sz-table
        thead
            tr
                sz-table-checkbox-cell(
                    v-if="checkbox"
                    tag="th"
                    @change="selectAll"
                    :selected="has_selected"
                )
                th(
                    align="right"
                    :colspan="fields.length" v-if="has_selected")
                    a(href="javascript:void 0" @click="updateSelected").decoration-none.m-x-1 Обновить
                    a(href="javascript:void 0" @click="deleteSelected").decoration-none Удалить
                th(
                    v-else
                    v-for="(field, key) of fields"
                    :width="field.width"
                    :key="key" :align="getCellAlign(field)")
                    .sz-table__cell.sz-table__cell--header
                        .label {{ field.label }}
            tr(v-if="header_spacer")
                th(:colspan="cols_total")
        transition-group(tag="tbody" appear name="list")
            template(v-for="(row, row_index) of rows")
                sz-table-row(
                    :selected="isSelected(row_index)"
                    :checkbox="checkbox"
                    :row_index="row_index"
                    :fields="fields"
                    :data="row"
                    :key="row.id"
                    @select="selectRow(row_index)"
                )
                    template(
                        v-if="has_cell_slot_keys"
                        v-for="slotKey of cell_slot_keys"
                        v-slot:[slotKey]="{propKey, cellIndex}"
                    )
                        slot(
                            :name="slotKey"
                            :row_index="row_index"
                            :colIndex="cellIndex"
                            :data="row"
                            :toggleNested="toggleNested(row_index, propKey)"
                        )
                tr(
                    v-if="show_nested_for && $scopedSlots[`nested-for-${show_nested_for.field}`] && show_nested_for.row_index === row_index"
                    :key="`nested_${row_index}`"
                ).sz-table__nested-row
                    td(:colspan="cols_total")
                        slot(:name="`nested-for-${show_nested_for.field}`" :row="row")
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
        header_spacer: {
            type: Boolean,
            default: true,
        }, // Пусая строка для визуального разделения заголовка и тела таблицы
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
            show_nested_for: null,
            selected: [],
        }
    },

    computed: {
        cols_total() {
            return this.fields.length + (this.checkbox ? 1 : 0)
        },

        table_class() {
            return {
                'sz-table--loading': this.loading,
            }
        },

        has_selected() {
            return Boolean(this.selected.length)
        },

        cell_slot_keys() {
            return Object.keys(this.$scopedSlots).filter(k => /cell-.*/.test(k))
        },

        has_cell_slot_keys() {
            return Boolean(this.cell_slot_keys.length)
        },
    },

    methods: {
        getSelectedForLogOutput() {
            return this.selected.map(i => this.rows[i].order_id).join(', ')
        },

        deleteSelected() {
            console.log(`Удаляю [${this.getSelectedForLogOutput()}]`)
        },

        updateSelected() {
            console.log(`Обновляю [${this.getSelectedForLogOutput()}]`)
        },

        selectAll() {
            this.selected = this.has_selected
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
            this.show_nested_for = null
        },

        toggleNested(row_index, field) {
            /**
             * NOTE: каррировал, чтобы вернуть уже
             * заряженую аргументами функцию, готовую
             * к вызовы
             *  */
            return () => {
                if (this.show_nested_for) {
                    if (
                        this.show_nested_for.field === field &&
                        this.show_nested_for.row_index === row_index
                    ) {
                        this.show_nested_for = null
                        return
                    }
                }
                this.show_nested_for = {
                    field,
                    row_index,
                }
            }
        },
    },
}
</script>
