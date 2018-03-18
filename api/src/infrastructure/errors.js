class NotImplemented extends Error {
  constructor(message) {
    super();
    this.message = message || 'Function not implemented.';
  }
}

module.exports = {
  NotImplemented,
};
