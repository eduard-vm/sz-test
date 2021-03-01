<template lang="pug">
    tr(:style="rowStyle").sz-table__row
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
                | {{ getValue(data, field) }}
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
        disabled: {
            type: Boolean,
            default: true,
        },
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
