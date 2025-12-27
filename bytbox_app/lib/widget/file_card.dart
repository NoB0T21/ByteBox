import 'package:bytbox_app/api/backend_api_client.dart';
import 'package:bytbox_app/utils/custom_snakebar.dart';
import 'package:bytbox_app/utils/file_actions.dart';
import 'package:bytbox_app/utils/file_size.dart';
import 'package:bytbox_app/utils/file_type.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

enum Menus { delete, update, download }

class FileCard extends ConsumerStatefulWidget {
  final Map file;

  const FileCard({
    super.key,
    required this.file,
  });

  @override
  ConsumerState<FileCard> createState() => _FileCardState();
}

class _FileCardState extends ConsumerState<FileCard> {
  double progress = 0;
  bool isDownloading = false;

  @override
  Widget build(BuildContext context) {
    final file = widget.file;
    final type = FileUtils.getFileType(file['originalname']);

    ImageProvider getImageProvider(String url) {
      if (type['type'] == 'image') {
        return NetworkImage(url);
      } else if (type['type'] == 'other') {
        return const AssetImage('assets/images/unknown.png');
      } else {
        return AssetImage('assets/images/${type['extension']}.png');
      }
    }

    return Card(
      color: Theme.of(context).colorScheme.surfaceContainer,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
        child: Row(
          children: [
            Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                shape: type['type'] == 'image'
                    ? BoxShape.circle
                    : BoxShape.rectangle,
                image: DecorationImage(
                  image: getImageProvider(file['imageURL']),
                  fit: BoxFit.cover,
                ),
              ),
            ),

            const SizedBox(width: 12),

            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    file['originalname'],
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),

                  Text(
                    FileSize.format(file['fileSize']),
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),

                  if (isDownloading) ...[
                    const SizedBox(height: 6),
                    LinearProgressIndicator(value: progress)
                  ],
                ],
              ),
            ),

            PopupMenuButton<Menus>(
              onSelected: (value) async {
                if (value == Menus.download) {
                  setState(() {
                    isDownloading = true;
                    progress = 0;
                  });

                  await BackendApiClient().downloadFile(
                    url: file['imageURL'],
                    fileName: file['originalname'],
                    onProgress: (p) {
                      if (mounted) {
                        setState(() => progress = p);
                      }
                    },
                  );

                  if (mounted) {
                    setState(() => isDownloading = false);
                  }
                    CustomSnakebar.show(context, 'Download completed', Type.success);
                }

                if (value == Menus.delete) {
                  showDeleteDialog(
                    context: context,
                    ref: ref,
                    fileId: file['_id'],
                  );
                }

                if (value == Menus.update) {
                  showUpdateDialog(
                    context: context,
                    ref: ref,
                    fileId: file['_id'],
                    originalname: file['originalname'],
                  );
                }
              },
              itemBuilder: (_) => const [
                PopupMenuItem(
                  value: Menus.download,
                  child: Text('Download'),
                ),
                PopupMenuItem(
                  value: Menus.update,
                  child: Text('Update'),
                ),
                PopupMenuItem(
                  value: Menus.delete,
                  child: Text('Delete'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
