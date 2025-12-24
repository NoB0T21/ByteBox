import 'dart:convert';
import 'dart:io';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

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

  Future<Map<String,dynamic>> getRecentFiles() async {
    final token = await _storage.read(key: 'token');

    final response = await http.get(
      Uri.parse('$url/file/getfile/ll'),
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
}
