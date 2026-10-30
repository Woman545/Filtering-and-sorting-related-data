const { User, Post, Author, Book, Student, Course, Order, Item, sequelize } = require('./models');

async function seed() {
  await sequelize.sync({ force: true });

  const user1 = await User.create({ name: 'Alice', email: 'alice@example.com', isActive: true });
  const user2 = await User.create({ name: 'Bob', email: 'bob@example.com', isActive: true });
  const user3 = await User.create({ name: 'Charlie', email: 'charlie@example.com', isActive: false });

  await Post.bulkCreate([
    { title: 'Post 1 (Recent)', publishedAt: '2023-05-01', status: 'published', authorId: user1.id },
    { title: 'Post 2 (Old)', publishedAt: '2022-12-01', status: 'published', authorId: user1.id },
    { title: 'Post 3 (Draft)', publishedAt: '2023-06-01', status: 'draft', authorId: user2.id },
    { title: 'Post 4 (Recent Pub)', publishedAt: '2023-07-01', status: 'published', authorId: user2.id },
  ]);

  const author1 = await Author.create({ firstName: 'Leo', lastName: 'Tolstoy', country: 'Russia' });
  const author2 = await Author.create({ firstName: 'Fyodor', lastName: 'Dostoevsky', country: 'Russia' });
  const author3 = await Author.create({ firstName: 'No', lastName: 'Books', country: 'Nowhere' });

  await Book.bulkCreate([
    { title: 'War and Peace', year: 1869, genre: 'Novel', authorId: author1.id },
    { title: 'Anna Karenina', year: 1878, genre: 'Novel', authorId: author1.id },
    { title: 'Crime and Punishment', year: 1866, genre: 'Novel', authorId: author2.id },
  ]);

  const student1 = await Student.create({ name: 'Ivan', group: 'CS-101' });
  const student2 = await Student.create({ name: 'Maria', group: 'CS-102' });

  const course1 = await Course.create({ title: 'Math', credits: 2 });
  const course2 = await Course.create({ title: 'Advanced Physics', credits: 5 });
  const course3 = await Course.create({ title: 'Computer Science', credits: 4 });

  await student1.addCourse(course1, { through: { grade: 80 } });
  await student1.addCourse(course2, { through: { grade: 90 } });
  await student2.addCourse(course3, { through: { grade: 85 } });

  const order1 = await Order.create({ number: 'ORD-001', status: 'paid' });
  const order2 = await Order.create({ number: 'ORD-002', status: 'new' });

  await Item.bulkCreate([
    { productName: 'Laptop', quantity: 1, price: 1000.00, orderId: order1.id },
    { productName: 'Mouse', quantity: 5, price: 20.00, orderId: order1.id },
    { productName: 'Keyboard', quantity: 3, price: 50.00, orderId: order2.id },
    { productName: 'Monitor', quantity: 2, price: 200.00, orderId: order2.id },
  ]);

  console.log('Тестовые данные успешно добавлены!\n');
}

module.exports = seed;