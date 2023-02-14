<template>
  <div class="home-page">
    <Transition name="fade">
      <SearchView v-if="isSearchViewShow" @cancel="togglesSearchView"> </SearchView>
    </Transition>

    <TheTop :recomments="data.searchRecomments" @searchClick="togglesSearchView" />
    <OpLoading :loading="pending" type="loading">
      <div class="home-page__banner">
        <img v-for="item in data.banner" :src="item.imgUrl" alt="" :key="item.imgUrl" />
      </div>
      <TheTransformer :data="data.transformer"></TheTransformer>
      <ScrollBar :data="data.scrollBarInfoList"></ScrollBar>
    </OpLoading>
  </div>
</template>

<script setup lang="ts">
import TheTop from './components/TheTop.vue'
import SearchView from '@/views/search/SearchView.vue'
import TheTransformer from './components/TheTransformer.vue'
import ScrollBar from './components/ScrollBar.vue'
import OpLoading from '@/components/OpLoading.vue'
import type { ICountdown, IHomeInfo } from '@/types'
import { useToggle } from '@/use/useToggle'
import { useAsync } from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'

const [isSearchViewShow, togglesSearchView] = useToggle(false) //一开始不会展示SearchView

const { data, pending } = useAsync(fetchHomePageData, {
  banner: [],
  searchRecomments: [],
  transformer: [],
  scrollBarInfoList: [],
  countdown: [] as unknown as ICountdown,
  activities: [],
} as IHomeInfo)
// fetchHomePageData().then((res) => {
//   console.log(res)
// })
</script>

<style scoped lang="scss">
// 动画开始执行 和动画开始退出的时候
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

// 进入的时候 是怎么样的  退出的时候是怎么样的
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.home-page {
  background: var(--op-gray-bg-color);
  &__banner {
    img {
      width: 100%;
      padding-top: 10px;
      background-color: white;
    }
  }
}
</style>
