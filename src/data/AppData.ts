import { StatusData } from "./StatusData";
import { RuleData } from "./RuleData";
import { FaqData } from './FaqData';

const statusItems = <StatusData[]>[
  { value: 14164, description: 'Participants' },
  { value: 501137.7, description: 'DOT Contributed' },
  { value: 6845464.7, description: 'ASTA to be Distributed' }
];

const ruleItems = <RuleData[]>[
  {
    title: 'Parachain Auction',
    rule: 'Polkadot is a shared protocol that enables blockchain networks to operate together seamlessly. To be a part of the Polkadot network, Astar Network must secure a slot during the Polkadot parachain auction. We are raising DOT from our community to help win the auction.'
  },
  {
    title: 'Earlier Participants Earn a Higher Bonus',
    rule: 'Unlike other projects, we encourage DOT holders to join our crowdloan as early as possible. The bonus rate we distribute will decrease over time - this means that the earlier participants join, the higher the bonus they’ll receive. At the last Kusama auction, the early contributors received around 110 SDN per KSM. On the other hand, the last minute contributors only received around 60 SDN per KSM.'
  },
  {
    title: 'ASN Token Distribution',
    rule: '1 month after successfully securing a Polkadot parachain slot, Astar network’s native token (ASN) will be distributed to the crowdloan participants’ addresses. The participants who join the crowdloan through exchanges will be able to see their balance once we enable token transfers.'
  },
  {
    title: 'Number of ASN token',
    rule: 'The number of ASN tokens the participants will receive is determined based on the time when they join Astar’s crowdloan, how many DOTs they lock for Astar, and the total amount of locked DOTs in the crowdloan.'
  }
];

const faqItems = <FaqData[]>[
  {
    question: 'How many ASN will I get for joining the Polkadot PLO?',
    answer: 'This depends on the lease/lock period of DOT and a few other factors such as total locked DOT. The token allocation for the PLO is capped and we will distribute a total of around 30% of our token supply to those who join the PLO.'
  },
  {
    question: 'What does it mean to unbond my DOT, and how do I do it?',
    answer: 'When nominating on Polkadot, you have a delayed exit period, called the unbonding period, which serves as a cooldown. You will not be able to transfer your tokens before this period has elapsed. Read more and find instructions on the Polkadot wiki.'
  },
  {
    question: 'How long will the DOT tokens be locked?',
    answer: 'Your DOT will be locked for the full duration of the Astar parachain lease. This means that DOT will be locked for 24 months. Once the lease expires, DOT will be automatically returned.'
  },
  {
    question: 'What if Shiden doesn’t win the parachain auction?',
    answer: 'If Astar does not win the auction, your DOT will be automatically returned immediately (but Astar aims to become the first one).'
  }
];

export { statusItems, ruleItems, faqItems };