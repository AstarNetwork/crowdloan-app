import axios from 'axios';

const getParticipants = async (): Promise<number> => {
  try {
    const data = await axios.get(
      'https://crypto-0xrc-api.vercel.app/api/v1/crowdloan/shiden'
    );
    return parseInt(data.data.contributions);
  } catch (e) {
    console.error(e);
  }
  return 0;
};

export { getParticipants };
