import 'package:bytbox_app/provider/riverpod_api.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

enum AuthStatus { loading, authenticated, unauthenticated }

final authProvider = FutureProvider<AuthStatus>((ref) async {
  final api = ref.read(backendApiProvider);
  final token = await api.verify();

  if (token['success']) {
    return AuthStatus.authenticated;
  }
  return AuthStatus.unauthenticated;
});