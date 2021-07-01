const BitcoreLib = require('bitcore-lib');
import { AbstractBitcoreLibDeriver } from '../btc';

export class CrsDeriver extends AbstractBitcoreLibDeriver {
  bitcoreLib = BitcoreLib;
}
