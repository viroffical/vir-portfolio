<script setup>
import { ref, computed } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'
import ProfileHeader from './ProfileHeader.vue'
import EducationItem from './EducationItem.vue'
import cvData from '@/data/cv-data.json'
import WorkExperienceItem from './WorkExperienceItem.vue'

const localeStore = useLocaleStore()
const birthdate = new Date(1993, 0, 1) // Vir's approximate birthdate (33 years old in 2026)
const today = new Date()
let age = ref(today.getFullYear() - birthdate.getFullYear())

// Adjust age if the current date has not passed the birthdate in the current year
if (today.getMonth() < birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())) {
  age.value--
}

const currentLocale = computed(() => localeStore.currentLocale)

// Computed property to get the localized education data
const educationData = computed(() => {
  return cvData[currentLocale.value]?.education || []
})

// Computed property to get the localized work experience data
const experienceData = computed(() => {
  return cvData[currentLocale.value]?.workExperience || []
})
</script>

<template>
  <div class="relative right-0 h-content-window overflow-hidden">
    <div class="w-full h-full bg-white overflow-auto p-2">
      <div>
        <ProfileHeader :age="age" />
        <section class="mt-5">
        <h2 class="font-trebuchet-pixel mt-5 underline">{{ $t('windows.cv.proExperience') }}</h2>
          <WorkExperienceItem v-for="(workExperience, index) in experienceData" :key="index" :workExperience="workExperience" />
          
        </section>
        <div class="mt-3">
          <h2 class="font-trebuchet-pixel underline">{{ $t('windows.cv.education') }}</h2>
          <EducationItem v-for="education in educationData" :key="education.id" :education="education" />
        </div>
      </div>
    </div>
  </div>
</template>
