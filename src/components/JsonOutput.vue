<template>

  <pre><code class="language-javascript code-block">{{ code }}</code></pre>

</template>

<script lang="ts">
  import { defineComponent, PropType, watch, ref, computed } from 'vue'
  import Embed from "../types/Embed"
  import Button from "../types/components/Button"

  export default defineComponent({
    name: "JsonOutput",
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
    setup(props){

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

      watch(() => props.messageContent, () => {

        if(props.messageContent){

          jsonObject.value.content = props.messageContent
        }
      })

      return {

        code
      }
    }
  })
</script>