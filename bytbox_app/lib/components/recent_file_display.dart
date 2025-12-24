import 'package:bytbox_app/widget/file_card.dart';
import 'package:flutter/material.dart';

class RecentFileDisplay extends StatelessWidget {
  final List<dynamic> files;
  const RecentFileDisplay({
    super.key,
    required this.files
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

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Recent Files',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 17,
          ),
        ),
        const SizedBox(height: 10),
        Expanded(
          child: GridView.builder(
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
          ),
        ),
      ],
    );
  }
}
