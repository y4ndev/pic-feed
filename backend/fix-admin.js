'use strict';

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('D:/Frontend/React/pic-feed/backend/.tmp/data.db');

const email = 'y4nweb@gmail.com';
const newPasswordHash = '$2a$10$72KrZOsJY6rMfDJrXjlDJuEl8mWa1vBbmRUEz9eR9aogqDJN6ANNa';

db.serialize(() => {
  // Проверяем таблицы в базе
  db.all("SELECT name FROM sqlite_master WHERE type='table';", (err, tables) => {
    if (err) {
      console.error('Ошибка при получении таблиц:', err.message);
      return;
    }
    console.log('Таблицы в базе:', tables.map(t => t.name));

    // Ищем пользователя
    db.get(`SELECT * FROM admin_users WHERE email = ?`, [email], (err, row) => {
      if (err) {
        console.error('Ошибка при поиске пользователя:', err.message);
        return;
      }
      if (!row) {
        console.log(`Пользователь с email ${email} не найден.`);
        return;
      }

      console.log('Пользователь найден:', {
        id: row.id,
        email: row.email,
        is_active: row.is_active,
        blocked: row.blocked,
      });

      // Обновляем пользователя
      db.run(
        `UPDATE admin_users SET password = ?, is_active = 1, blocked = 0, updated_at = datetime('now') WHERE email = ?`,
        [newPasswordHash, email],
        function (err) {
          if (err) {
            console.error('Ошибка при обновлении пользователя:', err.message);
            return;
          }
          console.log(`Пользователь ${email} успешно обновлён.`);
        }
      );
    });
  });
});
