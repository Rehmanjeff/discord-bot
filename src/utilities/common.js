export function isValidURL(value) {
    try {
        new URL(value);
        return true;
    } catch (error) {
        return false;
    }
}

export function convertColorToHex(color) {

    const hexaDecimalRegex = /^0x[0-9A-Fa-f]{6}$/
    const decimalColorRegex = /^\d+$/

    if(hexaDecimalRegex.test(color)){

        const decimalValue = parseInt(color, 16);
        const hex = decimalValue.toString(16).padStart(6, '0');
        return `#${hex}`
    }else if(decimalColorRegex.test(color)){

        const hex = decimalColor.toString(16).padStart(6, '0')
        return `#${hex}`
    }else{

        return color
    }
}