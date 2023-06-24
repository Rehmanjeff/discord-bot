<template>
  <MainLayout>
    <template v-slot:builder>
      <div class="flex flex-row items-center border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 class="text-base font-semibold leading-6 text-gray-900">Message Builder</h3>
        <div class="ml-auto">
          <ToggleSwitch @change="toggleSwitch" />
        </div>
      </div>
      <div v-if="showCode" class="code-block-container flex flex-col">
        
        <JsonOutput :messageContent="messageContent" :embed="embed" :buttons="buttons" />
      </div>
      <div v-else class="mt-16">

        <MessageBuilder @content="updateMessage" @embed="updateEmbed" @buttons="updateButtons" :messageContent="messageContent" :embed="embed" :buttons="buttons" />
      </div>
    </template>
    <template v-slot:preview>

      <MessagePreview :avatar="avatar" :title="title" :messageContent="messageContent" :embed="embed" :buttons="buttons" />
    </template>
  </MainLayout>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import MainLayout from "./layouts/MainLayout.vue"
import MessageBuilder from "./components/MessageBuilder.vue"
import MessagePreview from "./components/MessagePreview.vue"
import JsonOutput from "./components/JsonOutput.vue"
import Embed from "./types/Embed"
import Button from "./types/components/Button"
import ToggleSwitch from "./widgets/Switch.vue"

export default defineComponent({
  name: "App",
  components: { MainLayout, MessageBuilder, MessagePreview, JsonOutput, ToggleSwitch },
  setup(){

    const showCode = ref<boolean>(false)
    const embed = ref<Embed | null>(null)
    const avatar = 'https://polybit-apps.s3.amazonaws.com/stdlib/users/discord/profile/image.png?1';
    const title = ref<string>('Embed Builder');
    const messageContent = ref<string>('');
    const buttons = ref<Button[]>([])

    const updateMessage = (value: string) => {
      messageContent.value = value
    }

    const updateEmbed = (value: Embed) => {

      embed.value = value
    }

    const updateButtons = (value: Button[]) => {

      buttons.value = value
    }

    const toggleSwitch = (value: boolean) => {

      showCode.value = value
    }

    return {

      showCode,
      embed,
      avatar,
      title,
      messageContent,
      buttons,
      updateMessage,
      updateEmbed,
      toggleSwitch,
      updateButtons
    }
  }
})
</script>

<style scoped>
.code-block-container {
  max-width: 100%;
  overflow-x: auto;
}

.code-block {
  width: fit-content;
  max-width: 100%;
  white-space: pre-wrap;
}
button:disabled {

  opacity: 0.7
}
</style>