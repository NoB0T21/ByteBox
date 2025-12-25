import 'package:bytbox_app/utils/file_actions.dart';
import 'package:bytbox_app/utils/file_size.dart';
import 'package:bytbox_app/utils/file_type.dart';
import 'package:bytbox_app/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

enum Menus {delete, update}

class FileCard extends ConsumerWidget {
  final Map file;
  const FileCard({
    super.key,
    required this.file
  });
  
  @override
  Widget build(BuildContext context, WidgetRef ref) {
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
      color: Theme.of(context).colorScheme.surfaceContainer,
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
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  width: 160,
                  child: Text(
                    file['originalname'],
                    overflow: TextOverflow.ellipsis,
                    maxLines: 3,
                  ),
                ),
                SizedBox(height: 5,),
                Row(
                  children: [
                    Text(
                      FileSize.format(file['fileSize']),
                      style: TextStyle(
                        fontWeight: FontWeight.bold
                      ),
                    ),
                    SizedBox(width: 20),

                    if((file['shareuser'] as List).isNotEmpty)
                      FutureBuilder<Widget>(
                        future: ShareFiles.getIcon(file['shareuser']),
                        builder: (context, snapshot) {
                          if (!snapshot.hasData) return const SizedBox();
                          return snapshot.data!;
                        },
                      )
                  ],
                )
              ],
            ),
            Spacer(),
            PopupMenuButton(
              onSelected: (value) async {
                if (value == Menus.delete) {
                  showDeleteDialog(
                    context: context,
                    ref: ref,
                    fileId: file['_id'],
                  );
                }

                if (value == Menus.update) {
                  // handle update
                }
              },
              position: PopupMenuPosition.under,
              padding: EdgeInsetsGeometry.all(8),
              menuPadding: EdgeInsets.all(8),
              itemBuilder: (context) {
                return const [
                  PopupMenuItem<Menus>(
                    value: Menus.update,
                    child: Text('Update')
                  ),
                  PopupMenuItem<Menus>(
                    value: Menus.delete,
                    child: Text('Delete')
                  ),
                ];
              }
            )
          ],
        ),
      ),
    );
  }
}