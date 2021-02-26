<template lang="pug">
    .sz-alert(:class="alertClass")
        slot
</template>

<script>
export default {
    name: 'SzAlert',

    props: {
        type: String,
    },

    computed: {
        alertClass() {
            const alertType =
                {
                    warning: 'warning',
                    success: 'success',
                    danger: 'danger',
                }[this.type] || 'danger'

            return `sz-alert--${alertType}`
        },
    },
}
</script>
