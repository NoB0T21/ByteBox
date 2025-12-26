import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:bytbox_app/utils/file_model.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:path/path.dart';

class BackendApiClient {
  final String url = dotenv.env['BACKEND_URL']!;
  final _storage = FlutterSecureStorage();

  Future<Map<String,dynamic>> registerUser(
    String name,
    String email,
    String password,
    File file,
  ) async {
    final uri = Uri.parse('$url/user/signup');
    final request = http.MultipartRequest('POST', uri);
    request.files.clear();

    request.fields['name'] = name;
    request.fields['email'] = email;
    request.fields['password'] = password;

    request.files.add(
      await http.MultipartFile.fromPath(
        'file',
        file.path,
      ),
    );

    final response = await request.send();

    final responseBody = await response.stream.bytesToString();
    final body = jsonDecode(responseBody);
    if(response.statusCode != 200 && response.statusCode!=201){
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
    print('$fileId,$originalname');
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
}
