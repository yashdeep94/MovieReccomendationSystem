from django.core import serializers
from .models import *
from django.http import JsonResponse, HttpResponse, FileResponse
from json import dumps, loads, load
import jwt, hashlib, joblib
import pandas as pd
import numpy as np
import yagmail
from random import randint

SECRET_KEY = "beproject"
SALT = "mrsbe"

# Route 1: /api/auth/createuser/ [POST] Creating User (No Login Requires)
def create_user(request):
    if request.method == "POST":
        data = loads(request.body)
        try:
            # Validating incoming data
            if len(data.get('name')) == 0 or len(data.get('password')) == 0:
                return HttpResponse("Username or password cannot be blank", content_type="text/plain", status=400)
            elif len(data.get('name')) > 100:
                return HttpResponse("Name should be less than 100 characters", content_type="text/plain", status=400)
            elif len(data.get('password')) > 15:
                return HttpResponse("Password should be less than 15 characters", content_type="text/plain", status=400)
            else:
                # checking user in database and storing it
                if User.objects.filter(name=data.get('name')).exists():
                    return HttpResponse("Some error occured", content_type="text/plain", status=400)
                else:
                    encoded_password = hashlib.sha256(bytes(data.get('password') + SALT, "UTF-8")).hexdigest()
                    user_object = User(name=data.get('name'), password=encoded_password, email_address=data.get("mailID"), age=data.get("age"))
                    user_object.save()
                    return HttpResponse("User Created Successfullly", content_type="text/plain")
        except Exception as e:
            return HttpResponse("Some error occured", content_type="text/plain", status=500)
    else:
        return HttpResponse("Bad Request", content_type="text/plain", status=400)

# Route 2: /api/auth/login/ [POST] Login User (No Login Requires)
def user_login(request):
    if request.method == "POST":
        data = loads(request.body)
        try:
            # Validating data
            if data.get('password') == "" or data.get('name') == "":
                return HttpResponse("Name or Password cannot be blank", content_type="text/plain", status=400)
            else:
                # Checking user in database and if there then returning jwt token
                user_object = User.objects.filter(name=data.get('name'))
                if user_object.exists():
                    encoded_password = hashlib.sha256(bytes(data.get('password') + SALT, "UTF-8")).hexdigest()
                    if user_object[0].password == encoded_password:
                        payload = data
                        encoded_jwt = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
                        return JsonResponse({"authToken" : encoded_jwt})
                return HttpResponse("Some error occured check your credentials", content_type="text/plain", status=400)
        except Exception as e:
            print(f"Error in user login - {e}")
            return HttpResponse("Some error occured", content_type="text/plain", status=500)
    else:
        return HttpResponse("Bad Request", content_type="text/plain", status=400)

# Route 3: api/movie/ [GET] Get All Movies (Login Requires)
#                     [GET] Get Selected Movie Link (Login Requires)
#                     [GET] Get Selected Movies (Login Requires)
def movie(request):
    if request.method == "GET":
        try:
            # Authenticate user
            encoded_jwt = request.headers.get("Auth-Token")
            jwt.decode(encoded_jwt, SECRET_KEY, algorithms=["HS256"])
            # Getting all movies queryset and converting it to the json
            if request.GET.get("all") == "true":
                movies_data = serializers.serialize("json", Movie.objects.all(), fields=("name", "genre", "poster", "sum_of_rating", "no_of_user_rated"))
                return JsonResponse(movies_data, safe=False)
            elif request.GET.get("links") == "true":
                movies_data = serializers.serialize("json", Movie.objects.filter(id=int(request.GET.get("movieid")))[0].links.all())
                return JsonResponse(movies_data, safe=False)
            else:
                movies_data = serializers.serialize("json", Movie.objects.filter(id=int(request.GET.get("movieid"))))
                return JsonResponse(movies_data, safe=False)
        except Exception as e:
            print(f"Error in handle movie - {e}")
            return HttpResponse("Some error occured", content_type="text/plain", status=500)
    else:
        return HttpResponse("Bad Request", content_type="text/plain", status=400)

# Route 4: /api/user/ [GET] Get User Movie Data (Login Requires)
#                     [POST] User Rates Movies (Login Requires)
def user(request):
    if request.method == "GET":
        try:
            # Authenticate user
            encoded_jwt = request.headers.get("Auth-Token")
            user_data = jwt.decode(encoded_jwt, SECRET_KEY, algorithms=["HS256"])
            # Getting all rated movies data and converting it to the json
            user_movie_data = User.objects.filter(name=user_data.get('name'))[0].movies_and_ratings
            if user_movie_data == None:
                user_movie_data = {}
            return JsonResponse(user_movie_data, safe=False)
        except Exception as e:
            print(f"Error in user - {e}")
            return HttpResponse("Some error occured", content_type="text/plain", status=500)
    elif request.method == "POST":
        try:
            data = loads(request.body)
            # Authenticate user
            encoded_jwt = request.headers.get("Auth-Token")
            user_data = jwt.decode(encoded_jwt, SECRET_KEY, algorithms=["HS256"])
            if data.get("rating") == True:
                # Getting User And Updating Its Rating Data
                user_object = User.objects.filter(name=user_data.get('name'))
                if user_object[0].movies_and_ratings != None:
                    rated_movies_data = loads(user_object[0].movies_and_ratings)
                    if str(data.get("movieId")) in rated_movies_data:
                        # Updating Movie Object
                        movie_object = Movie.objects.filter(id=data.get("movieId"))
                        new_sum_of_rating = (movie_object[0].sum_of_rating - rated_movies_data[f"{data.get('movieId')}"]) + data.get("movie_rating")
                        movie_object.update(sum_of_rating=new_sum_of_rating)
                        rated_movies_data[f"{data.get('movieId')}"] = data.get("movie_rating")
                        rated_movies_data = dumps(rated_movies_data)
                    else:
                        # Updating Movie Object
                        movie_object = Movie.objects.filter(id=data.get("movieId"))
                        movie_object.update(sum_of_rating=movie_object[0].sum_of_rating + data.get("movie_rating"), no_of_user_rated = movie_object[0].no_of_user_rated + 1)
                        rated_movies_data[data.get("movieId")] = data.get("movie_rating")
                        rated_movies_data = dumps(rated_movies_data)
                    user_object.update(movies_and_ratings=rated_movies_data)
                    return JsonResponse(rated_movies_data, safe=False)
                else:
                    # Updating Movie Object
                    movie_object = Movie.objects.filter(id=data.get("movieId"))
                    movie_object.update(sum_of_rating=movie_object[0].sum_of_rating + data.get("movie_rating"), no_of_user_rated = movie_object[0].no_of_user_rated + 1)
                    rated_movies_data = {data.get("movieId"):data.get("movie_rating")}
                    rated_movies_data = dumps(rated_movies_data)
                    user_object.update(movies_and_ratings=rated_movies_data)
                    return JsonResponse(rated_movies_data, safe=False)
        except Exception as e:
            print(f"Error in user - {e}")
            return HttpResponse("Some error occured", content_type="text/plain", status=500)
    else:
        return HttpResponse("Bad Request", content_type="text/plain", status=400)

# Route 5: /api/recommended/ [GET] Get Movie Reccomendation For User (Login Requires)
def reccomendation(request):
    if request.method == "GET":
        try:
            # Authenticate user
            encoded_jwt = request.headers.get("Auth-Token")
            user_data = jwt.decode(encoded_jwt, SECRET_KEY, algorithms=["HS256"])
            # loading columnData json file for features of ml model
            with open('columnData.json') as fp:
                parsedColumnData = load(fp)
            # Creating data frame with given columns
            df = pd.DataFrame(columns=parsedColumnData.get("columns"))
            df.loc[0] = 0
            # Getting user rated movies data
            user_object = User.objects.filter(name=user_data.get('name'))
            if user_object[0].movies_and_ratings != None:
                user_movie_data = loads(user_object[0].movies_and_ratings)
                for key, value in user_movie_data.items():
                    df.at[0, int(key)] = value
                # Loading Ml Model
                loaded_model = joblib.load("Trained_Model_Small_Dataset.sav")
                predicted_user_group = loaded_model.predict([df.iloc[0, :]])
                user_group_object = UserGroup.objects.filter(id=predicted_user_group[0])[0]
                reccomended_movies = serializers.serialize("json", user_group_object.movies_rated.all(), fields=("name", "genre", "poster", "sum_of_rating", "no_of_user_rated"))
                return JsonResponse(reccomended_movies, safe=False)
            else:
                return JsonResponse([], safe=False)
        except Exception as e:
            print(f"Error in user - {e}")
            return HttpResponse("Some error occured", content_type="text/plain", status=500)
    else:
        return HttpResponse("Bad Request", content_type="text/plain", status=400)

# Route 6: /api/posters/<path> [GET] Get Movie Posters (No Login Requires)
def poster_image(request, path):
    if request.method == "GET":
        img = open(f"./posters/{path}", "rb")
        response = FileResponse(img)
        return response

# Route 7: /api/verifyemail/ [POST] Send Verification Mail (No Login Requires)
def verifyEmail(request):
    if request.method == "POST":
        try:
            data = loads(request.body)
            user = 'your_email@gmail.com'
            # Apppassword in order to access source (sender) gmail
            appPassword = 'your_app_password'
            to = data.get("mailID")
            subject = 'OTP for email verification'
            otp = ""
            for i in range(4):
                otp += str(randint(1,9))
            content = [f'Your One Time Password For Mail Verification is\n{otp}']
            with yagmail.SMTP(user, appPassword) as yag:
                yag.send(to, subject, content)
            encoded_otp = hashlib.sha256(otp.encode("utf-8")).hexdigest()
            return JsonResponse({"verificationOTP" : encoded_otp}, safe=False)
        except Exception as e:
            print(f"Error in verify email - {e}")
            return HttpResponse("Some error occured", content_type="text/plain", status=500)
    else:
        return HttpResponse("Bad Request", content_type="text/plain", status=400)