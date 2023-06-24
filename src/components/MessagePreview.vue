<template>

  <div class="flex flex-row items-start gap-3 w-full">

    <div>
      <img class="inline-block w-10 rounded-full" :src="avatar" alt="">
    </div>
    <div class="flex flex-col w-full">
      
      <div class="flex flex-col">
        <div class="flex flex-row items-center">
          <h3 class="text-base font-semibold leading-6 text-white">{{ title }}</h3>
          <div class="ml-auto text-xs text-gray-400">Today at {{ currentTime }}</div>
        </div>
        <VueMarkdownIt class="mt-2 text-sm text-discord-gray-text" :source="messageContent" /> 
      </div>
      <div v-if="embed && (embed.title != '' || embed.description != '' || (embed.image && (embed.image.url || embed.image.proxy_url)) || (embed.thumbnail && (embed.thumbnail.url || embed.thumbnail.proxy_url)) || (embed.author && embed.author.name != '') || (embed.footer && embed.footer.text != '') || filteredEmbedFields?.length)" class="flex flex-row bg-discord-gray rounded-md mt-2">
        <div :style="embed.color ? { 'background-color': `${embed.color}` } : ''" class="w-1 h-auto rounded-tl rounded-bl"></div>

        <div class="flex flex-col py-4 px-4">

          <!-- Embed author -->
          <div v-if="embed.author" class="flex flex-row items-center my-1 gap-2">
            <img v-if="embed.author.icon_url" class="inline-block w-8 rounded-full" :src="embed.author.icon_url" alt="">
            <img v-else-if="embed.author.proxy_icon_url" class="inline-block w-8 rounded-full" :src="embed.author.proxy_icon_url" alt="">
            <div class="text-white text-sm">
              <a class="hover:underline" :href="embed.author.url ? embed.author.url : '#'">{{ embed.author.name }}</a>
            </div>
          </div>

          <!-- Embed title and description -->
          <div v-if="embed" class="text-white mb-3">
            <a class="hover:underline" :href="embed.url ? embed.url : '#'">
              <VueMarkdownIt :source="embed.title" />
            </a>
          </div>
          <div v-if="embed" class="text-sm text-discord-gray-text">
            <pre class="text-sm text-discord-gray-text" style="font-family: ui-sans-serif, system-ui, -apple-system; white-space: pre-line">
              <VueMarkdownIt :source="embed.description" />
            </pre>
          </div>

          <!-- Embed fields -->
          <div class="mt-3" v-if="filteredEmbedFields?.length"> 
            <div :class="field.inline == 'true' ? 'inline-block mr-1' : 'mt-3'" v-for="(field, index) in filteredEmbedFields" :key="index">
              <div class="text-sm font-bold text-white">{{ field.name }}</div>
              <div class="text-sm text-white">{{ field.value }}</div>
            </div>
          </div>

          <!-- Embed image -->
          <div v-if="embed.image" class="mt-3">
            <img v-if="embed.image.url" :src="embed.image.url" alt="">
            <img v-else-if="embed.image.proxy_url" :src="embed.image.proxy_url" alt="">
          </div>

          <!-- Embed footer -->
          <div v-if="embed.footer" class="flex flex-row items-center mt-2 gap-2">
            <img v-if="embed.footer.icon_url" class="inline-block w-4 rounded-full" :src="embed.footer.icon_url" alt="Footer text">
            <img v-else-if="embed.footer.proxy_icon_url" class="inline-block w-4 rounded-full" :src="embed.footer.proxy_icon_url" alt="Footer text">
            <div class="text-white text-xxs">
              {{ embed.footer.text }}
            </div>
          </div>
        </div>

        <!-- Embed thumbnail -->
        <div v-if="embed.thumbnail" class="w-20 py-4 pr-4 ml-auto">
          <img v-if="embed.thumbnail.url" :src="embed.thumbnail.url" alt="">
          <img v-else-if="embed.thumbnail.proxy_url" :src="embed.thumbnail.proxy_url" alt="">
        </div>
      </div>

      <!-- Component buttons -->
      <div v-if="filteredButtons?.length" class="flex flex-wrap mt-3">
        <button @click="handleButtonClick(button.url ? button.url : '')" v-for="(button, index) in filteredButtons" :key="index" :disabled="button.disabled == 'true'" :style="`background-color: ${colors[button.style]}`" class="text-white rounded mr-2 mb-2 py-1 px-2 text-sm" :class="{ 'opacity-70': button.disabled == 'true' }">
          <span v-if="button.emoji">{{ emojione.shortnameToUnicode(button.emoji) }}</span>
          {{ button.label }}
        </button>
      </div>
    </div>
  </div>
  
  <div v-if="embed === null && messageContent == '' && (filteredButtons === null || filteredButtons.length == 0)" class="py-8">
    <EmptyState />
  </div>

</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref, computed } from 'vue'
import Embed from "../types/Embed"
import Button from "../types/components/Button"
import Field from "../types/embed/Field"
import EmptyState from "../widgets/EmptyState.vue"
import * as emojione from 'emojione'
import VueMarkdownIt from 'vue3-markdown-it'

export default defineComponent({
  name: "MessagePreview",
  components: { EmptyState, VueMarkdownIt },
  props: {
    avatar: {
      required: true,
      type: String
    },
    title:{
      required: true,
      type: String
    },
    messageContent:{
      required: false,
      type: String
    },
    embed: {
      required: false,
      type: (null as unknown) as PropType<Embed | null>
    },
    buttons: {
      required: false,
      type: Array as PropType<Button[]>
    },
  },
  setup(props){

    const currentTime = computed(() => {

      const currentTime = new Date()
      let hours = currentTime.getHours()
      const minutes = currentTime.getMinutes().toString().padStart(2, '0')
      const amOrPm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12 || 12
      
      return `${hours.toString().padStart(2, '0')}:${minutes} ${amOrPm}`
    })
    const filteredEmbedFields = ref<Field[] | null>(null)
    const filteredButtons = ref<Button[] | null>(null)
    const colors = {

      '1': '#5865f2',
      '5': '#40444b',
      '3': '#40a45f',
      '4': '#ed4245',
      '2': '#40444b',
    } 

    const handleButtonClick = (url: string) => {

      if(url != '' && isValidURL(url)){

        window.open(url, '_blank')
      }
    }

    const isValidURL = (value: string) => {
        try {
            new URL(value)
            return true
        } catch (error) {
            return false
        }
    }

    watch(() => props.embed, () => {

      if(props.embed?.fields){

        filteredEmbedFields.value = props.embed?.fields?.filter((field) => field.name != '' || field.value != '')
      }
    }, { deep: true })

    watch(() => props.buttons, () => {

      if(props.buttons){

        filteredButtons.value = props.buttons?.filter((field) => field.label != '')
      }
    }, { deep: true })

    return {

      filteredEmbedFields,
      filteredButtons,
      colors,
      emojione,
      handleButtonClick,
      currentTime
    }
  }
})
</script>