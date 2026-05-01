<template>
  <div class="mt-2 mb-5">
    <h4 class="font-trebuchet-pixel uppercase text-sm">{{ workExperience.jobTitle }}</h4>
    <p class="font-trebuchet-pixel font-medium text-sm">{{ workExperience.company }}</p>
    <ul class="font-trebuchet-pixel list-disc pl-5 text-sm">
      <li v-for="(responsibility, index) in workExperience.responsibilities" :key="index" class="whitespace-pre-line">
        {{ responsibility }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  workExperience: Object
})
</script>
