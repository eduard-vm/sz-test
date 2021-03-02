<template lang="pug">
    .sz-card(:class="card_class")
        .sz-card__title.text-center
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
        card_class() {
            return {}
        },
    },
}
</script>
