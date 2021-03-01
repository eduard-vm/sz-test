<template lang="pug">
    tr(:style="rowStyle" :class="rowClass").sz-table__row
        sz-table-checkbox-cell(
            v-if="checkbox"
            @change="$emit('select')"
            :selected="selected"
        )
        td(v-for="(field, colIndex) of fields" :key="colIndex" :align="getCellAlign(field)")
            .sz-table__cell(
                :class="field.cellClass || {}"
                v-html="renderTemplate(field.cellTemplateRenderer, { value: data[field.key] })"
                v-if="field.cellTemplateRenderer"
            )
            .sz-table__cell(v-else :class="field.cellClass || {}")
                slot(
                    v-if="$scopedSlots[`cell-${field.key}`]"
                    :name="`cell-${field.key}`"
                    :propKey="field.key"
                    :cellIndex="colIndex"
                )
                template(v-else) {{ getValue(data, field) }}
</template>
<script>
import SzTableMixin from './SzTableMixin'
import SzTableCheckboxCell from './SzTableCheckboxCell.vue'

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
        rowClass() {
            return {
                'sz-table__row--selected': this.selected,
                'sz-table__row--disabled': this.disabled,
            }
        },

        rowStyle() {
            return {
                'transition-delay': `${this.rowIndex * 30}ms`,
            }
        },
    },

    methods: {
        renderTemplate(renderFn, renderData) {
            return renderFn.call(this, renderData)
        },

        getValue(row, field) {
            const value = row[field.key]

            if (field.cellFormatter) {
                return field.cellFormatter.call(this, { value, row })
            }
            return value
        },
    },
}
</script>
