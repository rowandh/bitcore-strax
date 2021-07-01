import { BaseModule } from '..';
import { CRSStateProvider } from '../../providers/chain-state/cirrus/cirrus';
import { CirrusP2PWorker } from './p2p';
import { VerificationPeer } from './VerificationPeer';

export default class CirrusModule extends BaseModule {
  constructor(services: BaseModule['bitcoreServices']) {
    super(services);
    services.Libs.register('CRS', 'bitcore-lib', 'bitcore-p2p');
    services.P2P.register('CRS', CirrusP2PWorker);
    services.CSP.registerService('CRS', new CRSStateProvider());
    services.Verification.register('CRS', VerificationPeer);
  }
}
