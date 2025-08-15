import admin from '../../utils/firebaseConfig.js'; // configuración de Firebase
import { PendingNotification, User, Notification } from '../../../database/models/index.js';
import { Op } from 'sequelize';

export const sendPendingNotifications = async () => {
  try {
    //Traemos todas las notificaciones pendientes.
    const notif_pend_vencFactura = await PendingNotification.findAll({
      where:{ 
        typeNotification:  {
          [Op.in]: ['Venc._factura', 'Ultimo_dia_venc._fact.', 'Nueva_factura']
        }
      }
    });

    const notif_pend_cumpleaños = await PendingNotification.findAll({
      where:{ 
        typeNotification: 'Cumpleaños'
      }
    });
   
    for (const noti of notif_pend_vencFactura) {
        await sendNotifications_vencFactura(noti);
    }

    for (const noti of notif_pend_cumpleaños) {
        await sendNotifications_cumpleaños(noti);
    }

  } catch (error) {
    console.error('Error al procesar notificaciones pendientes:', error);
  }
};

const sendNotifications_vencFactura = async(notif_data)=>{
    try {
      const user = await User.findOne({
        where: {googleId: notif_data.userId},
        attributes: ['tokenFCM', 'googleId']
      })

      if ((!user || !user.tokenFCM)) {
        console.log("No se pudo notificar la factura vencida porque el usuario no tiene tokenFCM")
        console.error(`Usuario sin tokenFCM, ID: ${notif_data.userId}`);
      }
        const mensaje = {
            notification: {
                title: "Gimnasio Titán 💪",
                body: handlerTextMessage(notif_data.typeNotification),
            },
            token: user.tokenFCM,
            android: {
                notification: {
                icon: `${process.env.BASE_URL_FRONTEND}/favicon_background.ico`,  // <- URL del logo
                },
            },
            webpush: {
                notification: {
                icon: `${process.env.BASE_URL_FRONTEND}/favicon_background.ico`,  // <- Logo también para navegador
                badge: '',   // (opcional) ícono pequeño
                },
            }
        };

      try {
        const response = await admin.messaging().send(mensaje);
        console.log(`Notificación enviada`, response);
        //Guardo la notificación en mi base de datos.
        const newNotification = await Notification.create({
            typeNotification: notif_data.typeNotification,
            textNotification: handlerTextMessage(notif_data.typeNotification),
        });
        await user.addNotification(newNotification);
        // Elimino la notificacion pendiente
        await PendingNotification.destroy({
            where: {id: notif_data.id}
        });
      } catch (error) {
        console.error(`Error al enviar notificación ID:${notif_data.id}`, error);
      }
    } catch (error) {
        console.error('Error al procesar notificaciones pendientes:', error);
    }  
  }

  const handlerTextMessage = (typeNotification)=>{
    let text;
    switch (typeNotification) {
        case 'Venc._factura':
            text = "Tu factura se encuentra vencida, por favor dirigite a la pagina para regularizar el pago o comunicate con tu profesor."
            break;
        case 'Ultimo_dia_venc._fact.':
            text = "Hoy vence tu factura! Por favor dirigite a la pagina para regularizar el pago o comunicate con tu profesor."
            break;
        case 'Nueva_factura':
            text = "Ya se ecuentra disponible tu nueva factura!"
            break;
        default:
            text = ""
            break;
    }
    return text;
  }

export const sendNotifications_cumpleaños = async (notif_data) => {
  try {
    const cumpleañeroGoogleId = notif_data.userId;

    // Buscar al cumpleañero
    const cumpleañero = await User.findOne({
      where: { googleId: cumpleañeroGoogleId },
      attributes: ['googleId', 'name', 'tokenFCM']
    });

    if (!cumpleañero) {
      console.warn(`Cumpleañero con googleId ${cumpleañeroGoogleId} no encontrado`);
      return;
    }

    const allUsers = await User.findAll({
      attributes: ['googleId', 'name', 'tokenFCM']
    });

    for (const user of allUsers) {
      if (!user.tokenFCM) continue;

      let title = '';
      let body = '';

      if (user.googleId === cumpleañero.googleId) {
        title = '🎉 ¡Feliz cumpleaños!';
        body = `¡Que tengas un gran día, ${cumpleañero.name}! 🎂`;
      } else {
        title = '🎉 Cumpleaños de un alumno';
        body = `¡${cumpleañero.name} cumple años hoy! 🎈`;
      }

      const message = {
        notification: {
          title,
          body
        },
        token: user.tokenFCM, // Corrección: asegurarse que sea user.tokenFCM
        android: {
                notification: {
                icon: `${process.env.BASE_URL_FRONTEND}/favicon_background.ico`,  // <- URL del logo
                },
        },
        webpush: {
            notification: {
            icon: `${process.env.BASE_URL_FRONTEND}/favicon_background.ico`,  // <- Logo también para navegador
            badge: '',   // (opcional) ícono pequeño
            },
        }
      };

      try {
        await admin.messaging().send(message);
        console.log(`Notificación enviada a ${user.name}`);

        // Registrar como notificación enviada
        await Notification.create({
          userId: user.googleId,
          typeNotification: 'Cumpleaños',
          textNotification: JSON.stringify(message.notification) // Guardar solo el texto
        });

      } catch (error) {
        console.error(`Error al enviar notificación a ${user.name}:`, error);
      }
    }

    // Eliminar la notificación pendiente del cumpleañero
    await PendingNotification.destroy({
      where: { userId: cumpleañeroGoogleId, typeNotification: 'Cumpleaños' }
    });

  } catch (error) {
    console.error("Error en sendNotifications_cumpleaños:", error);
  }
};

//-------------------------------------------------------------------------------------------------------------------
export const sendNotifications_push = async (notif_data, users_data) => {
  try {
    for(const user of users_data){
      if ((!user || !user.tokenFCM)) {
        console.log("No se pudo notificar al usuario porque no tiene tokenFCM")
        console.error(`Usuario sin tokenFCM, ID: ${user.googleId}`);
      }
        const mensaje = {
            notification: {
                title: notif_data.titleNotification,
                body: notif_data.textNotification,
            },
            token: user.tokenFCM,
            android: {
                notification: {
                icon: `${process.env.BASE_URL_FRONTEND}/favicon_background.ico`,  // <- URL del logo
                },
            },
            webpush: {
                notification: {
                icon: `${process.env.BASE_URL_FRONTEND}/favicon_background.ico`,  // <- Logo también para navegador
                badge: '',   // (opcional) ícono pequeño
                },
            }
        };
  
      try {
        const response = await admin.messaging().send(mensaje);
        console.log(`Notificación enviada al usuario ${user.googleId}`, response);
      } catch (error) {
        console.error(`Error al enviar notificación ID:${notif_data.id}, usuarioID: ${user.googleId}`, error);
      }

    }
  } catch (error) {
      console.error('Error al enviar notificaciones push:', error);
  }  
}
