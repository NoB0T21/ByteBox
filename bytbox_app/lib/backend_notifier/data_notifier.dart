import 'package:bytbox_app/provider/riverpod_api.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class DataNotifier extends AsyncNotifier<Map<String,dynamic>>{
  @override
  Future<Map<String,dynamic>> build() async {
    final api = ref.watch(backendApiProvider);
    return await api.getRecentFiles();
  }
  Future<Map<String,dynamic>> getRecentFile() async {
    final api = ref.watch(backendApiProvider);
    final result = await api.getRecentFiles();
    return result;
  }

  void addFileLocally(Map<String, dynamic> newFile) {
    final currentState = state;

    if (currentState is AsyncData<Map<String, dynamic>>) {
      final data = Map<String, dynamic>.from(currentState.value);

      final List files = List.from(data['file'] ?? []);
      files.insert(0, newFile); // add at top

      data['file'] = files;

      state = AsyncData(data);
    }
  }

  void removeFileLocally(String fileId) {
    final current = state;

    if (current is AsyncData<Map<String, dynamic>>) {
      final data = Map<String, dynamic>.from(current.value);

      final List files = List.from(data['file'] ?? []);
      files.removeWhere((f) => f['_id'] == fileId);

      data['file'] = files;
      state = AsyncData(data);
    }
  }
}

final dataNotifierProvider = AsyncNotifierProvider<DataNotifier,Map<String,dynamic>>(DataNotifier.new);
