import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ShareFiles {
  static const _storage = FlutterSecureStorage();

  static Future<Widget> getIcon(
    List<dynamic> shareUsers,
  ) async {
    final id = await _storage.read(key: 'id');
    if (id == null) return const SizedBox();

    final isShared = shareUsers.any((u) => u['_id'] == id);

    return Icon(
      isShared ? Icons.people_alt_outlined : Icons.folder_shared_rounded,
      size: 20,
    );
  }
}
