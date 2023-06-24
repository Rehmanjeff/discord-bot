<template>
  
    <div class="flex flex-col border border-gray-400 rounded-md p-2 w-full gap-1">
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
                    <input type="text" v-model="image.url" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="Source url of image (only supports http(s) and attachments)" />
                </div>
            </div>
        </div>
        <div class="flex flex-row gap-2">
            <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                <span class="ml-4 text-sm">proxy url</span>
                <span v-if="proxyUrlError" class="ml-auto text-sm text-error mr-2">{{ proxyUrlError }}</span>
            </div>
            <div class="flex flex-row flex-auto">
                <div class="relative rounded-md shadow-sm w-full">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                    </div>
                    <input type="text" v-model="image.proxy_url" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="A proxied url of image" />
                </div>
            </div>
        </div>
        <div class="flex flex-row gap-2">
            <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                <span class="ml-4 text-sm">height</span>
            </div>
            <div class="flex flex-row flex-auto">
                <div class="relative rounded-md shadow-sm w-full">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                    </div>
                    <input type="text" v-model="image.height" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="Height of the image" />
                </div>
            </div>
        </div>
        <div class="flex flex-row gap-2">
            <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                <span class="ml-4 text-sm">width</span>
            </div>
            <div class="flex flex-row flex-auto">
                <div class="relative rounded-md shadow-sm w-full">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                    </div>
                    <input type="text" v-model="image.width" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="Width of the image" />
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

    name: "EmbedImage",
    props: ['type', 'url', 'proxy_url', 'height', 'width'],
    emits: ['change'],
    setup(props, { emit }){

        const urlError = ref<string | null>(null)
        const proxyUrlError = ref<string | null>(null)
        const image = ref({
            url: props.url,
            proxy_url: props.proxy_url,
            height: props.height,
            width: props.width,
        })

        const resetErrors = () => {

            urlError.value = proxyUrlError.value = ''
        }

        watch(image, () => {

            resetErrors()
            if(image.value.url && !isValidURL(image.value.url)){

                urlError.value = 'invalid url'
                console.log(props.type + ': invalid url')
            }
            if(image.value.proxy_url && !isValidURL(image.value.proxy_url)){

                proxyUrlError.value = 'invalid url'
                console.log(props.type + 'invalid proxy url')
            }

            emit('change', props.type, image.value)
        }, { deep: true })

        return {

            image,
            resetErrors,
            proxyUrlError,
            urlError
        }
    }
})

</script>../common.js../utilities/common.js.js