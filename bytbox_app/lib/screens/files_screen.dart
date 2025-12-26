import 'package:bytbox_app/components/recent_file_display.dart';
import 'package:bytbox_app/components/storage_size_display.dart';
import 'package:bytbox_app/utils/file_size.dart';
import 'package:flutter/material.dart';

class FilesScreen extends StatelessWidget {
  final List<dynamic> data ;
  const FilesScreen({
    super.key,
    required this.data
  });

  @override
  Widget build(BuildContext context) {
    final num sum = data.fold(
      0,
      (total, file) => total + (file['fileSize'] ?? 0),
    );
    final totalSize = FileSize.format(sum);
    return Center(
      child: Column(
        children: [
          StorageSizeDisplay(total: totalSize,),
          const SizedBox(height: 8,),
          Expanded(child: RecentFileDisplay(files: data,)),
        ],
      ),
    );
  }
}