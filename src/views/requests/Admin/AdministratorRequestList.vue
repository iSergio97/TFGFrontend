<template>
  <Suspense>
    <template #default>
      <AdminRequestListComponent />
    </template>
    <template #fallback>
      <div class="loading-spinner">
        <LoadingDiv />
      </div>
    </template>
  </Suspense>
</template>

<script>
import AdminRequestListComponent from '@/components/request/AdminRequestListComponent.vue';
import LoadingDiv from '@/components/LoadingDiv.vue';

export default {
  name: 'AdministratorRequestList',
  components: {
    AdminRequestListComponent,
    LoadingDiv,
  },
};
</script>

<style scoped>

</style>
