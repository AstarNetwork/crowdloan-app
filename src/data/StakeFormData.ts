export class StakeFormData {
  polkadotAddress: string;
  availableAmount: number;
  stakingAmount: number;
  referralAddress?: string;
  estimatedAmount: number;
  emailAddress?: string;
  errors: LooseObject;

  constructor() {
    this.polkadotAddress = '';
    this.availableAmount = 0;
    this.stakingAmount = 0;
    this.estimatedAmount = 0;
    this.errors = {};
  }
}

interface LooseObject {
  [key: string]: any;
}
