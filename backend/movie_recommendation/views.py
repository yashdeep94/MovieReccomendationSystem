from django.shortcuts import render, HttpResponse
from movie.models import *
import pandas as pd
import joblib
import json
from scipy.sparse import csr_matrix
import requests
from PIL import Image
from io import BytesIO
import os
import numpy as np
from bs4 import BeautifulSoup

def index(request):
    ## Automated script to add data to database from csv files use only once
    # with open("../../columnData.json", "r") as f:
    #     column_data = json.load(f)
    # movie_data = pd.read_csv("../../ml-latest-small/ml-latest-small/movies.csv")
    # for i in movie_data.itertuples():
    #     if i.movieId in column_data["columns"]:
    #         movie_obj = Movie(id=i.movieId, name=i.title, genre=i.genres)
    #         movie_obj.save()

    # ratings_data = pd.read_csv("../../ml-latest-small/ml-latest-small/ratings.csv")
    # movies_data = pd.read_csv("../../ml-latest-small/ml-latest-small/movies.csv")
    # merged_data = pd.merge(ratings_data[["userId", "movieId", "rating"]], movies_data[["movieId", "title"]] , on="movieId")
    # user_movie_ratings = pd.pivot_table(merged_data, index="userId", columns="movieId", values="rating")
    # user_movie_ratings.fillna(0.0, inplace=True)
    # sparsed_user_movie_ratings = csr_matrix(user_movie_ratings.values)

    # ratings_data.drop(["timestamp", "userId"], axis=1, inplace=True)
    # movie_data.drop("title", axis=1, inplace=True)
    # merged_data = pd.merge(ratings_data, movie_data)
    # category_genere = merged_data["genres"].astype("category")
    # merged_data["genres"] = category_genere.cat.codes
    # for i in merged_data.itertuples():
    #     loaded_pipeline = joblib.load("../../TrainedPipeLineModel.sav")
    #     result = loaded_pipeline.predict([[i.movieId, i.rating, i.genres]])
    #     virtual_user_obj = VirtualUsersMovie.objects.filter(id=result[0])
    #     if virtual_user_obj.exists():
    #         movie_obj = Movie.objects.filter(id=i.movieId)
    #         if movie_obj.exists():
    #             virtual_user_obj[0].movies.add(movie_obj[0])
    #     else:
    #         new_virtual_user = VirtualUsersMovie(id=result[0])
    #         new_virtual_user.save()
    #         movie_obj = Movie.objects.filter(id=i.movieId)
    #         if movie_obj.exists():
    #             new_virtual_user.movies.add(movie_obj[0])

    # loaded_model = joblib.load("../../Trained_Model.sav")
    # index = 0
    # for i in merged_data.itertuples():
    #     virtual_user_obj = VirtualUsersMovie.objects.filter(id=loaded_model.labels_[index])
    #     movie_obj = Movie.objects.filter(id=i.movieId)
    #     if movie_obj.exists():
    #         virtual_user_obj[0].movies.add(movie_obj[0])
    #     index += 1
    #     print(index)

    # print(VirtualUsersMovie.objects.all()[1].movies.all())

    # Adding posters
    # movie_objects = Movie.objects.all()
    # errorMobieList = []
    # for movie in movie_objects:
    #     try:
    #         movie_name = movie.name.split('(')[0].strip()
    #         r = requests.get(f"https://api.themoviedb.org/3/search/movie?api_key=your_key&query={movie_name}")
    #         response_json = r.json()
    #         print(response_json["results"][0]["poster_path"])
    #         if response_json["results"][0]["poster_path"] != None:
    #             r = requests.get(f"http://image.tmdb.org/t/p/w500{response_json['results'][0]['poster_path']}")
    #             i = Image.open(BytesIO(r.content))
    #             # try:
    #             #     os.mkdir(f"posters/{movie_name}")
    #             # except:
    #             #     print("exception occured")
    #             with open(f"posters/{response_json['results'][0]['poster_path'][1:]}", "wb") as fp:
    #                 i.save(fp)
    #             Movie.objects.filter(id=movie.id).update(poster=f"posters/{response_json['results'][0]['poster_path'][1:]}")
    #             # break
    #     except:
    #         errorMobieList.append(movie.name.split('(')[0].strip())
    # print("Completed with all movies")
    # print(errorMobieList)

    # Adding User Groups And therir Movies
    # ratings_data = pd.read_csv("./ml-latest-small/ml-latest-small/ratings.csv")
    # movies_data = pd.read_csv("./ml-latest-small/ml-latest-small/movies.csv")
    # merged_data = pd.merge(ratings_data[["userId", "movieId", "rating"]], movies_data[["movieId", "title"]] , on="movieId")
    # user_movie_ratings = pd.pivot_table(merged_data, index="userId", columns="movieId", values="rating")
    # user_movie_ratings.fillna(0.0, inplace=True)
    # loaded_model = joblib.load("Trained_Model_Small_Dataset.sav")
    # index = 0
    # for user in user_movie_ratings.index:
    #     user_group = loaded_model.predict([user_movie_ratings.iloc[index, :]])
    #     user_group_object = UserGroup.objects.filter(id=user_group)
    #     for movieId in user_movie_ratings.columns:
    #         if user_movie_ratings[movieId][user] != 0.0:
    #             movie_object = Movie.objects.filter(id=movieId)
    #             user_group_object[0].movies_rated.add(movie_object[0])
    #     index += 1

    # Adding Sum of Movie Rating and no of user rated movies
    # ratings_data = pd.read_csv("./ml-latest-small/ml-latest-small/ratings.csv")
    # movies_data = pd.read_csv("./ml-latest-small/ml-latest-small/movies.csv")
    # merged_data = pd.merge(ratings_data[["userId", "movieId", "rating"]], movies_data[["movieId", "title"]] , on="movieId")
    # user_movie_ratings = pd.pivot_table(merged_data, index="userId", columns="movieId", values="rating")
    # user_movie_ratings.fillna(0.0, inplace=True)
    # for user in user_movie_ratings.index:
    #     for movieId in user_movie_ratings.columns:
    #         if user_movie_ratings[movieId][user] != 0.0:
    #             movie_object = Movie.objects.filter(id=movieId)
    #             movie_object.update(sum_of_rating=movie_object[0].sum_of_rating + user_movie_ratings[movieId][user], no_of_user_rated=movie_object[0].no_of_user_rated + 1)

    # Adding Links of Movies in Database
    # movie_id_data = pd.read_csv("../../ml-latest-small/ml-latest-small/links.csv")
    # for id in movie_id_data.iterrows():
    #     try:
    #         print(id[1][0], id[1][2])
    #         r = requests.get(f"https://api.themoviedb.org/3/movie/{id[1][2]}/watch/providers?api_key=your_key")
    #         response_json = r.json()
    #         tmdb_link = response_json["results"]["IN"]["link"]
    #         r = requests.get(tmdb_link, headers={"user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'})
    #         soup_object = BeautifulSoup(r.content, 'html.parser')
    #         providers = soup_object.find_all('ul', 'providers')
    #         for provider in providers:
    #             link_obj = Link.objects.filter(url=provider.find('li').div.a["href"])
    #             if not link_obj.exists():
    #                 linkObject = Link(url=provider.find('li').div.a["href"])
    #                 linkObject.save()
    #                 movie_object = Movie.objects.filter(id=id[1][0])[0]
    #                 movie_object.links.add(linkObject)
    #     except Exception as e:
    #         print(e)
    return HttpResponse("Data added to database")
