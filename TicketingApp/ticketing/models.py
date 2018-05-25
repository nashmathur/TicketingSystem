from django.db import models

CATEGORY_CHOICES = (
    ('BUG', 'Bug Report'),
    ('FEATURE', 'Feature Request'),
    ('SERVICE', 'Service Request'),
    ('OTHER', 'Other'),
)

DOMAIN_CHOICES = (
    ('PUBLIC', 'Public'),
    ('PRIVATE', 'Private'),
)

STATUS_CHOICES = (
    ('RECEIVED', 'Received'),
    ('UNDER CONSIDERATION', 'Under Consideration'),
    ('NOT CONSIDERED', 'Won\'t Consider'),
    ('BEING DESIGNED', 'Being Designed'),
    ('FAILED FEASIBILITY TESTING', 'Failed Feasibility Testing'),
    ('RESOLVED', 'Resolved'),
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
