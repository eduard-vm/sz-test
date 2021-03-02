<template lang="pug">
    component(:is="tag" width="90")
        .sz-table__cell.sz-table__cell--checkbox
            input(
                type="checkbox"
                class="checkbox"
                @change="$emit('change')"
                :checked="selected"
            )
</template>

<script>
export default {
    props: {
        selected: Boolean,
        tag: {
            type: String,
            default: 'td',
        },
    },
}
</script>
