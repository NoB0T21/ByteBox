import 'package:bytbox_app/widget/file_card.dart';
import 'package:flutter/material.dart';

class TypesFilesDisplay extends StatelessWidget {
  final List<dynamic> files;
  final String types;
  const TypesFilesDisplay({
    super.key,
    required this.files,
    required this.types
  });

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;

    int crossAxisCount;
    if (width < 600) {
      crossAxisCount = 1;
    } else if (width < 1000) {
      crossAxisCount = 2;
    } else if (width < 1400) {
      crossAxisCount = 3;
    } else {
      crossAxisCount = 4;
    }

    return files.isEmpty
      ? const Center(child: Text('No files found'))
      :GridView.builder(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: crossAxisCount,
        childAspectRatio: 3,
        mainAxisSpacing: 16,
        crossAxisSpacing: 16,
      ),
      itemCount: files.length,
      itemBuilder: (_, index) {
        final file = files[index];
        return FileCard(file: file);
      },
    );
  }
}