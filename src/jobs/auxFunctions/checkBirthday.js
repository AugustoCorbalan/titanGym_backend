import { User, PendingNotification } from '../../../database/models/index.js';

export const checkBirthday = async () => {
  try {
    const today = new Date();
    const todayMonth = today.getMonth() + 1; // getMonth() es 0-based
    const todayDate = today.getDate();

    const users = await User.findAll({
      attributes: ['googleId', 'birthday']
    });

    for (const user of users) {
      if (!user.birthday) continue;

      const birthday = new Date(user.birthday);
      const birthdayMonth = birthday.getMonth() + 1;
      const birthdayDay = birthday.getDate();
      console.log('todayMonth', todayMonth);
      console.log('todayDate', todayDate);
      console.log('birthdayMonth', birthdayMonth);
      console.log('birthdayDay', birthdayDay);
      console.log('birthday', birthday);
      if (birthdayDay === todayDate && birthdayMonth === todayMonth) {
        // Crear una única notificación para el cumpleañero
        await PendingNotification.create({
          userId: user.googleId,
          typeNotification: "Cumpleaños"
        });

        console.log(`Notificación pendiente creada para el cumpleañero: userId ${user.googleId}`);
        return; // Ya que solo querés una notificación, salimos después del primero encontrado
      }
    }

    console.log("Hoy no hay cumpleaños.");

  } catch (error) {
    console.error("Error en checkBirthday:", error);
  }
};
