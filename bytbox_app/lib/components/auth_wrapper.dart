import 'package:bytbox_app/provider/auth_provider.dart';
import 'package:bytbox_app/screens/home_screen.dart';
import 'package:bytbox_app/screens/login_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class AuthWrapper extends ConsumerWidget {
  const AuthWrapper({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    return authState.when(
      loading: () => const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      ),
      error: (_, __) => const LoginScreen(),
      data: (status) {
        if (status == AuthStatus.authenticated) {
          return const HomeScreen();
        }
        return const LoginScreen();
      },
    );
  }
}