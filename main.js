const { sequelize } = require('./models');
const seed = require('./seed');
const {
  getUsersWithRecentPosts,
  getAllAuthorsIncludingEmpty,
  getStudentsInAdvancedCourses,
  getOrdersWithBulkItems,
  getActiveUsersWithPublishedPosts,
} = require('./tasks');

async function main() {
  try {
    console.log('Инициализация и заполнение базы данных...');
    await seed();

    console.log('--- Задание 1: Пользователи с постами после 2023-01-01 ---');
    console.log(JSON.stringify(await getUsersWithRecentPosts(), null, 2));

    console.log('\n--- Задание 2: Все авторы (включая тех, у кого нет книг) ---');
    console.log(JSON.stringify(await getAllAuthorsIncludingEmpty(), null, 2));

    console.log('\n--- Задание 3: Студенты на курсах с credits > 3 ---');
    console.log(JSON.stringify(await getStudentsInAdvancedCourses(), null, 2));

    console.log('\n--- Задание 4: Заказы с товарами quantity > 2 ---');
    console.log(JSON.stringify(await getOrdersWithBulkItems(), null, 2));

    console.log('\n--- Задание 5: Активные пользователи с опубликованными постами ---');
    console.log(JSON.stringify(await getActiveUsersWithPublishedPosts(), null, 2));

  } catch (error) {
    console.error('Ошибка выполнения:', error);
  } finally {
    await sequelize.close();
    console.log('\n Соединение с базой данных закрыто.');
  }
}

main();