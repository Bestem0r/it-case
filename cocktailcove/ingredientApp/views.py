from django.shortcuts import render
from rest_framework import status, viewsets, generics
from .serializers import IngredientSerializer
from .models import Ingredient


class IngredientViewSet(viewsets.ModelViewSet):
    http_method_names = ["get", "post", "delete", "options", "patch"]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
