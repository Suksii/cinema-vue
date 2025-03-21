<script setup>
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  pageNum: Number,
  totalPages: Number,
});

const emit = defineEmits(["update:pageNum"]);

const route = useRoute();
const router = useRouter();

const prevPage = () => {
  if (props.pageNum !== 1) {
    emit("update:pageNum", props.pageNum - 1);
    router.push({ query: { ...route.query, page: props.pageNum } });
  }
};
const nextPage = () => {
  if (props.pageNum !== props.totalPages) {
    emit("update:pageNum", props.pageNum + 1);
    router.push({ query: { ...route.query, page: props.pageNum } });
  }
};

const goToPage = (selectedPage) => {
  if (selectedPage !== props.pageNum) {
    emit("update:pageNum", selectedPage);
    router.push({ query: { ...route.query, page: selectedPage } });
  }
};

const pageNumRender = computed(() => {
  const pages = [];

  const start = Math.max(1, props.pageNum - 2);
  const end = Math.min(props.totalPages, props.pageNum + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
</script>

<template>
  <Icon
    icon="dashicons:arrow-left"
    class="w-10 h-10 bg-primary hover:bg-hoverPrimary text-white flex justify-center items-center text-xl rounded-full"
    :class="{
      'cursor-not-allowed': props.pageNum === 1,
      'cursor-pointer': props.pageNum > 1,
    }"
    @click="prevPage"
  />
  <div
    v-for="page in pageNumRender"
    :key="page"
    class="w-10 h-10 flex justify-center items-center bg-primary hover:bg-hoverPrimary text-white text-xl cursor-pointer rounded-full"
    :class="{
      'bg-primary': page !== props.pageNum,
      'bg-hoverPrimary scale-125': page === props.pageNum,
    }"
    @click="goToPage(page)"
  >
    {{ page }}
  </div>
  <Icon
    icon="dashicons:arrow-right"
    @click="nextPage"
    class="w-10 h-10 bg-primary hover:bg-hoverPrimary text-white flex justify-center items-center text-xl rounded-full"
    :class="{
      'cursor-not-allowed': props.pageNum === props.totalPages,
      'cursor-pointer': props.pageNum < props.totalPages,
    }"
  />
</template>
