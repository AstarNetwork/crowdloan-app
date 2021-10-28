<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div
          class="absolute inset-0 bg-gray-900 dark:bg-black opacity-75"
        ></div>
      </div>
      <div
        class="
          inline-block
          bg-white
          dark:bg-darkGray-900
          rounded-lg
          px-4
          sm:px-8
          py-10
          overflow-hidden
          shadow-xl
          transform
          transition-all
          mx-2
          my-2
          align-middle
          max-w-lg
          w-full
        "
      >
        <div>
          <div>
            <h3
              class="
                text-lg
                font-extrabold
                text-blue-900
                dark:text-white
                mb-6
                text-center
              "
            >
              Choose Account
            </h3>
            <div
              class="
                mt-1
                w-full
                rounded-md
                bg-white
                dark:bg-darkGray-900
                border border-gray-300
                dark:border-darkGray-500
              "
            >
              <ul
                class="
                  max-h-56
                  rounded-md
                  py-1
                  text-base
                  overflow-auto
                  focus:outline-none
                "
              >
                <ModalAccountOption
                  v-for="(account, index) in allAccounts"
                  :key="index"
                  :key-idx="index"
                  :address="account"
                  :addressName="allAccountNames[index]"
                  :checked="selAccount === index"
                  v-model:selOption="selAccount"
                />
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-6 flex justify-center flex-row-reverse">
          <button
            type="button"
            @click="selectAccount(selAccount)"
            class="
              inline-flex
              items-center
              px-6
              py-3
              border border-transparent
              text-sm
              font-medium
              rounded-full
              shadow-sm
              text-white
              bg-blue-500
              hover:bg-blue-700
              dark:hover:bg-blue-400
              focus:outline-none focus:ring focus:ring-blue-100
              dark:focus:ring-blue-400
              mx-1
            "
          >
            Confirm
          </button>
          <button
            type="button"
            @click="closeModal"
            class="
              inline-flex
              items-center
              px-6
              py-3
              border border-gray-300
              dark:border-darkGray-500
              text-sm
              font-medium
              rounded-full
              text-gray-500
              dark:text-darkGray-400
              bg-white
              dark:bg-darkGray-900
              hover:bg-gray-100
              dark:hover:bg-darkGray-700
              focus:outline-none focus:ring focus:ring-gray-100
              dark:focus:ring-darkGray-600
              mx-1
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
// import { useStore } from 'vuex';
import ModalAccountOption from './ModalAccountOption.vue';

export default defineComponent({
  components: {
    ModalAccountOption
  },
  props: {
    allAccounts: {
      type: Array,
      required: true
    },
    allAccountNames: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('update:is-open', false);
    };

    // const store = useStore();

    const selectAccount = (accountIdx: number) => {
      // store.commit(MutationTypes.SET_CURRENT_ACCOUNT_IDX, accountIdx);
      emit('update:current-account', props.allAccounts[accountIdx]);
      emit('update:is-open', false);
    };

    const selAccount = ref(0);

    return {
      closeModal,
      selAccount,
      selectAccount
    };
  }
});
</script>
