<template lang="pug">
    .sz-input(:style="inputStyle")
        input(v-bind="$attrs" v-model="model" ref="input")
        .sz-input__password-show-icon(v-if="isPasswordInput")
            .icon.icon--ey(@mousedown="showPass = true" @mouseup="showPass = false")
</template>

<script>
export default {
    name: 'SzInput',

    inheritAttrs: false,

    props: {
        value: String,
        width: {
            type: String,
            default: 'auto',
        },
    },

    data() {
        return {
            showPass: false,
        }
    },

    watch: {
        showPass(show) {
            this.$refs.input.type = show ? 'text' : 'password'
        },
    },

    computed: {
        model: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            },
        },

        isPasswordInput() {
            return this.$attrs.type === 'password'
        },

        inputStyle() {
            return {
                width: this.width,
            }
        },
    },
}
</script>
