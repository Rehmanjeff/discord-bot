<template>
    <SwitchGroup as="div" class="flex items-center">
        <Switch v-model="state" :class="[state ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
            <span aria-hidden="true" :class="[state ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
        </Switch>
        <SwitchLabel as="span" class="ml-3 text-sm">
            <span class="font-medium text-gray-900">Show code</span>
        </SwitchLabel>
    </SwitchGroup>
  </template>
  
  <script lang="ts">
  import { ref, defineComponent, watch } from 'vue'
  import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
  
  export default defineComponent({
    name: "ToggleSwitch",
    components: { Switch, SwitchGroup, SwitchLabel },
    emits:['change'],
    setup(_, { emit }){
  
        const state = ref<boolean>(false)

        watch(state, (newVal) => {

            emit('change', newVal)
        })
  
        return {
    
            state
        }
    }
  })
  </script>