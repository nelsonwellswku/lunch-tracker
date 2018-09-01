const formatAsCurrency = (amount) => {
  const dollar = Number(amount).toLocaleString('us', 'currency');

  const arrAmount = dollar.split('.');
  if (arrAmount.length === 2) {
    const decimal = arrAmount[1];
    if (decimal.length === 1) {
      arrAmount[1] += '0';
    }
  }
  if (arrAmount.length === 1) {
    arrAmount.push('00');
  }

  return `$${arrAmount.join('.')}`;
};

module.exports = {
  formatAsCurrency,
};
