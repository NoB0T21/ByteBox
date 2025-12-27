import 'package:bytbox_app/components/auth_wrapper.dart';
import 'package:bytbox_app/screens/home_screen.dart';
import 'package:bytbox_app/screens/login_screen.dart';
import 'package:bytbox_app/screens/register_screen.dart';
import 'package:bytbox_app/theme/main_app_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:media_store_plus/media_store_plus.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  await MediaStore.ensureInitialized();
  MediaStore.appFolder = 'BytBox';
  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    
    return MaterialApp(
      title: 'Flutter Demo',
      theme: MainAppTheme.lightTheme(),
      darkTheme: MainAppTheme.darkTheme(),
      themeMode: ThemeMode.system,
      routes: {
        LoginScreen.routename: (context) => const LoginScreen(),
        RegisterScreen.routeName: (context) => const RegisterScreen(),
        HomeScreen.routeName: (context) => const HomeScreen()
      },
      home: const AuthWrapper(),
    );
  }
}