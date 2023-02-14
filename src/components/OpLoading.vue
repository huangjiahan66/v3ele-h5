<template>
  <div v-if="loading" class="op-loading-view">
    <slot name="template">
      <div v-if="type === 'loading'" class="loading-wrapper">
        <VanLoading></VanLoading>
      </div>
      <div v-if="type === 'skeleton'" class="skeleton-wrapper">
        <VanSkeleton :row="10"></VanSkeleton>
        <VanSkeleton :row="5" title avatar></VanSkeleton>
        <VanSkeleton title :row="5"></VanSkeleton>
      </div>
    </slot>
  </div>

  <slot v-else></slot>
</template>

<script setup lang="ts">
interface IProps {
  loading: boolean
  type: 'loading' | 'skeleton'
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.op-loading-view {
  background: white;
  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
  .skeleton-wrapper {
    padding: 20px 10px;
  }
}
</style>
