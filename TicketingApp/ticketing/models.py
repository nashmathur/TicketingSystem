from django.db import models

CATEGORY_CHOICES = (
    ('Bug Report', 'Bug Report'),
    ('Feature Request', 'Feature Request'),
    ('Service Request', 'Service Request'),
    ('Other', 'Other'),
)

DOMAIN_CHOICES = (
    ('Public', 'Public'),
    ('Private', 'Private'),
)

STATUS_CHOICES = (
    ('Received', 'Received'),
    ('Under Consideration', 'Under Consideration'),
    ('Won\'t consider', 'Won\'t Consider'),
    ('Being Designed', 'Being Designed'),
    ('Failed Feasibility Testing', 'Failed Feasibility Testing'),
    ('Resolved', 'Resolved'),
)


class Ticket(models.Model):

    def __str__(self):
        return self.title

    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    description = models.TextField()
    owner = models.ForeignKey('auth.User', related_name='tickets', on_delete=models.CASCADE)
    category = models.CharField(
        max_length=7,
        choices=CATEGORY_CHOICES,
    )
    domain = models.CharField(
        max_length=7,
        choices=DOMAIN_CHOICES,
        default='PUBLIC',
    )
    status = models.CharField(
        max_length=26,
        choices=STATUS_CHOICES,
        default='RECEIVED',
    )
    solved = models.BooleanField(default=False)
