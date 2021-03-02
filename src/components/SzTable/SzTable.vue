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
                th(
                    align="right"
                    :colspan="fields.length" v-if="hasSelected")
                    a(href="javascript:void 0" @click="updateSelected").decoration-none.m-x-1 Обновить
                    a(href="javascript:void 0" @click="deleteSelected").decoration-none Удалить
                th(
                    v-else
                    v-for="(field, key) of fields"
                    :width="field.width"
                    :key="key" :align="getCellAlign(field)")
                    .sz-table__cell.sz-table__cell--header
                        .label {{ field.label }}
            tr(v-if="headerSpacer")
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
                            :toggleNested="toggleNested(rowIndex, propKey)"
                        )
                tr(
                    v-if="showNestedFor && $scopedSlots[`nested-for-${showNestedFor.field}`] && showNestedFor.rowIndex === rowIndex"
                    :key="`nested_${rowIndex}`"
                ).sz-table__nested-row
                    td(:colspan="colsTotal")
                        slot(:name="`nested-for-${showNestedFor.field}`" :row="row")
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
        headerSpacer: Boolean, // Пусая строка для визуального разделения заголовка и тела таблицы
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
            showNestedFor: null,
            selected: [],
        }
    },

    computed: {
        colsTotal() {
            return this.fields.length + (this.checkbox ? 1 : 0)
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
            this.showNestedFor = null
        },

        toggleNested(rowIndex, field) {
            /**
             * NOTE: каррировал, чтобы вернуть уже
             * заряженую аргументами функцию, готовую
             * к вызовы
             *  */
            return () => {
                if (this.showNestedFor) {
                    if (
                        this.showNestedFor.field === field &&
                        this.showNestedFor.rowIndex === rowIndex
                    ) {
                        this.showNestedFor = null
                        return
                    }
                }
                this.showNestedFor = {
                    field,
                    rowIndex,
                }
            }
        },
    },
}
</script>
