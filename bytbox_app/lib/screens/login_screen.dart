import 'package:bytbox_app/backend_notifier/backend_notifier.dart';
import 'package:bytbox_app/screens/home_screen.dart';
import 'package:bytbox_app/screens/register_screen.dart';
import 'package:bytbox_app/utils/custom_snakebar.dart';
import 'package:bytbox_app/widget/bottons.dart';
import 'package:bytbox_app/widget/inputField.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class LoginScreen extends ConsumerStatefulWidget {
  static String routename = '/login';
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  late final TextEditingController _email;
  late final TextEditingController _password;

  @override
  void initState() {
    super.initState();
    _email = TextEditingController();
    _password = TextEditingController();
  }

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    ref.listen(backendNotifierProvider, (prev, next){
      next.whenOrNull(
        error: (error, _) {
          final message = error is Exception
            ? error.toString().replaceFirst('Exception: ', '')
            : 'Something went wrong';
          CustomSnakebar.show(context, message, Type.error);
        },
        data: (d){
          if (d == null) return;
          if(d['success']==true){
            CustomSnakebar.show(context, 'login Success', Type.success);
            _email.clear();
            _password.clear();
            Navigator.pushReplacementNamed(context, HomeScreen.routeName);
          } else {
            CustomSnakebar.show(
                context, d['message'] ?? 'Login failed', Type.error);
          }
        }
      );
    });
    final registerState = ref.watch(backendNotifierProvider);
    return Scaffold(
      appBar: AppBar(
        leading: Image(
          image: AssetImage('assets/images/Logo.png'),
          fit: BoxFit.contain,
        ),
        leadingWidth: 90,
        titleSpacing: 0,
        title: Text('ByteBox'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(22.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "hey!! Welcome Back",
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold
                ),
              ),
              SizedBox(height: 10,),
              CustomTextfield(
                showpasswoard: false,
                controller: _email, 
                hintText: 'Email', 
                keyboardType: TextInputType.emailAddress
              ),
              SizedBox(height: 10,),
              CustomTextfield(
                controller: _password, 
                showpasswoard: true,
                hintText: 'Passwoard', 
                keyboardType: TextInputType.text
              ),
              SizedBox(height: 25,),
              CustomButton(
                onTap: () async{
                  if(_password.text.isEmpty || _email.text.isEmpty){
                    CustomSnakebar.show(context, 'all field required', Type.info);
                    return;
                  }
                  ref.read(backendNotifierProvider.notifier).
                  loginUser(_email.text, _password.text);
                }, 
                isLoading: registerState.isLoading,
                text: registerState.isLoading? 'Loading' : 'Sign in'
              ),
              SizedBox(height: 10,),
              GestureDetector(
                onTap: () {
                  Navigator.pushReplacementNamed(context, RegisterScreen.routeName);
                },
                child: Text(
                  'Not register yet! register here..',
                ),
              ),
              SizedBox(height: 25,),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    height: 1, 
                    color: ColorScheme.of(context).onSurface,
                    width: 100,
                  ),
                  SizedBox(width: 10,),
                  Text('or'),
                  SizedBox(width: 10,),
                  Container(
                    height: 1, 
                    color: ColorScheme.of(context).onSurface,
                    width: 100,
                  ),
                ],
              )
            ],
          ),
        )
      ),
    );
  }
}