import 'package:bytbox_app/utils/custom_snakebar.dart';
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
        final res = await deleteFile(ref, fileId);
        if(!context.mounted)return;
        if(res['success']){
          CustomSnakebar.show(context, res['message'], Type.success);
        }else{
          CustomSnakebar.show(context, 'Error occure', Type.error);
        }
      },
    ),
  );
}
