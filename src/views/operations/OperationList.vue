<template>
  <br>
  <Suspense>
    <template #default>
      <OperationListController/>
    </template>
    <template #fallback>
      <div class="loading-spinner">
        <LoadingDiv />
      </div>
    </template>
  </Suspense>
</template>

<script>
import OperationListController from '@/components/operation/OperationListComponent.vue';
import LoadingDiv from '@/components/LoadingDiv.vue';

export default {
  name: 'OperationList',
  components: {
    OperationListController,
    LoadingDiv,
  },
};
</script>

<style scoped>
.loading-spinner {
  align-items: center;
}
</style>
