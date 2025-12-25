import 'package:bytbox_app/api/backend_api_client.dart';
import 'package:bytbox_app/backend_notifier/data_notifier.dart';
import 'package:bytbox_app/utils/file_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

Future<void> uploadAllFiles(
  WidgetRef ref,
  List<UploadFile> files,
  VoidCallback refresh,
) async {
  final backendApi = BackendApiClient();

  for (var file in files) {
    file.uploading = true;
    refresh();

    try {
      final res = await backendApi.uploadFile(
        file,
        (double progress) {
          file.progress = progress;
          refresh();
        },
      );

      ref
        .read(dataNotifierProvider.notifier)
        .addFileLocally(res);

      file.success = true;
    } catch (e) {
      file.error = true;
    }

    file.uploading = false;
    refresh();
  }
}
