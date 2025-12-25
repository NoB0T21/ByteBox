import 'dart:io';
import 'package:bytbox_app/components/progress.dart';
import 'package:bytbox_app/utils/file_model.dart';
import 'package:bytbox_app/utils/upload_all_file.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class UploadScreen extends ConsumerStatefulWidget {
  const UploadScreen({super.key});

  @override
  ConsumerState<UploadScreen> createState() => _UploadScreenState();
}

class _UploadScreenState extends ConsumerState<UploadScreen> {
  List<UploadFile> uploadFiles = [];

  void refresh() => setState(() {});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('he;;;ppkdok'),
        ElevatedButton(
          onPressed: () async {
            final result = await FilePicker.platform.pickFiles(
              allowMultiple: true,
              type: FileType.any,
            );

            if (result == null) return;
              uploadFiles = result.paths
                  .where((p) => p != null)
                  .map((p) => UploadFile(file: File(p!)))
                  .toList();

            setState(() {});

            await uploadAllFiles(
              ref,
              uploadFiles, 
              () {
                setState(() {});
              },
            );
          },
          child: const Text('Pick Files'),
        ),

        Expanded(
          child: ListView.builder(
            itemCount: uploadFiles.length,
            itemBuilder: (context, index) {
              return FileCard(file: uploadFiles[index]);
            },
          ),
        ),
      ],
    );
  }
}