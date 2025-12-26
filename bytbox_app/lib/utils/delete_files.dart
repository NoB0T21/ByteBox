
import 'package:bytbox_app/api/backend_api_client.dart';
import 'package:bytbox_app/backend_notifier/data_notifier.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

Future<Map<String, dynamic>> deleteFile(
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
    return response;
  } catch (e) {
    throw Exception(e);
  }
}

Future<Map<String, dynamic>> updateFile(
  WidgetRef ref,
  String fileId,
  String originalname,
) async{
  final api = BackendApiClient();

  try {
    final response = await api.updateUser(fileId,originalname);
    if(response['success']){
      ref
        .read(dataNotifierProvider.notifier)
        .renameFileLocally(fileId,response['file']['originalname']);
    }
    return response;
  } catch (e) {
    throw Exception(e);
  }
}