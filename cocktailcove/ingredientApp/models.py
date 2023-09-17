from django.db import models


# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False, unique=True)
    amount = models.DecimalField(default=0, max_digits=5, decimal_places=2, null=False)

    class Meta:
        app_label = "ingredientApp"
