<template>
  <RouterView></RouterView>

  <Tabbar v-model="active">
    <tabbar-item icon="home-o" name="home">标签</tabbar-item>
    <tabbar-item icon="bars" name="order">订单 </tabbar-item>
    <tabbar-item icon="contact" name="me">我的</tabbar-item>
  </Tabbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { Tabbar, TabbarItem } from 'vant'

const route = useRoute()
const router = useRouter()
// 当前tab
const active = ref(route.name as string)

watch(active, (newVal) => {
  console.log('123', newVal)
  router.push({
    name: newVal,
  })
})
</script>

<style scoped></style>
