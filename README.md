# lambda-queryVideo

## Description

This is a lambda function named `lambda-queryVideo`. It is designed to take in a query and a YouTube URL as inputs. The function extracts the transcript from the video, transforms it, and sends it off to OpenAI to get a response back.

## Usage

This function is used as an endpoint `/queryVideo`. To use it, send a POST request to the endpoint with the query and the YouTube URL in the request body.

## Response

The function will return a response from OpenAI based on the video transcript.
