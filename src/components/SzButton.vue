<template lang="pug">
    button(type="button" @click="$emit('click')" :disabled="$attrs.disabled || loading" :class="buttonClass" :style="buttonStyle").sz-button
        template(v-if="$slots.default")
            slot
        template(v-else)
            | {{ title }}
</template>

<script>
export default {
    name: 'SzButton',

    inheritAttrs: false,

    props: {
        loading: Boolean,
    },

    data() {
        return {
            showPass: false,
        }
    },

    computed: {
        buttonStyle() {
            return {}
        },
        buttonClass() {
            return {}
        },
    },

    watch: {
        showPass(show) {
            this.$refs.input.type = show ? 'text' : 'password'
        },
    },
}
</script>
