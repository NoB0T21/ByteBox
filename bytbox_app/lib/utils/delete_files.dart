
import 'package:bytbox_app/api/backend_api_client.dart';
import 'package:bytbox_app/backend_notifier/data_notifier.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

Future<void> deleteFile(
  WidgetRef ref,
  String fileId
) async{
  final api = BackendApiClient();

  try {
    final response = await api.deleteFiles(fileId);
    if(response['success']){
      ref
        .read(dataNotifierProvider.notifier)
        .removeFileLocally(fileId);
    }
  } catch (e) {
    throw Exception(e);
  }
}