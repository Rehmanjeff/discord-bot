<template>
    
    <div class="flex flex-col border border-gray-400 rounded-md p-2 w-full gap-1">
        <div class="flex flex-row gap-2">
            <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                <span class="ml-4 text-sm">name</span>
            </div>
            <div class="flex flex-row flex-auto">
                <div class="relative rounded-md shadow-sm w-full">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                    </div>
                    <input type="text" v-model="author.name" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="Name of the author" />
                </div>
            </div>
        </div>
        <div class="flex flex-row gap-2">
            <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                <span class="ml-4 text-sm">url</span>
                <span v-if="urlError" class="ml-auto text-sm text-error mr-2">{{ urlError }}</span>
            </div>
            <div class="flex flex-row flex-auto">
                <div class="relative rounded-md shadow-sm w-full">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                    </div>
                    <input type="text" v-model="author.url" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="url of the author" />
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
                    <input type="text" v-model="author.icon_url" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="url of the author icon (only supports http(s) and attachments)" />
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
                    <input type="text" v-model="author.proxy_icon_url" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="proxy url of author icon" />
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

    name: "EmbedAuthor",
    props: ['name', 'url', 'icon_url', 'proxy_icon_url'],
    emits: ['change'],
    setup(props, { emit }){

        const urlError = ref<string | null>(null)
        const iconUrlError = ref<string | null>(null)
        const proxyIconUrlError = ref<string | null>(null)
        const author = ref({
            name: props.name,
            url: props.url,
            icon_url: props.icon_url,
            proxy_icon_url: props.proxy_icon_url
        })

        watch(author, () => {

            resetErrors()
            if(author.value.url && !isValidURL(author.value.url)){

                urlError.value = 'invalid url'
                console.log('invalid url')
            }
            if(author.value.icon_url && !isValidURL(author.value.icon_url)){

                iconUrlError.value = 'invalid url'
                console.log('invalid icon url')
            }
            if(author.value.proxy_icon_url && !isValidURL(author.value.proxy_icon_url)){

                proxyIconUrlError.value = 'invalid url'
                console.log('invalid proxy icon url')
            }

            emit('change', author.value)
        }, { deep: true })

        const resetErrors = () => {

            urlError.value = iconUrlError.value = proxyIconUrlError.value = ''
        }

        return {

            author,
            proxyIconUrlError,
            iconUrlError,
            urlError
        }
    }
})

</script>