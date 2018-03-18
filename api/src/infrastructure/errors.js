class NotImplemented extends Error {
  constructor(message) {
    super();
    this.message = message || 'Function not implemented.';
  }
}

class Client extends Error {
  constructor(message) {
    super();
    this.message = message || 'Client error.';
  }
}

module.exports = {
  NotImplemented,
  Client,
};
