from django.db import models


# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    amount = models.IntegerField(default=0, null=False)

    class Meta:
        app_label = "ingredientApp"
