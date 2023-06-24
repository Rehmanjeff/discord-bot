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
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div v-for="person in people" :key="person.name" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                                    <div class="flex-shrink-0">
                                        {{ person.icon }}
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <p class="text-sm font-medium text-gray-900">{{ person.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import * as emojione from 'emojione'

export default defineComponent({

    name: "Modal",
    components: { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot },
    props: ['open'],
    emits: ['closed'],
    setup(_, { emit }){

        const people = [
            { name: ':thumbsup:', icon: emojione.shortnameToUnicode(':thumbsup:')},
            { name: ':heart:', icon: emojione.shortnameToUnicode(':heart:')},
            { name: ':laughing:', icon: emojione.shortnameToUnicode(':laughing:')},
            { name: ':wink:', icon: emojione.shortnameToUnicode(':wink:')},
            { name: ':sunglasses:', icon: emojione.shortnameToUnicode(':sunglasses:')},
            { name: ':fire:', icon: emojione.shortnameToUnicode(':fire:')},
            { name: ':rocket:', icon: emojione.shortnameToUnicode(':rocket:')},
            { name: ':pizza:', icon: emojione.shortnameToUnicode(':pizza:')},
            { name: ':rainbow:', icon: emojione.shortnameToUnicode(':rainbow:')},
            { name: ':dog:', icon: emojione.shortnameToUnicode(':dog:')},
            { name: ':cat:', icon: emojione.shortnameToUnicode(':cat:')},
            { name: ':thumbsdown:', icon: emojione.shortnameToUnicode(':thumbsdown:')},
            { name: ':broken_heart:', icon: emojione.shortnameToUnicode(':broken_heart:')},
            { name: ':sleeping:', icon: emojione.shortnameToUnicode(':sleeping:')},
            { name: ':thinking:', icon: emojione.shortnameToUnicode(':thinking:')},
            { name: ':clap:', icon: emojione.shortnameToUnicode(':clap:')},
            { name: ':rose:', icon: emojione.shortnameToUnicode(':rose:')},
            { name: ':star:', icon: emojione.shortnameToUnicode(':star:')}
        ]

        const close = () => {

            emit('closed')
        }

        return {

            close,
            people
        }
    }
})

</script>