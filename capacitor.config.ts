import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.kennycallado',
  appName: 'questions-app',
  webDir: 'dist',
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  },
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
    hostname: 'questions.kennycallado.dev/app',
  },
};

export default config;
