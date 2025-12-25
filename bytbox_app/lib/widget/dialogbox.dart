import 'package:flutter/material.dart';

class Dialogbox extends StatelessWidget {
  final String title;
  final String content;
  final String cancel;
  final String conferm;
  final VoidCallback onTap;
  const Dialogbox({
    super.key,
    required this.title,
    required this.content,
    required this.cancel,
    required this.conferm,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: AlertDialog(
        title: Text(title),
        content: Text(content),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
            }, 
            child: Text(
              cancel,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.blue
              ),
            )
          ),
          TextButton(
            onPressed: () {
              onTap();
              Navigator.of(context).pop();
            }, 
            child: Text(
              conferm,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.red
              ),
            )
          )
        ],
      ),
    );
  }
}