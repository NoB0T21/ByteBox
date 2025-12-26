import 'package:bytbox_app/components/types_files_display.dart';
import 'package:bytbox_app/utils/file_size.dart';
import 'package:bytbox_app/utils/file_type.dart';
import 'package:flutter/material.dart';

enum Type {images, videos, documents, others}

class FilesTypeScreen extends StatelessWidget {
  final List<dynamic> data ;
  final Type type;
  const FilesTypeScreen({
    super.key,
    required this.data,
    required this.type
  });

  @override
  Widget build(BuildContext context) {
    String types = 'images';
    if (type == Type.images) {
      types = 'image';
    } else if ( type == Type.videos) {
      types = 'video';
    }else if ( type == Type.documents) {
      types = 'document';
    }else{
      types = 'other';
    }


    final filteredFiles = data.where((file) {
      final type = FileUtils.getFileType(file['originalname']);
      return type['type'] == types;
    }).toList();
    final num sum = filteredFiles.fold(
      0,
      (total, file) => total + (file['fileSize'] ?? 0),
    );
    final totalSize = FileSize.format(sum);
    return Center(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                types,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18
                ),
              ),
              Spacer(),
              Text(
                totalSize,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 12
                ),
              ),
            ],
          ),
          const SizedBox(height: 8,),
          Expanded(child: TypesFilesDisplay(files: filteredFiles,types: types,)),
        ],
      ),
    );
  }
}