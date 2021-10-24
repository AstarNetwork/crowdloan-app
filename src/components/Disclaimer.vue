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
        class="inline-block bg-white dark:bg-darkGray-900 rounded-lg px-4 sm:px-8 py-10 overflow-hidden shadow-xl transform transition-all mx-2 my-2 align-middle max-w-lg w-full"
      >
        <div>
          <div>
            <h3
              class="text-lg font-extrabold text-blue-900 dark:text-white mb-6 text-center"
            >
              Agree to Disclaimer
            </h3>

            <div class="grid grid-cols-1 gap-6 dark:text-white">
              <div class="overflow-y-scroll h-64 text-left">
                <h1 class="underline">Astar Crowdloan Terms and Conditions</h1>
                <p>By accessing the Astar Crowdloan page ("Astar Crowdloan Event"), you represent and warrant to Stake Technologies, Pte Ltd as follows:</p>

                <p>You are not a citizen or resident of a country the laws of which prohibit or conflict with the holding, sale, or trading of tokens; such countries to include (without limitation) THE UNITED STATES OF AMERICA, ITS TERRITORIES AND POSSESSIONS, ANY STATE OF THE UNITED STATES, AND THE DISTRICT OF COLUMBIA ("U.S."), CANADA, PEOPLE'S REPUBLIC OF CHINA, DEMOCRATIC PEOPLE'S REPUBLIC OF KOREA, CUBA, SYRIA, IRAN, SUDAN, PEOPLE'S REPUBLIC OF CRIMEA;</p>

                <p>You agree and acknowledge that nothing in the Astar Crowdloan Event page constitutes a prospectus or offer document of any sort nor is intended to constitute an offer of securities of any form, units in a business trust, units in a collective investment scheme, or any other form of capital markets a product or investment in any jurisdiction, nor a solicitation for any form of investment;</p>

                <p>You agree and acknowledge that no regulatory authority has examined or approved the information set out in the Astar Crowdloan Event and the publication, distribution, or dissemination of information under the Astar Crowdloan Event page does not imply to you that the applicable laws, regulatory requirements, or rules have been complied with;</p>

                <p>Your access to, or use of, the Astar Crowdloan Event page and the holding of ASTR tokens by you is not prohibited or restricted by any applicable laws, regulations, or rules in any jurisdiction to which you are subject, and where any restrictions are applicable, you have observed and complied with all such restrictions at your own expense and without liability to Stake Technologies, Pte Ltd;</p>

                <p>You agree and acknowledge that Stake Technologies, Pte Ltd shall not be liable for any direct, indirect, special, incidental, consequential, or other losses of any kind (including but not limited to loss of revenue, income or profits, and loss of use or data), in tort (including negligence), contract or otherwise, arising out of or in connection with you accessing or using the Astar Crowdloan Event page;</p>

                <p>You waive the right to participate in a class-action lawsuit or class-wide arbitration against Stake Technologies, Pte Ltd, any person involved in the Astar Crowdloan Event page and/or with the creation and distribution of the ASTR tokens;</p>

                <p>You are not a U.S. Person as defined in Regulation S under the Securities Act of 1933, as amended, which means that you are not a natural person resident in the United States of America, its territories and possessions, any State of the United States, and the District Of Columbia ("U.S."), an entity incorporated under the laws of the U.S., an estate/trust where the executor/administrator/trustee is a U.S. Person or a non-discretionary account held for a U.S. Person, an agency or branch of a foreign entity located in the U.S., or an entity incorporated outside the U.S. but formed by a U.S. Person principally for the purposes of investing in unregistered securities under the Securities Act (unless incorporated and owned by accredited investors who are not natural persons, estates or trusts), and you acknowledge, agree and represent as follows:
                any offer, sale, and trade of the ASTR tokens is being made in an offshore transaction, which means that the transaction was not effected in the U.S.; <br />
                no directed selling efforts were made in the United States, which means that no marketing efforts were made to you in the U.S.; <br />
                you are not acquiring ASTR tokens for the account or benefit of any U.S. Person; and <br />
                you agree not to offer or sell the ASTR tokens (or create or maintain any derivative position equivalent thereto) in the U.S., to or for the account or benefit of a U.S. Person;</p>

                <p>You have sufficient funds to fulfill the obligations of Stake Technologies, Pte Ltd within the Astar Crowdloan Event page and are not bankrupt or insolvent;</p>

                <p>You are acquiring ASTR tokens as principal and for your own benefit and you are not acting on the instructions of, or as nominee or agent for or on behalf of, any other person;</p>

                <p>You acknowledge you have the ownership of the DOT token you locked for this event and Stake Technologies Pte. Ltd. is not a custody of your DOT and ASTR;</p>

                <p>The ASTR tokens to be delivered to and received by you will not be used for any purpose in connection with money laundering, terrorism financing, or any other acts in breach or contravention of any applicable law, regulation, or rule;</p>

                <p>You bear the sole responsibility to determine what tax implications your use of the Astar Crowdloan Event page may have for you; and</p>

                <p>all of the above representations and warranties are and will continue to be, true, complete, accurate, and non-misleading from the time of your acceptance of this attestation and notwithstanding the receipt by you of any ASTR tokens.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 flex justify-center flex-row-reverse">
          <button
            type="button"
            @click="agree"
            class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-1"
          >
            Agree
          </button>
          <button
            type="button"
            @click="closeModal"
            class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-darkGray-500 text-sm font-medium rounded-full text-gray-500 dark:text-darkGray-400 bg-white dark:bg-darkGray-900 hover:bg-gray-100 dark:hover:bg-darkGray-700 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 mx-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    ctype: {
      type: String,
      default: 'codehash',
    },
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('update:is-open', false);
    };

    const agree = () => {
      emit('agree', true);
    };

    return {
      closeModal,
      agree
    };
  },
});
</script>
