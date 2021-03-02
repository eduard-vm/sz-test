<template lang="pug">
    button(type="button" @click="$emit('click')" :disabled="$attrs.disabled || loading" :class="button_class" :style="button_style").sz-button
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
        color: {
            type: String,
            default: 'green',
        },
        size: {
            type: String,
            default: 'green',
        },
        width: {
            type: String,
            default: '100%',
        },
    },

    data() {
        return {
            showPass: false,
        }
    },

    computed: {
        button_style() {
            return {
                width: this.width,
            }
        },
        button_class() {
            return {
                [`sz-button--size-${this.size}`]: true,
                [`sz-button--color-${this.color}`]: true,
            }
        },
    },

    watch: {
        showPass(show) {
            this.$refs.input.type = show ? 'text' : 'password'
        },
    },
}
</script>
