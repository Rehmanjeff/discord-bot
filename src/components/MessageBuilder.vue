<template>

    <!-- 1- Message content section -->
    <div>
      <label for="text" class="block text-sm font-medium leading-6 text-gray-600">Message contents</label>
      <div class="mt-2">
        <input v-model="contentValue" type="text" class="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 px-4 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="The main contents of your message" />
      </div>
    </div>

    <!-- 2- Embed Section -->
    <div>
      <label @click="toggleSection($event)" for="text" class="block text-sm font-medium leading-6 text-gray-600 cursor-pointer mt-3 px-2 py-2 hover:bg-gray-300 rounded-md">
        <span>Embed</span>
        <span class="ml-2">
          <font-awesome-icon icon="fa-solid fa-angle-up" class="icon" />
        </span>
      </label>
      <div class="mt-2 label-body flex flex-column gap-2">
        <div class="bg-gray-100 px-2 py-4">
            <font-awesome-icon icon="fa-solid fa-list" class="icon text-gray-400" />
        </div>
        <div class="w-full">

          <!-- 2.1 - Embed Title -->
          <div class="relative rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <font-awesome-icon icon="fa-solid fa-font" class="icon text-gray-400" size="xs" />
            </div>
            <input type="text" v-model="embed.title" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="Embed title" />
          </div>

          <!-- 2.2 - Embed Description -->
          <div class="relative rounded-md shadow-sm mt-1">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <font-awesome-icon icon="fa-solid fa-align-left" class="icon text-gray-400" size="xs" />
            </div>
            <textarea v-model="embed.description" @input="adjustHeight" :style="textareaHeight ? { 'height': `${textareaHeight}px` } : ''" rows="1" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="Embed description"></textarea>
          </div>

          <!-- 2.3 - Embed URL -->
          <div class="relative rounded-md shadow-sm mt-1">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <font-awesome-icon v-if="embedUrlError" icon="fa-solid fa-xmark" class="icon text-error" size="xs" />
                <font-awesome-icon v-else icon="fa-solid fa-globe" class="icon text-gray-400" size="xs" />
            </div>
            <input type="text" v-model="embed.url" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset placeholder:text-gray-40 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6" :class="embedUrlError ? 'ring-error' : 'ring-gray-300 focus:ring-gray-600'" placeholder="Embed URL" />
          </div>

          <!-- 2.4 - Embed Color -->
          <div class="flex flex-col mt-1">
            <div class="text-sm">Color</div>
            <div class="flex flex-row gap-1">
              <div class="w-8">
                <input title="click to edit" type="color" v-model="showDefaultColor" class="cursor-pointer h-full w-full box-border p-0 m-0 border-none outline-none">
              </div>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">#</div>
                <input type="text" v-model="defaultColor" class="outline-none block w-32 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="Embed URL" />
              </div>
            </div>
          </div>

          <!-- 2.5 - Embed Fields -->
          <div class="flex flex-col mt-1">
            <label @click="toggleSection($event)" for="text" class="block text-sm font-medium leading-6 text-gray-600 cursor-pointer mt-3 px-2 py-2 hover:bg-gray-300 rounded-md">
              <span>Fields</span>
              <span class="ml-2">
                <font-awesome-icon icon="fa-solid fa-angle-down" class="icon" />
              </span>
            </label>
            <div class="mt-2 label-body flex flex-column gap-2 hidden">
              <div class="flex flex-col w-full gap-2">
                <div v-if="embed.fields" class="flex flex-col embed-field-body">
                    <EmbedField @remove="removeEmbedField" @change="updateEmbedFields" v-for="(field, index) in embed.fields" :key="index" :field="field" />
                </div>
                <div class="flex flex-row items-center gap-2">
                    <span @click="addEmbedField" class="px-4 py-2 rounded-md bg-gray-300 cursor-pointer hover:bg-gray-400">
                      <font-awesome-icon icon="fa-solid fa-plus" class="icon" size="sm" />
                    </span>
                    <span class="text-sm">Add a new array item</span>
                </div>
              </div>
            </div>  
          </div>

          <!-- 2.6 - Embed Timestanp -->
          <!--<div class="flex flex-col mt-1">
            <label @click="toggleSection($event)" for="text" class="block text-sm font-medium leading-6 text-gray-600 cursor-pointer mt-3 px-2 py-2 hover:bg-gray-300 rounded-md">
              <span>Timestamp</span>
              <span class="ml-2">
                <font-awesome-icon icon="fa-solid fa-angle-down" class="icon" />
              </span>
            </label>
            <div class="mt-2 label-body flex flex-column gap-2 hidden">
              <div class="relative rounded-md shadow-sm w-full">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <font-awesome-icon icon="fa-solid fa-angle-up" class="icon text-gray-400" size="xs" rotation="90" />
                </div>
                <input type="text" class="outline-none block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-40 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="Timestamp for the embed" />
              </div>
            </div>  
          </div> -->

          <!-- 2.7 - Embed Image -->
          <div class="flex flex-col mt-1">
            <label @click="toggleSection($event)" for="text" class="block text-sm font-medium leading-6 text-gray-600 cursor-pointer mt-3 px-2 py-2 hover:bg-gray-300 rounded-md">
              <span>Image</span>
              <span class="ml-2">
                <font-awesome-icon icon="fa-solid fa-angle-down" class="icon" />
              </span>
            </label>
            <div class="mt-2 label-body flex flex-column gap-2 hidden">
              <EmbedImage @change="updateEmbedImage" type="image" :url="embed.image?.url" :proxy_url="embed.image?.proxy_url" :height="embed.image?.height" :width="embed.image?.width" />
            </div>  
          </div>

          <!-- 2.8 - Embed Thumbnail -->
          <div class="flex flex-col mt-1">
            <label @click="toggleSection($event)" for="text" class="block text-sm font-medium leading-6 text-gray-600 cursor-pointer mt-3 px-2 py-2 hover:bg-gray-300 rounded-md">
              <span>Thumbnail</span>
              <span class="ml-2">
                <font-awesome-icon icon="fa-solid fa-angle-down" class="icon" />
              </span>
            </label>
            <div class="mt-2 label-body flex flex-column gap-2 hidden">
              <EmbedImage @change="updateEmbedImage" type="thumbnail" :url="embed.thumbnail?.url" :proxy_url="embed.thumbnail?.proxy_url" :height="embed.thumbnail?.height" :width="embed.thumbnail?.width" />
            </div>  
          </div>

          <!-- 2.9 - Embed Author -->
          <div class="flex flex-col mt-1">
            <label @click="toggleSection($event)" for="text" class="block text-sm font-medium leading-6 text-gray-600 cursor-pointer mt-3 px-2 py-2 hover:bg-gray-300 rounded-md">
              <span>Author</span>
              <span class="ml-2">
                <font-awesome-icon icon="fa-solid fa-angle-down" class="icon" />
              </span>
            </label>
            <div class="mt-2 label-body flex flex-column gap-2 hidden">
              <EmbedAuthor @change="updateEmbedAuthor" :name="embed.author?.name" :url="embed.author?.url" :icon_url="embed.author?.icon_url" :proxy_icon_url="embed.author?.proxy_icon_url" />
            </div>  
          </div>

          <!-- 2.10 - Embed Footer -->
          <div class="flex flex-col mt-1">
            <label @click="toggleSection($event)" for="text" class="block text-sm font-medium leading-6 text-gray-600 cursor-pointer mt-3 px-2 py-2 hover:bg-gray-300 rounded-md">
              <span>Footer</span>
              <span class="ml-2">
                <font-awesome-icon icon="fa-solid fa-angle-down" class="icon" />
              </span>
            </label>
            <div class="mt-2 label-body flex flex-column gap-2 hidden">
              <EmbedFooter @change="updateEmbedFooter" :text="embed.footer?.text" :icon_url="embed.footer?.icon_url" :proxy_icon_url="embed.footer?.proxy_icon_url" />
            </div>  
          </div>
        </div>
      </div>
    </div>

    <!-- 3 - Component Section -->
    <div>
      <label @click="toggleSection($event)" for="text" class="block text-sm font-medium leading-6 text-gray-600 cursor-pointer mt-3 px-2 py-2 hover:bg-gray-300 rounded-md">
        <span>Components</span>
        <span class="ml-2">
          <font-awesome-icon icon="fa-solid fa-angle-down" class="icon" />
        </span>
      </label>
      <div class="mt-2 label-body flex flex-column gap-2 hidden">
        <div class="bg-gray-100 px-2 py-4">
          <font-awesome-icon icon="fa-solid fa-list" class="icon text-gray-400" />
        </div>
        <div class="w-full">

          <!-- 3.1 - Button Compopnent -->
          <div class="flex flex-col">
            <label @click="toggleSection($event)" for="text" class="block text-sm font-medium leading-6 text-gray-600 cursor-pointer px-2 py-2 hover:bg-gray-300 rounded-md">
              <span>Button</span>
              <span class="ml-2">
                <font-awesome-icon icon="fa-solid fa-angle-up" class="icon" />
              </span>
            </label>
            <div class="mt-2 label-body flex flex-column gap-2">
              <div class="flex flex-col w-full gap-2">
                <div class="flex flex-col button-component-body">
                  <ButtonComponent @remove="removeButtonComponent" @change="updateButtonComponent" v-for="(button, index) in componentButtons" :key="index" :button="button" />
                </div>
                <div class="flex flex-row items-center gap-2">
                  <span @click="addButtonComponent" class="px-4 py-2 rounded-md bg-gray-300 cursor-pointer hover:bg-gray-400">
                    <font-awesome-icon icon="fa-solid fa-plus" class="icon" size="sm" />
                  </span>
                  <span class="text-sm">Add a new button</span>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, nextTick, watch, PropType } from 'vue'
import EmbedField from "./EmbedField.vue"
import EmbedImage from "./EmbedImage.vue"
import EmbedAuthor from "./EmbedAuthor.vue"
import EmbedFooter from "./EmbedFooter.vue"
import ButtonComponent from "./ButtonComponent.vue"
import Button from "../types/components/Button"
import Field from "../types/embed/Field"
import Embed from "../types/Embed"
// @ts-ignore 
import { isValidURL } from '../utilities/common.js'

export default defineComponent({
  name: "MessageBuilder",
  components: { EmbedField, EmbedImage, EmbedAuthor, EmbedFooter, ButtonComponent },
  emits: ['content', 'embed', 'buttons'],
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
    
    const embedUrlError = ref(false)
    const contentValue = ref<string | undefined>(props.messageContent)
    const textareaHeight = ref<number>(0)
    const defaultColor = ref<string>('fc064c')
    const showDefaultColor = ref<string>('#'+defaultColor.value)
    const componentButtons = ref<Button[]>(props.buttons && props.buttons.length ? props.buttons : [
      {id: 1, style: '1', label: '', custom_id: 'button-1', url: null, disabled: 'false', emoji: '', type: '2'}
    ])
    const embed = ref<Embed>(props.embed ? props.embed : {
      type: "rich",
      title: '',
      description: '',
      url: null,
      color: showDefaultColor.value,
      image: { url: null, proxy_url: null, height: '', width: '' },
      thumbnail: { url: null, proxy_url: null, height: '', width: '' },
      author: { name: '', url: null, icon_url: null, proxy_icon_url: null },
      fields: [
        {id: 1, name: '', value: '', inline: 'false'}
      ],
      footer: { text: '', icon_url: null, proxy_icon_url: null },
    })

    const toggleSection = (event: MouseEvent) => {

      toggleIcon(event)
      toggleBody(event)
    }

    const toggleIcon = (event: MouseEvent) => {

      const clickedLabel = event.currentTarget as HTMLLabelElement;
      const iconElement = clickedLabel.querySelector('.icon') as HTMLElement;

      if (iconElement.classList.contains('fa-rotate-180')) {

        iconElement.classList.remove('fa-rotate-180');
        iconElement.classList.add('fa-rotate-0');
      } else {

        iconElement.classList.remove('fa-rotate-0');
        iconElement.classList.add('fa-rotate-180');
      }
    }

    const toggleBody = (event: MouseEvent) => {

      const clickedLabel = event.currentTarget as HTMLLabelElement;
      const body = clickedLabel.parentNode?.querySelector('.label-body') as HTMLElement;

      if (body.classList.contains('hidden')) {

        body.classList.remove('hidden');
      } else {

        body.classList.add('hidden');
      }
    }

    const adjustHeight = () => {

      nextTick(() => {
        const textarea = document.querySelector('textarea') as HTMLTextAreaElement
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
        textareaHeight.value = textarea.scrollHeight
      
        if(textarea.value.trim() == ''){

          textarea.style.minHeight = textarea.style.height = 'auto'
        }
      })
    }

    const addButtonComponent = () => {

      if(componentButtons.value){

        let newButton = <Button>{id: componentButtons.value.length + 1, style: '1', label: '', custom_id: 'button-' + (componentButtons.value.length + 1), url: null, disabled: 'false', emoji: '', type: '2'}
        componentButtons.value.push(newButton)
      }
    }

    const addEmbedField = () => {

      if(embed.value.fields){

        let newField = <Field>{id: embed.value.fields.length + 1, name: '', value: '', inline: 'false'}
        embed.value.fields.push(newField)
      }
    }

    const removeEmbedField = (value: number) => {
      
      if(embed.value.fields){
        
        const index = embed.value.fields.findIndex(item => item.id === value)
        if (index !== -1 && value > 1) {
          embed.value.fields.splice(index, 1)
        }
      }
    }

    const removeButtonComponent = (value: number) => {
      
      if(componentButtons.value){
        
        const index = componentButtons.value.findIndex(item => item.id === value)
        if (index !== -1 && value > 1) {
          componentButtons.value.splice(index, 1)
        }
      }
    }

    watch(defaultColor, (newColor) => {

      showDefaultColor.value = '#' + newColor;
    })

    watch(showDefaultColor, (newColor) => {

      defaultColor.value = newColor.substr(1);
      embed.value.color = newColor
    })

    watch(contentValue, () => {

      emit('content', contentValue.value)
    })

    watch(embed, (newVal) => {

      embedUrlError.value = embed.value.url && !isValidURL(embed.value.url) ? true : false
      emit('embed', newVal)
    }, { deep: true })

    const updateEmbedImage = (type: string, data: any) => {

      if(type == 'image' && embed.value.image){

        embed.value.image.url = data.url && data.url != '' ? data.url : null
        embed.value.image.proxy_url = data.proxy_url && data.proxy_url != '' ? data.proxy_url : null
        embed.value.image.height = data.height
        embed.value.image.width = data.width

        emit('embed', embed.value)
      }else if(type == 'thumbnail' && embed.value.thumbnail){

        embed.value.thumbnail.url = data.url && data.url != '' ? data.url : null
        embed.value.thumbnail.proxy_url = data.proxy_url && data.proxy_url != '' ? data.proxy_url : null
        embed.value.thumbnail.height = data.height
        embed.value.thumbnail.width = data.width

        emit('embed', embed.value)
      }
    }

    const updateEmbedAuthor = (data: any) => {

      if(embed.value.author){

        embed.value.author.name = data.name
        embed.value.author.url = data.url && data.url != '' ? data.url : null
        embed.value.author.icon_url = data.icon_url && data.icon_url != '' ? data.icon_url : null
        embed.value.author.proxy_icon_url = data.proxy_icon_url && data.proxy_icon_url != '' ? data.proxy_icon_url : null

        emit('embed', embed.value)
      }
    }

    const updateEmbedFooter = (data: any) => {

      if(embed.value.footer){

        embed.value.footer.text = data.text
        embed.value.footer.icon_url = data.icon_url && data.icon_url != '' ? data.icon_url : null
        embed.value.footer.proxy_icon_url = data.proxy_icon_url && data.proxy_icon_url != '' ? data.proxy_icon_url : null

        emit('embed', embed.value)
      }
    }

    const updateEmbedFields = (value: Field) => {

      if(embed.value.fields){

        const index = embed.value.fields.findIndex(item => item.id === value.id)
        if (index !== -1) {

          if(value.name == '' && value.value == '' && index !== 0){

            removeEmbedField(value.id)
          }else{

            embed.value.fields[index] = value
          }
          emit('embed', embed.value)
        }
      }
    }
    
    const updateButtonComponent = (value: Button) => {

      if(componentButtons.value){

        const index = componentButtons.value.findIndex(item => item.id === value.id)
        if (index !== -1) {

          componentButtons.value[index] = value
          emit('buttons', componentButtons.value)
        }
      }
    }

    return {
      contentValue,
      toggleSection,
      adjustHeight,
      textareaHeight,
      defaultColor,
      showDefaultColor,
      componentButtons,
      addButtonComponent,
      addEmbedField,
      embed,
      updateEmbedImage,
      updateEmbedAuthor,
      removeEmbedField,
      updateEmbedFields,
      updateEmbedFooter,
      removeButtonComponent,
      updateButtonComponent,
      embedUrlError
    }
  }
})
</script>