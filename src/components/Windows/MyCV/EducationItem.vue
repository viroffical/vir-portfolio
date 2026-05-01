<template>
  <div class="mt-2 mb-5">
    <h4 class="font-trebuchet-pixel uppercase text-sm">{{ education.degree }}</h4>
    <p class="font-trebuchet-pixel font-medium text-sm">{{ education.institution }}</p>
    <p class="font-trebuchet-pixel font-medium text-sm">{{ education.description }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  education: Object
})
</script>
