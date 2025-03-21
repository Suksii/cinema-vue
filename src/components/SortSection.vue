<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  selectedSort: String,
  pageNum: Number,
});

const emit = defineEmits(["update:selectedSort", "update:pageNum"]);

const sortOptions = [
  {
    name: "Title",
    asc: "title.asc",
    desc: "title.desc",
    id: "title",
  },
  {
    name: "Release Date",
    asc: "primary_release_date.asc",
    desc: "primary_release_date.desc",
    id: "primary_release_date",
  },
  {
    name: "Popularity",
    asc: "popularity.asc",
    desc: "popularity.desc",
    id: "popularity",
  },
  {
    name: "Vote Count",
    asc: "vote_count.asc",
    desc: "vote_count.desc",
    id: "vote_count",
  },
];

const route = useRoute();
const router = useRouter();

const isExpanded = ref(false);
const isAsc = ref(false);

const handleSort = (option) => {
  isAsc.value = !isAsc.value;
  emit("update:selectedSort", isAsc.value ? option.asc : option.desc);
  emit("update:pageNum", 1);
  router.push({
    query: {
      ...route.query,
      page: props.pageNum,
      sort_by: props.selectedSort,
    },
  });
};
</script>

<template>
  <div
    class="w-full bg-secondary flex items-center p-1 mb-12 rounded-md h-22 lg:h-12"
  >
    <div
      class="flex items-center gap-4 text-white cursor-pointer p-2 z-20"
      @click="isExpanded = !isExpanded"
    >
      <p class="text-nowrap">Sort by</p>
      <Icon icon="mdi:sort" width="24" height="24" />
    </div>
    <div
      class="grid grid-cols-2 md:grid-cols-4 duration-500"
      :class="{
        'w-0 opacity-0': !isExpanded,
        'w-[90%] opacity-100': isExpanded,
      }"
    >
      <div
        v-for="option in sortOptions"
        :key="option.id"
        class="flex justify-center items-center text-white"
      >
        <div
          @click="handleSort(option)"
          class="flex justify-center items-center gap-1 min-w-40 text-white hover:bg-primary/80 py-1 px-2 rounded-md cursor-pointer transition-colors"
          :class="{
            'bg-primary/80':
              selectedSort === option.asc || selectedSort === option.desc,
          }"
        >
          <p class="text-nowrap">{{ option.name }}</p>
          <Icon
            v-if="selectedSort === option.asc"
            icon="solar:arrow-up-bold"
            width="24"
            height="24"
          />
          <Icon
            v-if="selectedSort === option.desc"
            icon="solar:arrow-down-bold"
            width="24"
            height="24"
          />
        </div>
      </div>
    </div>
  </div>
</template>
