<template lang="pug">
    table(border="0" rules="none" cellspacing="0" cellpadding="0")
        thead
            th(v-for="(field, key) of fields" :key="key")
                span {{ field.label }}
        tbody
            tr(v-for="(row, rowIndex) of rows" :key="rowIndex")
                td(v-for="(field, colIndex) of fields" :key="colIndex")
                    | {{ row[field.key] }}
</template>

<script>
export default {
    name: 'SzTable',

    props: {
        fields: Array,
        rows: Array,
    },
}
</script>
