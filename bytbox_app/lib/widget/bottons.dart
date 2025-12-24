import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final VoidCallback onTap;
  final String text;
  final bool isLoading;
  const CustomButton({
    super.key,
    required this.onTap,
    required this.text,
    required this.isLoading
  });

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    
    return TextButton(
      onPressed: isLoading ? null : onTap, 
      style: TextButton.styleFrom(
        backgroundColor: Color.fromRGBO(84, 17, 201, 1),
        minimumSize: Size(width,50),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(10.0)),
        )
      ),
      child: Text(
        text,
        style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 15,
          color: Colors.white
        ),
      ),
    );
  }
}