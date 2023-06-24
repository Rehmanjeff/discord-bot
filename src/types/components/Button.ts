interface Button {

    id: number,
    style: '1' | '2' | '3' | '4' | '5',
    label?: string, 
    custom_id: string,
    url?: string | null,
    disabled: 'true' | 'false',
    emoji?: string,
    type: '2'
}

export default Button