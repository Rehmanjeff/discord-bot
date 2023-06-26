<template>

  <div class="flex flex-row ml-auto ">
    <button @click="openModal = true" type="button" class="my-4 mr-2 rounded bg-purple-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Load my code
    </button>
    <button @click="triggerCopyCode" type="button" class="my-4 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      {{ copyText }}
    </button>
  </div>
  <pre id="code-block" class="mt-4"><code class="language-javascript code-block">{{ code }}</code></pre>

  <Modal :open="openModal" @closed="openModal=false" @response="loadCode" :data="undefined" dataType="json"  />
</template>

<script lang="ts">
  import { defineComponent, PropType, watch, ref, computed } from 'vue'
  import Embed from "../types/Embed"
  import Button from "../types/components/Button"
  import Modal from "../widgets/Modal.vue"

  export default defineComponent({
    name: "JsonOutput",
    components: { Modal },
    emits: ['codeLoaded'],
    props: {
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
    setup(props, { emit }){

      const openModal = ref(false)
      const copyText = ref('Copy code')
      const jsonObject = ref<{[key: string]: string | boolean | object | Button[] | undefined }>({
        channel_id: '${context.params.event.channel_id}',
        tts: false
      })
      const code = computed(() => {

        if(props.messageContent){
          jsonObject.value.content = props.messageContent
        }

        if(props.embed){
          jsonObject.value.embeds = [exportEmbed.value]
        }

        if(props.buttons && props.buttons.length){

          jsonObject.value.components = [
            {
              type: 1,
              components: props.buttons
            }
          ]
        }

        const jsonValue = JSON.stringify(jsonObject.value, null, 2)
        const output = `const lib = require("lib")({token: process.env.STDLIB_SECRET_TOKEN})\nawait lib.discord.channels['@0.3.2'].messages.create(${jsonValue})`
        return output
      })

      const exportEmbed = computed(() => {

        let filteredEmbed: Embed = {}

        for (const key in props.embed) {

          if (props.embed.hasOwnProperty(key)) {

            filteredEmbed.type = 'rich'
            
            filteredEmbed.color = props.embed.color

            if(key == 'title' && props.embed['title'] !== ''){

              filteredEmbed.title = props.embed.title
            }
            if(key == 'description' && props.embed['description'] !== ''){

              filteredEmbed.description = props.embed.description
            }
            if(key == 'url' && props.embed['url'] !== null){

              filteredEmbed.url = props.embed.url
            }
            if(key == 'image' && (props.embed['image']?.url !== null || props.embed['image']?.proxy_url !== null)){

              filteredEmbed.image = props.embed.image
            }
            if(key == 'fields' && props.embed['fields'] && props.embed['fields'].length){

              const filteredEmbedFields = props.embed?.fields?.filter((field) => field.name != '' || field.value != '')
              if(filteredEmbedFields.length){

                filteredEmbed.fields = filteredEmbedFields
              }
            }
            if(key == 'thumbnail' && (props.embed['thumbnail']?.url !== null || props.embed['thumbnail']?.proxy_url !== null)){

              filteredEmbed.thumbnail = props.embed.thumbnail
            }
            if(key == 'author' && props.embed['author']?.name != ''){

              filteredEmbed.author = props.embed.author
            }
            if(key == 'footer' && props.embed['footer']?.text != ''){

              filteredEmbed.footer = props.embed.footer
            }
          }
        }

        return filteredEmbed
      })

      const triggerCopyCode = () => {

        navigator.clipboard.writeText(code.value).then(() => {
          
          copyText.value = 'Copied!'
        }).catch(() => {
          
          copyText.value = 'Error'
        })

        setTimeout(() => {
            
          copyText.value = 'Copy code'
        }, 3000)
      }

      const loadCode = (data: any) => {

        // const startSubstring = ".messages.create("
        // const endSubstring = ")"
        // const startIndex = data.indexOf(startSubstring) + startSubstring.length
        // const endIndex = data.indexOf(endSubstring, startIndex)

        //let inputJson = data.substr(startIndex, endIndex - startIndex).replace(/`|'/g, '"').replace(/"color": (\w+)/g, '"color": "$1"').replace(/;/g, '')
        //console.log(inputJson)

        let inputJson = data.replace(/`/g, '"').replace(/"color": (\w+)/g, '"color": "$1"').replace(/;/g, '')

        try {
          
          inputJson = JSON.parse(inputJson)
          if (inputJson.hasOwnProperty('content')) {

            jsonObject.value.content = inputJson.content
          }
          if (inputJson.hasOwnProperty('embeds')) {

            jsonObject.value.embeds = inputJson.embeds
          }
          if (inputJson.hasOwnProperty('components')) {

            jsonObject.value.components = inputJson.components
          }
          
          emit('codeLoaded', inputJson.content, inputJson.embeds, inputJson.components)
        } catch (error) {

          console.log('Invalid JSON:' + error)
        }
      }

      watch(() => props.messageContent, () => {

        if(props.messageContent){

          jsonObject.value.content = props.messageContent
        }
      })

      return {

        code,
        triggerCopyCode,
        copyText,
        openModal,
        loadCode
      }
    }
  })
</script>