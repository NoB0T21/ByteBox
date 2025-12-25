import 'package:bytbox_app/utils/file_type.dart';
import 'package:flutter/material.dart';

class FileCard extends StatelessWidget {
  final Map file;
  const FileCard({
    super.key,
    required this.file
  });

  @override
  Widget build(BuildContext context) {
    final type = FileUtils.getFileType(file['originalname']);

    ImageProvider getImageProvider(file) {
      if (type['type']=='image') {
        return NetworkImage(file);
      } else if (type['type']=='other'){
        return AssetImage('assets/images/unknown.png');
      }else{
        return AssetImage('assets/images/${type['extension']}.png');
      }
    }

    return Card(
      color: Theme.of(context).colorScheme.onSecondaryFixed,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 8),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                shape: type['type']=='image' ? BoxShape.circle : BoxShape.rectangle,
                image: DecorationImage(
                  image: getImageProvider(file['imageURL']),
                  fit: BoxFit.cover
                )
              ),
            ),
            Spacer(),
            SizedBox(
              width: 160,
              child: Text(
                file['originalname'],
                overflow: TextOverflow.ellipsis,
                maxLines: 3,
              ),
            ),
            Spacer(),
            Icon(Icons.menu_rounded)
          ],
        ),
      ),
    );
  }
}