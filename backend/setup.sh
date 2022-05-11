#!/bin/bash

apt-get install libsndfile1 -y
gunicorn --bind=0.0.0.0 --timeout 600 app:app