import 'package:bytbox_app/api/backend_api_client.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final backendApiProvider = Provider<BackendApiClient>((ref)=> BackendApiClient());