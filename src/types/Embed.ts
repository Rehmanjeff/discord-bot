import Field from "../types/embed/Field"

interface Embed {
    [key: string]: any;
    type?: 'rich',
    title?: string,
    description?: string,
    url?: string | null,
    color?: string,
    fields?: Field[] | null,
    timestamp?: string,
    image?: {
        url?: string | null,
        proxy_url?: string | null,
        height?: string,
        width?: string
    },
    thumbnail?: {
        url?: string | null,
        proxy_url?: string | null,
        height?: string,
        width?: string
    },
    author?: {
        name: string,
        url?: string | null,
        icon_url?: string | null,
        proxy_icon_url?: string | null
    },
    footer?: {
        text: string,
        icon_url?: string | null,
        proxy_icon_url?: string | null
    }

}

export default Embed