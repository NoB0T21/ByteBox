import 'package:bytbox_app/utils/custom_snakebar.dart';
import 'package:bytbox_app/utils/delete_files.dart';
import 'package:bytbox_app/widget/inputField.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Dialogbox extends StatelessWidget {
  final String title;
  final String content;
  final String cancel;
  final String conferm;
  final VoidCallback onTap;
  const Dialogbox({
    super.key,
    required this.title,
    required this.content,
    required this.cancel,
    required this.conferm,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: AlertDialog(
        title: Text(title),
        content: Text(content),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
            }, 
            child: Text(
              cancel,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.blue
              ),
            )
          ),
          TextButton(
            onPressed: () {
              onTap();
              Navigator.of(context).pop();
            }, 
            child: Text(
              conferm,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.red
              ),
            )
          )
        ],
      ),
    );
  }
}

class Dialogbox2 extends StatefulWidget {
  final String title;
  final String content;
  final String cancel;
  final String conferm;
  final String fileId;
  final String originalname;
  final WidgetRef ref;
  const Dialogbox2({
    super.key,
    required this.title,
    required this.content,
    required this.cancel,
    required this.conferm,
    required  this.fileId,
    required  this.originalname,
    required this.ref,
  });

  @override
  State<Dialogbox2> createState() => _Dialogbox2State();
}

class _Dialogbox2State extends State<Dialogbox2> {
  late final TextEditingController _newName;

  @override
  void initState() {
    super.initState();
    _newName = TextEditingController();
  }

  @override
  void dispose() {
    _newName.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    _newName.text = widget.originalname;
    return Center(
      child: AlertDialog(
        title: Text(widget.title),
        content: SizedBox(
          height: 100,
          child: Column(
            children: [
              Text(widget.content),
              SizedBox(height: 20,),
              CustomTextfield(
                controller: _newName,
                showpasswoard: false,
                hintText: 'newName',
                keyboardType: TextInputType.text,
              )
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
            }, 
            child:Text(
              widget.cancel,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.blue
              ),
            ),
          ),
          TextButton(
            onPressed: () async{
              String newName;
              List<String> a = _newName.text.split('.');
              List<String> b = widget.originalname.split('.');
              if(a.length!=1){
                newName = _newName.text;
              }else if(b.length!=1){
                newName = '${_newName.text}.${b[1]}';
              }else{
                newName = _newName.text;
              }
              final res = await updateFile(
                  widget.ref, 
                  widget.fileId,
                  newName
                );
              if(!context.mounted)return;
              if(res['success']){
                CustomSnakebar.show(context, res['message'], Type.success);
              }else{
                CustomSnakebar.show(context, 'Error occure', Type.error);
              }
              Navigator.of(context).pop();
            }, 
            child: Text(
              widget.conferm,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.white
              ),
            )
          )
        ],
      ),
    );
  }
}