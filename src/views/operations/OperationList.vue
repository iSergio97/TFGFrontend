<template>
  <br>
  <Suspense>
    <template #default>
      <OperationListComponent/>
    </template>
    <template #fallback>
      <div class="loading-spinner">
        <LoadingDiv />
      </div>
    </template>
  </Suspense>
</template>

<script>
import OperationListComponent from '@/components/operation/OperationListComponent.vue';
import LoadingDiv from '@/components/LoadingDiv.vue';

export default {
  name: 'OperationList',
  components: {
    OperationListComponent,
    LoadingDiv,
  },
};
</script>

<style scoped>
.loading-spinner {
  align-items: center;
}
</style>
