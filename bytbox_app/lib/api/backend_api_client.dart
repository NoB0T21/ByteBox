import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:bytbox_app/utils/file_model.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:media_store_plus/media_store_plus.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';

class BackendApiClient {
  final String url = dotenv.env['BACKEND_URL']!;
  final _storage = FlutterSecureStorage();

  Future<Map<String,dynamic>> registerUser({
    required String name,
    required String email,
    required String password,
    File? file,
    String? profilurl,
  }) async {
    final uri = Uri.parse('$url/user/signup');
    final request = http.MultipartRequest('POST', uri);
    request.files.clear();

    request.fields['name'] = name;
    request.fields['email'] = email;
    request.fields['password'] = password;

    if(profilurl == null){
      if(file != null){
        request.files.add(
          await http.MultipartFile.fromPath(
            'file',
            file.path,
          ),
        );
      }
    }else{
      request.fields['picture'] = profilurl;
    }

    final response = await request.send();
    final responseBody = await response.stream.bytesToString();
    final body = jsonDecode(responseBody);
    if(response.statusCode != 200 && response.statusCode!=201){
      if(profilurl != null && response.statusCode==202){
        return jsonDecode(responseBody);
      }
      if(response.statusCode==202){
        throw Exception('users already exist');
      }
      throw Exception(body['message'] ?? 'Something went wrong');
    }
    return jsonDecode(responseBody);
  }

  Future<Map<String,dynamic>> loginUser(
    String email,
    String password,
  ) async {
    final response = await http.post(
      Uri.parse('$url/user/signin'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );
    final responseBody = jsonDecode(response.body);
    if(response.statusCode != 200 && response.statusCode!=201){
      if(response.statusCode==202){
        throw Exception( 'Something went wrong');
      }
      throw Exception('Something went wrong');
    }
    return responseBody;
  }
  
  Future<Map<String,dynamic>> verify() async {
    final token = await _storage.read(key: 'token');
    final response = await http.get(
      Uri.parse('$url/user/valid'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );
    if(response.statusCode != 200){
      throw Exception('Something went wrong');
    }
    final responseBody = jsonDecode(response.body);
    return responseBody;
  }
  

  Future<Map<String,dynamic>> getRecentFiles() async {
    final token = await _storage.read(key: 'token');

    final response = await http.get(
      Uri.parse('$url/file/getfile'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      }
    );
    if(response.statusCode != 200){
      throw Exception('Something went wrong');
    }
    final responseBody = jsonDecode(response.body);
    return responseBody;
  }

  Future<Map<String,dynamic>> uploadFile(
    UploadFile uploadFile,
    Function(double) onprogress
  ) async {
    final token = await _storage.read(key: 'token');
    final userid = await _storage.read(key: 'id');
    final file = uploadFile.file;
    final totalBytes = await file.length();
    final maxSize = 50 * 1024 * 1024;
    if (totalBytes > maxSize) {
      throw Exception('File size exceeds 50MB');
    }
    int sentBytes = 0;

    final stream = http.ByteStream(
      uploadFile.file.openRead().transform(
        StreamTransformer.fromHandlers(
          handleData: (data, sink) {
            sentBytes += data.length;
            onprogress(sentBytes/totalBytes);
            sink.add(data);
          },
        )
      )
    );
    final uri = Uri.parse('$url/file/upload');
    final request = http.MultipartRequest('POST', uri);
    request.files.clear();

    request.headers.addAll({
      'Authorization': 'Bearer $token',
      'Accept': 'application/json',
    });

    if (userid == null) {
      throw Exception('User ID is missing');
    }
    
    request.fields['owner'] = userid;

    request.files.add(
      http.MultipartFile(
        'file',
        stream,
        totalBytes,
        filename: basename(file.path),
      ),
    );

    final response = await request.send();
    if(response.statusCode != 200){
      throw Exception('Something went wrong');
    }
    final responseBody = await response.stream.bytesToString();
    final responseb= jsonDecode(responseBody);
    return responseb['newFile'];
  }

  Future<Map<String,dynamic>> deleteFiles(
    String fileId
  ) async {
    final token = await _storage.read(key: 'token');

    final response = await http.delete(
      Uri.parse('$url/file/delete/$fileId'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      }
    );
    if(response.statusCode != 200){
      throw Exception('Something went wrong');
    }
    final responseBody = jsonDecode(response.body);
    return responseBody;
  }

  Future<Map<String,dynamic>> updateUser(
    String fileId,
    String originalname,
  ) async {
    final token = await _storage.read(key: 'token');
    final response = await http.post(
      Uri.parse('$url/file/rename/$fileId'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'name': originalname,
      }),
    );
    final responseBody = jsonDecode(response.body);
    if(response.statusCode != 200){
      throw Exception('Something went wrong');
    }
    return responseBody;
  }

  Future<void> downloadFile({
  required String fileName,
  required String url,
  required Function(double progress) onProgress,
}) async {
  final request = http.Request('GET', Uri.parse(url));
  final response = await request.send();

  if (response.statusCode != 200) {
    throw Exception('Download failed: ${response.statusCode}');
  }

  final totalBytes = response.contentLength ?? 0;
  int downloadedBytes = 0;

  // 1️⃣ Download to temp (app-safe)
  final tempDir = await getApplicationDocumentsDirectory();
  final tempFile = File('${tempDir.path}/$fileName');
  final sink = tempFile.openWrite();

  try {
    await response.stream.listen(
      (chunk) {
        downloadedBytes += chunk.length;
        sink.add(chunk);

        if (totalBytes > 0) {
          onProgress(downloadedBytes / totalBytes);
        }
      },
      onDone: () async {
        await sink.flush();
        await sink.close();
      },
      onError: (e) async {
        await sink.close();
        throw Exception(e);
      },
      cancelOnError: true,
    ).asFuture();
  } catch (e) {
    await sink.close();
    rethrow;
  }

  // 2️⃣ Save to REAL Downloads using MediaStore (Google Drive way)
  final mediaStore = MediaStore();

  await mediaStore.saveFile(
      tempFilePath: tempFile.path,
      dirType: DirType.download,
      dirName: DirName.download
    );

  // 3️⃣ Cleanup temp file
  if (await tempFile.exists()) {
    await tempFile.delete();
  }
}

}
