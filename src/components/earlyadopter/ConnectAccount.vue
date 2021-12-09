<template>
  <div class="pt-20 pb-20 status-background">
    <div class="max-w-6xl mx-auto">
      <div class="justify-center">
        <h1>Connect Account</h1>
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
                <li
                  v-for="(account, index) in allAccounts"
                  :key="index"
                  :address="account"
                >{{allAccountNames[index]}}</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from 'vue';
import { keyring } from '@polkadot/ui-keyring';

export default defineComponent({

  setup(props, { emit }) {
    const api: any = inject('api');    
    const allAccounts = ref();
    const allAccountNames = ref();

    // set accounts from extensions
    keyring.accounts.subject.subscribe((accounts: any) => {
      if (api && accounts) {
        // console.log('accounts', Object.keys(accounts));
        allAccounts.value = Object.keys(accounts);
        allAccountNames.value = Object.values(accounts).map((obj: any) =>
          obj.option.name.replace('\n              ', '')
        );
      }
    });

    return {
      allAccounts,
      allAccountNames
    }
  }
});
</script>
