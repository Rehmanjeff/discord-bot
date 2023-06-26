<template>
  
    <div class="flex flex-row">
        <div class="flex flex-col border border-gray-400 rounded-md p-2 w-full gap-1 mb-2">
            <div class="flex flex-row gap-2">
                <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                    <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                    <span class="ml-4 text-sm">style</span>
                </div>
                <div class="flex flex-row flex-auto">
                    <div class="relative rounded-md shadow-sm w-full">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                        </div>
                        <select v-model="button.style" class="outline-none bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 px-10 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6">
                            <option value="1">Primary</option>
                            <option value="5">Secondary</option>
                            <option value="3">Success</option>
                            <option value="4">Danger</option>
                            <option value="2">Link</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                    <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                    <span class="ml-4 text-sm">label</span>
                </div>
                <div class="flex flex-row flex-auto">
                    <div class="relative rounded-md shadow-sm w-full">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                        </div>
                        <input type="text" v-model="button.label" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="The button label" />
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                    <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                    <span class="ml-4 text-sm">custom_id</span>
                </div>
                <div class="flex flex-row flex-auto">
                    <div class="relative rounded-md shadow-sm w-full">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                        </div>
                        <input type="text" v-model="button.custom_id" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="Custom id of the button" />
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
                        <input type="text" v-model="button.url" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="A url of the link style buttons" />
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                    <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                    <span class="ml-4 text-sm">disabled</span>
                </div>
                <div class="flex flex-row flex-auto">
                    <div class="relative rounded-md shadow-sm w-full">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                        </div>
                        <select v-model="button.disabled" class="outline-none bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 px-10 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6">
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                    <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                    <span class="ml-4 text-sm">emoji</span>
                    <button @click="openModal = true" type="button" class="ml-auto mr-2 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Example codes
                    </button>
                </div>
                <div class="flex flex-row flex-auto">
                    <div class="relative rounded-md shadow-sm w-full">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                        </div>
                        <input type="text" v-model="button.emoji" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="An emoji code like :smile: - :thumbsup:" />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="button.id > 0" @click="triggerRemove" class="px-4 py-2 ml-2 rounded-md bg-gray-300 cursor-pointer hover:bg-gray-400 h-fit">
            <font-awesome-icon icon="fa-solid fa-xmark" class="icon" size="sm" />
        </div>
        <Modal :open="openModal" @closed="openModal=false" :data="emojis" dataType="emojis"  />
    </div>

</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from 'vue'
import Button from "../types/components/Button"
import Modal from "../widgets/Modal.vue"
import * as emojione from 'emojione'
import Emoji from "../types/Emoji"

// @ts-ignore 
import { isValidURL } from '../utilities/common.js'

export default defineComponent({

    code: "ButtonComponent",
    components: { Modal },
    props: {
        button: {
            required: true,
            type: (null as unknown) as PropType<Button>
        }
    },
    emits: ['remove', 'change'],
    setup(props, { emit }){

        const openModal = ref(false)
        const urlError = ref<string | null>(null)
        const emojis = ref<Emoji[]>([
            { code: ':thumbsup:', icon: emojione.shortnameToUnicode(':thumbsup:')},
            { code: ':heart:', icon: emojione.shortnameToUnicode(':heart:')},
            { code: ':laughing:', icon: emojione.shortnameToUnicode(':laughing:')},
            { code: ':wink:', icon: emojione.shortnameToUnicode(':wink:')},
            { code: ':sunglasses:', icon: emojione.shortnameToUnicode(':sunglasses:')},
            { code: ':fire:', icon: emojione.shortnameToUnicode(':fire:')},
            { code: ':rocket:', icon: emojione.shortnameToUnicode(':rocket:')},
            { code: ':pizza:', icon: emojione.shortnameToUnicode(':pizza:')},
            { code: ':rainbow:', icon: emojione.shortnameToUnicode(':rainbow:')},
            { code: ':dog:', icon: emojione.shortnameToUnicode(':dog:')},
            { code: ':cat:', icon: emojione.shortnameToUnicode(':cat:')},
            { code: ':thumbsdown:', icon: emojione.shortnameToUnicode(':thumbsdown:')},
            { code: ':broken_heart:', icon: emojione.shortnameToUnicode(':broken_heart:')},
            { code: ':sleeping:', icon: emojione.shortnameToUnicode(':sleeping:')},
            { code: ':thinking:', icon: emojione.shortnameToUnicode(':thinking:')},
            { code: ':clap:', icon: emojione.shortnameToUnicode(':clap:')},
            { code: ':rose:', icon: emojione.shortnameToUnicode(':rose:')},
            { code: ':star:', icon: emojione.shortnameToUnicode(':star:')}
        ])
        const triggerRemove = () => {

            emit('remove', props.button.id)
        }
        const resetErrors = () => {

            urlError.value = ''
        }

        watch(props.button, (newVal) => {

            resetErrors()
            if(props.button.url && !isValidURL(props.button.url)){

                urlError.value = 'invalid url'
                console.log('invalid icon url')
            }
            
            emit('change', newVal)
        }, { deep: true })

        return {

            triggerRemove,
            urlError,
            openModal,
            emojis
        }
    }
})

</script>