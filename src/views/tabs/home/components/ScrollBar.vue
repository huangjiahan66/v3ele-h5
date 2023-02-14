<template>
  <div class="home-scroll-bar">
    <div class="home-scroll-bar__swipe">
      <div ref="containerRef">
        <div class="swipe-item" v-for="v in props.data" :key="v.type">
          <div class="scroll-bar__info" :class="`scroll-bar__info__${v.type}`">
            <span class="info-badge">{{ v.badge }}</span>
            <span class="info-detail" v-html="v.detail"></span>
            <span class="info-btn op-thin-border">{{ v.btn }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IScrollBarInfo } from '@/types'
import { useTimeout } from '@/use/useTimeout'
import { ref, onMounted } from 'vue'
interface IProps {
  intervalTime?: number //元素展示时间
  transtionTime?: number //元素切换时间
  height?: number //组件高度
  data: IScrollBarInfo[] //提示信息内容
}
const props = withDefaults(defineProps<IProps>(), {
  intervalTime: 3000,
  transtionTime: 1000,
  height: 40,
})

const containerRef = ref()
const heightPx = `${props.height}px`
onMounted(() => {
  const container = containerRef.value //拿到dom
  const count = container.children.length // dom的子元素个数
  const firstSwipeItem = container.children[0] //第一个子元素
  container.style.height = `${count * props.height}`
  let index = 0 //滚动到第几个元素
  setInterval(() => {
    index++
    // 如果超过item个数就需要将第一个元素接到后面
    if (index >= count) {
      firstSwipeItem.style.transform = `translateY(${index * props.height}px)`
      //   第一个元素滚动动画结束之后 container位置重置
      const timeout = setTimeout(() => {
        // 重复逻辑
        firstSwipeItem.style.transform = ''
        container.style.transform = ''
        container.style.transition = ''
        clearTimeout(timeout)
      }, props.transtionTime)
    }
    container.style.transform = `translateY(-${index * props.height}px)` //当前第几个每个元素的高度
    container.style.transition = `all linear ${props.transtionTime}ms`
    index = index % count
  }, props.intervalTime)
})
</script>

<style lang="scss">
.home-scroll-bar {
  --bean-color: rgb(252, 164, 40);
  --hongbao-color: rgb(252, 68, 25);
  &__swipe {
    background: white;
    border-radius: 8px;
    margin: 5px 10px;
    font-size: 13px;
    position: relative;
    overflow: hidden;
    height: v-bind(heightPx);
    .swipe-item {
      height: v-bind(heightPx);
    }
  }
  .scroll-bar__info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 10px;
    height: 100%;

    .info-badge {
      border-radius: 5px;
      padding: 2px 6px;
      color: white;
      margin-right: 6px;
      font-size: 12px;
    }
    .info-detail {
      flex: 1;
    }
    .info-btn {
      padding: 3px 14px;
      font-size: 12px;
      &.op-thin-border:before {
        border-radius: 50px;
      }
    }

    .info-num {
      font-weight: bold;
      margin: 0 2px;
    }

    &__bean {
      .info-badge {
        background: var(--bean-color);
      }
      .info-btn {
        color: var(--bean-color);
        &:before {
          border-color: var(--bean-color);
        }
      }
      .info-num {
        color: var(--bean-color);
      }
    }

    &__hongbao {
      .info-badge {
        background: var(--hongbao-color);
      }
      .info-btn {
        color: var(--hongbao-color);
        &:before {
          border-color: var(--hongbao-color);
        }
      }
      .info-num {
        color: var(--hongbao-color);
      }
    }
  }
}
</style>
