<template lang="pug">
    .sz-card(:class="cardClass")
        .sz-card__title
            template(v-if="$slots.title")
                slot(name="title")
            template(v-else)
                | {{ title }}
        .sz-card__body
            slot
</template>

<script>
export default {
    name: 'SzCard',

    props: {
        title: String,
    },

    computed: {
        cardClass() {
            return {}
        },
    },
}
</script>
