from django.db.models import Q
from ticketing.models import Ticket
from ticketing.serializers import TicketSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from ticketing.serializers import UserSerializer
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication
from ticketing.permissions import IsOwnerOrReadOnly
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import AllowAny


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = (AllowAny,)
        return super(UserViewSet, self).get_permissions()

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)


    def list(self, request):
        if str(request.user) == str('AnonymousUser'):
            self.queryset = Ticket.objects.filter(domain='Public')
        elif not request.user.is_staff:
            self.queryset = Ticket.objects.filter(Q(domain='Public') | Q(owner=request.user))
        return super().list(request)

    def detail(self, request):
        if not request.user.is_staff:
            self.queryset = Ticket.objects.filter(Q(domain='Public') | Q(owner=request.user))
        return super().detail(request)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
