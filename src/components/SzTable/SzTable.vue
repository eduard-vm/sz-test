<template lang="pug">
    table(border="0" rules="none" cellspacing="0" cellpadding="0").sz-table
        thead
            tr
                th(v-for="(field, key) of fields"
                    :width="field.width"
                    :key="key" :align="getAlign(field)")
                    .sz-table__cell.sz-table__cell--header
                        .label {{ field.label }}
            tr
                th(:colspan="colsTotal")
        tbody
            tr(v-for="(row, rowIndex) of rows" :key="rowIndex").sz-table__row
                td(v-for="(field, colIndex) of fields" :key="colIndex" :align="getAlign(field)")
                    .sz-table__cell(
                        :class="field.cellClass || {}"
                        v-html="renderTemplate(field.cellTemplateRenderer, { value: row[field.key] })"
                        v-if="field.cellTemplateRenderer"
                    )
                    .sz-table__cell(v-else :class="field.cellClass || {}")
                        | {{ getValue(row, field) }}
</template>

<script>
export default {
    name: 'SzTable',

    props: {
        fields: Array,
        rows: Array,
    },

    computed: {
        colsTotal() {
            return this.fields.length
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

        getAlign(field) {
            return field.align || 'left'
        },
    },
}
</script>