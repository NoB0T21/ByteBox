class FileUtils {
  static Map<String, String> getFileType(String filename) {
    final parts = filename.split('.');

    if (parts.length < 2) {
      return {
        'type': 'other',
        'extension': '',
      };
    }

    final extension = parts.last.toLowerCase();
    String type = 'other';

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
        .contains(extension)) {
      type = 'image';
    } 
    else if (['mp4', 'mkv', 'avi', 'mov', 'wmv', 'webm']
        .contains(extension)) {
      type = 'video';
    } 
    else if (['mp3', 'wav', 'ogg', 'flac', 'm4a']
        .contains(extension)) {
      type = 'audio';
    } 
    else if ([
      'pdf', 'doc', 'docx', 'xls', 'xlsx',
      'txt', 'ppt', 'pptx'
    ].contains(extension)) {
      type = 'document';
    }

    return {
      'type': type,
      'extension': extension,
    };
  }
}
