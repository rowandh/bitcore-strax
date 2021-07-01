import { CirrusInternalStateProvider } from '../internal/cirrus-internal';

export class CRSStateProvider extends CirrusInternalStateProvider {
  constructor(chain: string = 'CRS') {
    super(chain);
  }
}
