<template lang="pug">
    #orders.page
        .page__body
            orders-table
   

</template>

<script>
import OrdersTable from '@/components/OrdersTable'

export default {
    name: 'Home',

    components: {
        OrdersTable,
    },
}
</script>
