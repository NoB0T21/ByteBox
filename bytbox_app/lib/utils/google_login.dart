import 'package:google_sign_in/google_sign_in.dart';

final GoogleSignIn _googleSignIn = GoogleSignIn(
  scopes: ['email', 'profile'],
);

Future<Map<String,dynamic>> signInWithGoogle() async {
  final user = await _googleSignIn.signIn();
  final auth = await user!.authentication;

  final idToken = auth.accessToken;
  return {
    'name': user.displayName,
    'email': user.email,
    'password': user.id,
    'picture': user.photoUrl,
    'token':idToken
  };
}
