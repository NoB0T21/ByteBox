import 'package:flutter/material.dart';

class AppbarThemes {
  static AppBarTheme appBarTheme (Color colors) {
    return AppBarTheme(
      titleTextStyle: TextStyle(
        fontSize: 22,
        fontWeight: FontWeight.bold,
        color: colors
      ),
      foregroundColor: colors,
    );
  }
}