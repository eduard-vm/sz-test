<template lang="pug">
    .sz-alert(:class="alert_class")
        slot
</template>

<script>
export default {
    name: 'SzAlert',

    props: {
        type: String,
    },

    computed: {
        alert_class() {
            const alert_type =
                {
                    warning: 'warning',
                    success: 'success',
                    danger: 'danger',
                }[this.type] || 'danger'

            return `sz-alert--${alert_type}`
        },
    },
}
</script>
