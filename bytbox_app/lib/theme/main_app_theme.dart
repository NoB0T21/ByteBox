import 'package:bytbox_app/theme/appbar_theme.dart';
import 'package:flutter/material.dart';

final lightcolorScheme = ColorScheme.fromSeed(
  seedColor: Color.fromRGBO(105, 20, 255, 1),
  brightness: Brightness.light,
);
final darkcolorScheme = ColorScheme.fromSeed(
  seedColor: Color.fromRGBO(105, 20, 255, 1),
  brightness: Brightness.dark,
);

class MainAppTheme {
  static ThemeData lightTheme () {
    return ThemeData(
      colorScheme: lightcolorScheme,
      appBarTheme: AppbarThemes.appBarTheme(lightcolorScheme.onSurface),
      useMaterial3: true
    );
  }

  static ThemeData darkTheme () {
    return ThemeData(
      colorScheme: darkcolorScheme,
      appBarTheme: AppbarThemes.appBarTheme(darkcolorScheme.onSurface),
      useMaterial3: true
    );
  }
}