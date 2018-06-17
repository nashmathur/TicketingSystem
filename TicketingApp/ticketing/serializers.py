from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from ticketing.models import Ticket
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    tickets = serializers.PrimaryKeyRelatedField(many=True, queryset = Ticket.objects.all())
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(min_length=8)

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        if 'password' in validated_data:
              user.set_password(validated_data['password'])
              user.save()
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'tickets')

class TicketSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Ticket
        fields = ('id', 'created', 'title', 'description', 'owner', 'category', 'domain', 'status', 'solved')
