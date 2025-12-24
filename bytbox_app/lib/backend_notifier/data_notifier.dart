import 'package:bytbox_app/provider/riverpod_api.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class DataNoyifier extends AsyncNotifier<Map<String,dynamic>>{
  @override
  Future<Map<String,dynamic>> build() async {
    final api = ref.watch(backendApiProvider);
    final result = await api.getRecentFiles();
    return result;
  }
  Future<Map<String,dynamic>> getRecentFile() async {
    final api = ref.watch(backendApiProvider);
    final result = await api.getRecentFiles();
    return result;
  }
}

final dataNotifierProvider = AsyncNotifierProvider<DataNoyifier,Map<String,dynamic>>(DataNoyifier.new);
