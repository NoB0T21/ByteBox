import 'dart:io';
import 'package:bytbox_app/provider/riverpod_api.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class BackendNotifier extends AsyncNotifier <Map<String, dynamic>?> {
  @override
  Future<Map<String, dynamic>?> build() async {
    return null;
  }

  final storage = FlutterSecureStorage();

  Future<void> registerUser(
    String name,
    String email,
    String password,
    File file
  ) async {
    final api = ref.read(backendApiProvider);
    state = await AsyncValue.guard(() async {
      final result = await api.registerUser(
        name, 
        email, 
        password, 
        file
      );
      final accessToken = result['token'];
      await storage.write(
        key: 'token', 
        value: accessToken
      );
      return result;
    });
  }

  Future<void> loginUser(
    String email,
    String password
  ) async {
    final api = ref.read(backendApiProvider);
    state = await AsyncValue.guard(() async {
      final result = await api.loginUser(
        email, 
        password
      );
      final accessToken = result['token'];
      final userid = result['user']['_id'];
      await storage.write(
        key: 'token', 
        value: accessToken
      );
      await storage.write(
        key: 'id', 
        value: userid
      );
      return result;
    });
  }

}

final backendNotifierProvider = AsyncNotifierProvider<BackendNotifier,Map<String, dynamic>?>(BackendNotifier.new);