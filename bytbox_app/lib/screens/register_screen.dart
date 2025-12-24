import 'dart:io';

import 'package:bytbox_app/backend_notifier/backend_notifier.dart';
import 'package:bytbox_app/screens/login_screen.dart';
import 'package:bytbox_app/utils/custom_snakebar.dart';
import 'package:bytbox_app/widget/bottons.dart';
import 'package:bytbox_app/widget/inputField.dart';
import 'package:bytbox_app/widget/profile_upload_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class RegisterScreen extends ConsumerStatefulWidget {
  static String routeName = '/register';
  const RegisterScreen({super.key});

  @override
  ConsumerState<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> {
  late final TextEditingController _name;
  late final TextEditingController _email;
  late final TextEditingController _password;
  late final TextEditingController _confirmpassword;
  File? _profileImage;

  @override
  void initState() {
    super.initState();
    _name = TextEditingController();
    _email = TextEditingController();
    _password = TextEditingController();
    _confirmpassword = TextEditingController();
  }

  @override
  void dispose() {
    _name.dispose();
    _email.dispose();
    _password.dispose();
    _confirmpassword.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    ref.listen(backendNotifierProvider, (prev, next){
      next.whenOrNull(
        error: (e,_) {
          final message = e is Exception
            ? e.toString().replaceFirst('Exception: ', '')
            : 'Something went wrong';
          CustomSnakebar.show(context, message, Type.error);
        },
        data: (_) {
          if (prev is AsyncLoading && next is AsyncData) {
            CustomSnakebar.show(context, 'Register Success', Type.success);
            _name.clear();
            _email.clear();
            _password.clear();
            _confirmpassword.clear();
          }
        }
      );
    });
    final registerState = ref.watch(backendNotifierProvider);
    return Scaffold(
      resizeToAvoidBottomInset: true,
      appBar: AppBar(
        leading: Image(
          image: AssetImage('assets/images/Logo.png'),
          fit: BoxFit.contain,
        ),
        leadingWidth: 90,
        titleSpacing: 0,
        title: Text('ByteBox'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 50),
          child: Center(
            child: Padding(
              padding: const EdgeInsets.all(22.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "hello!! Welcome To ByteBox",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold
                    ),
                  ),
                  SizedBox(height: 10,),
                  CustomTextfield(
                    showpasswoard: false,
                    controller: _name, 
                    hintText: 'Email', 
                    keyboardType: TextInputType.emailAddress
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
                  SizedBox(height: 10,),
                  CustomTextfield(
                    controller: _confirmpassword, 
                    showpasswoard: true,
                    hintText: 'Confirm Passwoard', 
                    keyboardType: TextInputType.text
                  ),
                  ProfileUploadButton(
                    onImageSelected: (image) {
                      setState(() {
                        _profileImage = image;
                      });
                    },
                  ),
                  SizedBox(height: 25,),
                  CustomButton(
                    onTap: () async{
                      if (_profileImage == null) {
                        CustomSnakebar.show(context, 'please upload image', Type.info);
                        return;
                      }
                      if(_password.text.isEmpty || _email.text.isEmpty || _name.text.isEmpty){
                        CustomSnakebar.show(context, 'all field required', Type.info);
                        return;
                      }
                      if(_password.text != _confirmpassword.text){
                        CustomSnakebar.show(context, 'passwoard does not match', Type.info);
                        return;
                      }
                      await ref.read(backendNotifierProvider.notifier)
                      .registerUser(
                        _name.text, 
                        _email.text, 
                        _password.text, 
                        _profileImage!
                      );
                    }, 
                    isLoading: registerState.isLoading,
                    text: registerState.isLoading? 'Loading' : 'Sign in'
                  ),
                  SizedBox(height: 10,),
                  GestureDetector(
                    onTap: () {
                      Navigator.pushReplacementNamed(context, LoginScreen.routename);
                    },
                    child: Text('Already register! Login here...')
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
        ),
      ),
    );
  }
}