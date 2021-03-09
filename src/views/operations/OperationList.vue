<template>
  <br>
  <Suspense>
    <template #default>
      <OperationListController/>
    </template>
    <template #fallback>
      <div class="loading-spinner">
        <Loading />
      </div>
    </template>
  </Suspense>
</template>

<script>
import OperationListController from '@/components/operation/OperationListComponent.vue';
import Loading from '@/components/Loading.vue';

export default {
  name: 'OperationList',
  components: {
    OperationListController,
    Loading,
  },
};
</script>

<style scoped>
.loading-spinner {
  align-items: center;
}
</style>
