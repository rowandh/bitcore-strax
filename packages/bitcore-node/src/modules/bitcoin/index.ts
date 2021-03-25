import { BaseModule } from '..';
import { BTCStateProvider } from '../../providers/chain-state/btc/btc';
import { BitcoinP2PWorker } from './p2p';
import { VerificationPeer } from './VerificationPeer';

export default class BitcoinModule extends BaseModule {
  constructor(services: BaseModule['bitcoreServices']) {
    super(services);
    services.Libs.register('STRAX', 'bitcore-lib', 'bitcore-p2p');
    services.P2P.register('STRAX', BitcoinP2PWorker);
    services.CSP.registerService('STRAX', new BTCStateProvider());
    services.Verification.register('STRAX', VerificationPeer);
  }
}
