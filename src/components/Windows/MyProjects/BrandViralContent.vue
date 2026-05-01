<template>
  <div class="text-xs md:text-header-window">
    <h3 class="mt-5 mb-2">{{ $t('common.context') }}</h3>
    <p>{{ $t('project.brandviral.contextFirstParagraph') }}</p>
    <br />
    <p>{{ $t('project.brandviral.contextSecondParagraph') }}</p>
    <br />
    <p>{{ $t('project.brandviral.contextThirdParagraph') }}</p>
    <br />
    <p>{{ $t('project.brandviral.contextFourthParagraph') }}</p>
    <br />
    <h3 class="mt-5 mb-2">{{ $t('common.objectives') }}</h3>
    <ul class="list-disc ml-3">
      <li>{{ $t('project.brandviral.goalFirst') }}</li>
      <li>{{ $t('project.brandviral.goalSecond') }}</li>
      <li>{{ $t('project.brandviral.goalThird') }}</li>
      <li>{{ $t('project.brandviral.goalFourth') }}</li>
      <li>{{ $t('project.brandviral.goalFifth') }}</li>
      <li v-if="$t('project.brandviral.goalSixth') !== ''">{{ $t('project.brandviral.goalSixth') }}</li>
    </ul>
    <div
      class="w-full justify-center mt-5 mb-2 flex flex-row items-center gap-0.5 cursor-pointer transition-all text-heroic-blue fill-heroic-blue hover:underline">
      <a rel="noopener" href="https://www.brandviral.fun/" target="_blank" class="cursor-pointer">
        {{ $t('buttons.linkWebSite') }}
      </a>
    </div>
  </div>
</template>
