import 'package:bytbox_app/backend_notifier/data_notifier.dart';
import 'package:bytbox_app/screens/files_screen.dart';
import 'package:bytbox_app/screens/files_type_screen.dart';
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
  int currentPage = 5;
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
                currentPage = 5;
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
            FilesTypeScreen(data: data['file'], type: Type.images),
            FilesTypeScreen(data: data['file'], type: Type.videos),
            UploadScreen(),
            FilesTypeScreen(data: data['file'], type: Type.documents),
            FilesTypeScreen(data: data['file'], type: Type.others),
            data['file'].isEmpty
              ? const Center(child: Text('No files found'))
              : FilesScreen(data: (data['file'] as List<dynamic>? ?? []).take(9).toList())
          ];
          return Padding(
            padding: const EdgeInsets.all(12.0),
            child: IndexedStack(
              index: currentPage,
              children: screens,
            )
          );
        },
      ),
      bottomNavigationBar: BottomNavigationBar(
        iconSize: 27,
        selectedFontSize: 0,
        unselectedFontSize: 0,
        currentIndex: currentPage > 2 ? 0 : currentPage,
        onTap: (value) {
          setState(() {
            currentPage = value;
          });
        },
        items: [
          BottomNavigationBarItem(
            icon: Icon(
              Icons.image_outlined,
              color: currentPage == 0 ? Theme.of(context).colorScheme.primary : Colors.grey,
            ),
            label: ''
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.videocam_rounded,
              color: currentPage == 1 ? Theme.of(context).colorScheme.primary : Colors.grey,
            ),
            label: ''
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.add_circle_outline_rounded,
              color: currentPage == 2 ? Theme.of(context).colorScheme.primary : Colors.grey,
            ),
            label: ''
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.folder,
              color: currentPage == 3 ? Theme.of(context).colorScheme.primary : Colors.grey,
            ),
            label: ''
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.question_mark_rounded,
              color: currentPage == 4 ? Theme.of(context).colorScheme.primary : Colors.grey,
            ),
            label: ''
          ),
        ]
      ),
    );
  }
}