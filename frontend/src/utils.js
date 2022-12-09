
export const isoToLocaleDate = iso => {
    const date = new Date(iso)
    return date.toLocaleDateString()
}

export const formatNumberAsCurrency = value => {
    return `R$ ${value.toFixed(2)}`
}