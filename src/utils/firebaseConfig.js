import admin from 'firebase-admin';
import serviceAccount from '../../gimnasio-titan-firebase-adminsdk-fbsvc-9f24960c6f.json' assert {type: "json"};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;