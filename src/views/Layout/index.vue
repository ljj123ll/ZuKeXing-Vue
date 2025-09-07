<script setup lang="ts">
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
</script>

<template>
  <LayoutNav></LayoutNav>
  <RouterView />
  <LayoutFooter></LayoutFooter>

</template>
