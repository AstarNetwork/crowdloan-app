import axios from 'axios'

const getParticipants = async () => {
  const data = await axios.get(
    'https://www.dotmarketcap.com/proxy/api/crownloan/get_crownload_kusama');
  console.log('dd', data);
}

export { getParticipants };
