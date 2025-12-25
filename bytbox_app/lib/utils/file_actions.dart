import 'package:bytbox_app/utils/delete_files.dart';
import 'package:bytbox_app/widget/dialogbox.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void showDeleteDialog({
  required BuildContext context,
  required WidgetRef ref,
  required String fileId,
}) {
  showDialog(
    context: context,
    builder: (_) => Dialogbox(
      title: 'Delete file',
      content: 'Are you sure?',
      cancel: 'Cancel',
      conferm: 'Confirm',
      onTap: () async {
        await deleteFile(ref, fileId);
      },
    ),
  );
}
