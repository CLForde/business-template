import { businessInfo as barima } from './clients/barima';
import { businessInfo as kaPainting } from './clients/ka-painting';

export function getClient(client: string) {
  switch (client) {
    case 'ka-painting':
      return kaPainting;

    case 'barima':
    default:
      return barima;
  }
}
