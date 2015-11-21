
function classDecorator(constructor) {
  console.log(arguments);
};

function propertyDecorator(target, name, descriptor) {
  console.log(arguments);
};

function countCalls(target, name, descriptor) {
  const method = descriptor.value;

  descriptor.value = function (...args) {
    this[`${name}_counter`] = (this[`${name}_counter`] || 0) + 1;
    return method.apply(this, args);
  };
};

function handleInputChange(constructor) {
  constructor.prototype.handleInputChange = function handleInputChange({ target }) {
    this.setState({ [target.name]: target.value });
  };
};

export {
  classDecorator,
  propertyDecorator,
  countCalls,
  handleInputChange,
};
