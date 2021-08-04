import { BitcoreLib } from 'bitcore-lib';
import { AbstractBitcoreLibDeriver } from '../btc';

export class CrsDeriver extends AbstractBitcoreLibDeriver {
  bitcoreLib = BitcoreLib;
}
