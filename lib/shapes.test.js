const { Circle, Triangle, Square } = require('./shapes');

test('Circle renders correctly', () => {
  const circle = new Circle('red');
  expect(circle.render()).toBe('<circle cx="150" cy="100" r="50" fill="red" />');
});

test('Triangle renders correctly', () => {
  const triangle = new Triangle('blue');
  expect(triangle.render()).toBe('<polygon points="150,18 244,182 56,182" fill="blue" />');
});

test('Square renders correctly', () => {
  const square = new Square('green');
  expect(square.render()).toBe('<rect x="100" y="50" width="100" height="100" fill="green" />');
});
