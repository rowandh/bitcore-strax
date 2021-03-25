const BitcoreLib = require('bitcore-lib');
import { AbstractBitcoreLibDeriver } from '../btc';

export class StraxDeriver extends AbstractBitcoreLibDeriver {
  bitcoreLib = BitcoreLib;
}
