import BN from 'bn.js';
import {
  MINIMUM_STAKING_AMOUNT,
  DEFAULT_REWARD_AMOUNT
} from '@/config/crowdloan';

export class StakeFormData {
  polkadotAddress: string;
  availableAmount: BN;
  stakingAmount: number;
  referralAddress?: string;
  estimatedAmount: number;
  emailAddress?: string;
  errors: LooseObject;

  constructor() {
    this.polkadotAddress = '';
    this.availableAmount = new BN(0);
    this.stakingAmount = MINIMUM_STAKING_AMOUNT;
    this.estimatedAmount = DEFAULT_REWARD_AMOUNT;
    this.errors = {
      emailAddress: '',
      polkadotAddress: '',
      stakingAmount: '',
      referralAddress: ''
    };
  }
}

interface LooseObject {
  [key: string]: any;
}
