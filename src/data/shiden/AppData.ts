import { StatusData } from '../StatusData';
import { RuleData } from '../RuleData';
import { FaqData } from '../FaqData';

// Todo: update value and words

const statusItems = <StatusData[]>[
  // { value: 0, description: 'Participants' },
  { value: 0, description: 'KSM Contributed' },
  { value: 350000, description: 'SDN to be Distributed' }
];

const ruleItems = <RuleData[]>[
  {
    title: 'Shiden Parachain Auction',
    rule: 'Kusama is a shared protocol that enables blockchain networks to operate together seamlessly. To be a part of the Kusama network, Shiden Network must secure a slot during the Kusama parachain auction. We are raising KSM from our community to help win the auction.'
  },

  {
    title: 'SDN Token Distribution',
    rule: 'After successfully securing a Kusama parachain slot, Shiden network’s native token (SDN) will be distributed to the crowdloan participants’ addresses.'
  },
  {
    title: 'Number of SDN token',
    rule: 'The number of SDN tokens the participants will receive is determined based on many KSMs they lock for Shiden. More information can you find in our <a href="https://medium.com/astar-network/announcing-the-second-official-shiden-crowdloan-d11d71debd52" target="_blank">announcement article</a>.'
  }
];

const faqItems = <FaqData[]>[
  {
    question: 'How many SDN will I get for joining the Kusama PLO?',
    answer:
      'This depends on the lease/lock period of KSM and a few other factors such as total locked KSM. The token allocation for the crowdloan is capped and we will distribute a total of around 0.5% of our token supply to those who join the crowdloan.'
  },
  {
    question: 'What does it mean to unbond my KSM, and how do I do it?',
    answer:
      'When nominating on Kusama, you have a delayed exit period, called the unbonding period, which serves as a cooldown. You will not be able to transfer your tokens before this period has elapsed. Read more and find instructions on the Kusama web page.'
  },
  {
    question: 'How long will the KSM tokens be locked?',
    answer:
      'Your KSM will be locked for the full duration of the Shiden parachain lease. This means that KSM will be locked for 48 weeks. Once the lease expires, KSM will be automatically returned.'
  },
  {
    question: 'What if Shiden Network doesn’t win the parachain auction?',
    answer:
      'If Shiden does not win the auction, your KSM will be automatically returned immediately.'
  },
  {
    question: 'Where can I find all the information?',
    answer:
      'You can find all the information regarding Shiden crowdloan event <a href="https://medium.com/astar-network/announcing-the-second-official-shiden-crowdloan-d11d71debd52" target="_blank">here</a>.'
  }
];

export { statusItems, ruleItems, faqItems };
