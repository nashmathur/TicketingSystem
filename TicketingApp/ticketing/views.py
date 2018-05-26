from ticketing.models import Ticket
from ticketing.serializers import TicketSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from ticketing.serializers import UserSerializer
from rest_framework import permissions
from ticketing.permissions import IsOwnerOrReadOnly


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TicketList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TicketDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly,)
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
