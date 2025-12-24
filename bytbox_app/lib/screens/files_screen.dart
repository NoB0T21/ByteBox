import 'package:bytbox_app/components/recent_file_display.dart';
import 'package:bytbox_app/components/storage_size_display.dart';
import 'package:flutter/material.dart';

class FilesScreen extends StatelessWidget {
  final List<dynamic> data ;
  const FilesScreen({
    super.key,
    required this.data
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          StorageSizeDisplay(),
          const SizedBox(height: 8,),
          Expanded(child: RecentFileDisplay(files: data,)),
        ],
      ),
    );
  }
}