<script setup lang="ts">
  const props = defineProps<{
    boardId?: string | string[]
  }>()

  const link = computed(() => {
    if (!props.boardId) {
      return "/"
    } else {
      return `/board/${props.boardId}`
    }
  })
</script>

<template>
  <UButton
    :to="link"
    variant="ghost"
    label="Back"
    icon="i-heroicons-arrow-left-16-solid"
    :ui="BUTTON_UI_OBJECT"
  />
</template>
