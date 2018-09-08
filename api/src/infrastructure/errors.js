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

class Unauthorized extends Error {
  constructor(message) {
    super();
    this.message = message || 'Unauthorized';
  }
}

module.exports = {
  Client,
  NotImplemented,
  Unauthorized,
};
