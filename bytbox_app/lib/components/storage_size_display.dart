import 'package:flutter/material.dart';

class StorageSizeDisplay extends StatelessWidget {
  final String total;
  const StorageSizeDisplay({
    super.key,
    required this.total
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100,
      width: double.infinity,
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.onPrimary,
        shape: BoxShape.rectangle,
        borderRadius: BorderRadius.circular(15)
      ),
      child: Column(
        children: [
          const Text(
            'Available Storage',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 25
            ),
          ),
          const SizedBox(height: 3,),
          Text(
            '$total / 500 Mb',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16
            ),
          )
        ],
      ),
    );
  }
}