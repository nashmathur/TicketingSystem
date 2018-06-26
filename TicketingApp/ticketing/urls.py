from django.conf.urls import url, include
from ticketing import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'tickets', views.TicketViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'rest-auth/', include('rest_auth.urls')),
    url(r'rest-auth/registration/', include('rest_auth.registration.urls')),
]
