import 'package:bytbox_app/backend_notifier/data_notifier.dart';
import 'package:bytbox_app/components/recent_file_display.dart';
import 'package:bytbox_app/components/storage_size_display.dart';
import 'package:bytbox_app/screens/files_screen.dart';
import 'package:bytbox_app/screens/login_screen.dart';
import 'package:bytbox_app/screens/upload_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class HomeScreen extends ConsumerStatefulWidget {
  static String routeName = '/home';
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  int currentPage = 0;
  @override
  Widget build(BuildContext context) {
    final dataState = ref.watch(dataNotifierProvider);
    final storage = FlutterSecureStorage();
    
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
        actions: [
          IconButton(
            onPressed: () async {
              setState(() {
                currentPage = 0;
              });
            }, 
            icon: Icon(Icons.home)
          ),
          IconButton(
            onPressed: () async {
              await storage.delete(key: 'token');
              if(!context.mounted) return;
              Navigator.popAndPushNamed(context, LoginScreen.routename);
            }, 
            icon: Icon(Icons.logout_rounded)
          ),
        ],
      ),
      body: dataState.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, _) => Center(child: Text('Error: $error')),
        data: (data) {
          List<Widget> screens = [
            data['file'].isEmpty
              ? const Center(child: Text('No files found'))
              : FilesScreen(data: data['file']),
            UploadScreen()
          ];
          return Padding(
            padding: const EdgeInsets.all(10.0),
            child: IndexedStack(
              index: currentPage,
              children: screens,
            )
          );
        },
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: currentPage,
        onTap: (value) {
          print(value);
          setState(() {
            currentPage = value;
          });
        },
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: ''
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add_circle_outline_rounded),
            label: ''
          ),
        ]
      ),
    );
  }
}