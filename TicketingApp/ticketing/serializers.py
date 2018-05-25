from rest_framework import serializers
from ticketing.models import Ticket
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    tickets = serializers.PrimaryKeyRelatedField(many=True, queryset = Ticket.objects.all())


    class Meta:
        model = User
        fields = ('id', 'username', 'tickets')

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('id', 'created', 'title', 'description', 'category', 'domain', 'status', 'solved')
