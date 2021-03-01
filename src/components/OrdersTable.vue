<template lang="pug">
  .orders-table
        sz-table(
            :fields="fields"
            :rows="orders"
        )
        .orders-table__pagination
            | pagination
</template>

<script>
import SzTable from './SzTable/SzTable.vue'

export default {
    name: 'OrdersTable',

    components: { SzTable },

    data() {
        return {
            fields: [
                { key: 'order_id', label: 'id' },
                { key: 'items', label: 'Товары' },
                { key: 'create_date', label: 'Дата заказа' },
                { key: 'status', label: 'Статус' },
                { key: 'is_paid', label: 'Оплачено' },
                { key: 'is_shipped', label: 'Отправлено' },
                { key: 'buyer', label: 'Покупатель' },
                { key: 'total_price', label: 'Стоимость' },
            ],

            orders: [
                {
                    id: '7f6b9ac4-fd25-494b-a333-d8f029a112ad',
                    created: '2021-02-11T13:16:27.900838+03:00',
                    marketplace_user_account: {
                        id: '62536ece-f491-423b-a9db-d9dc81c5ac33',
                        user: 14,
                        marketplace: 1,
                        marketplace_name: 'eBay',
                        username: 'jetsetter-su',
                    },
                    channel: {
                        id: '281494ae-07f5-45be-8477-4a1ab586908a',
                        name: 'Канал продаж "US site" аккаунта "jetsetter-su".',
                        marketplace_user_account:
                            '62536ece-f491-423b-a9db-d9dc81c5ac33',
                        domain: 8,
                    },
                    order_id: '27-06529-36494',
                    create_date: '2021-02-05T20:03:44+03:00',
                    update_date: '2021-02-11T11:04:19+03:00',
                    items: [
                        {
                            id: '8ab19a3c-eed8-45ec-b510-e3bfe2304cd8',
                            sku: 'JC4039PP1ALF_0500_NOSIZE',
                            title:
                                "LOVE MOSCHINO women's BACKPACK JC4039PP1ALF",
                            quantity: 1,
                            price: 150.35,
                            currency: 'USD',
                            total_price: 150.35,
                            main_image: null,
                        },
                    ],
                    buyer: 'Krista Bruno',
                    total_price: 150.35,
                    currency_code: 'USD',
                    is_open: false,
                    is_paid: true,
                    is_shipped: true,
                    is_partially_shipped: false,
                    is_completed: true,
                    is_canceled: false,
                    is_refunded: false,
                    is_visible: true,
                    is_viewed: false,
                    is_disabled: true,
                },
            ],
        }
    },
}
</script>
