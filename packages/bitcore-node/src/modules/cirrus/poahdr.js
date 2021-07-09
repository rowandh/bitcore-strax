'use strict';

var _ = require('lodash');
var inherits = require('util').inherits;
var bitcore = require('bitcore-lib');
var p2p = require('bitcore-p2p');
var Message = p2p.Messages.Message;
var utils = require('./utils');
var BufferReader = bitcore.encoding.BufferReader;
var BufferWriter = bitcore.encoding.BufferWriter;
var $ = bitcore.util.preconditions;

/**
 * Query another peer about block headers. It can query for multiple block hashes,
 * and the response will contain all the chains of blocks starting from those
 * hashes.
 * @param {Object=} options
 * @param {Array=} options.starts - Array of buffers or strings with the starting block hashes
 * @param {Buffer=} options.stop - Hash of the last block
 * @extends Message
 * @constructor
 */
function PoahdrMessage(arg, options) {
  Message.call(this, options);
  this.BlockHeader = options.BlockHeader;
  this.command = 'poahdr';
  $.checkArgument(
    _.isUndefined(arg) || (Array.isArray(arg) && arg[0] instanceof this.BlockHeader),
    'First argument is expected to be an array of BlockHeader instances'
  );
  this.headers = arg;
}
inherits(PoahdrMessage, Message);

PoahdrMessage.prototype.setPayload = function(payload) {
  $.checkArgument(payload && payload.length > 0, 'No data found to create Headers message');
  var parser = new BufferReader(payload);
  var count = parser.readVarintNum();

  // The next item is a smartcontractpoablockheader, which is a poablockheader + some extra fields
  /* 
    version 536870912 4 bytes
    hashprevblock 39 32 bytes
    hashmerkleroot 71 32 bytes
    time 75 4 bytes
    bits 79 4 bytes
    nonce 83 4 bytes
    blocksignature 154 71 bytes (varstring)
    hashstateroot 186 32 bytes
    receiptroot 218 32 bytes
    logsbloom 474 256 bytes
  */
  this.headers = [];
  for (var i = 0; i < count; i++) {
    var header = this.BlockHeader.fromBufferReader(parser, false);

    // var version = parser.readUInt32LE();
    // var hash = parser.read(32);
    // var hashMerkleRoot = parser.read(32);
    // var time = parser.read(4);
    // var bits = parser.read(4);
    // var nonce = parser.read(4);
    // Read remaining cirrus params.
    var signatureLen = parser.readVarintNum();
    var signature = parser.read(signatureLen);
    var hashStateRoot = parser.read(32);
    var receiptRoot = parser.read(32);
    var logsBloom = parser.read(256);    

    this.headers.push(header);
  }

  utils.checkFinished(parser);
};

PoahdrMessage.prototype.getPayload = function() {
  var bw = new BufferWriter();
  bw.writeUInt32LE(this.version);
  bw.writeVarintNum(this.starts.length);
  for (var i = 0; i < this.starts.length; i++) {
    bw.write(this.starts[i]);
  }
  if (this.stop.length !== 32) {
    throw new Error('Invalid hash length: ' + this.stop.length);
  }
  bw.write(this.stop);
  return bw.concat();
};

module.exports = PoahdrMessage;