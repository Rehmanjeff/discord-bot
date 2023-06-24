<template>
  
    <div class="flex flex-row">
        <div class="flex flex-col border border-gray-400 rounded-md p-2 w-full gap-1 mb-2">
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
                        <input type="text" v-model="field.name" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="The name of your embed field" />
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                    <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                    <span class="ml-4 text-sm">value</span>
                </div>
                <div class="flex flex-row flex-auto">
                    <div class="relative rounded-md shadow-sm w-full">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                        </div>
                        <input type="text" v-model="field.value" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="The name of your embed field" />
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <div class="flex flex-row flex-initial w-40 bg-gray-100 items-center px-2 text-gray-400">
                    <font-awesome-icon icon="fa-solid fa-key" class="icon" size="xs" />
                    <span class="ml-4 text-sm">inline</span>
                </div>
                <div class="flex flex-row flex-auto">
                    <div class="relative rounded-md shadow-sm w-full">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                        </div>
                        <select v-model="field.inline" class="outline-none bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 px-10 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6">
                            <option value="">Whether to display the field inline</option>
                            <option value=true>True</option>
                            <option value=false>False</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="field.id > 0" @click="triggerRemove" class="px-4 py-2 ml-2 rounded-md bg-gray-300 cursor-pointer hover:bg-gray-400 h-fit">
            <font-awesome-icon icon="fa-solid fa-xmark" class="icon" size="sm" />
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, PropType, watch } from 'vue'
import Field from "../types/embed/Field"

export default defineComponent({

    name: "EmbedField",
    props: {
        field: {
            required: true,
            type: (null as unknown) as PropType<Field>
        }
    },
    emits: ['remove', 'change'],
    setup(props, { emit }){

        const triggerRemove = () => {

            emit('remove', props.field.id)
        }

        watch(props.field, (newVal) => {

            emit('change', newVal)
        }, { deep: true })

        return {

            triggerRemove
        }
    }
})

</script>