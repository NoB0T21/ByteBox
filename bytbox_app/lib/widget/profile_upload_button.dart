import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class ProfileUploadButton extends StatefulWidget {
  final Function(File?) onImageSelected;
  const ProfileUploadButton({
    super.key,
    required this.onImageSelected,
  });

  @override
  State<ProfileUploadButton> createState() => _ProfileUploadButtonState();
}

class _ProfileUploadButtonState extends State<ProfileUploadButton> {
  File? _image;
  final ImagePicker _picker = ImagePicker();

  Future<void> _pickImage() async {
    showModalBottomSheet(
      context: context,
      builder: (_) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.camera_alt_rounded),
              title: const Text('Camera'),
              onTap: () async {
                final image =
                    await _picker.pickImage(source: ImageSource.camera);
                if (image != null) {
                  final file = File(image.path);
                  setState(() => _image = file);
                  widget.onImageSelected(file);
                }
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: const Icon(Icons.photo),
              title: const Text('Gallery'),
              onTap: () async {
                final image =
                    await _picker.pickImage(source: ImageSource.gallery);
                if (image != null) {
                  final file = File(image.path);
                  setState(() => _image = file);
                  widget.onImageSelected(file);
                }
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        GestureDetector(
          onTap: _pickImage,
          child: CircleAvatar(
            radius: 40,
            backgroundColor: Colors.grey.shade300,
            backgroundImage: _image != null ? FileImage(_image!) : null,
            child: _image == null
                ? const Icon(
                    Icons.camera_alt,
                    size: 30,
                    color: Colors.black54,
                  )
                : null,
          ),
        ),
        const SizedBox(height: 8),
        const Text(
          'Upload profile picture',
          style: TextStyle(fontSize: 12),
        ),
      ],
    );
  }
}
