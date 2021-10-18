<template>
  <br>
  <Suspense>
    <template #default>
      <RequestListComponent/>
    </template>
    <template #fallback>
      <div class="loading-spinner">
        <LoadingDiv />
      </div>
    </template>
  </Suspense>
</template>

<script>
import RequestListComponent from '@/components/request/RequestListComponent.vue';
import LoadingDiv from '@/components/LoadingDiv.vue';

export default {
  name: 'UserRequestList',
  components: {
    RequestListComponent,
    LoadingDiv,
  },
};
</script>

<style scoped>
.loading-spinner {
  margin: auto;
  padding-top: 15%;
}
</style>
