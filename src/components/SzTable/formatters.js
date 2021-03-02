const normalizeDateFragment = value => (value <= 9 ? `0${value}` : value)
/**
 * Форматирования даты
 */
export function datecell_formatter({ value }) {
    if (typeof value === 'string') {
        const date = new Date(value)
        return [
            normalizeDateFragment(date.getDate()),
            normalizeDateFragment(date.getMonth()),
            date.getFullYear(),
        ].join('.')
    }
    return value
}

/**
 * Форматирование денег
 */
export function moneycell_formatter({ value }) {
    return new Intl.NumberFormat('us-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value)
}
