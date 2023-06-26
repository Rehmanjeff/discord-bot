<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="close">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                            <div v-if="data && dataType == 'emojis'" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div v-for="item in data" :key="item.code" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                                    <div class="flex-shrink-0">
                                        {{ item.icon }}
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <p class="text-sm font-medium text-gray-900">{{ item.code }}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="dataType == 'json'" class="flex flex-col">
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Discord message code</label>
                                <div class="mt-2">
                                    <input v-model="jsonData" type="text" class="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 pl-2 sm:text-sm sm:leading-6" placeholder="Paste here..." />
                                </div>
                                <button @click="triggerJsonSubmit" type="button" class="ml-auto my-4 rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Submit
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import Emoji from "../types/Emoji"

export default defineComponent({

    name: "Modal",
    components: { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot },
    props: {
        open: {
            required: true,
            type: Boolean
        },
        data: {
            required: false,
            type: (null as unknown) as PropType<Emoji[]>
        },
        dataType: {
            required: false,
            type: String
        }
    },
    emits: ['closed', 'response'],
    setup(props, { emit }){

        const data = ref<Emoji[] | undefined>(props.data)
        const jsonData = ref<string>('')
        const close = () => {

            emit('closed')
        }

        const triggerJsonSubmit = () => {

            emit('response', jsonData.value)
            emit('closed')
            jsonData.value = ''
        }

        return {

            close,
            data,
            jsonData,
            triggerJsonSubmit
        }
    }
})

</script>