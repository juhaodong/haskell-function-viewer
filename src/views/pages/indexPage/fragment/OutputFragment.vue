<script setup>

import PageFrame from "@/views/component/PageFrame.vue";
import {handleInfo, useOutputController} from "@/dataLayer/states/outputPageController";
import NiceHeader from "@/views/component/decoration/NiceHeader.vue";
import dayjs from "dayjs";

const output = useOutputController()

function downloadText() {
  console.log(output.downloadableInfo)
  const link = document.createElement("a")
  const file = new Blob([output.downloadableInfo.join('\n')], {type: 'text/plain'})
  link.href = URL.createObjectURL(file)
  link.download = dayjs().valueOf() + ".txt"
  link.click();
  URL.revokeObjectURL(link.href)

}
</script>

<template>
  <page-frame :loading="false">
    <template #title>
      <nice-header>
        <template #icon>
          mdi-format-list-bulleted
        </template>
        Output for modules
      </nice-header>

      <v-spacer />
      <v-btn @click="downloadText">
        <template #prepend>
          <v-icon>mdi-text-box</v-icon>
        </template>
        Download as Text
      </v-btn>
    </template>
    <div>
      <div
        class="pa-4"
        v-for="m in output.modules"
        :key="m.module"
      >
        <div
          class="text-h6 font-weight-black text-decoration-underline"
          style="width: fit-content"
        >
          {{ m.module }}
        </div>

        <div
          class="mt-4 pa-2"
          v-for="i in m.info"
          :key="i.display_html"
        >
          <div v-html="i.display_html" />
          <v-card
            flat=""
            :color="handleInfo(i.display_html)?'green-lighten-5':'red-lighten-5'"
            class="pa-3 px-4 my-2 text-body-2"
          >
            {{ handleInfo(i.display_html) || "⚠️🤷 :D don't know what to do" }}
          </v-card>
        </div>
      </div>
    </div>
  </page-frame>
</template>

<style scoped>

</style>
