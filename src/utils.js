export const currencyFormater = new Intl.NumberFormat(undefined, {
    currency: "usd",
    style: "currency",
    minimumFractionDigits: 0
})

export const getVariant = (amount, max) => {
    let variant = 'primary'
    if (max > 0) {
        if ((amount / max) >= 0.5) variant='warning';
        if ((amount / max) >= 0.75) variant='danger';
    }

    return variant
}