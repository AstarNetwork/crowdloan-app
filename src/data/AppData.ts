import { StatusData } from './StatusData';
import { RuleData } from './RuleData';
import { FaqData } from './FaqData';

const statusItems = <StatusData[]>[
  { value: 0, description: 'Participants' },
  { value: 0, description: 'DOT Contributed' },
  { value: 14000000, description: 'ASTR to be Distributed' }
];

const ruleItems = <RuleData[]>[
  {
    title: 'Parachain Auction',
    rule: 'Polkadot is a shared protocol that enables blockchain networks to operate together seamlessly. To be a part of the Polkadot network, Astar Network must secure a slot during the Polkadot parachain auction. We are raising DOT from our community to help win the auction.'
  },
  {
    title: 'Huge bonus incentive',
    rule: 'Astar has created 3 bonus levels! Everyone who is eligible can apply for one or all bonuses levels. In our documentation (see FAQ), all levels are explained with their requirements. In total there is 5% of the total supply reserved for this bonus scheme.'
  },
  {
    title: 'ASTR Token Distribution',
    rule: '1 month after successfully securing a Polkadot parachain slot, Astar network’s native token (ASTR) will be distributed to the crowdloan participants’ addresses. The participants who join the crowdloan through exchanges will be able to see their balance once we enable token transfers.'
  },
  {
    title: 'Number of ASTR token',
    rule: 'The number of ASTR tokens the participants will receive is determined based on the, how many DOTs they lock for Astar, the total amount of locked DOTs in the crowdloan and bonus.'
  }
];

const faqItems = <FaqData[]>[
  {
    question: 'How many ASTR will I get for joining the Polkadot PLO?',
    answer:
      'This depends on the lease/lock period of DOT and a few other factors such as total locked DOT. The token allocation for the PLO is capped and we will distribute a total of around 20% of our token supply to those who join the PLO (incl bonus).'
  },
  {
    question: 'What does it mean to unbond my DOT, and how do I do it?',
    answer:
      'When nominating on Polkadot, you have a delayed exit period, called the unbonding period, which serves as a cooldown. You will not be able to transfer your tokens before this period has elapsed. Read more and find instructions on the Polkadot wiki.'
  },
  {
    question: 'How long will the DOT tokens be locked?',
    answer:
      'Your DOT will be locked for the full duration of the Astar parachain lease. This means that DOT will be locked for 96 weeks. Once the lease expires, DOT will be automatically returned.'
  },
  {
    question: 'What if Astar Network doesn’t win the parachain auction?',
    answer:
      'If Astar does not win the auction, your DOT will be automatically returned immediately (but Astar aims to become the first one).'
  },
  {
    question: 'Where can I find all the information?',
    answer:
      'You can find all the information regarding Polkadot auctions and Astar Crowdloan event here: <a href="https://docs.astar.network/learn/polkadot-plo" target="_blank" style="color: #0070ff">Docs</a>.'
  }
];

export { statusItems, ruleItems, faqItems };