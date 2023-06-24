<template>
    
    <div class="flex flex-col border border-gray-400 rounded-md p-2 w-full gap-1">
        <div class="flex flex-row gap-2">
            <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                <span class="ml-4 text-sm">text</span>
            </div>
            <div class="flex flex-row flex-auto">
                <div class="relative rounded-md shadow-sm w-full">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                    </div>
                    <input v-model="footer.text" type="text" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="Footer text" />
                </div>
            </div>
        </div>
        <div class="flex flex-row gap-2">
            <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                <span class="ml-4 text-sm">icon_url</span>
                <span v-if="iconUrlError" class="ml-auto text-sm text-error mr-2">{{ iconUrlError }}</span>
            </div>
            <div class="flex flex-row flex-auto">
                <div class="relative rounded-md shadow-sm w-full">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                    </div>
                    <input v-model="footer.icon_url" type="text" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="source url of image (only supports http(s) or attachments)" />
                </div>
            </div>
        </div>
        <div class="flex flex-row gap-2">
            <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                <span class="ml-4 text-sm">proxy_icon_url</span>
                <span v-if="proxyIconUrlError" class="ml-auto text-sm text-error mr-2">{{ proxyIconUrlError }}</span>
            </div>
            <div class="flex flex-row flex-auto">
                <div class="relative rounded-md shadow-sm w-full">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                    </div>
                    <input v-model="footer.proxy_icon_url" type="text" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="a proxied url of footer icon" />
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue'
// @ts-ignore 
import { isValidURL } from '../utilities/common.js'

export default defineComponent({

    name: "EmbedFooter",
    props: ['text', 'icon_url', 'proxy_icon_url'],
    emits: ['change'],
    setup(props, { emit }){

        const iconUrlError = ref<string | null>(null)
        const proxyIconUrlError = ref<string | null>(null)

        const footer = ref({
            text: props.text,
            icon_url: props.icon_url,
            proxy_icon_url: props.proxy_icon_url
        })

        const resetErrors = () => {

            iconUrlError.value = proxyIconUrlError.value = ''
        }

        watch(footer, () => {

            resetErrors()

            if(footer.value.icon_url && !isValidURL(footer.value.icon_url)){

                iconUrlError.value = 'invalid url'
                console.log('invalid icon url')
            }
            if(footer.value.proxy_icon_url && !isValidURL(footer.value.proxy_icon_url)){

                proxyIconUrlError.value = 'invalid url'
                console.log('invalid proxy icon url')
            }
            
            emit('change', footer.value)
        }, { deep: true })

        return {

            footer,
            iconUrlError,
            proxyIconUrlError,
            resetErrors
        }
    }
})

</script>