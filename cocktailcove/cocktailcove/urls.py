from django.contrib import admin
from django.urls import path
from ingredientApp.views import IngredientViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"ingredients", IngredientViewSet, basename="ingredients")

urlpatterns = [
    path("admin/", admin.site.urls),
] + router.urls
