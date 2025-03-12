import { ref, watch } from "vue";

export const useDebounce = (value, delay = 1000) => {
  const debouncedValue = ref(value.value);

  watch(
    value,
    (newValue) => {
      const handler = setTimeout(() => {
        debouncedValue.value = newValue;
      }, delay);

      return () => clearTimeout(handler);
    },
    { immediate: true }
  );

  return debouncedValue;
};
