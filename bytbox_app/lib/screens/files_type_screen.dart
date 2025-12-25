import 'package:bytbox_app/components/types_files_display.dart';
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
    return Center(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            types,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 18
            ),
          ),
          const SizedBox(height: 8,),
          Expanded(child: TypesFilesDisplay(files: filteredFiles,types: types,)),
        ],
      ),
    );
  }
}