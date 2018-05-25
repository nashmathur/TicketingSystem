from rest_framework import serializers
from ticketing.models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('id', 'created', 'title', 'description', 'category', 'domain', 'status', 'solved')
