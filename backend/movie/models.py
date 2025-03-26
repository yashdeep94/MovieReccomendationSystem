from django.db import models

class Link(models.Model):
    url = models.CharField(max_length=5000)

    def __str__(self):
        return f'{self.id}'

class Movie(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=500)
    genre = models.CharField(max_length=1000)
    poster = models.CharField(max_length=5000, default="")
    sum_of_rating = models.FloatField(default=0.0)
    no_of_user_rated = models.IntegerField(default=0)
    links = models.ManyToManyField(Link)

    def __str__(self):
        return self.name

class User(models.Model):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    movies_and_ratings = models.CharField(max_length=5000, null=True)
    email_address = models.CharField(max_length=1000, default="")
    age = models.IntegerField(default=17)

    def __str__(self):
        return self.name

class UserGroup(models.Model):
    id = models.IntegerField(primary_key=True)
    movies_rated = models.ManyToManyField(Movie, null=True, blank=True)

    def __str__(self):
        return f"{self.id}"
