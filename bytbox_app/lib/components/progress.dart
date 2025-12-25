import 'dart:io';

import 'package:bytbox_app/utils/file_type.dart';
import 'package:flutter/material.dart';
import 'package:bytbox_app/utils/file_model.dart';
import 'package:path/path.dart';

class FileCard extends StatelessWidget {
  final UploadFile file;

  const FileCard({super.key, required this.file});

  @override
  Widget build(BuildContext context) {
    final type = FileUtils.getFileType(basename(file.file.path));

    ImageProvider getImageProvider(file) {
      if (type['type']=='image') {
        return FileImage(File(file.file.path));
      }
      return AssetImage('assets/images/${type['extension']}.png');
    }

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                shape: type['type']=='image' ? BoxShape.circle : BoxShape.rectangle,
                image: DecorationImage(
                  image: getImageProvider(file),
                  fit: BoxFit.cover
                )
              ),
            ),
            Text(
              basename(file.file.path),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),

            const SizedBox(height: 8),

            LinearProgressIndicator(
              value: file.uploading ? file.progress : 0,
            ),

            const SizedBox(height: 6),

            Text(
              file.success
                  ? "✅ Uploaded"
                  : file.error
                      ? "❌ Failed"
                      : "${(file.progress * 100).toStringAsFixed(0)}%",
            ),
          ],
        ),
      ),
    );
  }
}
