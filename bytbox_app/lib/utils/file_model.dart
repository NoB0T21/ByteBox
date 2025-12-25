import 'dart:io';

class UploadFile {
  final File file;
  double progress; // 0.0 → 1.0
  bool uploading;
  bool success;
  bool error;

  UploadFile({
    required this.file,
    this.progress = 0,
    this.uploading = false,
    this.success = false,
    this.error = false,
  });
}
