from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from ticketing import views

urlpatterns = [
    url(r'^tickets/$', views.TicketList.as_view()),
    url(r'^tickets/(?P<pk>[0-9]+)/$', views.TicketDetail.as_view()),
    url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
