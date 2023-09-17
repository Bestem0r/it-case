# Generated by Django 4.1.3 on 2023-09-17 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingredientApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
    ]
