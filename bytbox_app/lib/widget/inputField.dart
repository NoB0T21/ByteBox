import 'package:flutter/material.dart';

class CustomTextfield extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final bool showpasswoard;
  final TextInputType keyboardType;
  const CustomTextfield({
    super.key,
    required this.controller,
    required this.hintText,
    required this.keyboardType,
    required this.showpasswoard
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: showpasswoard,
      decoration: InputDecoration(
        fillColor: ColorScheme.of(context).onSecondary,
        filled: true,
        hintText: hintText,
        border: InputBorder.none,
        enabledBorder: UnderlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide(
            width: 2
          ),
        ),
        focusedBorder: UnderlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide(
            width: 2
          ),
        ),
      ),
      keyboardType: keyboardType,
    );
  }
}