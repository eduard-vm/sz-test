<template lang="pug">
    tr(:style="row_style" :class="row_class").sz-table__row
        sz-table-checkbox-cell(
            v-if="checkbox"
            @change="$emit('select')"
            :selected="selected"
        )
        td(v-for="(field, col_index) of fields" :key="col_index" :align="getCellAlign(field)")
            .sz-table__cell(
                :class="field.cell_class || {}"
                v-html="renderTemplate(field.cell_template_renderer, { value: data[field.key], row: data, field })"
                v-if="field.cell_template_renderer"
            )
            .sz-table__cell(v-else :class="field.cell_class || {}")
                slot(
                    v-if="$scopedSlots[`cell-${field.key}`]"
                    :name="`cell-${field.key}`"
                    :propKey="field.key"
                    :cellIndex="col_index"
                )
                template(v-else) {{ getValue(data, field) }}
</template>
<script>
import SzTableMixin from './SzTableMixin'
import SzTableCheckboxCell from './SzTableCheckboxCell.vue'
import * as formatters from './formatters'

export default {
    name: 'SzTableRow',

    components: { SzTableCheckboxCell },

    mixins: [SzTableMixin],

    props: {
        selected: Boolean,
        checkbox: Boolean,
        disabled: Boolean,
        fields: {
            type: Array,
            default() {
                return []
            },
        },
        data: {
            type: Object,
            default() {
                return {}
            },
        },
        rowIndex: Number,
    },

    computed: {
        row_class() {
            return {
                'sz-table__row--selected': this.selected,
                'sz-table__row--disabled': this.disabled,
            }
        },

        row_style() {
            return {
                'transition-delay': `${this.rowIndex * 30}ms`,
            }
        },
    },

    methods: {
        renderTemplate(render_fn, render_data) {
            return render_fn.call(this, render_data)
        },

        getValue(row, field) {
            const value = row[field.key]

            if (field.cell_formatter) {
                let fn =
                    typeof field.cell_formatter === 'string' &&
                    formatters[field.cell_formatter]
                        ? formatters[field.cell_formatter]
                        : field.cell_formatter

                return fn.call(this, {
                    value,
                    row,
                })
            }
            return value
        },
    },
}
</script>
